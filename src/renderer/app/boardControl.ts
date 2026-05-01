/*================

src/renderer/app/boardControl.ts  

===============*/
import { getArduinoPort, setArduinoPort, isSerialMonitorOpen } from './serialAndBoard';
import { showCuteModal } from '../ui/modal';

function updateHeaderProgress(percent: number, message: string, isError: boolean = false) {
  const header = document.getElementById('header');
  const statusText = document.getElementById('header-status');
  if (!header || !statusText) return;
  
  header.style.setProperty('--header-progress', `${percent}%`);
  statusText.innerText = message;
  
  if (isError) {
    header.style.setProperty('background', 'linear-gradient(90deg, rgba(231, 76, 60, 0.2), rgba(231, 76, 60, 0.5))', 'important');
    statusText.style.color = '#e74c3c';
  } else {
    header.style.removeProperty('background');
    statusText.style.color = '#2C3E50';
    
    if (percent >= 100) {
      statusText.style.color = '#27ae60';
      setTimeout(() => {
        header.style.setProperty('--header-progress', '0%');
        statusText.innerText = '';
      }, 3000);
    }
  }
}

// 🚨 [추가됨] 화면에 투명 방어막(유리창)을 쳐서 업로드 중에 오작동을 막는 함수
function toggleScreenLock(lock: boolean) {
  let shield = document.getElementById('smarty-screen-shield');
  if (!shield) {
    shield = document.createElement('div');
    shield.id = 'smarty-screen-shield';
    shield.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      z-index: 999998; cursor: wait; background: transparent;
      display: none;
    `;
    document.body.appendChild(shield);
  }
  shield.style.display = lock ? 'block' : 'none';
}

export function setBoardConnected(isConnected: boolean) {
  const connectBtn = document.getElementById('connectBtn');
  const uploadBtn = document.getElementById('uploadBtn') as HTMLButtonElement;
  const statusText = document.getElementById('header-status');
  const header = document.getElementById('header');
  
  if (!connectBtn) return;
  
  if (isConnected) {
    connectBtn.className = 'menu-btn icon-btn connected-glow';
    connectBtn.setAttribute('data-tooltip', '✅ 보드 연결됨!');
    connectBtn.innerHTML = '🔗';
    
    if (uploadBtn) {
      uploadBtn.className = 'menu-btn icon-btn clear-btn';
      uploadBtn.style.cssText = 'color: #2ecc71 !important; opacity: 1; cursor: pointer; font-size: 2rem !important;';      
      uploadBtn.setAttribute('data-tooltip', '▶ 실행');
      uploadBtn.innerHTML = '▶';
      uploadBtn.disabled = false;
    }
    
    if (statusText) statusText.innerText = '';
    if (header) header.style.setProperty('--header-progress', '0%');
  } else {
    connectBtn.className = 'menu-btn icon-btn';
    connectBtn.setAttribute('data-tooltip', '🔌 보드 연결하기');
    connectBtn.innerHTML = '🔗';
    connectBtn.style.cssText = 'background-color: #f1c40f; color: #333; border: none;';
    
    if (uploadBtn) {
      uploadBtn.className = 'menu-btn icon-btn clear-btn';
      uploadBtn.style.cssText = 'color: #7f8c8d !important; opacity: 0.5; cursor: not-allowed; font-size: 2rem !important;';      
      uploadBtn.innerHTML = '▶';
      uploadBtn.setAttribute('data-tooltip', '⚠️ 보드를 먼저 연결하세요');
      uploadBtn.disabled = true;
    }
  }
}

export function initBoardControl() {
  const connectBtn = document.getElementById('connectBtn');
  const boardSelect = document.getElementById('boardSelect') as HTMLSelectElement;
  const portInput = document.getElementById('portInput') as HTMLInputElement;
  const uploadBtn = document.getElementById('uploadBtn') as HTMLButtonElement;

  if (portInput) {
    portInput.value = '';
    portInput.placeholder = '포트 자동 감지...';
  }
  if (uploadBtn) {
    uploadBtn.disabled = true;
    uploadBtn.style.opacity = '1';
    uploadBtn.style.cursor = 'not-allowed';
  }
  const serialOutput = document.getElementById('serialOutput');
  if (serialOutput) {
    serialOutput.innerHTML = `<div style="color: #4CAF50; font-weight: bold; margin-bottom: 5px;">✨ 환영합니다! 스마티 에디터가 준비되었습니다.</div><div style="color: #9E9E9E; margin-bottom: 15px;">👉 스마티 보드를 PC에 꽂고, 우측 상단의 <b>[🔌 보드 연결하기]</b> 버튼을 눌러주세요!</div>`;
  }

  function updateButtonUI() {
    const connectBtnLocal = document.getElementById('connectBtn');
    const uploadBtnLocal = document.getElementById('uploadBtn') as HTMLButtonElement;
    const boardSelectLocal = document.getElementById('boardSelect') as HTMLSelectElement;
    const portInputLocal = document.getElementById('portInput') as HTMLInputElement;
    if (!connectBtnLocal || !boardSelectLocal || !portInputLocal) return;
    const arduinoPort = getArduinoPort();
    if (arduinoPort) {
      setBoardConnected(true);
      connectBtnLocal.setAttribute('data-tooltip', `✅ ${boardSelectLocal.options[boardSelectLocal.selectedIndex]?.text || '보드'} 연결됨`);
      if (uploadBtnLocal) {
        uploadBtnLocal.disabled = false;
        uploadBtnLocal.style.opacity = '1';
        uploadBtnLocal.style.cursor = 'pointer';
      }
    } else {
      setBoardConnected(false);
      connectBtnLocal.setAttribute('data-tooltip', '🔌 보드 연결하기');
      if (uploadBtnLocal) {
        uploadBtnLocal.disabled = true;
        uploadBtnLocal.style.opacity = '1';
        uploadBtnLocal.style.cursor = 'not-allowed';
      }
    }
  }

  if (connectBtn) {
    connectBtn.addEventListener('click', async () => {
      try {
        if (isSerialMonitorOpen()) {
          showCuteModal('alert', '시리얼 모니터 창을 닫고 다시 찾아주세요!', '', () => {});
          return;
        }
        const port = await (navigator as any).serial.requestPort();
        await port.open({ baudRate: 9600 });
        await port.close();
        setArduinoPort(port);
        if (portInput) {
          if ((window as any).api && (window as any).api.getConnectedPort) {
            const detectedPort = await (window as any).api.getConnectedPort();
            portInput.value = detectedPort || '[이름 못찾음]';
          } else {
            portInput.value = '[API 연결안됨]';
          }
        }
        setBoardConnected(true);
        updateButtonUI();
      } catch (err: any) {
        setArduinoPort(null);
        let errorMessage = '연결 실패';
        const errString = String(err).toLowerCase();
        if (err.name === 'NotFoundError' || errString.includes('select any device')) {
          errorMessage = '⚠️ 연결된 USB 보드를 찾을 수 없습니다!\n\n스마티 케이블을 확인해 주세요.';
        } else if (errString.includes('failed to open') || errString.includes('access denied')) {
          errorMessage = '⚠️ 포트를 열 수 없습니다!\n\n다른 프로그램이 사용 중인지 확인해 주세요.';
        } else {
          errorMessage = '⚠️ 연결 중 오류가 발생했습니다:\n' + err;
        }
        showCuteModal('alert', errorMessage, '', () => {});
        setBoardConnected(false);
        updateButtonUI();
      }
    });
  }

  if (uploadBtn) {
    uploadBtn.addEventListener('click', async () => {
      const arduinoPort = getArduinoPort();
      if (!arduinoPort) {
        showCuteModal('alert', '⚠️ 먼저 보드를 연결해 주세요!', '', () => {});
        return;
      }
      
      const portVal = portInput?.value;
      if (!portVal || portVal.includes('[')) {
        showCuteModal('alert', '포트를 확인할 수 없습니다!', '보드가 올바르게 연결되었는지 확인해 주세요.', () => {});
        return;
      }

      const codeArea = document.getElementById('codeArea');
      if (!codeArea) return;
      const code = codeArea.textContent || '';
      const wasSerialOpen = isSerialMonitorOpen();
      
      if (wasSerialOpen) {
        if (serialOutput) {
          serialOutput.textContent += '\n--- ⚠️ [시스템] 업로드를 위해 포트를 임시 해제합니다 ---\n';
          serialOutput.scrollTop = serialOutput.scrollHeight;
        }
        if (typeof window.closeSerialMonitor === 'function') {
          await window.closeSerialMonitor();
        }
        await new Promise(r => setTimeout(r, 600));
      }
      
      // 🚨 1. 업로드 시작: 버튼 비활성화 & 투명 방어막(유리창) 치기! (마우스 포인터가 모래시계로 변함)
      uploadBtn.classList.remove('uploaded-glow');
      uploadBtn.style.pointerEvents = 'none';
      toggleScreenLock(true);
      
      let progress = 0;
      updateHeaderProgress(10, '🛠️ 스마티 업로드 준비 중...');
      
      let interval = setInterval(() => {
        if (progress < 90) {
          progress += Math.random() * 8 + 2;
          if (progress > 90) progress = 90;
          if (progress > 40) {
            updateHeaderProgress(progress, '⚡ 스마티로 전송 중... ⬇️');
          } else {
            updateHeaderProgress(progress, '🛠️ 스케치 컴파일 중... ⚙️');
          }
        }
      }, 300);
      
      try {
        const wAny = window as any;
        let resultMsg = '';
        
        if (wAny.api && wAny.api.invoke) {
          resultMsg = await wAny.api.invoke('upload-code', code, boardSelect?.value || 'arduino:avr:uno', portVal);
        } else if (wAny.electron && wAny.electron.ipcRenderer) {
          resultMsg = await wAny.electron.ipcRenderer.invoke('upload-code', code, boardSelect?.value || 'arduino:avr:uno', portVal);
        } else if (wAny.api && wAny.api.uploadCode) {
          resultMsg = await wAny.api.uploadCode(code, boardSelect?.value || 'arduino:avr:uno', portVal);
        } else {
          throw new Error('백엔드와 통신할 수 없습니다.');
        }
        
        clearInterval(interval);
        
        if (resultMsg && resultMsg.includes('❌')) {
          updateHeaderProgress(100, '❌ 업로드 실패', true);
          let printMsg = resultMsg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          if (printMsg.length > 250) {
            printMsg = printMsg.substring(0, 250) + '\n\n... (오류 내용이 너무 깁니다. 블록 연결을 확인해주세요!)';
          }
          showCuteModal('alert', '🚨 코드 업로드 에러 발생!', printMsg, () => {});
        } else {
          updateHeaderProgress(100, '✅ 업로드 완료! 🎉');
          uploadBtn.classList.add('uploaded-glow');
          
          if (wasSerialOpen) {
            setTimeout(async () => {
              if (serialOutput) {
                serialOutput.textContent += '--- 🔌 [시스템] 아두이노 재부팅 완료. 모니터 재연결 중... ---\n';
                serialOutput.scrollTop = serialOutput.scrollHeight;
              }
              if (typeof window.openSerialMonitor === 'function') {
                await window.openSerialMonitor();
              }
            }, 2000);
          }
        }
      } catch (error) {
        clearInterval(interval);
        updateHeaderProgress(100, '❌ 시스템 오류', true);
        showCuteModal('alert', '통신 중 오류가 발생했어요!', String(error), () => {});
      } finally {
        // 🚨 2. 업로드 종료: 투명 방어막 제거!
        toggleScreenLock(false);
        setTimeout(() => {
          uploadBtn.style.pointerEvents = 'auto';
          updateButtonUI();
        }, 2500);
      }
    });
  }

  if ('serial' in navigator) {
    (navigator as any).serial.addEventListener('disconnect',async (event: any) => {
      if (getArduinoPort() === event.target || !getArduinoPort()) {

        if (isSerialMonitorOpen() && typeof window.closeSerialMonitor === 'function') {
          await window.closeSerialMonitor();
        }
        
        setArduinoPort(null);
        if (portInput) {
          portInput.value = '';
          portInput.placeholder = '포트 자동 감지...';
        }
        if (serialOutput) {
          serialOutput.innerHTML += `<div style="color: #e74c3c;">\n--- ❌ [시스템] USB 연결이 해제되었습니다. ---</div>`;
          serialOutput.scrollTop = serialOutput.scrollHeight;
        }
        if (connectBtn) {
          connectBtn.style.backgroundColor = '#f1c40f';
          connectBtn.style.color = '#333';
        }
        updateButtonUI();
      }
    });
    (navigator as any).serial.addEventListener('connect', () => {
      if (serialOutput) {
        serialOutput.innerHTML += `<div style="color: #2ecc71;">\n--- 🔌 [시스템] 새로운 USB 장치가 인식되었습니다. [보드 연결하기]를 눌러주세요. ---</div>`;
        serialOutput.scrollTop = serialOutput.scrollHeight;
      }
    });
  }
}