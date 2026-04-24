/*================      
  src/renderer/app/serialAndBoard.ts
=================*/
import * as Blockly from 'blockly';
import { showCuteModal } from '../ui/modal';

let arduinoPort: any = null;
let isSerialOpen = false;
let serialReader: any = null;
let keepReading = false;

export function getArduinoPort() {
  return arduinoPort;
}

export function isSerialMonitorOpen() {
  return isSerialOpen;
}

export function setArduinoPort(port: any) {
  arduinoPort = port;
}

// 🚀 [무적의 전송 함수] 아두이노로 데이터를 확실하게 쏩니다!
export async function sendSerialData(data: string) {
  if (!arduinoPort || !arduinoPort.writable || !isSerialOpen) {
    showCuteModal('alert', '⚠️ 포트가 열려있지 않거나 전송할 수 없는 상태입니다.', '', () => {});
    return;
  }

  try {
    const writer = arduinoPort.writable.getWriter();
    const encoder = new TextEncoder();
    // 아두이노가 말을 알아들을 수 있게 끝에 줄바꿈(\r\n)을 붙여줍니다!
    const encodedData = encoder.encode(data); 
    
    await writer.write(encodedData);
    writer.releaseLock();

    // 화면에 내가 보낸 글자 예쁘게 표시하기
    const serialOutput = document.getElementById('serialOutput');
    if (serialOutput) {
      serialOutput.innerHTML += `<div style="color: #9b59b6; margin-top: 5px;"><b>[전송]</b> ${data}</div>\n`;
      serialOutput.scrollTop = serialOutput.scrollHeight;
    }
  } catch (error: any) {
    console.error('시리얼 전송 중 오류 발생:', error);
    showCuteModal('alert', `❌ 데이터 전송 실패: ${error.message}`, '', () => {});
  }
}

// 🛡️ 화면 렉 방지를 위한 최적화 변수들
let uiBuffer = "";
let uiUpdateTimer: any = null;
const decoder = new TextDecoder();

// 🚀 초고속 렌더링 & 무적 오뚝이 읽기 함수 (렉 및 버퍼 터짐 완벽 방어)
async function readSerialLoop() {
  while (arduinoPort && keepReading) {
    try {
      // 🚨 [방어 1단계] 포트가 읽을 수 있는 상태인지 매번 확인
      if (!arduinoPort.readable) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 쉬고 다시 시도
        continue;
      }

      serialReader = arduinoPort.readable.getReader();
      
      while (keepReading) {
        const { value, done } = await serialReader.read();
        
        if (done) break; // 읽기 끝! (정상 종료)
        
        if (value) {
          uiBuffer += decoder.decode(value, { stream: true });
          
          if (!uiUpdateTimer) {
            uiUpdateTimer = setTimeout(() => {
              const serialOutput = document.getElementById('serialOutput');
              // 🚨 [방어 2단계] 화면에 글씨가 너무 많아지면 터지므로 10,000자 넘으면 위쪽 지우기!
              if (serialOutput && uiBuffer) {
                serialOutput.appendChild(document.createTextNode(uiBuffer));
                if (serialOutput.textContent && serialOutput.textContent.length > 10000) {
                  serialOutput.textContent = serialOutput.textContent.substring(serialOutput.textContent.length - 5000);
                }
                serialOutput.scrollTop = serialOutput.scrollHeight;
                uiBuffer = ""; 
              }
              uiUpdateTimer = null;
            }, 100); // 0.1초마다 모아서 화면에 그리기
          }
        }
      }
    } catch (error: any) {
      console.error('⚠️ 시리얼 읽기 튕김 (오뚝이 복구 가동!):', error.message);
      // 🚨 [방어 3단계] 버퍼 오버런 등으로 에러가 나면 0.5초 숨고르기 후 다시 루프 돌기!
      await new Promise(resolve => setTimeout(resolve, 500)); 
    } finally {
      if (serialReader) {
        try {
          serialReader.releaseLock();
        } catch(e) { /* 무시 */ }
      }
    }
  }
}
export async function openSerialMonitor() {
  if (!arduinoPort || isSerialOpen) return;
  try {
    // 8MB 그릇 장착!
    await arduinoPort.open({ baudRate: 9600, bufferSize: 8388608 }); 
    
    isSerialOpen = true;
    keepReading = true;
    const toggleSerialBtn = document.getElementById('toggleSerialBtn');
    if (toggleSerialBtn) {
      toggleSerialBtn.innerHTML = '⏹️ 모니터 끄기';
      toggleSerialBtn.style.backgroundColor = '#e67e22';
    }
    const serialOutput = document.getElementById('serialOutput');
    if (serialOutput) {
      serialOutput.innerHTML += `<div style="color: #3498db; margin-top:10px;">\n--- 🌐 [시스템] 시리얼 모니터가 연결되었습니다 (9600 baud) ---</div>\n`;
      serialOutput.scrollTop = serialOutput.scrollHeight;
    }
    readSerialLoop(); 
  } catch (err: any) {
    isSerialOpen = false;
    if (!err.message?.includes('already open')) {
      showCuteModal('alert', `⚠️ 모니터를 여는 중 오류가 발생했습니다:\n${err.message}`, '', () => {});
    }
  }
}


