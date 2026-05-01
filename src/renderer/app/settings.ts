/*================
src/renderer/app/settings.ts
===============*/
import * as Blockly from 'blockly';
import pkg from '../../../package.json'; 

const GITHUB_OWNER = 'xeders26'; 
const GITHUB_REPO = 'smarty_update';   
const FILE_PATH = 'smarty-config.json'; 

// =========================================================
// 🚀 관리자 전용 Git 연동 모달 (다크모드 & 한 줄 디자인 적용)
// =========================================================
function openAdminGitSyncModal() {
  if (document.getElementById('smarty-admin-git-modal')) return;

  const overlay = document.createElement('div');
  overlay.id = 'smarty-admin-git-modal';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: rgba(0, 0, 0, 0.85); z-index: 999999;
    display: flex; justify-content: center; align-items: center;
    font-family: 'Pretendard', sans-serif;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: #1e1e1e; padding: 25px; border-radius: 12px;
    width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    color: #f1f1f1; position: relative; border: 1px solid #333;
  `;

  const savedToken = localStorage.getItem('smarty_admin_token') || '';

  modal.innerHTML = `
    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #ff4081; text-align: center;">⚙️ 관리자 원격 제어소</h3>
    
    <!-- 🔑 Step 1: 비밀번호 인증 -->
    <div id="adminStep1">
      <p style="font-size: 13px; color: #aaa; margin-bottom: 10px; text-align:center;">관리자 권한을 인증해주세요.</p>
      <input type="password" id="adminPwd" placeholder="비밀번호 입력" style="width: 100%; padding: 10px; background: #2d2d2d; color: #fff; border: 1px solid #444; border-radius: 6px; box-sizing: border-box; text-align:center; outline: none;">
      <p id="adminErrMsg" style="color: #ff5252; font-size: 12px; text-align: center; height: 14px; margin: 8px 0;"></p>
      <button id="btnAuth" style="width: 100%; padding: 10px; background: #ff4081; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">인증하기</button>
    </div>

    <!-- 🛠 Step 2: 설정 관리 -->
    <div id="adminStep2" style="display: none;">
      <div style="margin-bottom: 15px; background: rgba(255, 64, 129, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 64, 129, 0.3);">
        <label style="font-size: 11px; color: #ff4081; font-weight: bold;">🔑 GitHub 관리자 토큰</label>
        <div style="display: flex; gap: 5px; margin-top: 5px;">
          <input type="password" id="adminTokenInput" value="${savedToken}" placeholder="토큰 입력 후 엔터" style="flex: 1; padding: 6px; background: #2d2d2d; color: #fff; border: 1px solid #444; border-radius:4px; box-sizing: border-box; outline: none;">
          <button id="btnFetchGit" style="padding: 0 12px; background: #d32f2f; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer; transition: 0.2s;">🔄 가져오기</button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; max-height: 220px; overflow-y: auto; padding-right: 5px;">
        ${['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].map(id => `
          <div style="background: #252525; padding: 8px 12px; border-radius: 6px; border: 1px solid #333; display: flex; align-items: center; justify-content: space-between;">
            <div style="font-size: 13px; font-weight: bold; color: #4ae0c2; flex: 1;">${id}</div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <label style="font-size: 12px; color: #ccc; display: flex; align-items: center; gap: 4px;">
                Min
                <input type="number" id="min_${id}" style="width: 50px; padding: 4px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius:4px; outline: none; text-align: center;">
              </label>
              <label style="font-size: 12px; color: #ccc; display: flex; align-items: center; gap: 4px;">
                Max
                <input type="number" id="max_${id}" style="width: 50px; padding: 4px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius:4px; outline: none; text-align: center;">
              </label>
            </div>
          </div>
        `).join('')}
      </div>

      <p id="gitStatusMsg" style="color: #64b5f6; font-size: 12px; text-align: center; height: 14px; margin: 15px 0; font-weight:bold;"></p>
      
      <div style="display: flex; gap: 10px;">
        <button id="btnAdminCancel" style="flex: 1; padding: 12px; background: #444; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">❌ 취소</button>
        <button id="btnGitPush" style="flex: 2; padding: 12px; background: #2196F3; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">🚀 Git 배포</button>
      </div>
    </div>
    
    <button id="btnAdminClose" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 18px; cursor: pointer; color: #666; transition: 0.2s;">✖</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // 스타일 (스크롤바 숨기기 및 넘버 인풋 화살표 숨기기)
  const style = document.createElement('style');
  style.innerHTML = `
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
    input[type=number] { -moz-appearance: textfield; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #555; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #777; }
  `;
  document.head.appendChild(style);

  // 버튼 Hover 효과
  const addHover = (id: string, color: string, hoverColor: string) => {
    const el = document.getElementById(id);
    if(el) {
      el.addEventListener('mouseenter', () => el.style.background = hoverColor);
      el.addEventListener('mouseleave', () => el.style.background = color);
    }
  }
  addHover('btnAuth', '#ff4081', '#f50057');
  addHover('btnFetchGit', '#d32f2f', '#b71c1c');
  addHover('btnAdminCancel', '#444', '#555');
  addHover('btnGitPush', '#2196F3', '#1976D2');
  
  const btnClose = document.getElementById('btnAdminClose');
  if(btnClose) {
    btnClose.addEventListener('mouseenter', () => btnClose.style.color = '#fff');
    btnClose.addEventListener('mouseleave', () => btnClose.style.color = '#666');
    btnClose.addEventListener('click', () => { overlay.remove(); style.remove(); });
  }

  document.getElementById('btnAdminCancel')?.addEventListener('click', () => { overlay.remove(); style.remove(); });

  const fetchSettings = async () => {
    const statusMsg = document.getElementById('gitStatusMsg')!;
    const token = (document.getElementById('adminTokenInput') as HTMLInputElement).value;
    if (!token) { statusMsg.style.color = '#ffb300'; statusMsg.innerText = "⚠️ 토큰을 입력해주세요!"; return; }
    localStorage.setItem('smarty_admin_token', token);
    statusMsg.style.color = '#64b5f6'; statusMsg.innerText = "⏳ 불러오는 중...";
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`, { headers: { 'Authorization': `token ${token}`, 'Cache-Control': 'no-cache' } });
      if (res.ok) {
        const apiData = await res.json();
        const data = JSON.parse(decodeURIComponent(escape(atob(apiData.content))));
        ['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].forEach(id => {
          if (data[id]) {
            (document.getElementById(`min_${id}`) as HTMLInputElement).value = data[id].min;
            (document.getElementById(`max_${id}`) as HTMLInputElement).value = data[id].max;
          }
        });
        statusMsg.style.color = '#4ae0c2'; statusMsg.innerText = "✅ 로드 완료!";
      } else { statusMsg.style.color = '#ffb300'; statusMsg.innerText = "⚠️ 파일이 없습니다."; }
    } catch (e) { statusMsg.style.color = '#ff5252'; statusMsg.innerText = "❌ 실패!"; }
  };

  const authenticate = () => {
    if ((document.getElementById('adminPwd') as HTMLInputElement).value === 'smartygood') {
      document.getElementById('adminStep1')!.style.display = 'none';
      document.getElementById('adminStep2')!.style.display = 'block';
      if ((document.getElementById('adminTokenInput') as HTMLInputElement).value) fetchSettings();
    } else {
      document.getElementById('adminErrMsg')!.innerText = "비밀번호 오류";
    }
  };

  document.getElementById('btnAuth')?.addEventListener('click', authenticate);
  document.getElementById('adminPwd')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') authenticate(); });

  document.getElementById('btnFetchGit')?.addEventListener('click', fetchSettings);
  document.getElementById('adminTokenInput')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') fetchSettings(); });

  document.getElementById('btnGitPush')?.addEventListener('click', async () => {
    const statusMsg = document.getElementById('gitStatusMsg')!;
    const btnPush = document.getElementById('btnGitPush') as HTMLButtonElement;
    const token = (document.getElementById('adminTokenInput') as HTMLInputElement).value;
    if (!token) { statusMsg.style.color = '#ff5252'; statusMsg.innerText = "❌ 토큰 필요"; return; }
    localStorage.setItem('smarty_admin_token', token);
    const newConfig: any = {};
    ['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].forEach(id => {
      newConfig[id] = { min: parseInt((document.getElementById(`min_${id}`) as HTMLInputElement).value) || 0, max: parseInt((document.getElementById(`max_${id}`) as HTMLInputElement).value) || 180 };
    });
    btnPush.disabled = true; btnPush.style.background = '#444'; statusMsg.style.color = '#64b5f6'; statusMsg.innerText = "🔄 배포 중...";
    try {
      const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
      const headers = { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' };
      let fileSha = '';
      const getRes = await fetch(apiUrl, { headers });
      if (getRes.ok) fileSha = (await getRes.json()).sha;
      const putRes = await fetch(apiUrl, { method: 'PUT', headers, body: JSON.stringify({ message: '🚀 설정 업데이트', content: btoa(unescape(encodeURIComponent(JSON.stringify(newConfig, null, 2)))), sha: fileSha || undefined }) });
      
      if (putRes.ok) { 
        statusMsg.style.color = '#4ae0c2'; 
        statusMsg.innerText = "🎉 배포 성공!"; 
        window.dispatchEvent(new CustomEvent('smartyConfigUpdated', { detail: newConfig }));
        setTimeout(() => { overlay.remove(); style.remove(); }, 2000); 
      } else {
        throw new Error('Upload Failed');
      }
    } catch (e) { 
      statusMsg.style.color = '#ff5252'; 
      statusMsg.innerText = "❌ 배포 실패!"; 
      btnPush.disabled = false; 
      btnPush.style.background = '#2196F3'; 
    }
  });
}

