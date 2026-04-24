/*================
src/main/serial.ts
================*/
import { ipcMain, session, app } from 'electron'
import { SerialPort } from 'serialport' 
import { exec } from 'child_process'    
import * as fs from 'fs'                
import * as path from 'path'            
import util from 'util'                 

const execPromise = util.promisify(exec)

let currentConnectedPortName = ''
let rcSerialPort: any = null 

// 🕵️‍♂️ [궁극의 해결책] Base64 인코딩을 적용하여 한글 깨짐 및 파싱 에러를 원천 차단!
async function getRealBluetoothNames(): Promise<any[]> {
  const script = `
    $results = @();
    $ports = Get-PnpDevice -Class Ports -ErrorAction SilentlyContinue | Where-Object { $_.InstanceId -match 'BTHENUM' };
    foreach ($p in $ports) {
        $comMatch = [regex]::Match($p.FriendlyName, 'COM\\d+');
        if ($comMatch.Success) {
            $comPort = $comMatch.Value;
            $parentId = (Get-PnpDeviceProperty -InstanceId $p.InstanceId -KeyName 'DEVPKEY_Device_Parent' -ErrorAction SilentlyContinue).Data;
            if ($parentId) {
                $parent = Get-PnpDevice -InstanceId $parentId -ErrorAction SilentlyContinue;
                if ($parent -and $parent.FriendlyName) {
                    $results += @{ path = $comPort; realName = $parent.FriendlyName };
                }
            }
        }
    }
    # 결과를 JSON으로 만든 뒤, 한글 깨짐을 막기 위해 Base64 암호화 문자로 변환해서 출력
    $json = ConvertTo-Json $results -Compress -ErrorAction SilentlyContinue;
    if ([string]::IsNullOrWhiteSpace($json) -eq $false -and $json -ne 'null') {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($json);
        [Convert]::ToBase64String($bytes);
    }
  `;

  try {
    const { stdout } = await execPromise(`powershell -ExecutionPolicy Bypass -NoProfile -Command "${script.replace(/\n/g, ' ')}"`);
    const b64 = stdout.trim();
    if (!b64) return [];
    
    // Node.js에서 Base64 암호를 다시 온전한 한글 문자열로 복구
    const decoded = Buffer.from(b64, 'base64').toString('utf8');
    let parsed = JSON.parse(decoded);
    if (!Array.isArray(parsed)) parsed = [parsed]; 
    return parsed;
  } catch (err) {
    console.error("블루투스 이름 강제 추출 실패:", err);
    return [];
  }
}

