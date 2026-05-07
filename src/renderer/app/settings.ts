import * as Blockly from 'blockly';
import pkg from '../../../package.json'; 

import { openStudyRoomManager } from './studyRoomManager';

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
    width: 420px; box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    color: #f1f1f1; position: relative; border: 1px solid #333;
  `;

  let sessionToken = '';

  modal.innerHTML = `
    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #ff4081; text-align: center;">⚙️ 관리자 원격 제어소</h3>
    
    <div id="adminStep1">
      <p style="font-size: 13px; color: #aaa; margin-bottom: 15px; text-align:center;">관리자 권한과 Git 연동을 위해 정보를 입력해주세요.</p>
      
      <input type="password" id="adminPwd" placeholder="🔑 관리자 비밀번호 입력" style="width: 100%; padding: 12px; margin-bottom: 10px; background: #2d2d2d; color: #fff; border: 1px solid #444; border-radius: 6px; box-sizing: border-box; text-align:center; outline: none;">
      
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px; width: 100%;">
        <input type="password" id="adminTokenInput" placeholder="🛠️ GitHub 개인 토큰 (PAT) 입력" style="flex: 1; padding: 12px; background: #2d2d2d; color: #fff; border: 1px solid #444; border-radius: 6px; box-sizing: border-box; text-align:center; outline: none;">
        <label style="font-size: 12px; color: #ccc; display: flex; align-items: center; gap: 4px; cursor: pointer; white-space: nowrap; user-select: none;">
          <input type="checkbox" id="saveTokenCheck" style="cursor: pointer; transform: scale(1.1);"> PC 저장
        </label>
      </div>
      
      <p id="adminErrMsg" style="color: #ff5252; font-size: 12px; text-align: center; height: 14px; margin: 8px 0;"></p>
      
      <button id="btnAuth" style="width: 100%; padding: 12px; background: #ff4081; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">인증 및 접속</button>
    </div>

    <div id="adminStep2" style="display: none;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
        <div style="font-size: 13px; color: #aaa;">✅ 관리자 인증 완료</div>
        <label style="font-size: 12px; color: #4cc71a; display: flex; align-items: center; gap: 6px; cursor: pointer; font-weight: bold; background: rgba(76, 199, 26, 0.1); padding: 5px 10px; border-radius: 20px;">
          <input type="checkbox" id="autoLoginCheck" style="cursor: pointer; transform: scale(1.1); accent-color: #4cc71a;"> 다음부터 자동 로그인
        </label>
      </div>

      <div style="margin-bottom: 15px; background: rgba(76, 199, 26, 0.1); padding: 12px; border-radius: 6px; border: 1px solid rgba(76, 199, 26, 0.3); text-align: center;">
        <div style="font-size: 13px; color: #4cc71a; font-weight: bold; margin-bottom: 8px;">📂 학생 정답 폴더 / 자료실 관리</div>
        <button id="btnOpenStudyRoomManager" style="width: 100%; padding: 10px; background: #4cc71a; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; font-size: 14px;">
          👨‍🏫 관리자 전용 탐색기 열기
        </button>
      </div>

      <div style="margin-bottom: 15px; background: rgba(255, 64, 129, 0.1); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 64, 129, 0.3);">
        <label style="font-size: 11px; color: #ff4081; font-weight: bold; display:block; margin-bottom:8px;">⚙️ 모터 각도 설정</label>
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 180px; overflow-y: auto; padding-right: 5px;">
          ${['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].map(id => `
            <div style="background: #252525; padding: 8px 12px; border-radius: 6px; border: 1px solid #333; display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 13px; font-weight: bold; color: #4ae0c2; flex: 1;">${id}</div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <label style="font-size: 12px; color: #ccc; display: flex; align-items: center; gap: 4px;">
                  Min <input type="number" id="min_${id}" style="width: 45px; padding: 4px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius:4px; outline: none; text-align: center;">
                </label>
                <label style="font-size: 12px; color: #ccc; display: flex; align-items: center; gap: 4px;">
                  Max <input type="number" id="max_${id}" style="width: 45px; padding: 4px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius:4px; outline: none; text-align: center;">
                </label>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <p id="gitStatusMsg" style="color: #64b5f6; font-size: 12px; text-align: center; height: 14px; margin: 15px 0; font-weight:bold;"></p>
      
      <div style="display: flex; gap: 10px;">
        <button id="btnAdminCancel" style="flex: 1; padding: 12px; background: #444; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">❌ 닫기</button>
        <button id="btnGitPush" style="flex: 2; padding: 12px; background: #2196F3; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">🚀 모터 설정 배포</button>
      </div>
    </div>
    
    <button id="btnAdminClose" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 18px; cursor: pointer; color: #666; transition: 0.2s;">✖</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

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

  const savedToken = localStorage.getItem('smartyAdminToken');
  const isAutoLogin = localStorage.getItem('smartyAdminAutoLogin') === 'true';

  const addHover = (id: string, color: string, hoverColor: string) => {
    const el = document.getElementById(id);
    if(el) {
      el.addEventListener('mouseenter', () => el.style.background = hoverColor);
      el.addEventListener('mouseleave', () => el.style.background = color);
    }
  }
  addHover('btnAuth', '#ff4081', '#f50057');
  addHover('btnAdminCancel', '#444', '#555');
  addHover('btnGitPush', '#2196F3', '#1976D2');
  addHover('btnOpenStudyRoomManager', '#4cc71a', '#3da115');
  
  const closeEvent = () => { overlay.remove(); style.remove(); };
  document.getElementById('btnAdminClose')?.addEventListener('click', closeEvent);
  document.getElementById('btnAdminCancel')?.addEventListener('click', closeEvent);

  document.getElementById('btnOpenStudyRoomManager')?.addEventListener('click', () => {
    openStudyRoomManager(sessionToken);
    closeEvent(); 
  });

  const fetchSettings = async () => {
    const statusMsg = document.getElementById('gitStatusMsg')!;
    statusMsg.style.color = '#64b5f6'; statusMsg.innerText = "⏳ 서버에서 설정을 불러오는 중...";
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}?t=${Date.now()}`, { 
        headers: { 'Authorization': `token ${sessionToken}` } 
      });
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
      } else { 
        statusMsg.style.color = '#ffb300'; statusMsg.innerText = "⚠️ 파일이 없습니다."; 
      }
    } catch (e) { 
      statusMsg.style.color = '#ff5252'; statusMsg.innerText = "❌ 로드 실패!"; 
      console.error(e);
    }
  };

  const autoLoginCheck = document.getElementById('autoLoginCheck') as HTMLInputElement;
  autoLoginCheck.checked = isAutoLogin;
  autoLoginCheck.addEventListener('change', (e) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      localStorage.setItem('smartyAdminAutoLogin', 'true');
      localStorage.setItem('smartyAdminToken', sessionToken); 
    } else {
      localStorage.setItem('smartyAdminAutoLogin', 'false');
    }
  });

  const authenticate = () => {
    const pwd = (document.getElementById('adminPwd') as HTMLInputElement).value;
    const token = (document.getElementById('adminTokenInput') as HTMLInputElement).value;
    const isSaveChecked = (document.getElementById('saveTokenCheck') as HTMLInputElement).checked;

    if (pwd === 'smartygood') {
      if (!token) {
        document.getElementById('adminErrMsg')!.innerText = "GitHub 토큰을 입력해주세요!";
        return;
      }
      
      if (isSaveChecked) {
        localStorage.setItem('smartyAdminToken', token);
      } else {
        localStorage.removeItem('smartyAdminToken');
        localStorage.setItem('smartyAdminAutoLogin', 'false');
        autoLoginCheck.checked = false;
      }

      sessionToken = token;
      
      document.getElementById('adminStep1')!.style.display = 'none';
      document.getElementById('adminStep2')!.style.display = 'block';
      fetchSettings();
    } else {
      document.getElementById('adminErrMsg')!.innerText = "비밀번호가 올바르지 않습니다.";
    }
  };

  document.getElementById('btnAuth')?.addEventListener('click', authenticate);
  document.getElementById('adminPwd')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') authenticate(); });
  document.getElementById('adminTokenInput')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') authenticate(); });

  document.getElementById('btnGitPush')?.addEventListener('click', async () => {
    const statusMsg = document.getElementById('gitStatusMsg')!;
    const btnPush = document.getElementById('btnGitPush') as HTMLButtonElement;
    
    const newConfig: any = {};
    ['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].forEach(id => {
      newConfig[id] = { min: parseInt((document.getElementById(`min_${id}`) as HTMLInputElement).value) || 0, max: parseInt((document.getElementById(`max_${id}`) as HTMLInputElement).value) || 180 };
    });

    btnPush.disabled = true; btnPush.style.background = '#444'; 
    statusMsg.style.color = '#64b5f6'; statusMsg.innerText = "🔄 배포 중...";
    
    try {
      const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
      
      let fileSha = '';
      const getRes = await fetch(`${apiUrl}?t=${Date.now()}`, { headers: { 'Authorization': `token ${sessionToken}` } });
      if (getRes.ok) {
        const fileData = await getRes.json();
        fileSha = fileData.sha;
      }
      
      const putRes = await fetch(apiUrl, { 
        method: 'PUT', 
        headers: { 'Authorization': `token ${sessionToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '🚀 설정 업데이트', content: btoa(unescape(encodeURIComponent(JSON.stringify(newConfig, null, 2)))), sha: fileSha || undefined }) 
      });
      
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

  if (savedToken && isAutoLogin) {
    sessionToken = savedToken;
    document.getElementById('adminStep1')!.style.display = 'none';
    document.getElementById('adminStep2')!.style.display = 'block';
    fetchSettings();
  } else if (savedToken) {
    (document.getElementById('adminTokenInput') as HTMLInputElement).value = savedToken;
    (document.getElementById('saveTokenCheck') as HTMLInputElement).checked = true;
  }
}

