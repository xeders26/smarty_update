/*================
src/renderer/app/appUI.ts
===============*/
import * as Blockly from 'blockly';
import pkg from '../../../package.json'; 
import brandLogo from '../assets/logo.png'; 

const appThemeColors: any = {
  spring:['#FF4081', '#FF9800', '#FF5722', '#4CAF50', '#00BCD4', '#9C27B0', '#F44336', '#8BC34A', '#E91E63', '#03A9F4'],
  summer:['#1E88E5', '#43A047', '#FDD835', '#4ae0c2', '#00ACC1', '#f6e3ad', '#81D4FA', '#FFB300', '#0288D1', '#8BC34A'],
  winter:['#E53935', '#00da07', '#e51ec7', '#02451b', '#FBC02D', '#D32F2F', '#90CAF9', '#388E3C', '#838485', '#FF8A65']
};

function getAppAutoSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

// =========================================================
// 🚀 [신규 마법] 관리자 전용 Git 연동 모달 (엔터키 & 불러오기 지원)
// =========================================================
function openAdminGitSyncModal() {
  if (document.getElementById('smarty-admin-git-modal')) return;

  // 🚨 대장님의 GitHub 아이디와 저장소 이름 유지!
  const GITHUB_OWNER = 'xeders26'; 
  const GITHUB_REPO = 'smarty_update';   
  const FILE_PATH = 'smarty-config.json'; 

  const overlay = document.createElement('div');
  overlay.id = 'smarty-admin-git-modal';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: rgba(0, 0, 0, 0.8); z-index: 999999;
    display: flex; justify-content: center; align-items: center;
    font-family: 'Pretendard', sans-serif;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: #fff; padding: 25px; border-radius: 12px;
    width: 380px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    color: #333; position: relative;
  `;

  const savedToken = localStorage.getItem('smarty_admin_token') || '';

  modal.innerHTML = `
    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #E91E63; text-align: center;">⚙️ 관리자 원격 제어소</h3>
    
    <div id="adminStep1">
      <p style="font-size: 13px; color: #666; margin-bottom: 10px; text-align:center;">관리자 권한을 인증해주세요.</p>
      <input type="password" id="adminPwd" placeholder="비밀번호 입력" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; text-align:center;">
      <p id="adminErrMsg" style="color: red; font-size: 12px; text-align: center; height: 14px; margin: 8px 0;"></p>
      <button id="btnAuth" style="width: 100%; padding: 10px; background: #E91E63; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">인증하기</button>
    </div>

    <div id="adminStep2" style="display: none;">
      <div style="margin-bottom: 15px; background: #ffebee; padding: 10px; border-radius: 6px; border: 1px solid #ffcdd2;">
        <label style="font-size: 11px; color: #d32f2f; font-weight: bold;">🔑 GitHub 관리자 토큰 (이 PC에만 안전하게 저장됨)</label>
        
        <!-- 🚨 [변경됨] 토큰 입력칸 옆에 '가져오기' 버튼 추가 -->
        <div style="display: flex; gap: 5px; margin-top: 5px;">
          <input type="password" id="adminTokenInput" value="${savedToken}" placeholder="토큰 입력 후 엔터(Enter)" style="flex: 1; padding: 6px; border:1px solid #ccc; border-radius:4px; box-sizing: border-box;">
          <button id="btnFetchGit" style="padding: 0 12px; background: #d32f2f; color: white; border: none; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer;">🔄 가져오기</button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto; padding-right: 5px;">
        ${['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].map(id => `
          <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; border: 1px solid #eee;">
            <div style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">${id}</div>
            <div style="display: flex; gap: 10px;">
              <label style="font-size: 12px; flex: 1;">Min: <input type="number" id="min_${id}" style="width: 100%; padding: 5px; border:1px solid #ccc; border-radius:4px;"></label>
              <label style="font-size: 12px; flex: 1;">Max: <input type="number" id="max_${id}" style="width: 100%; padding: 5px; border:1px solid #ccc; border-radius:4px;"></label>
            </div>
          </div>
        `).join('')}
      </div>

      <p id="gitStatusMsg" style="color: #2196F3; font-size: 12px; text-align: center; height: 14px; margin: 15px 0; font-weight:bold;"></p>
      
      <div style="display: flex; gap: 10px;">
        <button id="btnAdminCancel" style="flex: 1; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">❌ 취소</button>
        <button id="btnGitPush" style="flex: 2; padding: 12px; background: #2196F3; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🚀 Git 저장 및 배포</button>
      </div>
    </div>

    <button id="btnAdminClose" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 18px; cursor: pointer; color: #999;">✖</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById('btnAdminClose')?.addEventListener('click', () => overlay.remove());
  document.getElementById('btnAdminCancel')?.addEventListener('click', () => overlay.remove());

  // 🌟 [추가됨] 데이터를 가져오는 공통 마법 함수
  const fetchSettings = async () => {
    const statusMsg = document.getElementById('gitStatusMsg')!;
    const token = (document.getElementById('adminTokenInput') as HTMLInputElement).value;
    
    if (!token) {
       statusMsg.style.color = '#FF9800';
       statusMsg.innerText = "⚠️ 위에 GitHub 토큰을 먼저 입력해주세요!";
       return;
    }

    // 토큰을 입력하고 엔터를 치거나 가져오기를 누르면 내 PC에 몰래 저장!
    localStorage.setItem('smarty_admin_token', token);

    statusMsg.style.color = '#2196F3';
    statusMsg.innerText = "⏳ 서버에서 최신 설정값을 실시간으로 불러오는 중...";
    
    try {
      const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
      const res = await fetch(apiUrl, {
        headers: { 'Authorization': `token ${token}`, 'Cache-Control': 'no-cache' }
      });
      
      if (res.ok) {
        const apiData = await res.json();
        const decodedStr = decodeURIComponent(escape(atob(apiData.content)));
        const data = JSON.parse(decodedStr);
        
        ['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].forEach(id => {
          if (data[id]) {
            (document.getElementById(`min_${id}`) as HTMLInputElement).value = data[id].min;
            (document.getElementById(`max_${id}`) as HTMLInputElement).value = data[id].max;
          }
        });
        statusMsg.style.color = '#4CAF50';
        statusMsg.innerText = "✅ 최신 데이터 로드 완료!";
      } else {
        statusMsg.style.color = '#FF9800';
        statusMsg.innerText = "⚠️ Git에 설정 파일이 없습니다. 빈 값으로 시작합니다.";
      }
    } catch (e) {
      statusMsg.style.color = 'red';
      statusMsg.innerText = "❌ 토큰 권한이 없거나 불러오지 못했습니다.";
    }
  };

  // 1단계 인증 로직
  document.getElementById('btnAuth')?.addEventListener('click', async () => {
    const pwd = (document.getElementById('adminPwd') as HTMLInputElement).value;
    const errMsg = document.getElementById('adminErrMsg')!;
    
    if (pwd === 'smartygood') {
      document.getElementById('adminStep1')!.style.display = 'none';
      document.getElementById('adminStep2')!.style.display = 'block';
      
      // 이미 저장된 토큰이 있으면 바로 불러오기 실행
      if ((document.getElementById('adminTokenInput') as HTMLInputElement).value) {
        fetchSettings();
      } else {
        document.getElementById('gitStatusMsg')!.innerText = "⚠️ 위에 GitHub 토큰을 먼저 입력해주세요!";
        document.getElementById('gitStatusMsg')!.style.color = '#FF9800';
      }
    } else {
      errMsg.innerText = "비밀번호가 틀렸습니다.";
    }
  });

  // 🌟 [추가됨] 엔터키(Enter)를 누를 때 이벤트
  document.getElementById('adminTokenInput')?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') fetchSettings();
  });

  // 🌟 [추가됨] '가져오기' 버튼을 클릭할 때 이벤트
  document.getElementById('btnFetchGit')?.addEventListener('click', fetchSettings);

  // Git Push 처리 로직
  document.getElementById('btnGitPush')?.addEventListener('click', async () => {
    const statusMsg = document.getElementById('gitStatusMsg')!;
    const btnPush = document.getElementById('btnGitPush') as HTMLButtonElement;
    const token = (document.getElementById('adminTokenInput') as HTMLInputElement).value;
    
    if (!token) {
      statusMsg.style.color = 'red';
      statusMsg.innerText = "❌ GitHub 토큰을 입력해야 배포할 수 있습니다.";
      return;
    }

    localStorage.setItem('smarty_admin_token', token);

    const newConfig: any = {};
    ['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].forEach(id => {
      const minVal = parseInt((document.getElementById(`min_${id}`) as HTMLInputElement).value) || 0;
      const maxVal = parseInt((document.getElementById(`max_${id}`) as HTMLInputElement).value) || 180;
      newConfig[id] = { min: minVal, max: maxVal };
    });

    btnPush.disabled = true;
    btnPush.style.background = '#999';
    statusMsg.style.color = '#2196F3';
    statusMsg.innerText = "🔄 Git 저장소에 배포하는 중...";

    try {
      const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
      const headers = { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' };

      let fileSha = '';
      const getRes = await fetch(apiUrl, { headers });
      if (getRes.ok) {
        const getJson = await getRes.json();
        fileSha = getJson.sha;
      }

      const contentStr = JSON.stringify(newConfig, null, 2);
      const contentB64 = btoa(unescape(encodeURIComponent(contentStr)));

      const putBody: any = { message: '🚀 관리자: 스마티 로봇 블록 설정 업데이트', content: contentB64 };
      if (fileSha) putBody.sha = fileSha;

      const putRes = await fetch(apiUrl, { method: 'PUT', headers: headers, body: JSON.stringify(putBody) });

      if (putRes.ok) {
        statusMsg.style.color = '#4CAF50';
        statusMsg.innerText = "🎉 성공적으로 배포되었습니다!";
        setTimeout(() => overlay.remove(), 2000); 
      } else {
        throw new Error('Upload Failed');
      }
    } catch (e) {
      statusMsg.style.color = 'red';
      statusMsg.innerText = "❌ 배포 실패! 토큰이 만료되었거나 권한이 없습니다.";
      btnPush.disabled = false;
      btnPush.style.background = '#2196F3';
    }
  });
}
// =========================================================
// 기본 UI 초기화 함수
// =========================================================
export function initAppUI(workspace: Blockly.WorkspaceSvg) {
  (window as any).__blockColorMap = {};
  (window as any).__currentSeason = 'auto';

  const savedTheme = localStorage.getItem('smarty_theme'); 
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
    if (themeToggleBtn) {
      themeToggleBtn.textContent = '☀️';
      themeToggleBtn.style.background = '#f1c40f';
      themeToggleBtn.style.color = '#333';
    }
  } else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
    if (themeToggleBtn) {
      themeToggleBtn.textContent = '🌙';
      themeToggleBtn.style.background = '#2c3e50';
      themeToggleBtn.style.color = 'white';
    }
  }

  let lastIsDark = document.body.classList.contains('dark-mode'); 

  const themeObserver = new MutationObserver(() => {
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark !== lastIsDark) {
      lastIsDark = isDark; 

      if (isDark) {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('smarty_theme', 'dark');
        if (themeToggleBtn) {
          themeToggleBtn.textContent = '☀️';
          themeToggleBtn.style.background = '#f1c40f';
          themeToggleBtn.style.color = '#333';
        }
      } else {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('smarty_theme', 'light');
        if (themeToggleBtn) {
          themeToggleBtn.textContent = '🌙';
          themeToggleBtn.style.background = '#2c3e50';
          themeToggleBtn.style.color = 'white';
        }
      }
      window.dispatchEvent(new Event('appThemeChanged'));
    }
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter:['class'] });

  if (!document.getElementById('smarty-app-ui-css')) {
    const style = document.createElement('style');
    style.id = 'smarty-app-ui-css';
    style.innerHTML = `
      body.dark-mode #minimapArea { background-color: #21252b !important; }
      body:not(.dark-mode) #minimapArea { background-color: #ecf0f1 !important; }
      body.dark-mode #serialMonitorContent { background-color: #21252b !important; color: #bdc3c7 !important; }
      
      body.dark-mode .modal-content { background-color: #282c34 !important; color: #ecf0f1 !important; border: 1px solid #3e4451; box-shadow: 0 10px 25px rgba(0,0,0,0.8); }
      body.dark-mode .modal-content h2, body.dark-mode .modal-content h3 { color: #ffffff !important; border-bottom: 2px dashed #4b5363 !important; }
      body.dark-mode .modal-content label, body.dark-mode .modal-content p { color: #abb2bf !important; }
      
      body.dark-mode #smartyBrandSettingsFooter { border-top: 2px dashed #4b5363 !important; }
      body.dark-mode .smarty-brand-text { color: #61afef !important; }
      body.dark-mode .smarty-version-badge { background-color: #3e4451 !important; color: #98c379 !important; }
      body.dark-mode #smartyBrandSettingsFooter img { background-color: rgba(255, 255, 255, 0.85); padding: 5px 10px; border-radius: 8px; }
    `;
    document.head.appendChild(style);
  }
  
  try {
    if (!(window as any).__blocklyColorPatched) {
      const origSetColour = Blockly.Block.prototype.setColour;
      Blockly.Block.prototype.setColour = function(colour: any) {
        if (!(this as any).originalColourHex_) {
          (this as any).originalColourHex_ = colour;
        }
        const season = (window as any).__currentSeason;
        const mappedColor = (window as any).__blockColorMap[this.type];
        if (season && season !== 'autumn' && mappedColor) {
          (this as any).styleName_ = undefined;
          origSetColour.call(this, mappedColor);
        } else {
          origSetColour.call(this, colour);
        }
      };
      (window as any).__blocklyColorPatched = true;
    }

    if (!(window as any).__blocklyStylePatched) {
      const origSetStyle = Blockly.Block.prototype.setStyle;
      Blockly.Block.prototype.setStyle = function(styleName: string) {
        if (!(this as any).originalStyleName_) {
          (this as any).originalStyleName_ = styleName;
        }
        const season = (window as any).__currentSeason;
        const mappedColor = (window as any).__blockColorMap[this.type];
        if (season && season !== 'autumn' && mappedColor && styleName === (this as any).originalStyleName_) {
          (this as any).styleName_ = undefined;
          if (typeof this.setColour === 'function') {
            this.setColour(mappedColor);
          }
        } else {
          origSetStyle.call(this, styleName);
        }
      };
      (window as any).__blocklyStylePatched = true;
    }
  } catch (err) {
    console.error("Blockly color patch error:", err);
  }

  function applyAppThemeToWorkspace(themeMode: string) {
    try {
      const targetSeason = themeMode === 'auto' ? getAppAutoSeason() : themeMode;
      (window as any).__currentSeason = targetSeason;
      const isDefault = targetSeason === 'autumn';
      const palette = appThemeColors[targetSeason] ||[];
      const tree = workspace.options.languageTree;
      let treeItems: any = null;
      let isJson = false;
      (window as any).__blockColorMap = {};

      if (Array.isArray(tree)) { treeItems = tree; isJson = true; }
      else if (tree && Array.isArray((tree as any).contents)) { treeItems = (tree as any).contents; isJson = true; }

      const extractTypesAndMap = (catData: any, newColor: string) => {
        const findTypes = (obj: any) => {
          if (!obj) return;
          if (typeof obj === 'object') {
            if (obj.kind && obj.kind.toLowerCase() === 'block' && obj.type) {
              (window as any).__blockColorMap[obj.type] = newColor;
            }
            if (obj.type && typeof obj.type === 'string') {
              (window as any).__blockColorMap[obj.type] = newColor;
            }
            Object.values(obj).forEach(val => findTypes(val));
          }
        };
        if (typeof catData === 'object' && !catData.outerHTML) {
          findTypes(catData);
        } else {
          const catString = typeof catData === 'string' ? catData : (catData.outerHTML || JSON.stringify(catData));
          if (catString) {
            const regex = /["']type["']\s*[:=]\s*["']([^"']+)["']/gi;
            let match;
            while ((match = regex.exec(catString)) !== null) {
              (window as any).__blockColorMap[match[1]] = newColor;
            }
          }
        }
      };

      if (isJson && treeItems) {
        let catIdx = 0;
        const mapJsonCats = (items: any[]) => {
          items.forEach((item: any) => {
            if (item.kind && item.kind.toLowerCase() === 'category') {
              if (item.originalColor_ === undefined) {
                item.originalColor_ = item.colour || '';
                item.originalStyle_ = item.categorystyle || '';
              }
              const newColor = isDefault ? item.originalColor_ : palette[catIdx % palette.length];
              extractTypesAndMap(item, newColor || palette[0]);
              catIdx++;
            }
            if (item.contents && Array.isArray(item.contents)) mapJsonCats(item.contents);
          });
        };
        mapJsonCats(treeItems);
      } else if (tree && typeof (tree as any).querySelectorAll === 'function') {
        const cats = (tree as unknown as Element).querySelectorAll('category');
        let catIdx = 0;
        cats.forEach((cat: Element) => {
          const origColor = cat.getAttribute('colour') || '';
          const newColor = isDefault ? origColor : palette[catIdx % palette.length];
          extractTypesAndMap(cat, newColor || palette[0]);
          catIdx++;
        });
      }

      const allBlocks = workspace.getAllBlocks(false);
      allBlocks.forEach(b => {
        if (isDefault) {
          if ((b as any).originalStyleName_ && typeof b.setStyle === 'function') {
            b.setStyle((b as any).originalStyleName_);
          } else if ((b as any).originalColourHex_) {
            Blockly.Block.prototype.setColour.call(b, (b as any).originalColourHex_);
          }
        } else if ((window as any).__blockColorMap[b.type]) {
          (b as any).styleName_ = undefined;
          Blockly.Block.prototype.setColour.call(b, (window as any).__blockColorMap[b.type]);
        }
      });

      window.dispatchEvent(new CustomEvent('appThemeChanged', { detail: { theme: targetSeason } }));
    } catch (err) {
      console.error("Theme apply error:", err);
    }
  }

  let appIsCodeVisible = true;
  let appIsMonitorVisible = true;
  let appCurrentTheme = 'auto';

  setTimeout(() => applyAppThemeToWorkspace(appCurrentTheme), 1000);

  function updateAppPanelVisibility() {
    try {
      const pRight = document.getElementById('rightPanel');
      const pVResizer = document.getElementById('v-resizer');
      const pHResizer = document.getElementById('h-resizer');
      const cContainer = document.getElementById('codeContainer');
      const mContainer = document.getElementById('serialMonitor');
      
      if (cContainer) cContainer.style.display = appIsCodeVisible ? 'flex' : 'none';
      if (mContainer) mContainer.style.display = appIsMonitorVisible ? 'flex' : 'none';

      if (cContainer && appIsCodeVisible) {
        if (!appIsMonitorVisible) {
          cContainer.style.flex = '1 1 auto';
          cContainer.style.height = '100%';
        } else {
          if (cContainer.style.height === '100%') {
            cContainer.style.flex = '0 0 50%'; 
            cContainer.style.height = 'auto';
          }
        }
      }

      if (pVResizer) pVResizer.style.display = (appIsCodeVisible && appIsMonitorVisible) ? 'block' : 'none';
      if (pHResizer) pHResizer.style.display = (appIsCodeVisible && appIsMonitorVisible) ? 'block' : 'none';

      setTimeout(() => {
        Blockly.svgResize(workspace);
      }, 100);
    } catch (err) {
      console.error("Panel update error:", err);
    }
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
      appBackupState = { code: appIsCodeVisible, monitor: appIsMonitorVisible, theme: appCurrentTheme };
      appCodeRadios.forEach(r => r.checked = (r.value === 'show' ? appIsCodeVisible : !appIsCodeVisible));
      appMonitorRadios.forEach(r => r.checked = (r.value === 'show' ? appIsMonitorVisible : !appIsMonitorVisible));
      appThemeRadios.forEach(r => r.checked = (r.value === appCurrentTheme));
      
      if (!document.getElementById('smartyBrandSettingsFooter')) {
        const modalBox = (appSettingsModal.querySelector('.modal-content') || appSettingsModal.firstElementChild || appSettingsModal) as HTMLElement;
        
        const footer = document.createElement('div');
        footer.id = 'smartyBrandSettingsFooter';
        footer.style.marginTop = '25px';
        footer.style.paddingTop = '15px';
        footer.style.borderTop = '2px dashed #ecf0f1';
        footer.style.display = 'flex';
        footer.style.flexDirection = 'column';
        footer.style.alignItems = 'center';
        footer.style.gap = '12px';
        
        footer.innerHTML = `
          <img src="${brandLogo}" alt="Play Creativity" style="max-width: 100%; height: auto; max-height: 55px;">
          <div style="display: flex; justify-content: space-between; width: 100%; font-size: 13px; color: #7f8c8d; align-items: center;">
            <div>
              <b class="smarty-brand-text" style="color:#2c3e50;">XEDERS</b> 
              <a href="https://www.xeders.com" target="_blank" style="color:#3498db; text-decoration:none;">www.xeders.com</a> 
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <!-- 🚨 여기에 작고 귀여운 [관리자 아이콘]을 숨겨두었습니다 -->
              <div id="btnOpenAdmin" style="cursor: pointer; font-size: 16px; padding: 0 5px;" title="관리자 설정">⚙️</div>
              <b class="smarty-brand-text" style="color:#2c3e50;">Smarty</b>
              <div class="smarty-version-badge" style="font-weight:bold; background:#ecf0f1; padding:4px 10px; border-radius:6px; color:#2c3e50;">
                v${pkg.version}
              </div>
            </div>
          </div>
        `;
        modalBox.appendChild(footer);

        // 🚨 관리자 톱니바퀴 클릭 시 모달 띄우기
        document.getElementById('btnOpenAdmin')?.addEventListener('click', () => {
          appSettingsModal.style.display = 'none'; // 설정창은 닫고
          openAdminGitSyncModal();                 // 관리자 창을 연다
        });
      }
      
      appSettingsModal.style.display = 'flex';
    });
  }

  appCodeRadios.forEach(r => r.addEventListener('change', (e) => {
    appIsCodeVisible = (e.target as HTMLInputElement).value === 'show';
    updateAppPanelVisibility();
  }));
  appMonitorRadios.forEach(r => r.addEventListener('change', (e) => {
    appIsMonitorVisible = (e.target as HTMLInputElement).value === 'show';
    updateAppPanelVisibility();
  }));
  appThemeRadios.forEach(r => r.addEventListener('change', (e) => {
    const selectedTheme = (e.target as HTMLInputElement).value;
    if (appCurrentTheme !== selectedTheme) {
      appCurrentTheme = selectedTheme;
      applyAppThemeToWorkspace(appCurrentTheme);
    }
  }));

  if (appCancelSettingsBtn && appSettingsModal) {
    appCancelSettingsBtn.addEventListener('click', () => {
      appIsCodeVisible = appBackupState.code;
      appIsMonitorVisible = appBackupState.monitor;
      if (appCurrentTheme !== appBackupState.theme) {
        appCurrentTheme = appBackupState.theme;
        applyAppThemeToWorkspace(appCurrentTheme);
      }
      updateAppPanelVisibility();
      appSettingsModal.style.display = 'none';
    });
  }

  if (appSaveSettingsBtn && appSettingsModal) {
    appSaveSettingsBtn.addEventListener('click', () => {
      appSettingsModal.style.display = 'none';
    });
  }
}

// ==========================================
// 🤖 9. 스마티 마스코트 애니메이션 전담 함수
// ==========================================
export function initMascotAnimation(workspace: Blockly.WorkspaceSvg) {
  const mascot = document.getElementById('smarty-mascot');
  if (!mascot) return;

  mascot.style.pointerEvents = 'auto'; 
  mascot.style.transition = 'transform 0.2s, opacity 0.3s ease-in-out'; 
  
  mascot.addEventListener('mouseenter', () => {
    mascot.style.opacity = '0.1'; 
  });
  
  mascot.addEventListener('mouseleave', () => {
    mascot.style.opacity = '1'; 
  });

  let sleepTimer: any = null;
  let thinkTimer: any = null;
  let isAnimating = false;

  const setMascotState = (stateClass: string) => {
    if (isAnimating && stateClass !== 'smarty-done') return; 
    mascot.className = ''; 
    mascot.classList.add(stateClass); 
  };

  (window as any).setSmartyState = (state: 'idle' | 'thinking' | 'done' | 'sleeping') => {
    if (state === 'done') {
      isAnimating = true;
      setMascotState('smarty-done');
      setTimeout(() => {
        isAnimating = false;
        setMascotState('smarty-idle');
        resetSleepTimer();
      }, 1500); 
    } else {
      setMascotState(`smarty-${state}`);
      if (state === 'idle') resetSleepTimer();
    }
  };

  setMascotState('smarty-idle');

  const resetSleepTimer = () => {
    clearTimeout(sleepTimer);
    sleepTimer = setTimeout(() => {
      if (!isAnimating) setMascotState('smarty-sleeping');
    }, 10000); 
  };
  resetSleepTimer(); 

  document.addEventListener('mousemove', () => {
    if (isAnimating) return; 

    setMascotState('smarty-thinking');

    clearTimeout(thinkTimer);
    thinkTimer = setTimeout(() => {
      setMascotState('smarty-idle');
    }, 300);

    resetSleepTimer(); 
  });

  workspace.addChangeListener((event: any) => {
    if (event.type === Blockly.Events.BLOCK_MOVE && !event.isStart) {
      if (event.newParentId && event.newParentId !== event.oldParentId) {
        isAnimating = true;
        setMascotState('smarty-done');
        setTimeout(() => {
          isAnimating = false;
          setMascotState('smarty-idle');
        }, 500);
        resetSleepTimer();
      }
    }
  });
}