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

export function initAppUI(workspace: Blockly.WorkspaceSvg) {
  (window as any).__blockColorMap = {};
  (window as any).__currentSeason = 'auto';

  // 🌙 1. 다크모드 엔진 충돌 방지 & 영구 기억 장치
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

  // 🚨 [진범 체포 및 수술 완료] 감시자(MutationObserver) 방어막 추가!
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
      
      /* 🌙 모달 창(환경설정 등) 다크모드 지원 */
      body.dark-mode .modal-content { background-color: #282c34 !important; color: #ecf0f1 !important; border: 1px solid #3e4451; box-shadow: 0 10px 25px rgba(0,0,0,0.8); }
      body.dark-mode .modal-content h2, body.dark-mode .modal-content h3 { color: #ffffff !important; border-bottom: 2px dashed #4b5363 !important; }
      body.dark-mode .modal-content label, body.dark-mode .modal-content p { color: #abb2bf !important; }
      
      /* 🌙 제더스 로고 및 버전 뱃지 다크모드 지원 */
      body.dark-mode #smartyBrandSettingsFooter { border-top: 2px dashed #4b5363 !important; }
      body.dark-mode .smarty-brand-text { color: #61afef !important; }
      body.dark-mode .smarty-version-badge { background-color: #3e4451 !important; color: #98c379 !important; }
      /* 다크모드일 때 로고 이미지가 잘 보이도록 뽀샤시 하얀 배경 추가 */
      body.dark-mode #smartyBrandSettingsFooter img { background-color: rgba(255, 255, 255, 0.85); padding: 5px 10px; border-radius: 8px; }
    `;
    document.head.appendChild(style);
  }
  
  // 🎨 2. 블록 테마 색상 패치 유지
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
      
      // ========================================================
      // 🌟 [최종 마법 적용] 설정 창이 켜질 때 로고와 버전을 박아넣습니다!
      // ========================================================
      if (!document.getElementById('smartyBrandSettingsFooter')) {
        const modalBox = (appSettingsModal.querySelector('.modal-content') || appSettingsModal.firstElementChild || appSettingsModal) as HTMLElement;
        
        const footer = document.createElement('div');
        footer.id = 'smartyBrandSettingsFooter';
        footer.style.marginTop = '25px';
        footer.style.paddingTop = '15px';
        footer.style.borderTop = '2px dashed #ecf0f1'; // 다크모드시 위에서 설정한 CSS로 자동 변경됨
        footer.style.display = 'flex';
        footer.style.flexDirection = 'column';
        footer.style.alignItems = 'center';
        footer.style.gap = '12px';
        
        // 🌟 다크모드/라이트모드 자동 대응 클래스(smarty-brand-text, smarty-version-badge) 적용!
        footer.innerHTML = `
          <img src="${brandLogo}" alt="Play Creativity" style="max-width: 100%; height: auto; max-height: 55px;">
          <div style="display: flex; justify-content: space-between; width: 100%; font-size: 13px; color: #7f8c8d; align-items: center;">
            
            <!-- ⬅️ 왼쪽 영역: 회사 이름과 링크만 남김 -->
            <div>
              <b class="smarty-brand-text" style="color:#2c3e50;">XEDERS</b>(제더스) 
              <a href="https://www.xeders.com" target="_blank" style="color:#3498db; text-decoration:none;">www.xeders.com</a> 
            </div>

            <!-- ➡️ 오른쪽 영역: Smarty 글씨와 버전 뱃지를 하나로 묶음 -->
            <div style="display: flex; align-items: center; gap: 8px;">
              <b class="smarty-brand-text" style="color:#2c3e50;">Smarty</b>
              <div class="smarty-version-badge" style="font-weight:bold; background:#ecf0f1; padding:4px 10px; border-radius:6px; color:#2c3e50;">
                v${pkg.version}
              </div>
            </div>

          </div>
        `;
        modalBox.appendChild(footer);
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

  // 👻 [추가된 마법] CSS 파일을 건드리지 않고 TS에서 즉시 투명화 적용!
  mascot.style.pointerEvents = 'auto'; // 마우스를 무시하던 속성(none)을 강제로 해제!
  mascot.style.transition = 'transform 0.2s, opacity 0.3s ease-in-out'; // 스르륵 변하는 애니메이션
  
  mascot.addEventListener('mouseenter', () => {
    mascot.style.opacity = '0.1'; // 마우스가 스마티 위에 올라가면 스르륵 투명해짐!
  });
  
  mascot.addEventListener('mouseleave', () => {
    mascot.style.opacity = '1'; // 마우스가 빠져나가면 다시 스르륵 선명해짐!
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

