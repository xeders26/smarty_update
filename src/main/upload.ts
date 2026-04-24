/*============================
  src/main/upload.ts    
=============================*/
import { app, ipcMain, dialog } from 'electron'
import { join } from 'path'
import * as fs from 'fs'
import { exec } from 'child_process'
import util from 'util'

// 비동기 실행을 위한 유틸리티
const execPromise = util.promisify(exec)

function getArduinoCliPath(): string {
  if (app.isPackaged) {
    return join(process.resourcesPath, 'bin', 'arduino-cli.exe')
  }
  return join(__dirname, '../../bin/arduino-cli.exe')
}

// 🌟 [핵심] 다른 컴퓨터에서도 스마티 라이브러리를 쓸 수 있게 경로 지정
function getLibrariesPath(): string {
  if (app.isPackaged) {
    return join(process.resourcesPath, 'bin', 'libraries')
  }
  return join(__dirname, '../../bin/libraries')
}

// 🌟 [핵심] 낯선 PC에서도 독립적으로 작동할 '스마티 전용 아두이노 데이터 공간' 생성
function getCliDataPath(): string {
  const dataDir = join(app.getPath('userData'), 'arduino-cli-data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  return dataDir
}

const ARDUINO_DATA_DIR = getCliDataPath()
process.env.ARDUINO_DATA_DIR = ARDUINO_DATA_DIR
process.env.ARDUINO_CONFIG_DIR = ARDUINO_DATA_DIR

export function registerUploadHandler(): void {
  ipcMain.handle('upload-code', async (_event, code, board, port) => {
    return new Promise<string>(async (resolve) => {
      try {
        const tempDir = join(app.getPath('userData'), 'temp_sketch')
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true })
        }

        const sketchPath = join(tempDir, 'temp_sketch.ino')
        fs.writeFileSync(sketchPath, code, 'utf-8')

        const cliPath = getArduinoCliPath()
        const libPath = getLibrariesPath()
        const dataPath = getCliDataPath()

        // =========================================================
        // 🚀 [초강력 마법] 낯선 PC에 아두이노 두뇌(Core)가 없으면 몰래 자동 설치!
        // =========================================================
        const avrCorePath = join(dataPath, 'packages', 'arduino', 'hardware', 'avr')
        if (!fs.existsSync(avrCorePath)) {
          console.log('아두이노 코어가 없습니다! 인터넷을 통해 자동 설치를 시작합니다... (최초 1회만)')
          try {
            // 🚨 수정됨: 문제가 되던 --data-dir "${dataPath}" 삭제 완료!
              await execPromise(`"${cliPath}" core update-index`)
              await execPromise(`"${cliPath}" core install arduino:avr`)
          } catch (installErr: any) {
            dialog.showErrorBox(
              '초기 셋업 실패! 🌐', 
              `아두이노 컴파일러를 다운로드하는데 실패했습니다. 인터넷 연결을 확인해주세요!\n\n${installErr.message}`
            );
            return resolve(`❌ 초기 다운로드 실패:\n${installErr.message}`)
          }
        }

        // =========================================================
        // 🚀 컴파일 및 업로드 (내장 라이브러리 사용!)
        // =========================================================
        // 🚨 수정됨: 여기도 문제가 되던 --data-dir "${dataPath}" 삭제 완료!
        const compileCmd = `"${cliPath}" compile -b ${board} --libraries "${libPath}" "${tempDir}"`
        const uploadCmd = `"${cliPath}" upload -b ${board} -p ${port} "${tempDir}"`

        console.log('컴파일 시작...')
        exec(compileCmd, (compileErr, _stdout1, stderr1) => {
          if (compileErr) {
            const errorMsg = stderr1 || compileErr.message;
            console.error(errorMsg)
            
            // 🚨 [강제 팝업 1] 컴파일 오류 발생 시 경고창 띄우기
            dialog.showErrorBox(
              '코드 변환 실패! 🚨',
              `블록 코드에 문제가 있습니다. 빈 공간이나 잘못 연결된 블록이 없는지 확인해 주세요!\n\n[상세 오류 내용]\n${errorMsg}`
            );

            return resolve(`❌ 컴파일 실패:\n${errorMsg}`)
          }

          console.log('컴파일 성공! 업로드 시작...')
          exec(uploadCmd, (uploadErr, _stdout2, stderr2) => {
            if (uploadErr) {
              const errorMsg = stderr2 || uploadErr.message;
              console.error(errorMsg)

              // 🚨 [강제 팝업 2] 업로드 오류 발생 시 경고창 띄우기
              dialog.showErrorBox(
                '업로드 실패! 🔌',
                `스마티와의 통신에 실패했습니다!\n\n1. USB 케이블이 보드에 제대로 꽂혀 있나요?\n2. 올바른 포트(COM)가 선택되었나요?\n\n[상세 오류 내용]\n${errorMsg}`
              );

              return resolve(`❌ 업로드 실패 (포트나 케이블을 확인하세요):\n${errorMsg}`)
            }
            console.log('업로드 대성공!')
            resolve('✅ 업로드 대성공!! 스마티가 새로운 명령을 실행합니다! 🎉')
          })
        })
      } catch (err: any) {
        // 🚨[강제 팝업 3] 시스템(파일 생성 등) 예외 오류
        dialog.showErrorBox(
          '알 수 없는 시스템 오류! 💥',
          `파일을 생성하거나 실행하는 중 문제가 발생했습니다.\n\n[상세 오류 내용]\n${err.message || err}`
        );
        resolve(`오류 발생: ${err}`)
      }
    })
  })


}

// =====================================================================
// 🚨 [추가됨] 앱이 켜질 때 백그라운드에서 아두이노 코어를 미리 설치해두는 함수!
// =====================================================================
export async function initArduinoCLI(): Promise<void> {
  try {
    const dataPath = getCliDataPath()
    const avrCorePath = join(dataPath, 'packages', 'arduino', 'hardware', 'avr')
    
    // 코어가 없으면 백그라운드에서 조용히 설치 (사용자는 모름!)
    if (!fs.existsSync(avrCorePath)) {
      console.log('🤖 앱 초기화 중: 아두이노 코어 백그라운드 자동 설치 시작...')
      const cliPath = getArduinoCliPath()
      
      await execPromise(`"${cliPath}" core update-index`)
      await execPromise(`"${cliPath}" core install arduino:avr`)
      console.log('✅ 백그라운드 설치 완료! 이제 업로드 버튼을 누르면 1초 만에 바로 구워집니다!')
    } else {
      console.log('✅ 아두이노 코어가 이미 존재합니다. 쾌적하게 시작합니다!')
    }
  } catch (err) {
    console.error('❌ 백그라운드 코어 설치 중 에러 발생:', err)
  }
}