/*========
  /src/renderer/app/studyRoomBoard.ts
  * - 예제 파일과 폴더를 트리 구조로 보여주는 사이드 패널입니다.
  * - 파일을 클릭하면 상세 설명과 함께 블록 미리보기가 나타납니다.
  * - 폴더를 클릭하면 해당 폴더의 하위 항목들이 새로운 칼럼으로 표시됩니다.
  * - 🌟 [추가] 정답 폴더 클릭 시 studyRoom_info.json (또는 visible.json) 연동하여 목록 필터링
  * - 🌟 [추가] 자료실 열기 버튼 클릭 시 Git 서버의 버전을 체크하고 자동 업데이트 진행 (OTA)
  =========*/

import * as Blockly from 'blockly';

// 🌟 미리보기 워크스페이스를 기억해둘 변수 (메모리 누수 방지용)
let previewWorkspace: Blockly.WorkspaceSvg | null = null;

export async function initStudyRoomBoard(
  workspace: Blockly.WorkspaceSvg,
  createNewProgramCb: () => void,
  loadFileCb: (item: any) => void
) {
  let studyRoomData: any[] = [];
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

  // 2. 초기 로컬 자료실 데이터 로딩
  const fetchLocalTree = async () => {
    try {
      if ((window as any).api && (window as any).api.getStudyRoomTree) {
        studyRoomData = await (window as any).api.getStudyRoomTree();
      }
    } catch (e) {
      console.error("❌ 로컬 자료실 불러오기 실패:", e);
    }
  };
  await fetchLocalTree();

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

  // 5. 헬프 패널 업데이트
  function updateHelpPanel(item: any) {
    const hp = document.getElementById('helpPanel');
    if (!hp) return;

    if (previewWorkspace) {
      previewWorkspace.dispose();
      previewWorkspace = null;
    }

    if (item.type === 'file') {
      hp.innerHTML = `
        <div style="display: flex; flex-direction: row; width: 100%; height: 100%; gap: 30px;">
          <div style="flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding-right: 10px;">
            <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 700; font-size: 21px; color: #4cc71a; margin-bottom: 12px; border-bottom: 1px solid #3c3c3c; padding-bottom: 8px; pointer-events: none;">
              📝 ${item.name} 자료
            </div>
            <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500; color: #d4d4d4; line-height: 1.5; white-space: normal; font-size: 15px; pointer-events: none;">
              ${item.help || '저장된 설명이 없습니다.'}
            </div>
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.3); border: 1px solid #3c3c3c; border-radius: 12px; overflow: hidden;">
            <div style="padding: 10px; background: rgba(255,255,255,0.05); color: #aaa; font-size: 13px; font-weight: bold; text-align: center; border-bottom: 1px solid #3c3c3c; pointer-events: none;">
              🧩 블록 미리보기 (읽기 전용)
            </div>
            <div id="blockly-preview-div" style="flex: 1; width: 100%; height: 100%;"></div>
          </div>
        </div>
      `;

      setTimeout(() => {
        const previewDiv = document.getElementById('blockly-preview-div');
        if (!previewDiv) return;

        previewWorkspace = Blockly.inject(previewDiv, {
          readOnly: true,
          scrollbars: true,
          trashcan: false,
          renderer: 'zelos', 
          theme: workspace.getTheme(), 
          move: { scrollbars: true, drag: true, wheel: true },
          zoom: { controls: false, wheel: false, startScale: 0.7 }
        });

        try {
          const blockData = item.code; 
          if (blockData) {
            const parsedData = typeof blockData === 'string' ? JSON.parse(blockData) : blockData;
            Blockly.serialization.workspaces.load(parsedData, previewWorkspace);
            
            const customColors = (window as any).__smartyBlockColors || (window as any).__blockColorMap;
            if (customColors) {
              previewWorkspace.getAllBlocks(false).forEach(block => {
                if (!block.isShadow() && customColors[block.type] && typeof block.setColour === 'function') {
                  block.setColour(customColors[block.type]);
                }
              });
            }
          } else {
            throw new Error("데이터 없음");
          }
        } catch (err) {
          previewDiv.innerHTML = `
            <div style="color:#ff6b6b; padding:20px; text-align:center; font-family: Pretendard; line-height: 1.5;">
              <b>블록 데이터를 불러오지 못했습니다 😭</b>
            </div>
          `;
        }
      }, 50);
    } else {
      hp.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; text-align: center; pointer-events: none;">
          <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 700; font-size: 24px; color: #4cc71a; margin-bottom: 15px;">
            📁 ${item.name} 폴더
          </div>
          <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500; color: #aaaaaa; line-height: 1.6; font-size: 16px;">
            왼쪽 목록에서 파일(📝)을 클릭하여 자료실 내용과 블록 코드를 확인하세요!
          </div>
        </div>
      `;
    }
  }

  // 6. 칼럼 렌더링
  async function renderColumns() {
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
          <div style="font-size: 20px; font-weight: 600; color: #888; line-height: 1.5;">목록에서 자료실 파일을 선택하면<br>상세 설명과 블록 설계도가 여기에 표시됩니다.</div>
        </div>
      `;
      helpPanel.addEventListener('wheel', (e) => e.stopPropagation());
      explorerContainer!.appendChild(helpPanel);
    }

    let neededCols: any[] = [];
    let tempDir = studyRoomData;
    let tempDepth = 0;
    
    while (true) {
      neededCols.push({ depth: tempDepth, data: tempDir });
      
      if (activeSelections[tempDepth] && activeSelections[tempDepth].type === 'folder') {
        let children = activeSelections[tempDepth].children || [];

        // 🚨🚨 [핵심] 폴더 이름이 "정답"인 경우 visible 데이터 연동 필터링
        if (activeSelections[tempDepth].name === '정답') {
          try {
            let visibleData = null;
            if ((window as any).api && (window as any).api.readStudyRoomInfo) {
              const info = await (window as any).api.readStudyRoomInfo();
              visibleData = info.visible;
            } else if ((window as any).api && (window as any).api.readVisibleJson) {
              visibleData = await (window as any).api.readVisibleJson();
            }
            
            if (visibleData) {
              children = children.filter((child: any) => {
                if (child.type === 'folder') return true; 
                // 🚨 수정된 부분 (name 대신 relPath 사용) 🚨
                return visibleData[child.relPath] !== false; 
              });
            }
          } catch (err) {
            console.warn("⚠️ 가시성 정보를 읽어오는데 실패했습니다.", err);
          }
        }
        
        tempDir = children;
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
          // 📝 설정 파일들은 학생 화면(목록)에서 숨김 처리!
          if (item.name === 'visible.json' || item.name === 'studyRoom_info.json') return; 

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

          btn.onmouseenter = async () => {
            if (activeSelections[idx] !== item) btn.style.background = 'rgba(255,255,255,0.1)';
            updateHelpPanel(item);
            if (isFolder && activeSelections[idx] !== item) {
              activeSelections[idx] = item;
              activeSelections.splice(idx + 1);
              await renderColumns();
            }
          };

          btn.onmouseleave = () => {
            if (activeSelections[idx] !== item) btn.style.background = 'transparent';
          };

          btn.onclick = async (e) => {
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
            await renderColumns(); 
          };
          col.appendChild(btn);
        });

        if (dirData.length === 0 || col.innerHTML === '') {
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

  // 🌟 [핵심 추가] 7. 창 열기 (열 때마다 Git 서버와 통신)
  let isSyncing = false;

  (window as any).openExplorerWindow = async () => {
    if (explorerContainer!.style.display === 'flex') {
      closeExplorerWindow();
    } else {
      // 🚀 통신 중복 실행 방지
      if (isSyncing) return;
      isSyncing = true;

      // 화면 우측 상단에 동기화 알림 표시
      const syncAlert = document.createElement('div');
      syncAlert.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: rgba(0, 0, 0, 0.8);
        border: 1px solid #4cc71a; color: #4cc71a; padding: 10px 20px; border-radius: 8px;
        font-family: Pretendard; font-size: 14px; z-index: 999999; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
      `;
      syncAlert.innerHTML = `🔄 서버에서 최신 자료실을 확인 중입니다...`;
      document.body.appendChild(syncAlert);

      try {
        // 🌟 백엔드(main.ts)에 Git 동기화(pull)를 요청합니다.
        if ((window as any).api && (window as any).api.syncStudyRoomFromGit) {
          const syncResult = await (window as any).api.syncStudyRoomFromGit();
          if (syncResult && syncResult.updated) {
             syncAlert.innerHTML = `🎉 최신 버전(${syncResult.version})으로 업데이트 되었습니다!`;
          } else {
             syncAlert.innerHTML = `✅ 이미 최신 자료실입니다.`;
          }
          // 동기화가 끝나면 로컬 트리를 새로고침 합니다.
          await fetchLocalTree();
        } else {
          syncAlert.innerHTML = `⚠️ 오프라인 모드로 실행합니다. (동기화 API 없음)`;
        }
      } catch (err) {
        console.warn("Git 동기화 실패:", err);
        syncAlert.style.borderColor = "#ff6b6b";
        syncAlert.style.color = "#ff6b6b";
        syncAlert.innerHTML = `❌ 인터넷 연결 불안정 (오프라인 모드 실행)`;
      } finally {
        setTimeout(() => syncAlert.remove(), 2500); // 2.5초 뒤 알림 제거
        isSyncing = false;
      }

      // UI 오픈 애니메이션 시작
      explorerContainer!.style.opacity = '0';
      explorerContainer!.style.animation = 'none';
      activeSelections = [];
      await renderColumns();
      void explorerContainer!.offsetWidth; 
      explorerContainer!.style.animation = 'smartyBoardOpen 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
    }
  };

  workspace.registerToolboxCategoryCallback('STUDYROOM_CATEGORY', () => {
    (window as any).openExplorerWindow();
    return [];
  });
}