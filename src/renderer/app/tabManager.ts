/*================    
  src/renderer/app/tabManager.ts
=================*/
import * as Blockly from 'blockly';
import { openExampleUploadModal } from './aiExampleUploader';

export interface ProgramData {
  id: string;
  name: string;
  filePath?: string | null;
  blockState: object | null;
  serialData: string;
  helpText: string;
}

export function initTabManager(workspace: Blockly.Workspace) {
  let programs: ProgramData[] =[];
  let currentProgramId: string | null = null;
  let programCounter = 1;

  function saveCurrentTab() {
    if (currentProgramId && workspace) {
      const currentProgram = programs.find(p => p.id === currentProgramId);
      if (currentProgram) {
        currentProgram.blockState = Blockly.serialization.workspaces.save(workspace);
        const serialOutput = document.getElementById('serial-output') as HTMLTextAreaElement;
        if (serialOutput) currentProgram.serialData = serialOutput.value;
        const helpText = document.getElementById('help-text');
        if (helpText) currentProgram.helpText = helpText.innerText;
      }
    }
  }

  // 🌟 [신규 추가] 커스텀 우클릭 팝업 메뉴 생성 함수
  function showContextMenu(x: number, y: number, program: ProgramData) {
    // 혹시 이미 열려있는 메뉴가 있다면 닫기
    const existingMenu = document.getElementById('smarty-tab-context-menu');
    if (existingMenu) existingMenu.remove();

    const isDark = document.body.classList.contains('dark-mode');
    
    // 메뉴 생성
    const menu = document.createElement('div');
    menu.id = 'smarty-tab-context-menu';
    menu.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      background: ${isDark ? '#2c313a' : '#ffffff'};
      border: 1px solid ${isDark ? '#1a252f' : '#bdc3c7'};
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border-radius: 6px;
      padding: 5px 0;
      z-index: 999999;
      min-width: 160px;
      font-family: 'Pretendard', sans-serif;
    `;

    // 메뉴 아이템 생성
    const menuItem = document.createElement('div');
    menuItem.innerHTML = '🚀 예제로 배포하기 (AI)';
    menuItem.style.cssText = `
      padding: 10px 15px;
      font-size: 13px;
      color: ${isDark ? '#e5c07b' : '#d35400'};
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    `;

    // 호버 효과
    menuItem.onmouseenter = () => { menuItem.style.background = isDark ? '#3e4451' : '#f0f3f4'; };
    menuItem.onmouseleave = () => { menuItem.style.background = 'transparent'; };

    // 클릭 시 실행 로직
    menuItem.onclick = () => {
      menu.remove(); // 메뉴 닫기
      if (currentProgramId !== program.id) {
        switchTab(program.id);
      }
      openExampleUploadModal(workspace as Blockly.WorkspaceSvg, program.name);
    };

    menu.appendChild(menuItem);
    document.body.appendChild(menu);

    // 바탕화면 아무 곳이나 클릭하면 메뉴가 닫히도록 이벤트 추가
    const closeMenu = () => {
      menu.remove();
      document.removeEventListener('click', closeMenu);
    };
    
    // setTimeout을 주지 않으면, 지금 클릭한 우클릭 이벤트 때문에 바로 닫혀버림
    setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 10);
  }

  function renderTabs() {
    const tabListDiv = document.getElementById('tab-list');
    if (!tabListDiv) return;
    
    const isDark = document.body.classList.contains('dark-mode');
    
    tabListDiv.style.cssText = `
      display: flex;
      background: ${isDark ? '#21252b' : '#ecf0f1'};
      border-bottom: 1px solid ${isDark ? '#1a252f' : '#bdc3c7'};
      padding-top: 5px;
      padding-left: 5px;
    `;
    tabListDiv.innerHTML = '';

    programs.forEach((program, index) => {
      const isActive = program.id === currentProgramId;
      
      const btn = document.createElement('div');
      btn.className = `tab-btn ${isActive ? 'active' : ''}`;
      
      const bgActive = isDark ? '#1a252f' : '#ffffff';
      const bgInactive = isDark ? '#21252b' : '#e1e8ed';
      const hoverInactive = isDark ? '#2c313a' : '#d5dbdb';
      const textColor = isDark ? '#bdc3c7' : '#7f8c8d';
      const borderColor = isDark ? '#1a252f' : '#bdc3c7';

      btn.style.cssText = `
        padding: 8px 15px;
        cursor: pointer;
        background: ${isActive ? bgActive : bgInactive};
        color: ${isActive ? '#3498db' : textColor};
        border-top: ${isActive ? '2px solid #3498db' : '2px solid transparent'};
        border-right: 1px solid ${borderColor};
        font-size: 13px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 4px 4px 0 0;
        transition: background 0.2s;
      `;

      const titleSpan = document.createElement('span');
      titleSpan.innerText = program.name;

      const closeBtn = document.createElement('span');
      closeBtn.className = 'close-tab-btn';
      closeBtn.innerText = '✖';
      
      closeBtn.style.cssText = `
        cursor: pointer;
        color: ${isActive ? '#e74c3c' : textColor};
        font-size: 11px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s;
      `;

      btn.onmouseenter = () => { if (!isActive) btn.style.background = hoverInactive; };
      btn.onmouseleave = () => { if (!isActive) btn.style.background = bgInactive; };
      closeBtn.onmouseenter = () => { closeBtn.style.background = 'rgba(231, 76, 60, 0.2)'; };
      closeBtn.onmouseleave = () => { closeBtn.style.background = 'transparent'; };

      // [왼쪽 클릭] 탭 전환
      btn.onclick = () => switchTab(program.id);
      
      // 🌟 [수정됨: 오른쪽 클릭] 커스텀 팝업 메뉴 띄우기
      btn.oncontextmenu = (e) => {
        e.preventDefault(); 
        showContextMenu(e.pageX, e.pageY, program);
      };

      closeBtn.onclick = (event) => {
        event.stopPropagation();
        if (programs.length <= 1) {
          alert('최소 1개의 프로그램 탭은 열려 있어야 합니다!');
          return;
        }
        if (!confirm(`'${program.name}'을(를) 닫으시겠습니까?\n저장하지 않은 내용은 사라집니다.`)) {
          return;
        }
        programs.splice(index, 1);
        if (currentProgramId === program.id) {
          const nextTabId = programs[index] ? programs[index].id : programs[index - 1].id;
          currentProgramId = null;
          switchTab(nextTabId);
        } else {
          renderTabs();
        }
      };
      
      btn.appendChild(titleSpan);
      btn.appendChild(closeBtn);
      tabListDiv.appendChild(btn);
    });
  }

  function switchTab(targetId: string) {
    if (currentProgramId === targetId) return;
    saveCurrentTab();
    workspace.clear();
    currentProgramId = targetId;
    const targetProgram = programs.find(p => p.id === targetId);
    if (targetProgram) {
      if (targetProgram.blockState) {
        Blockly.serialization.workspaces.load(targetProgram.blockState, workspace);
      } else {
        const xml = '<xml><block type="arduino_main" deletable="false" x="50" y="50"> <statement name="SETUP"> <block type="smarty_begin"></block> </statement></block></xml>';
        Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
      }
      const serialOutput = document.getElementById('serial-output') as HTMLTextAreaElement;
      if (serialOutput) serialOutput.value = targetProgram.serialData || '';
      const helpText = document.getElementById('help-text');
      if (helpText) helpText.innerText = targetProgram.helpText || '여기에 도움말이 표시됩니다.';
    }
    renderTabs();
  }

  function createNewProgram() {
    const newId = `tab_${Date.now()}`;
    const newName = `프로그램 ${programCounter++}`;
    programs.push({ id: newId, name: newName, filePath: null, blockState: null, serialData: '', helpText: '여기에 도움말이 표시됩니다.' });
    switchTab(newId);
  }

  function getCurrentProgram() {
    return programs.find(p => p.id === currentProgramId) || null;
  }

  function getPrograms() {
    return programs;
  }

  function getCurrentProgramId() {
    return currentProgramId;
  }

  return {
    createNewProgram,
    switchTab,
    renderTabs,
    saveCurrentTab,
    getCurrentProgram,
    getPrograms,
    getCurrentProgramId
  };
}