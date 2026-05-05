/*================  
  src/renderer/app/main.ts
=================*/
import * as Blockly from 'blockly';

import { loadAllBlocklyModules, arduinoGenerator, getSafeVarName, smartyTheme } from './blocklySetup';

import { installBlocklyDialogs, showCuteModal } from '../ui/modal';
import { getMergedToolbox, initCategorySidebar } from './toolbox';
import { initTabManager } from './tabManager';
import { initSerialMonitor } from './serialAndBoard';
import { initBoardControl } from './boardControl';
import { initAppUI, initMascotAnimation } from './appUI';
import { initFileOperations } from './fileOperations';
import { initStudyRoomBoard } from './studyRoomBoard';
import { initHelpTabUI } from './helpTab';
import { initMinimap } from './miniMap'; 
import { initRcTabUI } from './rcTab';

import '@blockly/block-plus-minus';

export function toggleLoadingModal(show: boolean) {
  let overlay = document.getElementById('smarty-upload-loading-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'smarty-upload-loading-overlay';
    
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.75);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      z-index: 999999; color: white; font-family: 'Noto Sans KR', sans-serif;
      opacity: 0; visibility: hidden; transition: opacity 0.3s ease;
    `;

    overlay.innerHTML = `
      <style>
        .smarty-spinner {
          width: 70px; height: 70px;
          border: 7px solid rgba(255, 255, 255, 0.2);
          border-top-color: #FFEB3B;
          border-radius: 50%;
          animation: smarty-spin 1s linear infinite;
          margin-bottom: 25px;
        }
        @keyframes smarty-spin { to { transform: rotate(360deg); } }
      </style>
      <div class="smarty-spinner"></div>
      <div style="font-size: 26px; font-weight: 800; margin-bottom: 12px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">🚀 스마티 로봇으로 전송 중...</div>
      <div style="font-size: 16px; color: #E0E0E0;">블록 코드를 번역하고 있습니다. 잠시만 기다려주세요!</div>
      <div style="font-size: 13px; color: #9E9E9E; margin-top: 8px;">(최초 환경 설정 시 인터넷 속도에 따라 1~2분 소요될 수 있습니다)</div>
    `;
    document.body.appendChild(overlay);
  }

  if (show) {
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
  } else {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
  }
}

(window as any).toggleLoading = toggleLoadingModal;

if (!(window as any).__flyoutCorePatched) {
  if (Blockly.VerticalFlyout && Blockly.VerticalFlyout.prototype) {
    const FlyoutProto = Blockly.VerticalFlyout.prototype as any; 

    FlyoutProto.getFlyoutScale = function() { return 0.8; };
    FlyoutProto.getWidth = function() { return 215; };

    const origReflow = FlyoutProto.reflowInternal_;
    if (origReflow) {
      FlyoutProto.reflowInternal_ = function() {
        origReflow.call(this);
        (this as any).width_ = 215; 
      };
    }

    const origPosition = FlyoutProto.position;
    if (origPosition) {
      FlyoutProto.position = function() {
        origPosition.call(this); 
        const _this = this as any; 
        _this.width_ = 215;

        if (_this.svgBackground_) {
          _this.svgBackground_.setAttribute('width', '200');
          _this.svgBackground_.setAttribute('x', '0'); 
        }

        if (_this.svgGroup_) {
          const transform = _this.svgGroup_.getAttribute('transform') || '';
          _this.svgGroup_.setAttribute('transform', transform.replace(/translate\([^,]+,/, 'translate(0,'));
          if (!_this.rightBorderLine_) {
            _this.rightBorderLine_ = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            _this.rightBorderLine_.setAttribute('class', 'smarty-flyout-border');
            
            if (_this.svgBackground_ && _this.svgBackground_.nextSibling) {
              _this.svgGroup_.insertBefore(_this.rightBorderLine_, _this.svgBackground_.nextSibling);
            } else {
              _this.svgGroup_.appendChild(_this.rightBorderLine_);
            }
          }
          _this.rightBorderLine_.setAttribute('x1', '200');
          _this.rightBorderLine_.setAttribute('x2', '200');
          _this.rightBorderLine_.setAttribute('y1', '0');
          _this.rightBorderLine_.setAttribute('y2', '5000'); 
        }

        if (_this.scrollbar && _this.scrollbar.svgGroup_ && _this.scrollbar.position_) {
          const currentY = _this.scrollbar.position_.y || 0;
          _this.scrollbar.position_.x = 185; 
          _this.scrollbar.svgGroup_.setAttribute('transform', `translate(185, ${currentY})`);
        }
        if (_this.clipRect_) {
          _this.clipRect_.setAttribute('width', '200');
        }
      };
    }
  }
  (window as any).__flyoutCorePatched = true;
}

window.addEventListener('DOMContentLoaded', async () => {
  Blockly.Msg['MATH_RANDOM_INT_TITLE'] = '🎲 %1 부터 %2 사이의 무작위 수 (랜덤)';
  Blockly.Msg['CONTROLS_REPEAT_TITLE'] = '🔁 %1 번 반복하기';
  Blockly.Msg['LOGIC_BOOLEAN_TRUE'] = '참 (맞음)';
  Blockly.Msg['LOGIC_BOOLEAN_FALSE'] = '거짓 (틀림)';

  installBlocklyDialogs();
  await loadAllBlocklyModules();

  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: { kind: 'flyoutToolbox', contents:[] },
    trashcan: true,
    scrollbars: true,
    theme: smartyTheme,
    renderer: 'zelos',
    toolboxPosition: 'start',
    horizontalLayout: false,
    disable: true,   
    collapse: true,  
    zoom: { controls: true, wheel: true, startScale: 0.85, maxScale: 2.5, minScale: 0.4, scaleSpeed: 1.01 }
  });

  const emptyTrashOption = {
    id: 'empty_trashcan_custom',
    weight: 100, 
    scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
    displayText: '🗑️ 휴지통 비우기',
    preconditionFn: function(scope: any) {
      if (scope.workspace && !scope.block) {
        const wsSvg = scope.workspace as Blockly.WorkspaceSvg;
        const trashcan = wsSvg.trashcan as any; 
        if (trashcan && trashcan.contents_ && trashcan.contents_.length > 0) {
          return 'enabled';
        }
        return 'disabled'; 
      }
      return 'hidden';
    },
    callback: function(scope: any) {
      const wsSvg = scope.workspace as Blockly.WorkspaceSvg;
      if (wsSvg && wsSvg.trashcan) {
        const trashcan = wsSvg.trashcan as any;
        trashcan.contents_ = [];
        if (typeof trashcan.emptyContents === 'function') trashcan.emptyContents();
        if (trashcan.flyout_ && typeof trashcan.flyout_.hide === 'function') trashcan.flyout_.hide();
      }
    }
  };
  
  if (Blockly.ContextMenuRegistry.registry.getItem('empty_trashcan_custom')) {
    Blockly.ContextMenuRegistry.registry.unregister('empty_trashcan_custom');
  }
  Blockly.ContextMenuRegistry.registry.register(emptyTrashOption);

  workspace.registerToolboxCategoryCallback(
    'PROCEDURE',
    (ws: Blockly.WorkspaceSvg) => {
      return Blockly.Procedures.flyoutCategory(ws, false) as any;
    }
  );

  initCategorySidebar(workspace);

  const tabManager = initTabManager(workspace);
  initSerialMonitor();
  initBoardControl();
  initAppUI(workspace);
  initFileOperations(workspace, tabManager);
  
  initHelpTabUI(workspace, tabManager); 
  initRcTabUI();
  initMinimap(workspace);
  initMascotAnimation(workspace);

  const stopBtn = document.getElementById('stopBtn');
  if (stopBtn) {
    stopBtn.addEventListener('click', async () => {
      stopBtn.style.opacity = '0.5';
      setTimeout(() => { stopBtn.style.opacity = '1'; }, 150);

      const emptyStopCode = `#include <smartyLib.h>\n\nvoid setup() {\n   beginSmarty();\n}\n\nvoid loop() {}`;

      try {
        const wAny = window as any;
        if (wAny.electron && wAny.electron.ipcRenderer) {
          const boardSelect = document.getElementById('boardSelect') as HTMLSelectElement;
          const portInput = document.getElementById('portInput') as HTMLInputElement;
          const fqbn = boardSelect ? boardSelect.value : "arduino:avr:uno";
          const port = portInput ? portInput.value : "";
          
          if (port === "대기 중" || port === "") {
             showCuteModal('alert', '🔌 보드가 연결되지 않았습니다!', '포트를 먼저 확인해주세요.', () => {});
             return;
          }
          const statusSpan = document.getElementById('header-status');
          if (statusSpan) statusSpan.textContent = '🛑 정지 명령 전송 중...';

          if (wAny.toggleLoading) wAny.toggleLoading(true);

          wAny.electron.ipcRenderer.invoke('upload-code', emptyStopCode, fqbn, port)
          .then((res: string) => {
            if (wAny.toggleLoading) wAny.toggleLoading(false);
            if (statusSpan) statusSpan.textContent = (res && res.includes('❌')) ? '❌ 정지 실패!' : '✅ 스마티 정지 완료!';
          }).catch((err: any) => {
            if (wAny.toggleLoading) wAny.toggleLoading(false);
            if (statusSpan) statusSpan.textContent = '❌ 정지 통신 오류!';
          });
        }
      } catch (error) {}
    });
  }
  
  initStudyRoomBoard(workspace, tabManager.createNewProgram, (item: any) => {
    try {
      tabManager.createNewProgram();
      workspace.clear();
      
      // 🚨 [새프로그램 버그 완벽 차단 2] 예제 열기 전 강제로 휴지통 소각!
      const wsSvg = workspace as any;
      if (wsSvg.trashcan) {
        wsSvg.trashcan.contents_ = [];
        if (typeof wsSvg.trashcan.emptyContents === 'function') wsSvg.trashcan.emptyContents();
      }

      if (item.ext === 'json') {
        Blockly.serialization.workspaces.load(JSON.parse(item.code), workspace);
      } else {
        Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(item.code), workspace);
      }
      
      const currentProgram = tabManager.getCurrentProgram();
      if (currentProgram) {
        currentProgram.name = `💡 ${item.name}`;
        (currentProgram as any).filePath = null;
        tabManager.renderTabs();
      }
    } catch (err) {
      showCuteModal('alert', '⚠️ 자료실 파일 오류', '', () => {});
    }
  });

  let themeUpdateQueued = false;

  function updateCode(event: any) {
    if (event.type === Blockly.Events.BLOCK_CREATE || 
        event.type === Blockly.Events.FINISHED_LOADING || 
        event.type === (Blockly.Events as any).UNDO) { 
      
      if (!themeUpdateQueued) {
        themeUpdateQueued = true;
        Promise.resolve().then(() => {
          const customColors = (window as any).__smartyBlockColors || (window as any).__blockColorMap;
          if (customColors) {
            workspace.getAllBlocks(false).forEach(block => {
              if (!block.isShadow() && customColors[block.type] && typeof block.setColour === 'function') {
                block.setColour(customColors[block.type]);
              }
            });
          }
          
          themeUpdateQueued = false;
        });
      }
    }

    if (event.isUiEvent || event.type == Blockly.Events.UI) return;
    try {
      (arduinoGenerator as any).init(workspace);
      const topBlocks = workspace.getTopBlocks(true);
      let setupCode = '';
      let loopCode = '';
      let functionCode = '';
      
      topBlocks.forEach(block => {
        if (block.type === 'arduino_main') {
          setupCode = arduinoGenerator.statementToCode(block, 'SETUP');
          loopCode = arduinoGenerator.statementToCode(block, 'LOOP');
        } else if (block.type.startsWith('procedures_def')) {
          functionCode += arduinoGenerator.blockToCode(block) + '\n';
        }
      });
      
      const rawCode = `${functionCode}void setup() {\n  ${setupCode}}\n\nvoid loop() {\n${loopCode}}\n`;      
      const codeArea = document.getElementById('codeArea');
      if (codeArea) codeArea.textContent = (arduinoGenerator as any).finish(rawCode);
    } catch (e) {
      console.error(e);
    }
  }

  workspace.addChangeListener(updateCode);
  tabManager.createNewProgram();
});