export function registerSerialHandlers(): void {
  // =========================================================
  // 🛡️ 기존 유지: Web Serial API 권한 및 자동 선택 로직
  // =========================================================
  session.defaultSession.setPermissionCheckHandler((_webContents, permission) => {
    if (permission === 'serial') return true;
    return false;
  })

  session.defaultSession.setDevicePermissionHandler((details) => {
    if (details.deviceType === 'serial') return true;
    return false;
  })

  session.defaultSession.on('select-serial-port', (event, portList, _webContents, callback) => {
    event.preventDefault()
    if (portList && portList.length > 0) {
      const arduinoPort = portList.find(port => {
        const name = (port.displayName || port.portName || '').toUpperCase()
        return name.includes('USB') || name.includes('UART') || name.includes('CP210') || name.includes('CH340') || name.includes('ARDUINO')
      })
      const targetPort = arduinoPort || portList[0]
      const allNames = `${targetPort.portName} ${targetPort.displayName}`.toUpperCase()
      const comMatch = allNames.match(/COM\d+/)
      currentConnectedPortName = comMatch ? comMatch[0] : (targetPort.portName || '알수없음')
      callback(targetPort.portId)
    } else {
      currentConnectedPortName = ''
      callback('')
    }
  })

  ipcMain.handle('get-connected-port', () => currentConnectedPortName)
  ipcMain.handle('reset-connected-port', () => { currentConnectedPortName = ''; return true; })

  // =========================================================
  // 🚀 스마티 조종기 및 블루투스 설정 (진짜 이름 매칭 적용)
  // =========================================================
  ipcMain.handle('get-serial-ports', async () => {
    try {
      const ports = await SerialPort.list();
      const realBtNames = await getRealBluetoothNames();

      const mergedPorts = ports.map(port => {
        const btMatch = realBtNames.find(bt => bt.path === port.path);
        return {
          path: port.path,
          friendlyName: btMatch && btMatch.realName ? btMatch.realName : port.friendlyName,
          pnpId: port.pnpId
        };
      });

      return mergedPorts;
    } catch (error) {
      console.error('포트 검색 에러:', error);
      return [];
    }
  })

  ipcMain.handle('upload-smarty-code', async (_event, code: string) => {
    if (!currentConnectedPortName) return false;
    try {
      const tempDir = path.join(app.getPath('temp'), 'SmartySetup')
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)
      
      const sketchPath = path.join(tempDir, 'SmartySetup.ino')
      fs.writeFileSync(sketchPath, code)

      const command = `arduino-cli compile --upload -b arduino:avr:uno -p ${currentConnectedPortName} "${sketchPath}"`
      await execPromise(command)
      return true
    } catch (err) {
      return false
    }
  })

  // =========================================================
  // 🚀 스마티 조종기(SPP) 블루투스 연결 (끊김 자동 감지 장착!)
  // =========================================================
    // =========================================================
  // 🚀 스마티 조종기(SPP) 블루투스 연결 (🐶 감시견 순찰 시스템 장착!)
  // =========================================================
  ipcMain.handle('serial-connect', async (event, { path: portPath, baudRate }) => {
    return new Promise((resolve) => {
      if (rcSerialPort && rcSerialPort.isOpen) rcSerialPort.close();
      
      rcSerialPort = new SerialPort({ path: portPath, baudRate }, (err) => {
        if (err) {
          resolve(false);
        } else {
          // 알람을 보낼 프론트엔드 창 객체를 안전하게 저장
          const sender = event.sender;

          rcSerialPort.on('close', () => sender.send('serial-disconnected'));
          rcSerialPort.on('error', () => sender.send('serial-disconnected'));

          // 무선조종 BT 데이터 수신
          rcSerialPort.on('data', (data: Buffer) => {
            sender.send('serial-data', data);
          });

          // 🐶 [핵심] 1초마다 윈도우 OS를 강제로 찔러서 실제 연결 상태 확인!
          const watchdog = setInterval(() => {
            if (rcSerialPort && rcSerialPort.isOpen) {
              // 포트 상태 읽기를 강제 요청 (기기가 꺼져 있으면 여기서 에러가 폭발합니다!)
              rcSerialPort.get((checkErr: any) => {
                if (checkErr) {
                  console.log("🐶 감시견: 스마티의 전원이 꺼진 것을 적발했습니다!", checkErr.message);
                  clearInterval(watchdog); // 감시 중지
                  sender.send('serial-disconnected'); // 프론트엔드로 끊김 알람 즉시 발사!
                  
                  if (rcSerialPort.isOpen) {
                    rcSerialPort.close();
                  }
                  rcSerialPort = null;
                }
              });
            } else {
              clearInterval(watchdog);
            }
          }, 1000);

          resolve(true);
        }
      })
    })
  })

  // =========================================================
  // 🚀 SPP 데이터 전송 (중복 방지 & 전송 실패 즉시 감지 시스템)
  // =========================================================
  
  // 🚨[중요] 기존에 쌓여있던 'serial-write' 유령 리스너들을 모두 날려버립니다! (두 번 전송 완벽 방지)
  ipcMain.removeAllListeners('serial-write');

  ipcMain.on('serial-write', (event, data: any) => {
    if (rcSerialPort && rcSerialPort.isOpen) {
      
      // 🚨 데이터를 보낼 때 'err' 콜백을 달아서 실패 여부를 즉시 낚아챕니다!
      rcSerialPort.write(Buffer.from(data), (err) => {
        if (err) {
          console.error('⚠️ [통신 실패] 스마티 전원이 꺼졌거나 멀어졌습니다!', err.message);
          
          // 1. 프론트엔드(화면)로 즉시 "🔴 끊김" 알람 발사!
          event.sender.send('serial-disconnected');
          
          // 2. 윈도우가 쥐고 있는 껍데기 포트를 강제로 찢고 닫아버립니다.
          if (rcSerialPort.isOpen) {
            rcSerialPort.close();
          }
          rcSerialPort = null;
        }
      });
      
    }
  });

  ipcMain.on('serial-disconnect', () => {
    if (rcSerialPort && rcSerialPort.isOpen) {
      rcSerialPort.close();
      rcSerialPort = null;
    }
  })

  // =========================================================
  // 🔍 [초등학생용 완벽 우회!] 클래식 '장치 및 프린터' 창 강제 호출
  // =========================================================
  ipcMain.handle('open-devices-printers', async () => {
    try {
      // 윈도우 11의 설정창 강제 납치를 무시하고, 고유 식별자(CLSID)를 이용해 
      // 대장님이 원하셨던 '옛날 장치 및 프린터 창'을 100% 강제로 띄웁니다!
      await execPromise('explorer.exe shell:::{A8A91A66-3A7D-4424-8D24-04E180695C7A}');
      return true;
    } catch (err) {
      console.error("클래식 제어판 열기 실패:", err);
      return false;
    }
  });

}