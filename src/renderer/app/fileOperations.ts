/*================
src/renderer/app/fileOperations.ts
===============*/
import * as Blockly from 'blockly';
import type { initTabManager } from './tabManager';

export function initFileOperations(workspace: any, tabManager: ReturnType<typeof initTabManager>) {
  const newFileBtn = document.getElementById('newFileBtn');
  const saveBtn = document.getElementById('saveBtn');
  const saveAsBtn = document.getElementById('saveAsBtn');
  const loadBtn = document.getElementById('loadBtn');

  function getWorkspaceData() {
    return JSON.stringify(Blockly.serialization.workspaces.save(workspace), null, 2);
  }

  // 🌟 [핵심 추가] 화면이 초기화될 때 휴지통과 되돌리기(Ctrl+Z) 기록을 완벽히 비워주는 함수
  
  function cleanUpTrashAndUndo() {
    setTimeout(() => {
      if (workspace.trashcan && typeof workspace.trashcan.emptyContents === 'function') {
        workspace.trashcan.emptyContents(); // 휴지통 비우기
      }
      workspace.clearUndo(); // 되돌리기 기록 지우기
    }, 150); // 블록이 도화지에 완전히 세팅될 때까지 0.15초 기다린 후 싹 비웁니다.
  }
  

  if (newFileBtn) {
    newFileBtn.onclick = () => {
      tabManager.createNewProgram();
    };
  }

  if (loadBtn) {
    loadBtn.onclick = async () => {
      if (window.api) {
        const result = await window.api.openFile();
        if (!result.canceled && result.filePaths && result.data) {
          tabManager.createNewProgram();
          
          workspace.clear(); // ⚠️ 이때 기존 블록들이 휴지통으로 빨려 들어갑니다.
          Blockly.serialization.workspaces.load(JSON.parse(result.data), workspace);
          
          const loadedFilePath = result.filePaths[0];
          const parts = loadedFilePath.split(/[/\\]/);
          const loadedFileName = parts.pop() || '불러온 프로그램';
          const currentProgram = tabManager.getCurrentProgram();
          if (currentProgram) {
            currentProgram.name = loadedFileName.replace('.json', '');
            (currentProgram as any).filePath = loadedFilePath;
            tabManager.renderTabs();
          }

          // 👉 파일 불러오기가 끝난 직후 휴지통 비우기 실행!
          cleanUpTrashAndUndo();
        }
      }
    };
  }

  async function executeSave() {
    const currentProgram = tabManager.getCurrentProgram();
    if (!currentProgram) return;
    const savedFilePath = (currentProgram as any).filePath;
    if (window.api && savedFilePath) {
      const data = getWorkspaceData();
      const success = await window.api.saveFile(savedFilePath, data);
      if (success) {
        const parts = savedFilePath.split(/[/\\]/);
        const fileName = parts.pop() || '알 수 없는 파일';
        currentProgram.name = fileName.replace('.json', '');
        tabManager.renderTabs();
      }
      return;
    }
    await executeSaveAs();
  }

  async function executeSaveAs() {
    const currentProgram = tabManager.getCurrentProgram();
    if (!currentProgram) return;
    if (window.api) {
      const data = getWorkspaceData();
      const result = await window.api.saveFileAs(data);
      if (!result.canceled && result.filePath) {
        const newFilePath = result.filePath;
        const parts = newFilePath.split(/[/\\]/);
        const fileName = parts.pop() || '알 수 없는 파일';
        (currentProgram as any).filePath = newFilePath;
        currentProgram.name = fileName.replace('.json', '');
        tabManager.renderTabs();
      }
    }
  }

  if (saveBtn) saveBtn.onclick = executeSave;
  if (saveAsBtn) saveAsBtn.onclick = executeSaveAs;

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      executeSave();
    }
  });
}