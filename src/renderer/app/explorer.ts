/*========
  /src/renderer/app/explorer.ts
  * - 예제 파일과 폴더를 트리 구조로 보여주는 사이드 패널입니다.
  * - 파일을 클릭하면 상세 설명과 함께 블록 미리보기가 나타납니다.
  * - 폴더를 클릭하면 해당 폴더의 하위 항목들이 새로운 칼럼으로 표시됩니다.
  * - 창 바깥을 클릭하거나 다시 열기 버튼을 누르면 탐색기가 닫힙니다.
  * - 메모리 누수를 방지하기 위해 블록 미리보기 워크스페이스는 창이 닫힐 때마다 깔끔하게 정리됩니다.
  =========*/

import * as Blockly from 'blockly';

// 🌟 [추가됨] 미리보기 워크스페이스를 기억해둘 변수 (메모리 누수 방지용)
let previewWorkspace: Blockly.WorkspaceSvg | null = null;

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

  // 3. 팝업창 컨테이너 세팅
  const explorerContainer = document.getElementById('my-custom-explorer');
  if (!explorerContainer) return;

  explorerContainer.style.transition = 'opacity 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
  explorerContainer.style.position = 'absolute';
  explorerContainer.style.top = '0';
  explorerContainer.style.bottom = '0';
  explorerContainer.style.right = '0';
  explorerContainer.style.width = 'auto';
  explorerContainer.style.height = 'auto'; 
  explorerContainer.style.maxWidth = 'none';

  // 4. 창 닫기 함수
  const closeExplorerWindow = () => {
    if (explorerContainer.style.display === 'none') return;
    explorerContainer.style.display = 'none';
    activeSelections = [];
    if (workspace && typeof workspace.getToolbox === 'function') {
      const tb = workspace.getToolbox();
      if (tb && typeof tb.clearSelection === 'function') tb.clearSelection();
    }
    
    // 🌟 [추가됨] 창을 닫을 때 미리보기 워크스페이스도 깔끔하게 메모리에서 지워줍니다.
    if (previewWorkspace) {
      previewWorkspace.dispose();
      previewWorkspace = null;
    }
  };
  (window as any).closeExplorerWindow = closeExplorerWindow;

  // 창 바깥 클릭 시 닫기
  const handleOutsideClick = (e: Event) => {
    if (explorerContainer.style.display === 'none') return;
    const target = e.target as Element;
    if (!target || typeof target.closest !== 'function') return; 
    if (target.closest('.explorer-col') || target.closest('#helpPanel')) return;
    if (target.closest('.blocklyToolboxDiv') || target.closest('#category-sidebar') || target.closest('.category-sidebar')) return;
    closeExplorerWindow();
  };

  document.addEventListener('pointerdown', handleOutsideClick, true);
  document.addEventListener('mousedown', handleOutsideClick, true);
  document.addEventListener('touchstart', handleOutsideClick, true);

  // 🌟 [핵심 수정] 5. 헬프 패널 업데이트 (반으로 쪼개고 우측에 블록 렌더링)
  function updateHelpPanel(item: any) {
    const hp = document.getElementById('helpPanel');
    if (!hp) return;

    // 이전에 그려진 블록 미리보기가 있다면 메모리에서 삭제
    if (previewWorkspace) {
      previewWorkspace.dispose();
      previewWorkspace = null;
    }

    if (item.type === 'file') {
      hp.innerHTML = `
        <div style="display: flex; flex-direction: row; width: 100%; height: 100%; gap: 30px;">
          
          <!-- 좌측: 설명 텍스트 창 (flex: 1) -->
          <div style="flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding-right: 10px;">
            <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 700; font-size: 21px; color: #4cc71a; margin-bottom: 12px; border-bottom: 1px solid #3c3c3c; padding-bottom: 8px; pointer-events: none;">
              📝 ${item.name} 예제
            </div>
            <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500; color: #d4d4d4; line-height: 1.5; white-space: normal; font-size: 15px; pointer-events: none;">
              ${item.help || '저장된 설명이 없습니다.'}
            </div>
          </div>

          <!-- 우측: 블록 미리보기 창 (flex: 1) -->
          <div style="flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.3); border: 1px solid #3c3c3c; border-radius: 12px; overflow: hidden;">
            <div style="padding: 10px; background: rgba(255,255,255,0.05); color: #aaa; font-size: 13px; font-weight: bold; text-align: center; border-bottom: 1px solid #3c3c3c; pointer-events: none;">
              🧩 블록 미리보기 (읽기 전용)
            </div>
            <!-- 이 div 안에 Blockly가 주입됩니다! -->
            <div id="blockly-preview-div" style="flex: 1; width: 100%; height: 100%;"></div>
          </div>

        </div>
      `;

      // 🌟 HTML 렌더링 후 50ms 뒤에 블록 렌더링 시작
      setTimeout(() => {
        const previewDiv = document.getElementById('blockly-preview-div');
        if (!previewDiv) return;

        // 1. 읽기 전용 워크스페이스 주입 (메인 도화지와 100% 동일한 유전자 이식!)
        previewWorkspace = Blockly.inject(previewDiv, {
          readOnly: true,
          scrollbars: true,
          trashcan: false,
          renderer: 'zelos', 
          theme: workspace.getTheme(), 
          move: { scrollbars: true, drag: true, wheel: true },
          // 🌟 [추가됨] 블록 크기를 60%로 줄이고, 휠로 확대/축소를 못하게 고정합니다!
          zoom: {
            controls: false, // 줌 인/아웃 버튼 숨기기
            wheel: false,    // 마우스 휠로 줌 조절 금지 (스크롤만 가능하게)
            startScale: 0.7  // 🌟 핵심! 시작부터 60% 크기로 보여주기!
          }
        });

        try {
          const blockData = item.code; 

          // 2. 데이터가 존재한다면 바로 화면에 그리기!
          if (blockData) {
            const parsedData = typeof blockData === 'string' ? JSON.parse(blockData) : blockData;
            Blockly.serialization.workspaces.load(parsedData, previewWorkspace);
            
            // 🎨 스마티 전용 커스텀 블록 색상 덧칠하기 유지
            const customColors = (window as any).__smartyBlockColors || (window as any).__blockColorMap;
            if (customColors) {
              previewWorkspace.getAllBlocks(false).forEach(block => {
                if (!block.isShadow() && customColors[block.type] && typeof block.setColour === 'function') {
                  block.setColour(customColors[block.type]);
                }
              });
            }

            console.log("✅ 블록 모양(Zelos) 및 테마 완벽 적용 성공!");
            
          } else {
            throw new Error("item.code 안에 블록 데이터가 없습니다!");
          }

        } catch (err) {
          console.error("❌ 블록 로드 실패:", err);
          previewDiv.innerHTML = `
            <div style="color:#ff6b6b; padding:20px; text-align:center; font-family: Pretendard; line-height: 1.5;">
              <b>블록 데이터를 불러오지 못했습니다 😭</b><br><br>
              <span style="font-size:13px; color:#aaa;">JSON 파일 형식이 잘못되었거나 파일이 비어있습니다.</span>
            </div>
          `;
        }
      }, 50);
    } else {
      // 폴더를 클릭했을 때의 화면 (가운데 정렬된 깔끔한 UI 유지)
      hp.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; text-align: center; pointer-events: none;">
          <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 700; font-size: 24px; color: #4cc71a; margin-bottom: 15px;">
            📁 ${item.name} 폴더
          </div>
          <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500; color: #aaaaaa; line-height: 1.6; font-size: 16px;">
            이 폴더 안에는 다양한 하위 예제들이 들어있습니다.<br>왼쪽 목록에서 파일(📝)을 클릭하여 예제 내용과 블록 코드를 확인하세요!
          </div>
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
        border-left: 1px solid #3c3c3c; color: #d4d4d4; font-size: 16px; overflow: hidden; cursor: default;
      `;
      helpPanel.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; text-align: center; pointer-events: none;">
          <div style="font-size: 50px; margin-bottom: 20px;">💡</div>
          <div style="font-size: 20px; font-weight: 600; color: #888; line-height: 1.5;">목록에서 예제 파일을 선택하면<br>상세 설명과 블록 설계도가 여기에 표시됩니다.</div>
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
        col.addEventListener('pointerdown', (e) => e.stopPropagation()); 
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