// =========================================================
// 🌟 최신 정보 받아오기
// =========================================================
export async function fetchLatestDataFromGit() {
  const statusEl = document.createElement('div');
  statusEl.style.cssText = `
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    background: #4ae0c2; color: #1e1e1e; padding: 12px 25px; border-radius: 30px;
    font-weight: bold; font-family: 'Pretendard', sans-serif; z-index: 999999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5); font-size: 14px;
  `;
  statusEl.innerText = "🔄 서버에서 최신 데이터를 가져오는 중입니다...";
  document.body.appendChild(statusEl);
  try {
    const configRes = await fetch(`https://raw.githubusercontent.com/xeders26/smarty_update/main/smarty-config.json?t=${Date.now()}`);
    if (configRes.ok) window.dispatchEvent(new CustomEvent('smartyConfigUpdated', { detail: await configRes.json() }));
    window.dispatchEvent(new Event('smartyExamplesUpdated'));
    statusEl.innerText = "🎉 가져오기 완료! 최신 예제와 설정이 적용되었습니다.";
    setTimeout(() => statusEl.remove(), 2500);
  } catch (error) {
    statusEl.style.background = '#ff5252'; statusEl.style.color = 'white'; 
    statusEl.innerText = "❌ 가져오기 실패! 인터넷 연결을 확인해주세요.";
    setTimeout(() => statusEl.remove(), 3000);
  }
}