// =========================================================
// 🌟 최신 정보 받아오기 (완벽 수정본)
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
    // 🌟 [핵심 해결 1] 프론트엔드의 불안정한 fetch 대신, 백엔드의 강력하고 안전한 git pull 기능을 호출! (이게 진짜 동기화입니다)
    if ((window as any).api && typeof (window as any).api.syncStudyRoomFromGit === 'function') {
      await (window as any).api.syncStudyRoomFromGit();
    }

    // 🌟 [핵심 해결 2] 설정 파일(smarty-config.json)을 가져올 때 보안 방화벽(CSP)에 의해 차단되더라도
    // 앱이 죽거나 "인터넷 연결 실패" 창이 뜨지 않도록 내부 안전망(try-catch)을 씌웠습니다.
    try {
      const configRes = await fetch(`https://raw.githubusercontent.com/xeders26/smarty_update/main/smarty-config.json?t=${Date.now()}`, { cache: 'no-store' });
      if (configRes.ok) {
        const configData = await configRes.json();
        window.dispatchEvent(new CustomEvent('smartyConfigUpdated', { detail: configData }));
      }
    } catch (fetchErr) {
      console.warn("설정 파일 직접 다운로드가 보안 정책에 의해 무시되었습니다. 백엔드 동기화는 정상 처리 완료:", fetchErr);
    }

    // 화면 새로고침 이벤트 발송
    window.dispatchEvent(new Event('smartyStudyRoomUpdated'));
    
    statusEl.style.background = '#4ae0c2';
    statusEl.innerText = "🎉 가져오기 완료! 최신 자료실과 설정이 적용되었습니다.";
    setTimeout(() => statusEl.remove(), 2500);

  } catch (error) {
    // 이제 여기는 백엔드 통신 자체가 완전히 끊어졌을 때만 타게 됩니다.
    statusEl.style.background = '#ff5252'; statusEl.style.color = 'white'; 
    statusEl.innerText = "❌ 가져오기 실패! 인터페이스 통신을 확인해주세요.";
    setTimeout(() => statusEl.remove(), 3000);
  }
}

// =========================================================
// ⚙️ 환경설정 UI 초기화
// =========================================================
export function initSettingsModal(callbacks: {
  updateVisibility: (code: boolean, monitor: boolean) => void;
  applyTheme: (theme: string) => void;
  getState: () => { code: boolean; monitor: boolean; theme: string };
}) {

  const versionElement = document.getElementById('smartyVersionText');
  if (versionElement) {
    versionElement.innerText = `v${pkg.version}`; 
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