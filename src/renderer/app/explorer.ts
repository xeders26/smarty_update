/*================
src/renderer/app/explorer.ts
===============*/ 
import * as Blockly from 'blockly';

export async function initExplorer(
  workspace: Blockly.WorkspaceSvg,
  createNewProgramCb: () => void,
  loadFileCb: (item: any) => void
) {
  let examplesData: any[] = [];
  let activeSelections: any[] = [];

  // 1. 스크롤바 디자인 적용
  if (!document.getElementById('explorer-scrollbar-style')) {
    const style = document.createElement('style');
    style.id = 'explorer-scrollbar-style';
    style.innerHTML = `
      .explorer-col::-webkit-scrollbar { width: 8px; }
      .explorer-col::-webkit-scrollbar-thumb { background: #4cc71a; border-radius: 4px; }
      .explorer-col::-webkit-scrollbar-track { background: transparent; }
    `;
    document.head.appendChild(style);
  }

  // 2. 예제 데이터 로딩
  try {
    if ((window as any).api && (window as any).api.getExamplesTree) {
      examplesData = await (window as any).api.getExamplesTree();
    }
  } catch (e) {
    console.error("❌ 예제 불러오기 실패:", e);
  }

  // 3. 팝업창 컨테이너 가져오기
  const explorerContainer = document.getElementById('my-custom-explorer');
  if (!explorerContainer) {
    console.error("❌ my-custom-explorer 창을 찾을 수 없습니다!");
    return;
  }

  // 🌟 부드러운 가로 확장 애니메이션 및 최대 크기 방어 적용
  explorerContainer.style.transition = 'width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
  explorerContainer.style.maxWidth = '90vw'; 

  // 4. 창 닫기 함수
  const closeExplorerWindow = () => {
    if (explorerContainer.style.display === 'none') return;
    explorerContainer.style.display = 'none';
    activeSelections = [];
    if (workspace && typeof workspace.getToolbox === 'function') {
      const tb = workspace.getToolbox();
      if (tb && typeof tb.clearSelection === 'function') tb.clearSelection();
    }
  };
  (window as any).closeExplorerWindow = closeExplorerWindow;

  // 🚨 [강력한 마법 적용] 도화지(배경), 블록 클릭 시 예제 창 닫기!
  // Blockly가 이벤트를 훔쳐가지 못하도록 pointerdown, touchstart 모두 캡처링으로 방어합니다.
  const handleOutsideClick = (e: Event) => {
    if (explorerContainer.style.display === 'none') return;
    
    const target = e.target as Element;
    // target 요소가 Element가 아니거나(SVG 하위 속성 등) closest 함수가 없으면 무시
    if (!target || typeof target.closest !== 'function') return; 

    // 1. 예제 창 내부나 도움말 창을 클릭한 경우는 안 닫힘
    if (target.closest('.explorer-col') || target.closest('#helpPanel')) return;
    
    // 2. 블록 도구함(카테고리 툴박스) 클릭 시 안 닫힘 (예제 열기 버튼과 충돌 방지)
    if (target.closest('.blocklyToolboxDiv') || target.closest('#category-sidebar') || target.closest('.category-sidebar')) return;

    // 3. 그 외의 모든 곳(캔버스, 블록, 빈 공간)을 클릭하면 닫아버림!
    closeExplorerWindow();
  };

  // true(캡처링 단계)로 설정하여 가장 먼저 이벤트를 가져옵니다!
  document.addEventListener('pointerdown', handleOutsideClick, true);
  document.addEventListener('mousedown', handleOutsideClick, true);
  document.addEventListener('touchstart', handleOutsideClick, true);

  // 5. 헬프(도움말) 패널 업데이트
  function updateHelpPanel(item: any) {
    const hp = document.getElementById('helpPanel');
    if (!hp) return;
    if (item.type === 'file') {
      hp.innerHTML = `
        <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 700; font-size: 24px; color: #4cc71a; margin-bottom: 15px; border-bottom: 1px solid #3c3c3c; padding-bottom: 10px; pointer-events: none;">
          📝 ${item.name} 예제
        </div>
        <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500; color: #d4d4d4; line-height: 1.6; white-space: pre-wrap; font-size: 16px; pointer-events: none;">${item.help || '저장된 설명이 없습니다.'}</div>
      `;
    } else {
      hp.innerHTML = `
        <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 700; font-size: 24px; color: #4cc71a; margin-bottom: 15px; border-bottom: 1px solid #3c3c3c; padding-bottom: 10px; pointer-events: none;">
          📁 ${item.name} 폴더
        </div>
        <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500; color: #aaaaaa; line-height: 1.6; font-size: 16px; pointer-events: none;">
          이 폴더 안에는 다양한 하위 예제들이 들어있습니다.<br>클릭해서 내용물을 확인해 보세요!
        </div>
      `;
    }
  }

  // 6. 칼럼 및 화면 렌더링
  function renderColumns() {
    if (explorerContainer!.style.display !== 'flex') {
      explorerContainer!.style.display = 'flex';
    }

    let helpPanel = document.getElementById('helpPanel');
    if (!helpPanel) {
      helpPanel = document.createElement('div');
      helpPanel.id = 'helpPanel';
      helpPanel.style.cssText = `
        flex-grow: 1; min-width: 480px; height: 100%; background: rgba(20, 20, 20, 0.4); padding: 30px; box-sizing: border-box;
        border-left: 1px solid #3c3c3c; color: #d4d4d4; font-size: 16px; overflow-y: auto; cursor: default;
      `;
      helpPanel.innerHTML = `
        <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500; color: #666; text-align: center; margin-top: 80px; pointer-events: none;">
          <div style="font-size: 40px; margin-bottom: 20px;">💡</div>
          <div style="font-size: 20px; font-weight: 600; color: #888;">폴더나 예제 파일에 마우스를 올리면<br>이곳에 상세 설명이 표시됩니다.</div><br>
        </div>
      `;
      helpPanel.addEventListener('wheel', (e) => e.stopPropagation());
      explorerContainer!.appendChild(helpPanel);
    }

    let neededCols: any[] = [];
    let tempDir = examplesData;
    let tempDepth = 0;
    
    while (true) {
      neededCols.push({ depth: tempDepth, data: tempDir });
      if (activeSelections[tempDepth] && activeSelections[tempDepth].type === 'folder') {
        tempDir = activeSelections[tempDepth].children || [];
        tempDepth++;
      } else {
        break;
      }
    }

    const newWidth = (neededCols.length * 220) + 480;
    explorerContainer!.style.width = `${newWidth}px`;

    Array.from(explorerContainer!.querySelectorAll('.explorer-col')).forEach((col: any) => {
      if (parseInt(col.dataset.depth) >= neededCols.length) col.remove();
    });

    neededCols.forEach((colInfo) => {
      const idx = colInfo.depth;
      const dirData = colInfo.data;

      let col = explorerContainer!.querySelector(`.explorer-col[data-depth="${idx}"]`) as any;
      let needsRebuild = false;

      if (!col) {
        needsRebuild = true;
        col = document.createElement('div');
        col.className = 'explorer-col';
        col.dataset.depth = idx.toString();
        col.style.cssText = `
          width: 220px; height: 100%; background: transparent; border-right: 1px solid #3c3c3c;
          overflow-y: auto; padding: 10px; box-sizing: border-box; flex-shrink: 0;
        `;
        col.addEventListener('mousedown', (e) => e.stopPropagation());
        col.addEventListener('pointerdown', (e) => e.stopPropagation()); // 예제 목록 안쪽 클릭 시 닫히지 않도록 이벤트 보호!
        col.addEventListener('wheel', (e) => e.stopPropagation());
        explorerContainer!.insertBefore(col, document.getElementById('helpPanel'));
      } else if (col.currentData !== dirData) {
        needsRebuild = true;
      }

      if (needsRebuild) {
        col.innerHTML = '';
        col.currentData = dirData;

        dirData.forEach((item: any) => {
          const btn = document.createElement('div');
          const isFolder = item.type === 'folder';
          btn.innerHTML = (isFolder ? '📁 ' : '📝 ') + item.name + (isFolder ? '<span style="float:right; color:#aaaaaa;">▶</span>' : '');
          (btn as any).itemData = item;

          btn.style.cssText = `
            padding: 12px; margin-bottom: 6px; cursor: pointer; border-radius: 6px;
            border: 1px solid transparent; background: transparent; color: #d4d4d4;
            font-family: 'Pretendard Variable', Pretendard, sans-serif; font-size: 15px; font-weight: 500;
            transition: all 0.2s; user-select: none;
          `;

          btn.onmouseenter = () => {
            if (activeSelections[idx] !== item) btn.style.background = 'rgba(255,255,255,0.1)';
            updateHelpPanel(item);
            if (isFolder && activeSelections[idx] !== item) {
              activeSelections[idx] = item;
              activeSelections.splice(idx + 1);
              renderColumns();
            }
          };

          btn.onmouseleave = () => {
            if (activeSelections[idx] !== item) btn.style.background = 'transparent';
          };

          btn.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (activeSelections[idx] === item) {
              activeSelections.splice(idx);
            } else {
              activeSelections[idx] = item;
              activeSelections.splice(idx + 1);
              if (item.type === 'file') {
                closeExplorerWindow();
                loadFileCb(item);
                return; 
              }
            }
            renderColumns(); 
          };
          col.appendChild(btn);
        });

        if (dirData.length === 0) {
          col.innerHTML = `<div style="padding:10px; color:#666666; text-align:center; font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500;">비어있음</div>`;
        }
      }

      Array.from(col.children).forEach((btn: any) => {
        const item = btn.itemData;
        if (!item) return;
        const isActive = activeSelections[idx] === item;
        if (isActive) {
          btn.style.borderColor = '#4cc71a';
          btn.style.background = 'rgba(76, 199, 26, 0.2)';
          btn.style.color = '#ffffff';
          btn.style.fontWeight = '700';
        } else {
          btn.style.borderColor = 'transparent';
          btn.style.background = 'transparent';
          btn.style.color = '#d4d4d4';
          btn.style.fontWeight = '500';
        }
      });
    });
  }

  // 7. 창 열기
  (window as any).openExplorerWindow = () => {
    if (explorerContainer!.style.display === 'flex') {
      closeExplorerWindow();
    } else {
      explorerContainer!.style.opacity = '0';
      explorerContainer!.style.animation = 'none';
      activeSelections = [];
      renderColumns(); 
      void explorerContainer!.offsetWidth; 
      explorerContainer!.style.animation = 'smartyBoardOpen 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
    }
  };

  workspace.registerToolboxCategoryCallback('EXAMPLES_CATEGORY', () => {
    (window as any).openExplorerWindow();
    return [];
  });
}