/*========
  /src/renderer/app/studyRoomManager.ts
  =========*/
import * as Blockly from 'blockly';

let visibleData: Record<string, boolean> = {}; 
let adminToken: string = '';
let managerPreviewWorkspace: Blockly.WorkspaceSvg | null = null;
let currentSelectedRow: HTMLElement | null = null; 

let collapsedFolders: Set<string> = new Set();
let currentRoomVersion: string = '1.0.0'; 

async function updateVersionDisplay() {
  if ((window as any).api && (window as any).api.readStudyRoomInfo) {
    const info = await (window as any).api.readStudyRoomInfo();
    currentRoomVersion = info.version || currentRoomVersion;
    const verEl = document.getElementById('manager-version-display');
    if (verEl) verEl.innerText = `v${currentRoomVersion}`;
  }
}

export async function openStudyRoomManager(token: string) {
  adminToken = token;
  if (document.getElementById('studyRoom-manager-window')) return;
  
  if ((window as any).api) {
    if ((window as any).api.readStudyRoomInfo) {
      const info = await (window as any).api.readStudyRoomInfo();
      visibleData = info.visible || {};
      currentRoomVersion = info.version || '1.0.0'; 
    } else if ((window as any).api.readVisibleJson) {
      visibleData = await (window as any).api.readVisibleJson();
      currentRoomVersion = '1.0.0';
    } else {
      visibleData = {};
    }
  }

  await renderManagerUI();
}

async function renderManagerUI() {
  currentSelectedRow = null; 
  const overlay = document.createElement('div');
  overlay.id = 'studyRoom-manager-overlay';
  overlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.4); z-index: 999998;`;

  const container = document.createElement('div');
  container.id = 'studyRoom-manager-window';
  container.style.cssText = `
    position: absolute; top: 5vh; left: 5vw; width: 90vw; height: 90vh; 
    background: #1e1e1e; display: flex; flex-direction: column;
    font-family: 'Pretendard', sans-serif; color: white;
    border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);
    border: 1px solid #4cc71a; overflow: hidden;
  `;

  const titleBar = document.createElement('div');
  titleBar.style.cssText = `
    height: 40px; background: #2c2c2c; display: flex; justify-content: space-between; align-items: center;
    padding: 0 15px; cursor: grab; user-select: none; border-bottom: 1px solid #3c3c3c;
  `;
  titleBar.innerHTML = `
    <div style="font-weight: bold; color: #4cc71a; display: flex; align-items: center; gap: 8px;">
      ⚙️ 자료실 관리자 시스템
      <span id="manager-version-display" style="font-size: 11px; background: #222; color: #aaa; padding: 2px 8px; border-radius: 10px; border: 1px solid #444; letter-spacing: 0.5px;">v${currentRoomVersion}</span>
    </div>
    <button id="btn-close-manager" style="background:none; border:none; color:#ff6b6b; font-size:16px; cursor:pointer; font-weight:bold;">✖</button>
  `;

  const contentArea = document.createElement('div');
  contentArea.style.cssText = `flex: 1; display: flex; overflow: hidden;`;

  const leftPanel = document.createElement('div');
  leftPanel.id = 'manager-left-panel'; 
  leftPanel.style.cssText = `width: 350px; border-right: 1px solid #3c3c3c; padding: 20px; overflow-y: auto; background: #252525; flex-shrink: 0;`;
  
  const rightPanel = document.createElement('div');
  rightPanel.id = 'manager-right-panel';
  rightPanel.style.cssText = `flex: 1; padding: 20px; display: flex; flex-direction: column; background: #1e1e1e; overflow: hidden;`;

  contentArea.appendChild(leftPanel);
  contentArea.appendChild(rightPanel);
  container.appendChild(titleBar);
  container.appendChild(contentArea);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  let isDragging = false, offsetX = 0, offsetY = 0;
  titleBar.onmousedown = (e) => { 
    isDragging = true; titleBar.style.cursor = 'grabbing'; 
    offsetX = e.clientX - container.offsetLeft; offsetY = e.clientY - container.offsetTop; 
  };
  const onMouseMove = (e: MouseEvent) => { 
    if (!isDragging) return; container.style.left = `${e.clientX - offsetX}px`; container.style.top = `${e.clientY - offsetY}px`; 
  };
  const onMouseUp = () => { isDragging = false; titleBar.style.cursor = 'grab'; };
  document.addEventListener('mousemove', onMouseMove); document.addEventListener('mouseup', onMouseUp);

  document.getElementById('btn-close-manager')!.onclick = () => {
    if (managerPreviewWorkspace) { managerPreviewWorkspace.dispose(); managerPreviewWorkspace = null; }
    document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp);
    document.body.removeChild(overlay);
  };

  leftPanel.innerHTML = `
    <button id="btn-sync-git" style="width: 100%; padding: 12px; background: #e74c3c; border: none; color: white; border-radius: 4px; cursor: pointer; font-weight: bold; margin-bottom: 15px; font-size:14px;">🚀 전체 변경사항 수동 배포</button>
    <div style="font-size: 12px; color: #4cc71a; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
      💡 폴더에서 <b>우클릭</b>하면 새 폴더 생성 및 파일 업로드가 가능합니다.<br>
      💡 폴더 우측의 <b>➕/➖</b> 버튼을 눌러 하위 항목을 접고 펼치세요.
    </div>
    <div id="manager-tree-view"></div>
  `;

  const animStyle = document.createElement('style');
  animStyle.innerHTML = `@keyframes progressStripes { 0% { background-position: 40px 0; } 100% { background-position: 0 0; } } .progress-bar-animated { background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent); background-size: 40px 40px; animation: progressStripes 1s linear infinite; } #smarty-help-viewer p, #smarty-help-viewer h1, #smarty-help-viewer h2, #smarty-help-viewer h3 { margin-top: 0; margin-bottom: 0.8em; }`;
  document.head.appendChild(animStyle);

  document.getElementById('btn-sync-git')!.onclick = async () => {
    if (!confirm("현재 자료실 상태를 서버에 강제 배포하시겠습니까?")) return;
    await autoDeployToGit("수동 배포");
  };

  await loadTreeView();
}

