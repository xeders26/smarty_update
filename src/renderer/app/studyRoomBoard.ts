/*========
  /src/renderer/app/studyRoomBoard.ts
  * - 예제 파일과 폴더를 트리 구조로 보여주는 사이드 패널입니다.
  * - 파일을 클릭하면 상세 설명과 함께 블록 미리보기가 나타납니다.
  * - 폴더를 클릭하면 해당 폴더의 하위 항목들이 새로운 칼럼으로 표시됩니다.
  * - 🌟 [완벽수정] 자료실 우측 테두리가 화면 밖으로 잘리지 않도록 안전 여백 추가
  * - 🌟 [디자인개선] 투박하고 두꺼운 Blockly 스크롤바를 얇고 귀엽게(Cute) 커스텀!
  * - 🌟 [완벽수정] 네트워크 딜레이 제거! 클릭/호버 시 즉시 창이 열리고 백그라운드 동기화 진행
  * - 🌟 [추가] 마우스 호버(Mouseover) 즉시 반응하여 안정적으로 열리도록 이벤트 추가
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
  let currentVersion = "1.0.0"; 

  // 1. 스크롤바 디자인 적용 (🌟 귀여운 스크롤바 CSS)
  if (!document.getElementById('explorer-scrollbar-style')) {
    const style = document.createElement('style');
    style.id = 'explorer-scrollbar-style';
    style.innerHTML = `
      .explorer-col::-webkit-scrollbar { width: 8px; }
      .explorer-col::-webkit-scrollbar-thumb { background: #4cc71a; border-radius: 4px; }
      .explorer-col::-webkit-scrollbar-track { background: transparent; }

      /* 🌟 Blockly 미리보기 창의 투박한 스크롤바를 얇고 귀엽게(Cute) 커스텀! */
      #blockly-preview-div .blocklyScrollbarBackground {
        display: none !important; 
      }
      #blockly-preview-div .blocklyScrollbarVertical .blocklyScrollbarHandle {
        width: 6px !important; 
        transform: translateX(6px); 
      }
      #blockly-preview-div .blocklyScrollbarHorizontal .blocklyScrollbarHandle {
        height: 6px !important; 
        transform: translateY(6px); 
      }
      #blockly-preview-div .blocklyScrollbarHandle {
        fill: #4cc71a !important; 
        fill-opacity: 0.5 !important; 
        rx: 3px !important; 
        ry: 3px !important;
        transition: fill-opacity 0.2s, fill 0.2s; 
      }
      #blockly-preview-div .blocklyScrollbarHandle:hover {
        fill-opacity: 0.9 !important; 
        fill: #3da115 !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 2. 창 밖(외부) 크기 조절 리사이저 (두께 5px)
  const createSiblingResizer = (targetElement: HTMLElement, isLeft: boolean, className: string) => {
    let resizer = document.createElement('div');
    resizer.className = className;
    resizer.style.cssText = `
      width: 5px; height: 100%; cursor: col-resize; background: transparent;
      flex-shrink: 0; z-index: 10; transition: background 0.2s;
      margin-left: -2px; margin-right: -3px; position: relative;
    `;
    resizer.onmouseenter = () => resizer.style.background = 'rgba(76, 199, 26, 0.4)';
    resizer.onmouseleave = () => resizer.style.background = 'transparent';

    let startX = 0, startWidth = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (isLeft) {
        const dx = startX - e.clientX;
        const newWidth = startWidth + dx;
        if (newWidth > 350) { 
          targetElement.style.flexGrow = '0';
          targetElement.style.width = newWidth + 'px';
          targetElement.style.minWidth = newWidth + 'px';
          if (previewWorkspace) Blockly.svgResize(previewWorkspace);
        }
      } else {
        const dx = e.clientX - startX;
        const newWidth = startWidth + dx;
        if (newWidth > 150) { 
          targetElement.style.width = newWidth + 'px';
          targetElement.style.minWidth = newWidth + 'px';
        }
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'default';
      resizer.style.background = 'transparent';
    };

    resizer.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault(); e.stopPropagation();
      startX = e.clientX;
      startWidth = targetElement.offsetWidth;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'col-resize';
      resizer.style.background = 'rgba(76, 199, 26, 0.8)';
    });

    return resizer;
  };

  // 3. 로컬 자료실 데이터 로딩
  const fetchLocalTree = async () => {
    try {
      let rawTree = [];
      if ((window as any).api && (window as any).api.getStudyRoomTree) {
        rawTree = await (window as any).api.getStudyRoomTree();
      }

      let visibleMap: any = {};
      if ((window as any).api && (window as any).api.readStudyRoomInfo) {
        const info = await (window as any).api.readStudyRoomInfo();
        if (info && info.visible) visibleMap = info.visible;
        if (info && info.version) currentVersion = info.version; 
      } else if ((window as any).api && (window as any).api.readVisibleJson) {
        visibleMap = await (window as any).api.readVisibleJson() || {};
      }

      const applyVisibilityFilter = (items: any[]) => {
        return items.filter(item => {
          if (!item.relPath) return true;
          const pathWin = item.relPath.replace(/\//g, '\\');
          const pathMac = item.relPath.replace(/\\/g, '/');
          if (visibleMap[item.relPath] === false || visibleMap[pathWin] === false || visibleMap[pathMac] === false) {
            return false;
          }
          if (item.type === 'folder' && item.children) {
            item.children = applyVisibilityFilter(item.children);
          }
          return true;
        });
      };

      studyRoomData = applyVisibilityFilter(rawTree);
    } catch (e) {
      console.error("❌ 로컬 자료실 불러오기 실패:", e);
    }
  };
  await fetchLocalTree();

  // 4. 컨테이너 세팅 
  const explorerContainer = document.getElementById('my-custom-explorer');
  if (!explorerContainer) return;

  explorerContainer.style.transition = 'opacity 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
  explorerContainer.style.position = 'absolute';
  explorerContainer.style.top = '0';
  explorerContainer.style.bottom = '0';
  explorerContainer.style.right = '15px'; 
  explorerContainer.style.width = 'auto';
  explorerContainer.style.height = 'auto'; 
  
  explorerContainer.style.maxWidth = 'calc(100% - 100px)'; 
  explorerContainer.style.boxSizing = 'border-box';
  explorerContainer.style.overflowX = 'auto'; 

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

  const handleOutsideClick = (e: Event) => {
    if (explorerContainer.style.display === 'none') return;
    const target = e.target as Element;
    if (!target || typeof target.closest !== 'function') return; 
    if (target.closest('.explorer-col') || target.closest('.col-resizer') || target.closest('.hp-resizer') || target.closest('#helpPanel')) return;
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
        <div style="display: flex; flex-direction: row; width: 100%; height: 100%; gap: 0;">
          
          <div id="hp-text-col" style="width: 40%; min-width: 200px; display: flex; flex-direction: column; overflow-y: auto; padding-right: 15px; box-sizing: border-box;">
            <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 700; font-size: 21px; color: #4cc71a; margin-bottom: 12px; border-bottom: 1px solid #3c3c3c; padding-bottom: 8px; pointer-events: none;">
              📝 ${item.name} 자료
            </div>
            <div style="font-family: 'Pretendard Variable', Pretendard, sans-serif; font-weight: 500; color: #d4d4d4; line-height: 1.5; white-space: normal; font-size: 15px; pointer-events: none;">
              ${item.help || '저장된 설명이 없습니다.'}
            </div>
          </div>

          <div id="hp-inner-resizer" style="width: 5px; cursor: col-resize; margin: 0 2px; flex-shrink: 0; background: transparent; transition: background 0.2s; border-radius: 3px;"></div>

          <div id="hp-block-col" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; background: rgba(0,0,0,0.3); border: 1px solid #3c3c3c; border-radius: 12px; overflow: hidden;">
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

        Blockly.svgResize(previewWorkspace);

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
          }
        } catch (err) {
          previewDiv.innerHTML = `
            <div style="color:#ff6b6b; padding:20px; text-align:center; font-family: Pretendard; line-height: 1.5;">
              <b>블록 데이터를 불러오지 못했습니다 😭</b>
            </div>
          `;
        }

        const innerResizer = document.getElementById('hp-inner-resizer');
        const textCol = document.getElementById('hp-text-col');
        if (innerResizer && textCol && hp) {
          let innerStartX = 0, innerStartWidth = 0;
          const onInnerMove = (e: MouseEvent) => {
            const newWidth = innerStartWidth + (e.clientX - innerStartX);
            if (newWidth > 150 && newWidth < hp.clientWidth - 300) {
              textCol.style.width = newWidth + 'px';
              if (previewWorkspace) Blockly.svgResize(previewWorkspace);
            }
          };
          const onInnerUp = () => {
            document.removeEventListener('mousemove', onInnerMove);
            document.removeEventListener('mouseup', onInnerUp);
            document.body.style.cursor = 'default';
            innerResizer.style.background = 'transparent';
          };
          innerResizer.addEventListener('mousedown', (e) => {
            e.preventDefault(); e.stopPropagation();
            innerStartX = e.clientX;
            innerStartWidth = textCol.offsetWidth;
            document.addEventListener('mousemove', onInnerMove);
            document.addEventListener('mouseup', onInnerUp);
            document.body.style.cursor = 'col-resize';
            innerResizer.style.background = 'rgba(76, 199, 26, 0.8)';
          });
          innerResizer.addEventListener('mouseenter', () => innerResizer.style.background = 'rgba(76, 199, 26, 0.4)');
          innerResizer.addEventListener('mouseleave', () => innerResizer.style.background = 'transparent');
        }

      }, 100);

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

    let versionDiv = document.getElementById('smarty-studyroom-version');
    if (!versionDiv) {
      versionDiv = document.createElement('div');
      versionDiv.id = 'smarty-studyroom-version';
      versionDiv.style.cssText = `
        position: absolute; bottom: 8px; left: 12px;
        font-family: 'Pretendard Variable', Pretendard, sans-serif;
        font-size: 11px; color: rgba(255, 255, 255, 0.2); 
        pointer-events: none; z-index: 100;
      `;
      explorerContainer!.appendChild(versionDiv);
    }
    versionDiv.innerHTML = `자료실 버전: v${currentVersion}`;

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

      const hpResizer = createSiblingResizer(helpPanel, true, 'hp-resizer');
      explorerContainer!.insertBefore(hpResizer, helpPanel);
    }

    let neededCols: any[] = [];
    let tempDir = studyRoomData;
    let tempDepth = 0;
    
    while (true) {
      neededCols.push({ depth: tempDepth, data: tempDir });
      
      if (activeSelections[tempDepth] && activeSelections[tempDepth].type === 'folder') {
        let children = activeSelections[tempDepth].children || [];
        tempDir = children;
        tempDepth++;
      } else {
        break;
      }
    }

    Array.from(explorerContainer!.querySelectorAll('.explorer-col')).forEach((col: any) => {
      if (parseInt(col.dataset.depth) >= neededCols.length) col.remove();
    });
    Array.from(explorerContainer!.querySelectorAll('.col-resizer')).forEach((resizer: any) => {
      if (parseInt(resizer.dataset.depth) >= neededCols.length) resizer.remove();
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
          width: 220px; min-width: 200px; height: 100%; background: transparent; border-right: 1px solid #3c3c3c;
          overflow-y: auto; padding: 10px; box-sizing: border-box; flex-shrink: 0;
        `;
        col.addEventListener('mousedown', (e) => e.stopPropagation());
        col.addEventListener('pointerdown', (e) => e.stopPropagation()); 
        col.addEventListener('wheel', (e) => e.stopPropagation());
        
        const hpResizer = explorerContainer!.querySelector('.hp-resizer');
        explorerContainer!.insertBefore(col, hpResizer || document.getElementById('helpPanel'));
      } else if (col.currentData !== dirData) {
        needsRebuild = true;
      }

      if (needsRebuild) {
        col.innerHTML = '';
        col.currentData = dirData;

        dirData.forEach((item: any) => {
          if (item.name === 'visible.json' || item.name === 'studyRoom_info.json') return; 

          const btn = document.createElement('div');
          const isFolder = item.type === 'folder';
          btn.innerHTML = (isFolder ? '📁 ' : '📝 ') + item.name + (isFolder ? '<span style="float:right; color:#aaaaaa;">▶</span>' : '');
          (btn as any).itemData = item;

          btn.style.cssText = `
            padding: 8px 12px; margin-bottom: 2px; cursor: pointer; border-radius: 6px;
            border: 1px solid transparent; background: transparent; color: #d4d4d4;
            font-family: 'Pretendard Variable', Pretendard, sans-serif; font-size: 14px; font-weight: 500;
            transition: all 0.2s; user-select: none;
          `;

          btn.onmouseenter = async () => {
            if (activeSelections[idx] !== item) btn.style.background = 'rgba(255,255,255,0.1)';
            updateHelpPanel(item);
            
            if (activeSelections[idx] !== item) {
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

      let resizer = explorerContainer!.querySelector(`.col-resizer[data-depth="${idx}"]`) as any;
      if (!resizer) {
        resizer = createSiblingResizer(col, false, 'col-resizer');
        resizer.dataset.depth = idx.toString();
        explorerContainer!.insertBefore(resizer, col.nextSibling);
      }
    });

    setTimeout(() => {
       if (previewWorkspace) Blockly.svgResize(previewWorkspace);
    }, 150);
  }

  // 🌟 7. 창 열기 로직 (완벽 개선: 딜레이 0초, 호버/클릭 동시 대응)
  let isSyncing = false;

  (window as any).openExplorerWindow = async (forceOpen = false) => {
    
    // 이미 열려있는데 다시 실행되었을 때의 처리
    if (explorerContainer!.style.display === 'flex') {
      if (!forceOpen) closeExplorerWindow(); // 마우스 호버(forceOpen)가 아니라 클릭이었다면 닫기 토글
      return;
    }

    // 🚀 [핵심 1] 화면 로딩을 네트워크(Git)보다 무조건 우선! 즉시 띄웁니다!
    explorerContainer!.style.display = 'flex';
    explorerContainer!.style.opacity = '0';
    explorerContainer!.style.animation = 'none';
    activeSelections = [];
    await renderColumns();
    void explorerContainer!.offsetWidth; 
    explorerContainer!.style.animation = 'smartyBoardOpen 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';

    // 🚀 [핵심 2] 화면이 열린 뒤, 백그라운드에서 조용히 Git 버전 체크 시작
    if (isSyncing) return;
    isSyncing = true;

    const syncAlert = document.createElement('div');
    syncAlert.style.cssText = `
      position: fixed; top: 20px; right: 20px; background: rgba(0, 0, 0, 0.8);
      border: 1px solid #4cc71a; color: #4cc71a; padding: 10px 20px; border-radius: 8px;
      font-family: Pretendard; font-size: 14px; z-index: 999999; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    `;
    syncAlert.innerHTML = `🔄 서버에서 최신 자료실을 확인 중입니다...`;
    document.body.appendChild(syncAlert);

    try {
      if ((window as any).api && (window as any).api.syncStudyRoomFromGit) {
        const syncResult = await (window as any).api.syncStudyRoomFromGit();
        if (syncResult && syncResult.updated) {
           syncAlert.innerHTML = `🎉 최신 버전(${syncResult.version})으로 업데이트 되었습니다!`;
           // 업데이트가 발생하면 백그라운드에서 데이터 다시 가져와서 화면만 새로고침
           await fetchLocalTree();
           await renderColumns();
        } else if (syncResult && syncResult.error) {
           syncAlert.style.borderColor = "#ff6b6b";
           syncAlert.style.color = "#ff6b6b";
           syncAlert.innerHTML = `❌ 동기화 실패: ${syncResult.error.substring(0, 50)}`;
        } else {
           syncAlert.innerHTML = `✅ 이미 최신 자료실입니다.`;
        }
      } else {
        syncAlert.innerHTML = `⚠️ 오프라인 모드로 실행합니다. (동기화 API 없음)`;
      }
    } catch (err) {
      syncAlert.style.borderColor = "#ff6b6b";
      syncAlert.style.color = "#ff6b6b";
      syncAlert.innerHTML = `❌ 인터넷 연결 불안정 (오프라인 모드 실행)`;
    } finally {
      setTimeout(() => syncAlert.remove(), 2500); 
      isSyncing = false;
    }
  };

  // 기존 클릭 대응
  workspace.registerToolboxCategoryCallback('STUDYROOM_CATEGORY', () => {
    (window as any).openExplorerWindow();
    return [];
  });

  // 🚀 [핵심 3] 마우스만 올려도(Hover) 즉시 창이 열리도록 툴박스에 마우스오버 이벤트 추가
  setTimeout(() => {
    const toolboxDiv = workspace.getInjectionDiv().querySelector('.blocklyToolboxDiv') as HTMLElement;
    if (toolboxDiv) {
      toolboxDiv.addEventListener('mouseover', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const row = target.closest('.blocklyTreeRow') as HTMLElement;
        if (row) {
          const label = row.querySelector('.blocklyTreeLabel') as HTMLElement;
          // '자료실' 또는 'Study' 카테고리 위에 마우스가 올라가면 즉시 열기 (forceOpen = true)
          if (label && (label.innerText.includes('자료실') || label.innerText.includes('Study'))) {
            (window as any).openExplorerWindow(true);
          }
        }
      });
    }
  }, 1000); // UI가 전부 렌더링된 뒤 1초 후에 이벤트 안전 등록
}