// =========================================================
// ⚙️ 환경설정 UI 초기화 (HTML 훼손 없는 가장 깔끔한 버전)
// =========================================================
export function initSettingsModal(callbacks: {
  updateVisibility: (code: boolean, monitor: boolean) => void;
  applyTheme: (theme: string) => void;
  getState: () => { code: boolean; monitor: boolean; theme: string };
}) {

  const versionElement = document.getElementById('smartyVersionText');
  if (versionElement) {
    versionElement.innerText = `v${pkg.version}`; // ex) "v2.6.7" 로 자동 변경
  }
  const appSettingsBtn = document.getElementById('settingsBtn');
  const appSettingsModal = document.getElementById('settingsModal');
  const appSaveSettingsBtn = document.getElementById('saveSettingsBtn');
  const appCancelSettingsBtn = document.getElementById('cancelSettingsBtn');
  const appCodeRadios = document.getElementsByName('codeToggle') as NodeListOf<HTMLInputElement>;
  const appMonitorRadios = document.getElementsByName('monitorToggle') as NodeListOf<HTMLInputElement>;
  const appThemeRadios = document.getElementsByName('themeToggle') as NodeListOf<HTMLInputElement>;
  
  let appBackupState = { code: true, monitor: true, theme: 'auto' };

  if (appSettingsBtn && appSettingsModal) {
    appSettingsBtn.addEventListener('click', () => {
      const currentState = callbacks.getState();
      appBackupState = { ...currentState };
      
      appCodeRadios.forEach(r => r.checked = (r.value === 'show' ? currentState.code : !currentState.code));
      appMonitorRadios.forEach(r => r.checked = (r.value === 'show' ? currentState.monitor : !currentState.monitor));
      appThemeRadios.forEach(r => r.checked = (r.value === currentState.theme));
      
      appSettingsModal.style.display = 'flex';
    });
  }

  // 버튼 이벤트 리스너들
  appCodeRadios.forEach(r => r.addEventListener('change', (e) => { 
    callbacks.updateVisibility((e.target as HTMLInputElement).value === 'show', callbacks.getState().monitor); 
  }));
  appMonitorRadios.forEach(r => r.addEventListener('change', (e) => { 
    callbacks.updateVisibility(callbacks.getState().code, (e.target as HTMLInputElement).value === 'show'); 
  }));
  appThemeRadios.forEach(r => r.addEventListener('change', (e) => { 
    callbacks.applyTheme((e.target as HTMLInputElement).value); 
  }));

  if (appCancelSettingsBtn && appSettingsModal) {
    appCancelSettingsBtn.addEventListener('click', () => {
      callbacks.updateVisibility(appBackupState.code, appBackupState.monitor);
      callbacks.applyTheme(appBackupState.theme);
      appSettingsModal.style.display = 'none';
    });
  }
  if (appSaveSettingsBtn && appSettingsModal) appSaveSettingsBtn.addEventListener('click', () => appSettingsModal.style.display = 'none');

  // HTML에 고정된 추가 버튼 이벤트 연결 (DOM 추가 없이 연결만)
  document.getElementById('smartyCloseModalBtn')?.addEventListener('click', () => appSettingsModal!.style.display = 'none');
  
  document.getElementById('btnFetchLatest')?.addEventListener('click', () => { 
    appSettingsModal!.style.display = 'none'; 
    fetchLatestDataFromGit(); 
  });
  
  document.getElementById('btnOpenAdmin')?.addEventListener('click', () => { 
    appSettingsModal!.style.display = 'none'; 
    openAdminGitSyncModal(); 
  });
}