async function autoDeployToGit(actionText: string) {
  const progressModal = document.createElement('div');
  progressModal.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); z-index: 999999; display: flex; justify-content: center; align-items: center; flex-direction: column; font-family: Pretendard;`;
  progressModal.innerHTML = `
    <div style="background: #1e1e1e; padding: 30px; border-radius: 12px; border: 1px solid #333; width: 400px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
      <h3 id="deploy-title" style="color: #64b5f6; margin-top: 0; margin-bottom: 20px; font-size: 18px;">🔄 [${actionText}] Git 서버 반영 중...</h3>
      <div style="width: 100%; height: 20px; background: #111; border-radius: 10px; overflow: hidden; margin-bottom: 15px; border: 1px solid #333;">
        <div id="deploy-bar" class="progress-bar-animated" style="width: 50%; height: 100%; background-color: #3498db; transition: width 0.3s, background-color 0.3s;"></div>
      </div>
      <p id="deploy-msg" style="color: #aaa; font-size: 14px; margin-bottom: 20px;">자료실 버전을 업데이트하고 파일을 동기화합니다...</p>
      <button id="deploy-close-btn" style="display: none; padding: 10px 20px; background: #555; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">확인 및 닫기</button>
    </div>
  `;
  document.body.appendChild(progressModal);

  try {
    // 🌟 [핵심 자동화] 현재 버전(예: 1.0.65)을 가져와서 맨 끝자리를 자동으로 +1 (1.0.66) 해줍니다!
    const vParts = currentRoomVersion.split('.');
    let lastNum = parseInt(vParts[vParts.length - 1] || '0');
    vParts[vParts.length - 1] = (lastNum + 1).toString();
    const newVersion = vParts.join('.');

    document.getElementById('deploy-msg')!.innerText = `버전을 v${newVersion}으로 자동 업그레이드 중...`;

    // 🌟 깃허브에 올리기 전에 새로운 버전 번호(newVersion)를 로컬 파일에 먼저 저장합니다!
    if ((window as any).api && (window as any).api.updateStudyRoomInfo) {
      await (window as any).api.updateStudyRoomInfo(visibleData, newVersion);
      currentRoomVersion = newVersion; // UI 업데이트용 변수도 변경
    }

    // 🚀 버전이 올라간 상태로 서버에 푸시(Push)!
    if ((window as any).api && (window as any).api.pushStudyRoomToGit) {
      await (window as any).api.pushStudyRoomToGit(adminToken);
      await updateVersionDisplay(); 
      
      document.getElementById('deploy-title')!.innerText = "🎉 자동 배포 완료!";
      document.getElementById('deploy-title')!.style.color = "#4cc71a";
      const bar = document.getElementById('deploy-bar')!;
      bar.style.width = "100%"; bar.style.backgroundColor = "#4cc71a"; bar.classList.remove('progress-bar-animated'); 
      document.getElementById('deploy-msg')!.innerText = `학생용 앱에 최신 자료실(v${currentRoomVersion})이 배포되었습니다.`;
      setTimeout(() => progressModal.remove(), 2500); 
    }
  } catch (e: any) {
    document.getElementById('deploy-title')!.innerText = "❌ 배포 실패";
    document.getElementById('deploy-title')!.style.color = "#e74c3c";
    const bar = document.getElementById('deploy-bar')!;
    bar.style.width = "100%"; bar.style.backgroundColor = "#e74c3c"; bar.classList.remove('progress-bar-animated');
    document.getElementById('deploy-msg')!.innerText = e.message || "네트워크 오류 또는 권한 문제";
    const closeBtn = document.getElementById('deploy-close-btn')!;
    closeBtn.style.display = "inline-block"; closeBtn.onclick = () => progressModal.remove();
  }
}

async function loadTreeView() {
  const treeContainer = document.getElementById('manager-tree-view');
  const leftPanel = document.getElementById('manager-left-panel'); 
  if (!treeContainer) return;
  
  const savedScrollTop = leftPanel ? leftPanel.scrollTop : 0;
  treeContainer.innerHTML = '';

  try {
    const treeData = await (window as any).api.getStudyRoomTree();
    treeData.forEach((item: any) => treeContainer.appendChild(createTreeElement(item, 0)));
  } catch (e) { 
    treeContainer.innerHTML = `<div style="color:red;">폴더 트리를 불러오는데 실패했습니다.</div>`; 
  }

  if (leftPanel) {
    setTimeout(() => { leftPanel.scrollTop = savedScrollTop; }, 10);
  }
}

function refreshVisibilityUI() {
  const rows = document.querySelectorAll('.manager-tree-row');
  rows.forEach((row: Element) => {
    const htmlRow = row as HTMLElement;
    const relPath = htmlRow.getAttribute('data-relpath');
    if (relPath) {
      const isVisible = visibleData[relPath] !== false;
      const cb = htmlRow.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (cb) cb.checked = isVisible;
      htmlRow.style.color = isVisible ? '#d4d4d4' : '#666';
    }
  });
}

function createTreeElement(item: any, depth: number): HTMLElement {
  const wrapper = document.createElement('div');
  const row = document.createElement('div');
  
  row.className = 'manager-tree-row';
  row.setAttribute('data-relpath', item.relPath || '');

  const isFolder = item.type === 'folder';
  
  if (item.name === 'visible.json' || item.name === 'studyRoom_info.json') return wrapper;
  
  const isVisible = visibleData[item.relPath] !== false; 
  const icon = isFolder ? '📁' : '📝';

  row.style.cssText = `
    padding: 6px; cursor: pointer; border-radius: 4px; color: ${isVisible ? '#d4d4d4' : '#666'}; 
    font-size: 14px; user-select: none; display: flex; align-items: center; margin-left: ${depth * 15}px;
    transition: background 0.2s, color 0.2s; border: 1px solid transparent; gap: 8px;
  `;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox'; 
  checkbox.checked = isVisible; 
  checkbox.style.cssText = `cursor: pointer; transform: scale(1.2); margin: 0;`;
  
  checkbox.onclick = async (e) => {
    e.stopPropagation();
    const checked = checkbox.checked;
    
    const applyVisibilityToAll = (node: any, state: boolean) => {
      if (node.name !== 'visible.json' && node.name !== 'studyRoom_info.json') {
        visibleData[node.relPath] = state;
      }
      if (node.children) {
        node.children.forEach((child: any) => applyVisibilityToAll(child, state));
      }
    };

    applyVisibilityToAll(item, checked);
    refreshVisibilityUI();

    if ((window as any).api) {
      if ((window as any).api.updateStudyRoomInfo) {
        await (window as any).api.updateStudyRoomInfo(visibleData);
        await updateVersionDisplay(); 
      } else if ((window as any).api.updateVisibleJson) {
        await (window as any).api.updateVisibleJson(visibleData);
      }
    }
    // 🌟 대장님 요청: 체크박스 눌러도 자동 배포하지 않음! 로컬에만 저장!
  };

  const titleSpan = document.createElement('span'); 
  titleSpan.innerText = `${icon} ${item.name}`;

  row.appendChild(checkbox); 
  row.appendChild(titleSpan);

  let childrenContainer: HTMLElement | null = null;
  if (isFolder && item.children) {
    childrenContainer = document.createElement('div');
    if (collapsedFolders.has(item.relPath)) {
      childrenContainer.style.display = 'none';
    }
    item.children.forEach((child: any) => childrenContainer!.appendChild(createTreeElement(child, depth + 1)));
  }

  if (isFolder) {
    const toggleSpan = document.createElement('span');
    const isCollapsed = collapsedFolders.has(item.relPath);
    toggleSpan.innerText = isCollapsed ? '➕' : '➖';
    toggleSpan.style.cssText = `
      margin-left: auto; font-size: 10px; cursor: pointer; user-select: none; 
      padding: 3px 6px; background: rgba(255,255,255,0.1); border-radius: 4px; transition: background 0.2s;
    `;
    
    toggleSpan.onmouseenter = () => toggleSpan.style.background = 'rgba(255,255,255,0.3)';
    toggleSpan.onmouseleave = () => toggleSpan.style.background = 'rgba(255,255,255,0.1)';

    toggleSpan.onclick = (e) => {
      e.stopPropagation(); 
      if (collapsedFolders.has(item.relPath)) {
        collapsedFolders.delete(item.relPath);
        toggleSpan.innerText = '➖';
        if (childrenContainer) childrenContainer.style.display = 'block';
      } else {
        collapsedFolders.add(item.relPath);
        toggleSpan.innerText = '➕';
        if (childrenContainer) childrenContainer.style.display = 'none';
      }
    };
    row.appendChild(toggleSpan);
  }

  row.onmouseenter = () => { if (currentSelectedRow !== row) row.style.background = 'rgba(255,255,255,0.1)'; };
  row.onmouseleave = () => { if (currentSelectedRow !== row) row.style.background = 'transparent'; };

  row.onclick = async () => { 
    if (currentSelectedRow && currentSelectedRow !== row) {
      currentSelectedRow.style.background = 'transparent'; currentSelectedRow.style.borderColor = 'transparent';
    }
    currentSelectedRow = row;
    row.style.background = 'rgba(76, 199, 26, 0.2)'; row.style.borderColor = '#4cc71a'; 
    if (!isFolder) renderFileView(item); 
  };

  row.oncontextmenu = (e) => {
    e.preventDefault();
    if (!isFolder) return;
    
    const oldMenu = document.getElementById('smarty-context-menu');
    if (oldMenu) oldMenu.remove();

    const menu = document.createElement('div');
    menu.id = 'smarty-context-menu';
    menu.style.cssText = `position: fixed; top: ${e.clientY}px; left: ${e.clientX}px; background: #2c2c2c; border: 1px solid #4cc71a; border-radius: 6px; padding: 5px; z-index: 999999; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: flex; flex-direction: column; gap: 2px; min-width: 150px;`;

    const createBtn = createMenuButton("📁 새 폴더 만들기", "#4cc71a", async () => {
      const folderName = prompt("새 폴더 이름을 입력하세요:");
      if (folderName) { 
        await (window as any).api.createStudyFolder(item.path, folderName); 
        await autoDeployToGit("새 폴더 생성"); 
        loadTreeView(); 
      }
      menu.remove();
    });
    
    const uploadBtn = createMenuButton("⬆️ 파일 업로드", "#3498db", async () => {
      menu.remove();
      if ((window as any).api && (window as any).api.uploadStudyFile) {
        const uploadedItem = await (window as any).api.uploadStudyFile(item.path);
        if (uploadedItem) { 
          collapsedFolders.delete(item.relPath);
          await autoDeployToGit("파일 업로드"); 
          loadTreeView(); 
          renderFileView(uploadedItem); 
        }
      }
    });
    
    const deleteBtn = createMenuButton("🗑️ 폴더 삭제", "#ff6b6b", async () => {
      if (confirm(`'${item.name}' 폴더를 삭제하시겠습니까?`)) {
        try {
          if ((window as any).api && (window as any).api.deleteStudyItem) {
            await (window as any).api.deleteStudyItem(item.path);
            await autoDeployToGit("폴더 삭제"); 
            loadTreeView(); 
            const rightPanel = document.getElementById('manager-right-panel'); if(rightPanel) rightPanel.innerHTML = '';
          }
        } catch (error) { alert("폴더 삭제에 실패했습니다."); }
      }
      menu.remove();
    });

    menu.appendChild(createBtn); menu.appendChild(uploadBtn); menu.appendChild(deleteBtn);
    document.body.appendChild(menu); document.addEventListener('click', () => menu.remove(), { once: true });
  };
  
  wrapper.appendChild(row);
  if (childrenContainer) wrapper.appendChild(childrenContainer);
  
  return wrapper;
}

