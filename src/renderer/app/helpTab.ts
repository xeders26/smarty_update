/*================      
  src/renderer/app/helpTab.ts
=================*/
import * as Blockly from 'blockly';
import { HelpData } from '../help/index';
import { initTabManager } from './tabManager';
import { initRcTabUI } from './rcTab'; 

export function initHelpTabUI(workspace: Blockly.WorkspaceSvg, tabManager: ReturnType<typeof initTabManager>) {
  let isDarkMode = localStorage.getItem('smarty_theme') === 'dark';
  let currentTopTab: 'help' | 'rc' | 'cpp' = 'help'; 
  let currentFontSize = 14;

  // 🌟 [수정 1] 탭 전환 함수 (마법의 새로고침 코드 복구!)
  function switchTopTab(activeTab: 'help' | 'rc' | 'cpp') {
    currentTopTab = activeTab;
    const isDark = document.body.classList.contains('dark-mode');
    
    const bgInactive = isDark ? '#21252b' : '#e1e8ed';
    const textInactive = isDark ? '#bdc3c7' : '#7f8c8d';
    const bgActive = isDark ? '#1a252f' : '#ffffff'; 
    const textActive = '#3498db';

    const tHelp = document.getElementById('tabHelpBtn');
    const tRc = document.getElementById('tabRcBtn');
    const tCpp = document.getElementById('tabCppBtn');
    const hArea = document.getElementById('helpArea');
    const rArea = document.getElementById('rcArea');
    const cArea = document.getElementById('codeArea');
    const cToolbar = document.getElementById('codeToolbar');
    
    [tHelp, tRc, tCpp].forEach(btn => {
      if (btn) {
        btn.style.background = bgInactive;
        btn.style.color = textInactive;
        btn.style.borderTop = '2px solid transparent';
        btn.style.borderBottom = '2px solid #3498db'; 
      }
    });

    if (hArea) hArea.style.display = 'none';
    if (rArea) rArea.style.display = 'none';
    if (cArea) cArea.style.display = 'none';
    if (cToolbar) cToolbar.style.display = 'none';

    if (activeTab === 'help' && tHelp && hArea) {
      tHelp.style.background = bgActive;
      tHelp.style.color = textActive;
      tHelp.style.borderTop = '2px solid #3498db';
      tHelp.style.borderBottom = '2px solid transparent'; 
      hArea.style.display = 'block';
    } else if (activeTab === 'rc' && tRc && rArea) {
      tRc.style.background = bgActive;
      tRc.style.color = textActive;
      tRc.style.borderTop = '2px solid #3498db';
      tRc.style.borderBottom = '2px solid transparent';
      rArea.style.display = 'block'; 
      rArea.style.position = 'relative';
      rArea.style.width = '100%';
      rArea.style.height = '100%';
      rArea.style.overflow = 'hidden';
      setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 50);
    } else if (activeTab === 'cpp' && tCpp && cArea) {
      tCpp.style.background = bgActive;
      tCpp.style.color = textActive;
      tCpp.style.borderTop = '2px solid #3498db';
      tCpp.style.borderBottom = '2px solid transparent';
      
      // 🔥 [핵심 복구] 숨겨진 코드창이 화면에 확실히 글자를 다시 그리도록 채찍질하는 마법의 3줄!
      cArea.style.display = 'block';
      cArea.style.display = 'none'; 
      cArea.offsetHeight; // 브라우저 강제 렌더링 (Reflow)
      cArea.style.display = 'block';
      
      if (cToolbar) cToolbar.style.display = 'flex';
    }
  }

  // 🌟 [수정 2] 테마 적용 함수 (#codeArea 배경색 강제 덮어쓰기 제외)
  function applyTheme() {
    const themeToggle = document.getElementById('themeToggleBtn');
    
    const codeBtns =[
      document.getElementById('fontIncreaseBtn'),
      document.getElementById('fontDecreaseBtn'),
      document.getElementById('copyCodeBtn'),
      document.getElementById('saveCodeBtn')
    ];

    let rcStyle = document.getElementById('smarty-rc-theme-css');
    if (!rcStyle) {
      rcStyle = document.createElement('style');
      rcStyle.id = 'smarty-rc-theme-css';
      document.head.appendChild(rcStyle);
    }

    // 🔥 [요청사항 완벽 반영] 기존 설정에 폰트 80%, 줄간격 축소 속성을 아예 융합시켰습니다!
    const commonCSS = `
      #helpArea, #rcArea, #codeToolbar {
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        margin-top: 0 !important;
      }
      #helpArea {
        font-size: 80% !important;
        line-height: 1.3 !important;
      }
      #helpArea p, #helpArea li, #helpArea div {
        line-height: 1.3 !important;
        margin-top: 4px !important;
        margin-bottom: 4px !important;
      }
      #helpArea h1, #helpArea h2, #helpArea h3, #helpArea h4 {
        line-height: 1.2 !important;
        margin-top: 10px !important;
        margin-bottom: 6px !important;
      }
    `;

    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
      
      if (themeToggle) {
        themeToggle.innerHTML = '☀️';
        themeToggle.setAttribute('data-tooltip', '라이트 모드');
        themeToggle.style.background = '#f1c40f';
        themeToggle.style.color = 'black';
      }

      codeBtns.forEach(btn => {
        if (btn) {
          btn.style.background = '#34495e';
          btn.style.color = '#ecf0f1';
          btn.style.border = '1px solid #7f8c8d';
        }
      });

      if (rcStyle) {
        rcStyle.innerHTML = commonCSS + `
          #helpArea, #rcArea { background-color: #1a252f !important; }
        `;
      }

    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
      
      if (themeToggle) {
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('data-tooltip', '다크 모드');
        themeToggle.style.background = '#2c3e50';
        themeToggle.style.color = 'white';
      }

      codeBtns.forEach(btn => {
        if (btn) {
          btn.style.background = '#ffffff';
          btn.style.color = '#2c3e50';
          btn.style.border = '1px solid #bdc3c7';
        }
      });

      if (rcStyle) {
        rcStyle.innerHTML = commonCSS + `
          #helpArea, #rcArea { background-color: #ffffff !important; }
        `;
      }
    }
    
    setTimeout(() => {
      switchTopTab(currentTopTab);
      if (tabManager && typeof tabManager.renderTabs === 'function') tabManager.renderTabs();
    }, 50);
  }

  applyTheme();

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.closest('#tabHelpBtn')) switchTopTab('help');
    else if (target.closest('#tabRcBtn')) switchTopTab('rc');
    else if (target.closest('#tabCppBtn')) switchTopTab('cpp');
    
    else if (target.closest('#themeToggleBtn')) {
      isDarkMode = !isDarkMode;
      localStorage.setItem('smarty_theme', isDarkMode ? 'dark' : 'light');
      applyTheme();
    }
    
    else if (target.closest('#fontIncreaseBtn')) {
      const cArea = document.getElementById('codeArea');
      if (cArea) {
        if (currentFontSize < 32) currentFontSize += 2;
        cArea.style.fontSize = currentFontSize + 'px';
      }
    }
    else if (target.closest('#fontDecreaseBtn')) {
      const cArea = document.getElementById('codeArea');
      if (cArea) {
        if (currentFontSize > 8) currentFontSize -= 2;
        cArea.style.fontSize = currentFontSize + 'px';
      }
    }
    
    else if (target.closest('#copyCodeBtn')) {
      const cArea = document.getElementById('codeArea');
      if (cArea) navigator.clipboard.writeText(cArea.textContent || '').then(() => {});
    }
    else if (target.closest('#saveCodeBtn')) {
      const cArea = document.getElementById('codeArea');
      if (cArea) {
        const blob = new Blob([cArea.textContent || ''], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'SmartyProject.ino';
        a.click();
        URL.revokeObjectURL(a.href);
      }
    }
  });

  setTimeout(() => { switchTopTab('help'); }, 300);

  const saveImgBtn = document.getElementById('saveImgBtn');
  if (saveImgBtn) {
    saveImgBtn.addEventListener('click', () => {
      try {
        const svgElement = workspace.getParentSvg().cloneNode(true) as SVGElement;
        svgElement.style.backgroundColor = '#ffffff';
        const xml = new XMLSerializer().serializeToString(svgElement);
        const svg64 = btoa(unescape(encodeURIComponent(xml)));
        const image64 = 'data:image/svg+xml;base64,' + svg64;
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const a = document.createElement('a');
            a.download = 'my_blocks.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
          }
        };
        img.src = image64;
      } catch (e) {}
    });
  }

  workspace.addChangeListener((e: any) => {
    if (e.isUiEvent || e.type === Blockly.Events.FINISHED_LOADING) return;
    localStorage.setItem('smarty_autosave', JSON.stringify(Blockly.serialization.workspaces.save(workspace)));
  });

  setTimeout(() => {
    const savedData = localStorage.getItem('smarty_autosave');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData && parsedData.blocks && parsedData.blocks.blocks && parsedData.blocks.blocks.length > 0) {
          workspace.clear();
          Blockly.serialization.workspaces.load(parsedData, workspace);
        }
      } catch (err) {}
    }
  }, 500);

  // ==============================================================
  // 🚀 [수술 완료] 절대 죽지 않는 무적의 리사이징 (크기 조절) 패널 로직
  // ==============================================================
  const setupResizablePanels = () => {
    const vResizer = document.getElementById('v-resizer');
    const hResizer = document.getElementById('h-resizer');
    const rightPanelEl = document.getElementById('rightPanel');
    const codeContainerEl = document.getElementById('codeContainer');
    const serialMonitorEl = document.getElementById('serialMonitor');
    const blocklyDivEl = document.getElementById('blocklyDiv');

    window.addEventListener('resize', () => {
      if (rightPanelEl && rightPanelEl.style.display !== 'none') {
        const absoluteMaxWidth = window.innerWidth * 0.4;
        if (rightPanelEl.clientWidth > absoluteMaxWidth) {
          rightPanelEl.style.width = `${absoluteMaxWidth}px`;
          Blockly.svgResize(workspace);
        }
      }
    });

    // 1️⃣ 수직(좌우) 리사이징 로직
    if (vResizer && rightPanelEl && blocklyDivEl) {
      let isResizingV = false;
      let startX = 0;
      let startWidth = rightPanelEl.getBoundingClientRect().width; 
      const minRightWidth = 280;

      vResizer.addEventListener('mousedown', (evt) => {
        isResizingV = true;
        startX = (evt as MouseEvent).clientX;
        startWidth = rightPanelEl.getBoundingClientRect().width; 
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none'; 
        evt.preventDefault();
      });

      document.addEventListener('mousemove', (evt) => {
        if (!isResizingV) return;
        const absoluteMaxWidth = window.innerWidth * 0.4;
        const parentWidth = rightPanelEl.parentElement?.clientWidth || window.innerWidth;
        const maxRightWidth = Math.min(parentWidth - 260, absoluteMaxWidth);

        const deltaX = (evt as MouseEvent).clientX - startX;
        let newWidth = startWidth - deltaX;
        
        newWidth = Math.max(newWidth, minRightWidth);
        newWidth = Math.min(newWidth, maxRightWidth);

        rightPanelEl.style.boxSizing = 'border-box'; 
        rightPanelEl.style.width = `${newWidth}px`;
        if (blocklyDivEl) blocklyDivEl.style.flex = '1 1 auto';
        
        Blockly.svgResize(workspace);
        
        // 🌟 실시간 조종기 크기 동기화 (버벅임 방지)
        window.dispatchEvent(new Event('resize'));
      });

      const stopVResize = () => {
        if (!isResizingV) return;
        isResizingV = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = ''; 
      };
      document.addEventListener('mouseup', stopVResize);
      document.addEventListener('mouseleave', stopVResize);
    }
    
    // 2️⃣ 수평(상하) 리사이징 로직 (🔥 높이 0으로 찌그러지는 수학적 오류 완벽 해결!)
    if (hResizer && codeContainerEl && serialMonitorEl && rightPanelEl) {
      let isResizingH = false;
      let startY = 0;
      let startHeight = codeContainerEl.getBoundingClientRect().height; 
      const minPanelHeight = 120; // 🌟 이 높이 이하로는 절대 안 내려갑니다!

      hResizer.addEventListener('mousedown', (evt) => {
        isResizingH = true;
        startY = (evt as MouseEvent).clientY;
        startHeight = codeContainerEl.getBoundingClientRect().height; 
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none'; 
        evt.preventDefault();
      });

      document.addEventListener('mousemove', (evt) => {
        if (!isResizingH) return;
        const containerRect = rightPanelEl.getBoundingClientRect();
        const deltaY = (evt as MouseEvent).clientY - startY;
        const hResizerHeight = 10; // CSS에서 부여한 안전 여백 공간 적용
        
        // 🔥 치명적 버그 수정: maxAllowedHeight가 음수가 되는 것을 원천 차단!
        let maxAllowedHeight = containerRect.height - minPanelHeight - hResizerHeight;
        if (maxAllowedHeight < minPanelHeight) {
          maxAllowedHeight = minPanelHeight; // 부모 창이 작아져도 최소 공간 보장
        }
        
        let newHeight = startHeight + deltaY;
        
        // 강력한 높이 제한 방어막 (절대 0이 될 수 없음)
        if (newHeight < minPanelHeight) newHeight = minPanelHeight;
        if (newHeight > maxAllowedHeight) newHeight = maxAllowedHeight;
        
        codeContainerEl.style.boxSizing = 'border-box';
        codeContainerEl.style.height = `${newHeight}px`;
        codeContainerEl.style.flex = `0 0 ${newHeight}px`;
        serialMonitorEl.style.flex = '1 1 auto';
        
        Blockly.svgResize(workspace);
        
        // 🌟 마우스를 드래그 할 때마다 조종기 크기도 즉시 고무줄처럼 연동!
        window.dispatchEvent(new Event('resize'));
      });

      const stopHResize = () => {
        if (!isResizingH) return;
        isResizingH = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = ''; 
      };
      document.addEventListener('mouseup', stopHResize);
      document.addEventListener('mouseleave', stopHResize);
    }
  };
  setupResizablePanels();

  let currentHelpBlockType = '';
  function loadHelpForBlock(blockType: string, forceOpenTab: boolean) {
    if (currentHelpBlockType === blockType && !forceOpenTab) return;
    currentHelpBlockType = blockType;
    if (forceOpenTab) switchTopTab('help');
    const helpArea = document.getElementById('helpArea');
    if (!helpArea) return;
    const htmlContent = HelpData[blockType];
    if (htmlContent) {
      helpArea.style.padding = '15px';
      helpArea.innerHTML = htmlContent;
    } else {
      helpArea.innerHTML = `<div style="text-align:left; padding: 20px;"><h3 style="margin-top:0; color:#e74c3c;">⚠️ 도움말이 없습니다.</h3><p style="color:#bdc3c7; font-size: 14px;">블록: <b>${blockType}</b></p></div>`;
    }
  }

  workspace.addChangeListener((event: any) => {
    if (event.type === Blockly.Events.SELECTED && event.newElementId) {
      const block = workspace.getBlockById(event.newElementId);
      if (block) {
        loadHelpForBlock(block.type, true);
        const mappedColor = (window as any).__smartyBlockColors?.[block.type];
        if (mappedColor && typeof block.setColour === 'function') {
          block.setColour(mappedColor);
        }
      }
    }
  });

  const blocklyDivElement = document.getElementById('blocklyDiv');
  let lastHoveredBlockType = '';
  let hoverClearTimer: any = null;

  if (blocklyDivElement) {
    blocklyDivElement.addEventListener('mousemove', (event) => {
      const target = event.target as Element;
      const blockGroup = target.closest('.blocklyDraggable');
      
      if (blockGroup) {
        const blockId = blockGroup.getAttribute('data-id');
        if (!blockId) return;

        let hoveredBlock = workspace.getBlockById(blockId);
        if (!hoveredBlock && typeof workspace.getFlyout === 'function') {
          const flyout = workspace.getFlyout();
          if (flyout && typeof flyout.getWorkspace === 'function') {
            hoveredBlock = flyout.getWorkspace().getBlockById(blockId);
          }
        }
        if (hoveredBlock) {
          clearTimeout(hoverClearTimer); 
          if (lastHoveredBlockType !== hoveredBlock.type) {
            loadHelpForBlock(hoveredBlock.type, false);
            lastHoveredBlockType = hoveredBlock.type;
          }
        }
      } else {
        if (lastHoveredBlockType !== '') {
          clearTimeout(hoverClearTimer);
          hoverClearTimer = setTimeout(() => {
            lastHoveredBlockType = ''; 
          }, 100);
        }
      }
    });
    blocklyDivElement.addEventListener('mouseleave', () => {
      lastHoveredBlockType = '';
    });
  }
  initRcTabUI(); 
}