export function initRcTabUI() {
  
  const initAll = () => {
    const rcArea = document.getElementById('rcArea');
    const cockpitPanel = document.querySelector('.cockpit-panel') as HTMLElement;
    
    if (!rcArea || !cockpitPanel) {
      setTimeout(initAll, 50);
      return;
    }

    if (rcArea.dataset.initialized === 'true') return;
    rcArea.dataset.initialized = 'true';

    document.querySelectorAll('#hudPower').forEach(el => el.remove());

    // ==========================================
    // 🚀 모니터 동적 리사이징
    // ==========================================
    const updateRcScale = () => {
      if (rcArea.style.display === 'none') return;
      void rcArea.offsetHeight;
      const currentWidth = rcArea.clientWidth;
      const currentHeight = rcArea.clientHeight;
      if (currentWidth === 0 || currentHeight === 0) return;

      const BASE_WIDTH = 650;
      let scale = (currentWidth * 0.90) / BASE_WIDTH;
      scale = Math.min(scale, 1.3);

      cockpitPanel.style.height = 'auto';
      cockpitPanel.style.maxHeight = 'none';
      cockpitPanel.style.paddingBottom = '25px';

      const terminalWrapper = document.getElementById('smartyTerminalWrapper');
      if (terminalWrapper && terminalWrapper.style.display !== 'none') {
        const unscaledScreenHeight = (currentHeight * 0.95) / scale;
        let newTermHeight = unscaledScreenHeight - 440;
        if (newTermHeight < 100) newTermHeight = 100; 
        
        terminalWrapper.style.height = `${newTermHeight}px`;
      } else {
        const panelHeight = cockpitPanel.offsetHeight || 520;
        const scaleY = (currentHeight * 0.95) / panelHeight;
        if (scaleY < scale) scale = scaleY;
      }

      cockpitPanel.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    if (typeof ResizeObserver !== 'undefined') {
      const rcObserver = new ResizeObserver(() => { requestAnimationFrame(updateRcScale); });
      rcObserver.observe(rcArea);
    }
    window.addEventListener('resize', () => requestAnimationFrame(updateRcScale));
    setTimeout(updateRcScale, 100);

    // ==========================================
    // ⚙️ 1. 스마티 블루투스 설정 모달 & 업로드
    // ==========================================
    const setupModal = document.getElementById('smartySetupModal');
    const assignBtn = document.getElementById('smartyAssignBtn');
    const closeModalBtn = document.getElementById('smartyCloseModalBtn');
    const numInput = document.getElementById('smartyNumInput') as HTMLInputElement;
    const pairGuide = document.getElementById('smartyPairGuide');
    const createdNameSpan = document.getElementById('createdSmartyName');

    if (closeModalBtn && setupModal) {
      closeModalBtn.addEventListener('click', () => {
        setupModal.style.display = 'none';
        loadBluetoothPorts(); 
      });
    }

    if (assignBtn && numInput && pairGuide && createdNameSpan) {
      assignBtn.addEventListener('click', async () => {
        const num = numInput.value.trim();
        if (num.length !== 4 || isNaN(Number(num))) {
          alert("⚠️ 스마티 번호 4자리 숫자를 정확히 입력해주세요! (예: 0001)");
          return;
        }

        const smartyCode = `#include "smartyLib.h"\n#include "math.h"\n\nvoid setup() {\n  beginSmarty();\n  setNameBt("Smarty${num}");\n  setPinBt("1234");\n}\n\nvoid loop() {\n\n}\n`;

        assignBtn.textContent = '⏳ 업로드 중...';
        assignBtn.style.background = '#f39c12';
        
        if (typeof (window as any).closeSerialMonitor === 'function') {
          try { await (window as any).closeSerialMonitor(); } catch(e) {}
        }
        if ((window as any).electron) {
          (window as any).electron.ipcRenderer.send('serial-disconnect');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
          const wAny = window as any;
          let resultMsg = '';
          const boardSelect = document.getElementById('boardSelect') as HTMLSelectElement;
          const portInput = document.getElementById('portInput') as HTMLInputElement;

          if (wAny.electron && wAny.electron.ipcRenderer) {
            resultMsg = await wAny.electron.ipcRenderer.invoke('upload-code', smartyCode, boardSelect?.value, portInput?.value);
          } else if (wAny.api && wAny.api.uploadCode) {
            resultMsg = await wAny.api.uploadCode(smartyCode, boardSelect?.value, portInput?.value);
          }

          if (resultMsg && resultMsg.includes('❌')) {
            alert("🚨 업로드에 실패했습니다.\n" + resultMsg);
            assignBtn.textContent = '🚀 이름 지정 및 업로드';
            assignBtn.style.background = '#3498db';
          } else {
            assignBtn.textContent = '🚀 이름 지정 완료!';
            assignBtn.style.background = '#2ecc71';
            createdNameSpan.textContent = `Smarty${num}`;
            pairGuide.style.display = 'block';
          }
        } catch (error) {
          alert("🚨 시스템 오류가 발생했습니다:\n" + error);
          assignBtn.textContent = '🚀 이름 지정 및 업로드';
          assignBtn.style.background = '#3498db';
        }
      });
    }

    // ==========================================
    // 🔄 2. 상단 메뉴 패널 조립
    // ==========================================
    const portSelect = document.getElementById('blePortSelect') as HTMLSelectElement;
    const settingsBtn = document.getElementById('bleSettingsBtn') as HTMLButtonElement;
    
    const oldConnectBtn = document.getElementById('bleConnectBtn');
    if (oldConnectBtn) oldConnectBtn.style.display = 'none';

    if (!document.getElementById('smartySelectStyleFix')) {
      const styleFix = document.createElement('style');
      styleFix.id = 'smartySelectStyleFix';
      styleFix.innerHTML = `#blePortSelect { font-size: 14px !important; } #blePortSelect option { font-size: 14px !important; font-weight: normal !important; }`;
      document.head.appendChild(styleFix);
    }
    
    if (!document.getElementById('smartyGuideModalOverlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'smartyGuideModalOverlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0'; overlay.style.left = '0';
      overlay.style.width = '100%'; overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
      overlay.style.display = 'none'; 
      overlay.style.zIndex = '9999';

      const modalBox = document.createElement('div');
      modalBox.style.position = 'absolute';
      modalBox.style.top = '25%'; modalBox.style.left = 'calc(50% - 200px)'; 
      modalBox.style.backgroundColor = '#fff';
      modalBox.style.padding = '30px'; modalBox.style.borderRadius = '15px';
      modalBox.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
      modalBox.style.textAlign = 'center'; modalBox.style.width = '400px';

      modalBox.innerHTML = `<h2 id="smartyGuideHeader" style="color:#8e44ad; margin-top:0; padding-bottom:10px; cursor:move; user-select:none; border-bottom:2px dashed #ecf0f1; font-size:20px;">💡 스마티 포트 번호 찾기</h2><div style="text-align:left; background:#f1f2f6; padding:15px; border-radius:10px; margin-bottom:25px; font-size:14px; line-height:1.6; color:#2f3640;"><b>1.</b> 아래의 [장치 창 열기]를 누르세요.<br><b>2.</b> <b>Smarty</b> 아이콘에 마우스를 올리고 <b>우클릭</b> 하세요.<br><b>3.</b> <b>[속성]</b>을 누른 뒤, 위쪽의 <b>[하드웨어]</b> 탭을 누르세요.<br><b>4.</b> 괄호 안에 적힌 <b>(COM 번호)</b>를 기억해 주세요!</div>`;

      const headerTitle = modalBox.querySelector('#smartyGuideHeader') as HTMLElement;
      let isDragging = false; let offsetX = 0; let offsetY = 0;
      headerTitle.addEventListener('mousedown', (e) => {
        isDragging = true; const rect = modalBox.getBoundingClientRect();
        offsetX = e.clientX - rect.left; offsetY = e.clientY - rect.top;
        const onMouseMove = (moveEvt: MouseEvent) => {
          if (!isDragging) return;
          modalBox.style.left = (moveEvt.clientX - offsetX) + 'px';
          modalBox.style.top = (moveEvt.clientY - offsetY) + 'px';
        };
        const onMouseUp = () => { isDragging = false; document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      const btnWrapper = document.createElement('div');
      btnWrapper.style.display = 'flex'; btnWrapper.style.gap = '15px';
      const openWinBtn = document.createElement('button');
      openWinBtn.innerHTML = '🚀 장치 창 열기';
      openWinBtn.style.cssText = `height:42px; padding:0 20px; font-size:14px; font-weight:bold; color:#fff; border:none; border-radius:8px; cursor:pointer; background-color:#2ecc71; flex:1;`;
      openWinBtn.addEventListener('click', async () => {
        if ((window as any).electron) { openWinBtn.textContent = '⏳ 여는 중...'; await (window as any).electron.ipcRenderer.invoke('open-devices-printers'); openWinBtn.textContent = '🚀 장치 창 다시 열기'; }
      });
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '닫기';
      closeBtn.style.cssText = `height:42px; padding:0 20px; font-size:14px; font-weight:bold; color:#fff; border:none; border-radius:8px; cursor:pointer; background-color:#95a5a6; flex:1;`;
      closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; modalBox.style.top = '25%'; modalBox.style.left = 'calc(50% - 200px)'; });

      btnWrapper.appendChild(openWinBtn); btnWrapper.appendChild(closeBtn);
      modalBox.appendChild(btnWrapper); overlay.appendChild(modalBox); document.body.appendChild(overlay);
    }

    let controlWrapper = document.getElementById('smartyControlWrapper');
    if (portSelect && settingsBtn) {
      if (!controlWrapper) {
        controlWrapper = document.createElement('div');
        controlWrapper.id = 'smartyControlWrapper';
        controlWrapper.style.cssText = `display:flex; align-items:center; justify-content:space-between; gap:4px; width:100%; box-sizing:border-box; margin-top:15px; margin-bottom:15px; padding:0 10px; height: 48px; transition: opacity 0.3s;`;
        portSelect.parentNode?.insertBefore(controlWrapper, portSelect);
      }

      const commonBtnStyle = `height:48px !important; margin:0; padding:0 10px !important; font-size:16px !important; font-weight:bold; border:none; border-radius:8px; cursor:pointer; flex:1; display:flex; align-items:center; justify-content:center; white-space:nowrap;`;

      let findBtn = document.getElementById('findSmartyBtn') as HTMLButtonElement;
      if (!findBtn) {
        findBtn = document.createElement('button');
        findBtn.id = 'findSmartyBtn';
        findBtn.addEventListener('click', () => { const overlay = document.getElementById('smartyGuideModalOverlay'); if (overlay) overlay.style.display = 'block'; });
      }
      findBtn.style.cssText = commonBtnStyle + 'background-color:#9b59b6; color:white; max-width: 130px;';
      findBtn.innerHTML = '🔍 포트찾기'; 

      portSelect.style.cssText = `height:48px; flex:2.5; width:auto; border-radius:8px; border:2px solid #ccc; font-size:14px !important; padding:0 5px; cursor:pointer;`;
      
      settingsBtn.style.cssText = commonBtnStyle + 'background-color:#f39c12; color:white; max-width: 150px;';
      settingsBtn.innerHTML = '⚙️ 이름설정'; 
      settingsBtn.addEventListener('click', () => {
        const setupModal = document.getElementById('smartySetupModal');
        const pairGuide = document.getElementById('smartyPairGuide');
        const numInput = document.getElementById('smartyNumInput') as HTMLInputElement;
        if(setupModal) setupModal.style.display = 'flex';
        if (pairGuide) pairGuide.style.display = 'none';
        if (numInput) numInput.value = '';
      });

      controlWrapper.appendChild(findBtn);
      controlWrapper.appendChild(portSelect);
      controlWrapper.appendChild(settingsBtn); 
    }

    // ==========================================
    // 📺 3. 연결 시 나타나는 동적 터미널 모니터
    // ==========================================
    let terminalWrapper = document.getElementById('smartyTerminalWrapper');
    if (!terminalWrapper && controlWrapper && controlWrapper.parentNode) {
      terminalWrapper = document.createElement('div');
      terminalWrapper.id = 'smartyTerminalWrapper';
      terminalWrapper.style.cssText = `display:none; width:100%; box-sizing:border-box; margin-top:10px; margin-bottom:10px; padding:0 10px; height: 60px; transition: height 0.2s ease-out;`;
      
      terminalWrapper.innerHTML = `
        <div id="hudScreen" style="width: 100%; background: #0b0e14; border: 2px solid #1e272e; border-radius: 8px; height: 100%; overflow-y: auto; padding: 6px 12px; display: flex; flex-direction: column; gap: 4px; font-family: 'Consolas', 'Courier New', monospace; font-size: 13px; box-shadow: inset 0 0 10px rgba(0,0,0,0.8); box-sizing:border-box;">
          <div id="hudWelcome" style="color:#7f8c8d; text-align:center; font-size:12px; margin-top: 15px;">-- 통신 대기 중 --</div>
        </div>
      `;
      controlWrapper.parentNode.insertBefore(terminalWrapper, controlWrapper.nextSibling);
    }

    const logToTerminal = (type: 'RX' | 'TX', msg: string) => {
      const screen = document.getElementById('hudScreen');
      if (!screen) return;
      const welcome = document.getElementById('hudWelcome');
      if (welcome) welcome.style.display = 'none';

      const bubble = document.createElement('div');
      if (type === 'RX') {
        bubble.style.cssText = `align-self: flex-start; background: rgba(39, 174, 96, 0.15); border: 1px solid #27ae60; color: #2ecc71; padding: 3px 8px; border-radius: 8px 8px 8px 0; max-width: 85%; word-break: break-all; margin-top:2px;`;
        bubble.innerHTML = `⬇️ ${msg}`;
      } else {
        bubble.style.cssText = `align-self: flex-end; background: rgba(41, 128, 185, 0.15); border: 1px solid #2980b9; color: #3498db; padding: 3px 8px; border-radius: 8px 8px 0 8px; max-width: 85%; word-break: break-all; margin-top:2px;`;
        bubble.innerHTML = `${msg} ⬆️`;
      }
      screen.appendChild(bubble);
      screen.scrollTop = screen.scrollHeight;
      while (screen.childNodes.length > 50) screen.removeChild(screen.firstChild as Node);
    };

    // ==========================================
    // 👑 4. 상태 표시줄 인디케이터 장착
    // ==========================================
    const statusTextEl = document.getElementById('bleStatus') as HTMLElement;
    
    if (statusTextEl && statusTextEl.parentElement) {
      const walker = document.createTreeWalker(statusTextEl.parentElement, NodeFilter.SHOW_TEXT, null);
      let node;
      while (node = walker.nextNode()) {
        if (node.nodeValue?.includes('LINK STATUS')) node.nodeValue = node.nodeValue.replace('LINK STATUS', '');
      }
      statusTextEl.style.display = 'none';

      let oldCustomBars = document.querySelectorAll('#smartyCustomStatusBar');
      oldCustomBars.forEach(bar => bar.remove());

      const customStatusBar = document.createElement('div');
      customStatusBar.id = 'smartyCustomStatusBar';
      customStatusBar.style.cssText = `display:flex; gap: 25px; align-items:center; margin-left: 5px;`;
      
      customStatusBar.innerHTML = `
        <div id="btnConnectToggle" style="text-align: center; cursor: pointer; padding: 5px; border-radius: 8px; transition: 0.2s;">
          <div id="hudLink" style="width:16px; height:16px; border-radius:50%; background:#ff4757; margin:0 auto 4px; box-shadow:0 0 10px #ff4757; transition:0.3s;"></div>
          <div id="hudLinkText" style="color:#ecf0f1; font-size:14px; font-weight:bold;">연결</div>
        </div>
        <div style="text-align: center; margin-top:2px;">
          <div id="hudRx" style="width:16px; height:16px; border-radius:50%; background:#34495e; margin:0 auto 4px; transition:0.05s;"></div>
          <div style="color:#7f8c8d; font-size:12px; font-weight:bold;">수신(RX)</div>
        </div>
        <div style="text-align: center; margin-top:2px;">
          <div id="hudTx" style="width:16px; height:16px; border-radius:50%; background:#34495e; margin:0 auto 4px; transition:0.05s;"></div>
          <div style="color:#7f8c8d; font-size:12px; font-weight:bold;">송신(TX)</div>
        </div>
      `;
      
      statusTextEl.parentElement.style.display = 'flex';
      statusTextEl.parentElement.style.justifyContent = 'space-between';
      statusTextEl.parentElement.style.alignItems = 'center';
      statusTextEl.parentElement.insertBefore(customStatusBar, statusTextEl.parentElement.firstChild);

      const toggleBtn = document.getElementById('btnConnectToggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('mouseenter', () => toggleBtn.style.backgroundColor = 'rgba(255,255,255,0.05)');
        toggleBtn.addEventListener('mouseleave', () => toggleBtn.style.backgroundColor = 'transparent');
      }
    }

    // ==========================================
    // 🌟 5. 포트 목록 로딩
    // ==========================================
    let isFetching = false;
    const loadBluetoothPorts = async () => {
      if (!portSelect || !(window as any).electron || isFetching) return;
      if (document.activeElement === portSelect) return; 
      isFetching = true;
      try {
        const ports = await (window as any).electron.ipcRenderer.invoke('get-serial-ports');
        let newHTML = '<option value="" disabled selected hidden style="font-size: 14px;">▼ 내 스마티 선택</option>';
        const savedSmartyPort = localStorage.getItem('last_smarty_port');
        let found = false;
        ports.forEach((port: any) => {
          const fName = (port.friendlyName || '').toLowerCase();
          const pnpId = (port.pnpId || '').toUpperCase();
          if (fName.includes('bluetooth') || fName.includes('블루투스') || pnpId.includes('BTHENUM') || fName.includes('smarty')) {
            if (savedSmartyPort && savedSmartyPort === port.path) {
              newHTML += `<option value="${port.path}" style="font-size:14px; font-weight:bold; color:#2ecc71;" selected>🤖 내 스마티 (${port.path})</option>`;
            } else {
              newHTML += `<option value="${port.path}" style="font-size:14px;">🔷 일반 블루투스 (${port.path})</option>`;
            }
            found = true;
          }
        });
        if (!found) newHTML = '<option value="" disabled selected hidden style="font-size: 14px;">❌ 포트 없음</option>';
        if (portSelect.innerHTML !== newHTML) portSelect.innerHTML = newHTML;
      } catch (e) {}
      isFetching = false;
    };
    loadBluetoothPorts();
    if (controlWrapper) controlWrapper.addEventListener('mouseenter', loadBluetoothPorts);

    // ==========================================
    // 📡 6. 통신 로직 및 완벽한 수신 엔진 (패치 완료)
    // ==========================================
    let isConnected = false;
    let currentDirection = 10;
    const activeKeys = new Set<string>();
    const lever = document.getElementById('speedLever') as HTMLInputElement;
    let rxLightTimer: any;
    let txLightTimer: any;
    
    let rxBuffer = ''; // 💡 수신 문자열을 엔터(\n) 단위로 모으는 버퍼!
    const decoder = new TextDecoder(); // 💡 시리얼 모니터와 동일한 정공법 디코더 장착

    const forceDisconnectUI = () => {
      isConnected = false;
      const linkLight = document.getElementById('hudLink');
      const linkText = document.getElementById('hudLinkText');
      if (linkLight) { linkLight.style.background = '#ff4757'; linkLight.style.boxShadow = '0 0 10px #ff4757'; }
      if (linkText) { linkText.textContent = '연결'; linkText.style.color = '#ecf0f1'; }
      
      if (controlWrapper) controlWrapper.style.display = 'flex';
      if (terminalWrapper) terminalWrapper.style.display = 'none';

      setTimeout(updateRcScale, 10);
      currentDirection = 10;
      activeKeys.clear();
      rxBuffer = ''; // 연결 끊길 때 버퍼 초기화
    };

    const toggleConnectBtn = document.getElementById('btnConnectToggle');
    if (toggleConnectBtn && portSelect) {
      toggleConnectBtn.addEventListener('click', async () => {
        if (isConnected) {
          (window as any).electron.ipcRenderer.send('serial-disconnect');
          forceDisconnectUI();
          return;
        }

        const selectedPort = portSelect.value;
        if (!selectedPort) { alert("⚠️ 메뉴에서 포트를 먼저 선택해주세요!"); return; }

        try {
          const linkText = document.getElementById('hudLinkText');
          if (linkText) linkText.textContent = '연결중..';

          const success = await (window as any).electron.ipcRenderer.invoke('serial-connect', { path: selectedPort, baudRate: 9600 });
          
          if (success === true) {
            isConnected = true;
            localStorage.setItem('last_smarty_port', selectedPort);
            
            const linkLight = document.getElementById('hudLink');
            if (linkLight) { linkLight.style.background = '#2ecc71'; linkLight.style.boxShadow = '0 0 15px #2ecc71'; }
            if (linkText) { linkText.textContent = '해제'; linkText.style.color = '#2ecc71'; }

            if (controlWrapper) controlWrapper.style.display = 'none';
            if (terminalWrapper) terminalWrapper.style.display = 'block';

            setTimeout(updateRcScale, 10);
            const screen = document.getElementById('hudScreen');
            if (screen) screen.innerHTML = `<div id="hudWelcome" style="color:#2ecc71; text-align:center; font-size:12px; margin-top: 15px;">-- 스마티 통신 개시 --</div>`;

          } else { throw new Error("포트가 사용 중이거나 응답이 없습니다."); }
        } catch (error: any) {
          forceDisconnectUI();
          alert("🚨 연결 실패!\n사유: " + error.message);
        }
      });
    }

    if ((window as any).electron) {
      (window as any).electron.ipcRenderer.removeAllListeners('serial-disconnected');
      (window as any).electron.ipcRenderer.on('serial-disconnected', () => { forceDisconnectUI(); });
      
      (window as any).electron.ipcRenderer.removeAllListeners('serial-data');
      (window as any).electron.ipcRenderer.on('serial-data', (event: any, rawData: any) => {
        try {
          // 💡 1. RX 깜빡임 UI 활성화
          const rxLight = document.getElementById('hudRx');
          if (rxLight) {
            rxLight.style.background = '#2ecc71'; rxLight.style.boxShadow = '0 0 15px #2ecc71';
            clearTimeout(rxLightTimer);
            rxLightTimer = setTimeout(() => { rxLight.style.background = '#34495e'; rxLight.style.boxShadow = 'none'; }, 80);
          }

          // 💡 2. Electron IPC 버퍼 객체를 안전하게 포맷 변환
          let u8Arr: Uint8Array;
          if (rawData instanceof Uint8Array) {
            u8Arr = rawData;
          } else if (rawData && rawData.type === 'Buffer' && Array.isArray(rawData.data)) {
            u8Arr = new Uint8Array(rawData.data);
          } else if (Array.isArray(rawData)) {
            u8Arr = new Uint8Array(rawData);
          } else if (typeof rawData === 'string') {
            u8Arr = new TextEncoder().encode(rawData);
          } else {
            return; // 알 수 없는 쓰레기값이면 무시
          }

          // 💡 3. 안전하게 스트림 디코딩 후 버퍼에 누적 보관
          rxBuffer += decoder.decode(u8Arr, { stream: true });

          // 💡 4. 엔터(\n)가 들어올 때만 문장을 잘라서 화면에 예쁘게 출력!
          if (rxBuffer.includes('\n')) {
            const lines = rxBuffer.split('\n');
            // 마지막 줄은 아직 엔터가 안 쳐진 상태일 수 있으므로 다시 버퍼에 넣음
            rxBuffer = lines.pop() || '';

            lines.forEach(line => {
              const cleanLine = line.trim();
              if (cleanLine) logToTerminal('RX', cleanLine);
            });
          }
        } catch (e) {
          console.error("RX Parsing Error:", e);
        }
      });
    }

    const send2Bytes = async (byte1: number, byte2: number) => {
      if (isConnected && (window as any).electron) {
        const data = new Uint8Array([byte1, byte2]);
        (window as any).electron.ipcRenderer.send('serial-write', data);

        const txLight = document.getElementById('hudTx');
        if (txLight) {
          txLight.style.background = '#f39c12'; txLight.style.boxShadow = '0 0 15px #f39c12';
          clearTimeout(txLightTimer);
          txLightTimer = setTimeout(() => { txLight.style.background = '#34495e'; txLight.style.boxShadow = 'none'; }, 80);
        }
        logToTerminal('TX', `[${byte1}, ${byte2}]`);
      }
    };

    // ==========================================
    // 🎚️ 7. 조종 로직 및 UI 연동
    // ==========================================
    const updateDirectionCommand = () => {
      const up = activeKeys.has('ArrowUp'); const down = activeKeys.has('ArrowDown');
      const left = activeKeys.has('ArrowLeft'); const right = activeKeys.has('ArrowRight');
      const q = activeKeys.has('q') || activeKeys.has('Q'); const w = activeKeys.has('w') || activeKeys.has('W');
      let newDir = 10;
      if (up && right) newDir = 1; else if (right && down) newDir = 3; else if (down && left) newDir = 5;
      else if (left && up) newDir = 7; else if (up) newDir = 0; else if (right) newDir = 2;
      else if (down) newDir = 4; else if (left) newDir = 6; else if (q) newDir = 8; else if (w) newDir = 9;
      if (newDir !== currentDirection) { currentDirection = newDir; send2Bytes(68, currentDirection); }
    };

    let powerInterval: any = null;
    const changePower = (delta: number) => {
      if (lever) {
        const currentVal = parseInt(lever.value, 10);
        const newVal = Math.max(-100, Math.min(100, currentVal + delta));
        if (currentVal !== newVal) { lever.value = newVal.toString(); lever.dispatchEvent(new Event('input')); }
      }
    };
    const startPowerChange = (delta: number) => {
      if (powerInterval) clearInterval(powerInterval);
      changePower(delta); powerInterval = setInterval(() => { changePower(delta); }, 25); 
    };
    const stopPowerChange = () => { if (powerInterval) { clearInterval(powerInterval); powerInterval = null; } };

    const handleKeyDown = (key: string) => {
      if (activeKeys.has(key)) return; 
      activeKeys.add(key); const nKey = key.toLowerCase(); 
      if (nKey === 'a') send2Bytes(70, 97); else if (nKey === 's') send2Bytes(70, 115);
      else if (nKey === 'z') send2Bytes(70, 122); else if (nKey === 'x') send2Bytes(70, 120);
      else if (nKey === '.' || nKey === 'pageup' || nKey === 'pgup') startPowerChange(1);
      else if (nKey === ',' || nKey === 'pagedown' || nKey === 'pgdn') startPowerChange(-1);
      else updateDirectionCommand();
    };

    const handleKeyUp = (key: string) => {
      if (!activeKeys.has(key)) return; activeKeys.delete(key); const nKey = key.toLowerCase();
      if (['.', ',', 'pageup', 'pagedown', 'pgup', 'pgdn'].includes(nKey)) { stopPowerChange(); return; }
      if (['a', 's', 'z', 'x'].includes(nKey)) return;
      updateDirectionCommand();
    };

    const updateSpeed = () => {
      if (!lever) return;
      const val = parseInt(lever.value, 10);
      const percentage = ((val + 100) / 200) * 100;
      
      const originalDisplay = document.getElementById('speedValueDisplay');
      if (originalDisplay) {
        originalDisplay.textContent = `${val}%`; 
        if (val === 0) { originalDisplay.style.color = '#2ecc71'; originalDisplay.style.textShadow = '0 0 10px #2ecc71'; }
        else if (val > 0) { originalDisplay.style.color = '#00d2d3'; originalDisplay.style.textShadow = '0 0 10px #00d2d3'; }
        else { originalDisplay.style.color = '#ff4757'; originalDisplay.style.textShadow = '0 0 10px #ff4757'; }
      }
      
      if (val === 0) lever.style.background = `linear-gradient(to right, #111 48%, #2ecc71 50%, #111 52%)`;
      else if (val > 0) lever.style.background = `linear-gradient(to right, #111 50%, #0984e3 50%, #00d2d3 ${percentage}%, #111 ${percentage}%)`;
      else lever.style.background = `linear-gradient(to right, #111 ${percentage}%, #ff4757 ${percentage}%, #d63031 50%, #111 50%)`;
    };

    if (lever) { lever.addEventListener('input', () => { updateSpeed(); const val = parseInt(lever.value, 10); send2Bytes(80, val + 100); }); }

    const toggleButtonHighlight = (key: string, isActive: boolean) => {
      let cmdList = [key];
      if (key === 'ArrowUp') cmdList =['Up', 'up']; else if (key === 'ArrowDown') cmdList = ['Down', 'down'];
      else if (key === 'ArrowLeft') cmdList = ['Left', 'left']; else if (key === 'ArrowRight') cmdList =['Right', 'right'];
      else if (key === 'PageUp' || key === '.') cmdList =['PgUp', 'pgup', 'PowerUp', 'powerup', '.'];
      else if (key === 'PageDown' || key === ',') cmdList =['PgDn', 'pgdn', 'PowerDown', 'powerdown', ','];
      
      for (const cmd of cmdList) {
        const btnEl = document.querySelector(`[data-cmd="${cmd}" i]`) as HTMLElement;
        if (btnEl) { if (isActive) btnEl.classList.add('active-sim'); else btnEl.classList.remove('active-sim'); }
      }
    };

    const mapCmdToKey = (cmd: string | null) => {
      if (!cmd) return ''; const lCmd = cmd.toLowerCase();
      if (lCmd === 'up') return 'ArrowUp'; if (lCmd === 'down') return 'ArrowDown';
      if (lCmd === 'left') return 'ArrowLeft'; if (lCmd === 'right') return 'ArrowRight';
      if (lCmd === 'pgup' || lCmd === 'powerup') return 'PageUp'; if (lCmd === 'pgdn' || lCmd === 'powerdown') return 'PageDown';
      return cmd; 
    };

    const buttons = document.querySelectorAll('[data-cmd]');
    buttons.forEach(btn => {
      const rawCmd = btn.getAttribute('data-cmd'); const key = mapCmdToKey(rawCmd);
      const onPress = (e: Event) => {
        e.preventDefault(); (btn as HTMLElement).setPointerCapture((e as PointerEvent).pointerId); 
        (btn as HTMLElement).classList.add('active-sim'); if (key) handleKeyDown(key); 
      };
      const onRelease = (e: Event) => {
        e.preventDefault();
        if((btn as HTMLElement).hasPointerCapture((e as PointerEvent).pointerId)) { (btn as HTMLElement).releasePointerCapture((e as PointerEvent).pointerId); }
        (btn as HTMLElement).classList.remove('active-sim'); if (key) handleKeyUp(key); 
      };
      btn.addEventListener('pointerdown', onPress); btn.addEventListener('pointerup', onRelease); btn.addEventListener('pointercancel', onRelease);
    });

    // ==========================================
    // 💡 8. 키보드 후킹 완벽 방지
    // ==========================================
    let isRcFocused = false; 
    rcArea.style.transition = 'opacity 0.3s ease';

    document.addEventListener('pointerdown', (e: PointerEvent) => {
      if (rcArea.style.display === 'none') {
        isRcFocused = false;
        if (activeKeys.size > 0) { activeKeys.forEach(key => handleKeyUp(key)); activeKeys.clear(); }
        return;
      }
      if (rcArea.contains(e.target as Node)) { 
        isRcFocused = true; rcArea.style.opacity = '1'; 
      } else {
        isRcFocused = false; rcArea.style.opacity = '0.6'; 
        if (activeKeys.size > 0) { activeKeys.forEach(key => { handleKeyUp(key); toggleButtonHighlight(key, false); }); activeKeys.clear(); }
      }
    }, { capture: true }); 

    window.addEventListener('blur', () => {
      isRcFocused = false; rcArea.style.opacity = '0.6'; 
      if (activeKeys.size > 0) { activeKeys.forEach(key => { handleKeyUp(key); toggleButtonHighlight(key, false); }); activeKeys.clear(); }
    });

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (rcArea.style.display === 'none' || !isRcFocused || e.repeat) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable || target.classList.contains('blocklyHtmlInput')) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      handleKeyDown(e.key); toggleButtonHighlight(e.key, true);
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (rcArea.style.display === 'none' || !isRcFocused) return;
      handleKeyUp(e.key); toggleButtonHighlight(e.key, false);
    });

    updateSpeed();
  };

  initAll();
}