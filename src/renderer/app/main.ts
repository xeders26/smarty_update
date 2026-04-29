/*================  
  src/renderer/app/main.ts
=================*/
import * as Blockly from 'blockly';

import { initSmartyBlocks } from '../blockly/smartyBlocks';
import { installBlocklyDialogs, showCuteModal } from '../ui/modal';
import { arduinoGenerator, getSafeVarName, smartyTheme } from './blocklySetup';
import { getMergedToolbox, initCategorySidebar } from './toolbox';
import { initTabManager } from './tabManager';
import { initSerialMonitor } from './serialAndBoard';
import { initBoardControl } from './boardControl';
import { initAppUI, initMascotAnimation } from './appUI';
import { initFileOperations } from './fileOperations';
import { initExplorer } from './explorer';
// ✅ 대장님의 새로운 기능 모듈 유지!
import { initHelpTabUI } from './helpTab';
import { initMinimap } from './miniMap'; 
import { initRcTabUI } from './rcTab';

import '@blockly/block-plus-minus';

// =========================================================================
// 🚨 [새로 추가됨!!] 전역 로딩 스피너(마법의 로딩 창) 함수
// =========================================================================
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

// 🌟 다른 파일(ex. boardControl.ts)에서도 쉽게 꺼내 쓸 수 있도록 윈도우 객체에 등록!
(window as any).toggleLoading = toggleLoadingModal;
// =========================================================================

// =========================================================================
// 🚨[코어 엔진 해킹 - TS 에러 방어 버전]
// =========================================================================
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
                    // 🚨 [여기에 새로 추가!!] 블록 목록 가장 오른쪽에 경계선(가위선) 긋기
          if (!_this.rightBorderLine_) {
            _this.rightBorderLine_ = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            _this.rightBorderLine_.setAttribute('class', 'smarty-flyout-border');
            
            // 선이 블록들을 가리지 않도록, 배경 바로 위에만 살짝 얹어줍니다!
            if (_this.svgBackground_ && _this.svgBackground_.nextSibling) {
              _this.svgGroup_.insertBefore(_this.rightBorderLine_, _this.svgBackground_.nextSibling);
            } else {
              _this.svgGroup_.appendChild(_this.rightBorderLine_);
            }
          }
          // 200px 위치에 위에서 아래로 쫙 뻗은 선을 설정합니다.
          _this.rightBorderLine_.setAttribute('x1', '200');
          _this.rightBorderLine_.setAttribute('x2', '200');
          _this.rightBorderLine_.setAttribute('y1', '0');
          _this.rightBorderLine_.setAttribute('y2', '5000'); // 아래까지 닿도록 넉넉하게 설정
        
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

window.addEventListener('DOMContentLoaded', () => {
  Blockly.Msg['MATH_RANDOM_INT_TITLE'] = '🎲 %1 부터 %2 사이의 무작위 수 (랜덤)';
  Blockly.Msg['CONTROLS_REPEAT_TITLE'] = '🔁 %1 번 반복하기';
  Blockly.Msg['LOGIC_BOOLEAN_TRUE'] = '참 (맞음)';
  Blockly.Msg['LOGIC_BOOLEAN_FALSE'] = '거짓 (틀림)';

  installBlocklyDialogs();
  initSmartyBlocks(arduinoGenerator);

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

  workspace.registerToolboxCategoryCallback(
    'PROCEDURE',
    (ws: Blockly.WorkspaceSvg) => {
      // 강제로 2번째 인자(false)를 넣어서 타입스크립트의 입을 막아버립니다!
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

  // =========================================================================
  // 🚨 [업데이트] 정지 버튼에도 짧은 로딩 스피너 적용!
  // =========================================================================
  const stopBtn = document.getElementById('stopBtn');
  if (stopBtn) {
    stopBtn.addEventListener('click', async () => {
      stopBtn.style.opacity = '0.5';
      setTimeout(() => { stopBtn.style.opacity = '1'; }, 150);

      const emptyStopCode = `#include <smartyLib.h>\n\nvoid setup() {\n   beginSmarty();\n   waitSW(SW1);\n}\n\nvoid loop() {}`;

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

          // 🌟 로딩 시작! (정지 명령도 통신 시간이 걸리므로 화면을 막아줍니다)
          if (wAny.toggleLoading) wAny.toggleLoading(true);

          wAny.electron.ipcRenderer.invoke('upload-code', emptyStopCode, fqbn, port)
          .then((res: string) => {
            // 🌟 로딩 끝!
            if (wAny.toggleLoading) wAny.toggleLoading(false);
            if (statusSpan) statusSpan.textContent = (res && res.includes('❌')) ? '❌ 정지 실패!' : '✅ 스마티 정지 완료!';
          }).catch((err: any) => {
            // 🌟 에러 나도 로딩 끄기!
            if (wAny.toggleLoading) wAny.toggleLoading(false);
            if (statusSpan) statusSpan.textContent = '❌ 정지 통신 오류!';
          });
        }
      } catch (error) {}
    });
  }
  
  initExplorer(workspace, tabManager.createNewProgram, (item: any) => {
    try {
      tabManager.createNewProgram();
      workspace.clear();
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
      showCuteModal('alert', '⚠️ 예제 파일 오류', '', () => {});
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
          const currentTheme = workspace.getTheme();
          workspace.setTheme(currentTheme);

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
      
      const allVars = workspace.getVariableMap().getAllVariables();
      let varDeclarations = '';
      if (allVars.length > 0) {
        varDeclarations = '// 📦 변수 선언\n';
        allVars.forEach(v => {
          varDeclarations += `double ${getSafeVarName((v as any).name)} = 0;\n`;
        });
        varDeclarations += '\n';
      }
      
      const rawCode = `${varDeclarations}${functionCode}void setup() {\n  ${setupCode}}\n\nvoid loop() {\n${loopCode}}\n`;
      const codeArea = document.getElementById('codeArea');
      if (codeArea) codeArea.textContent = (arduinoGenerator as any).finish(rawCode);
    } catch (e) {
      console.error(e);
    }
  }

  workspace.addChangeListener(updateCode);
  tabManager.createNewProgram();
});