export async function closeSerialMonitor() {
  if (!isSerialOpen) return;
  
  isSerialOpen = false;
  keepReading = false;
  
  const toggleSerialBtn = document.getElementById('toggleSerialBtn');
  if (toggleSerialBtn) {
    toggleSerialBtn.innerHTML = '▶️ 모니터 켜기';
    toggleSerialBtn.style.backgroundColor = '#2c3e50';
  }
  
  try {
    // 🛡️ [정공법] Web Serial API 표준 해제 절차
    if (serialReader) {
      // 1. 읽기 작업 중단: 이때 발생하는 AbortError는 정상적인 종료 신호이므로 삼킵니다(.catch)
      await serialReader.cancel().catch(() => {});
      
      // 2. 락(Lock) 해제: 포트와 리더기의 연결 고리를 완전히 끊어줍니다.
      try {
        serialReader.releaseLock();
      } catch (e) {
        // (Read 루프에서 이미 락을 풀었다면 발생하는 에러 무시)
      }
    }
    
    // 3. 락이 완벽히 풀렸으므로, 이제 포트가 백엔드(업로드)로 안전하게 양보됩니다!
    if (arduinoPort) {
      await arduinoPort.close();
    }
  } catch (e) {
    console.error('포트 닫기 오류:', e);
  }
  
  const serialOutput = document.getElementById('serialOutput');
  if (serialOutput) {
    serialOutput.innerHTML += `<div style="color: #e74c3c; margin-top:10px;">\n--- 🛑 [시스템] 시리얼 모니터가 종료되었습니다 ---</div>\n`;
    serialOutput.scrollTop = serialOutput.scrollHeight;
  }
}

// 👑 [대폭 수정됨] 요소 생성 타이밍과 무관하게 언제나 작동하는 이벤트 감시자!
export function initSerialMonitor() {
  window.openSerialMonitor = openSerialMonitor;
  window.closeSerialMonitor = closeSerialMonitor;

  // 화면 전체의 클릭을 감시합니다 (버튼이 늦게 생겨도 잡아냅니다!)
  document.addEventListener('click', async (e: Event) => {
    const target = e.target as HTMLElement;

    // 1. 모니터 켜기/끄기
    if (target.id === 'toggleSerialBtn' || target.closest('#toggleSerialBtn')) {
      if (!arduinoPort && !isSerialOpen) {
        showCuteModal('alert', '⚠️ 먼저 보드를 연결해 주세요!', '', () => {});
        return;
      }
      if (isSerialOpen) await closeSerialMonitor();
      else await openSerialMonitor();
    }

    // 2. 화면 지우기
    if (target.id === 'clearSerialBtn' || target.closest('#clearSerialBtn')) {
      const serialOutput = document.getElementById('serialOutput');
      if (serialOutput) serialOutput.innerHTML = '';
    }

    // 3. 🚀 전송 버튼 클릭!
    if (target.id === 'sendSerialBtn' || target.closest('#sendSerialBtn')) {
      const serialInput = document.getElementById('serialInput') as HTMLInputElement;
      if (serialInput && serialInput.value.trim() !== '') {
        sendSerialData(serialInput.value);
        serialInput.value = ''; // 전송 후 비우기
      }
    }
    
    // (보너스) 로그 복사
    if (target.id === 'copyLogBtn' || target.closest('#copyLogBtn')) {
      const serialOutput = document.getElementById('serialOutput');
      const logText = serialOutput?.textContent || '';
      if (!logText.trim()) return;
      navigator.clipboard.writeText(logText).then(() => {
        showCuteModal('alert', '✅ 시리얼 로그가 복사되었습니다!', '', () => {});
      });
    }
  });

  // 엔터키 입력 감시 (입력창이 나중에 생겨도 잡아냅니다!)
  document.addEventListener('keypress', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'serialInput' && e.key === 'Enter') {
      const serialInput = target as HTMLInputElement;
      if (serialInput.value.trim() !== '') {
        sendSerialData(serialInput.value);
        serialInput.value = ''; 
      }
    }
  });
}