function createMenuButton(text: string, hoverColor: string, onClick: () => void) {
  const btn = document.createElement('button'); btn.innerText = text;
  btn.style.cssText = `padding: 10px; background: transparent; border: none; color: white; cursor: pointer; text-align: left; border-radius: 4px; font-weight: bold;`;
  btn.onmouseenter = () => btn.style.background = hoverColor; btn.onmouseleave = () => btn.style.background = 'transparent'; btn.onclick = onClick;
  return btn;
}

function renderFileView(item: any) {
  const rightPanel = document.getElementById('manager-right-panel');
  if (!rightPanel) return;

  if (managerPreviewWorkspace) { managerPreviewWorkspace.dispose(); managerPreviewWorkspace = null; }

  let rawHelpData = item.help || '저장된 도움말(txt)이 없습니다.';
  let formattedHelp = rawHelpData.replace(/\r/g, '').replace(/\n{3,}/g, '\n\n').replace(/\n\n/g, '<div style="height: 0.8em;"></div>').replace(/\n/g, '<br>');

  rightPanel.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-shrink: 0;">
      <h2 style="margin: 0; color: #fff; font-size: 20px;">📝 ${item.name}</h2>
      <div style="display: flex; gap: 8px;">
        <button id="btn-rename-file" style="padding: 8px 15px; background: #f39c12; border: none; color: white; border-radius: 4px; cursor: pointer; font-weight: bold;">✏️ 이름 변경</button>
        <button id="btn-delete-file" style="padding: 8px 15px; background: #e74c3c; border: none; color: white; border-radius: 4px; cursor: pointer; font-weight: bold;">🗑️ 삭제</button>
      </div>
    </div>
    <div id="file-view-container" style="flex: 1; display: flex; flex-direction: row; overflow: hidden; background: #111; border: 1px solid #3c3c3c; border-radius: 8px;">
      <div id="block-panel" style="width: 60%; position: relative; flex-shrink: 0;">
        <div style="position: absolute; top:0; left:0; width:100%; padding: 5px; background: rgba(255,255,255,0.1); color:#aaa; font-size:12px; z-index:10; text-align:center;">🧩 블록 프로그램</div>
        <div id="admin-blockly-preview" style="position: absolute; top:0; left:0; width:100%; height:100%;"></div>
      </div>
      <div id="view-resizer" style="width: 6px; background: #333; cursor: col-resize; z-index: 11; transition: background 0.2s; display: flex; justify-content: center; align-items: center;"><div style="width: 2px; height: 30px; background: #666; border-radius: 2px;"></div></div>
      <div id="help-panel" style="flex: 1; background: #1e1e1e; padding: 20px; overflow-y: auto; box-sizing: border-box;"><h3 style="margin-top: 0; color:#4cc71a; border-bottom: 1px solid #333; padding-bottom: 10px;">📖 도움말 내용</h3><div id="smarty-help-viewer" style="color: #d4d4d4; font-size: 14px; line-height: 1.4;">${formattedHelp}</div></div>
    </div>
  `;

  const resizer = document.getElementById('view-resizer')!; const blockPanel = document.getElementById('block-panel')!; const container = document.getElementById('file-view-container')!;
  let isResizing = false;
  resizer.onmousedown = (e) => { isResizing = true; resizer.style.background = '#4cc71a'; document.body.style.cursor = 'col-resize'; e.preventDefault(); };
  const onMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const containerRect = container.getBoundingClientRect(); let newWidth = e.clientX - containerRect.left;
    if (newWidth < 200) newWidth = 200; if (newWidth > containerRect.width - 200) newWidth = containerRect.width - 200;
    blockPanel.style.width = `${newWidth}px`; if (managerPreviewWorkspace) Blockly.svgResize(managerPreviewWorkspace);
  };
  const onMouseUp = () => { if (isResizing) { isResizing = false; resizer.style.background = '#333'; document.body.style.cursor = 'default'; if (managerPreviewWorkspace) Blockly.svgResize(managerPreviewWorkspace); }};
  document.addEventListener('mousemove', onMouseMove); document.addEventListener('mouseup', onMouseUp);

  document.getElementById('btn-rename-file')!.onclick = async () => {
    const newName = prompt("새 파일명을 입력하세요 (확장자 제외):", item.name.replace('.json',''));
    if (newName) {
      if ((window as any).api && (window as any).api.renameStudyItem) {
        await (window as any).api.renameStudyItem(item.path, newName);
        await autoDeployToGit("이름 변경");
        rightPanel.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; color:#aaa; font-size:16px;">✏️ 이름이 변경되었습니다.</div>`;
        loadTreeView();
      }
    }
  };

  document.getElementById('btn-delete-file')!.onclick = async () => {
    if (confirm(`'${item.name}' 파일을 삭제하시겠습니까?`)) {
      if ((window as any).api && (window as any).api.deleteStudyItem) { 
        await (window as any).api.deleteStudyItem(item.path); 
        await autoDeployToGit("파일 삭제");
        rightPanel.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; color:#aaa; font-size:16px;">🗑️ 파일이 삭제되었습니다.</div>`;
        loadTreeView();
      }
    }
  };

  setTimeout(() => {
    const previewDiv = document.getElementById('admin-blockly-preview'); if (!previewDiv) return;
    managerPreviewWorkspace = Blockly.inject(previewDiv, { readOnly: true, scrollbars: true, trashcan: false, renderer: 'zelos', theme: (Blockly.Themes as any).Dark, move: { scrollbars: true, drag: true, wheel: true }, zoom: { controls: true, wheel: true } });
    if (item.code) { Blockly.serialization.workspaces.load(typeof item.code === 'string' ? JSON.parse(item.code) : item.code, managerPreviewWorkspace); setTimeout(() => { managerPreviewWorkspace!.zoomToFit(); }, 100); }
  }, 100);
}