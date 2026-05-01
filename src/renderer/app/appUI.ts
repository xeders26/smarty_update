/*================
src/renderer/app/appUI.ts
===============*/
import * as Blockly from 'blockly';
import { initSettingsModal } from './settings';

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

// 상태 관리를 위한 객체 (분리된 settings.ts와 소통하기 위함)
const AppUIState = {
  isCodeVisible: true,
  isMonitorVisible: true,
  currentTheme: 'auto',
};

export function initAppUI(workspace: Blockly.WorkspaceSvg) {
  (window as any).__blockColorMap = {}; 
  (window as any).__currentSeason = 'auto';
  
  const savedTheme = localStorage.getItem('smarty_theme'); 
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode'); document.documentElement.classList.add('dark-mode');
    if (themeToggleBtn) { themeToggleBtn.textContent = '☀️'; themeToggleBtn.style.background = '#f1c40f'; themeToggleBtn.style.color = '#333'; }
  } else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode'); document.documentElement.classList.remove('dark-mode');
    if (themeToggleBtn) { themeToggleBtn.textContent = '🌙'; themeToggleBtn.style.background = '#2c3e50'; themeToggleBtn.style.color = 'white'; }
  }

  let lastIsDark = document.body.classList.contains('dark-mode'); 
  const themeObserver = new MutationObserver(() => {
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark !== lastIsDark) {
      lastIsDark = isDark; 
      if (isDark) {
        document.documentElement.classList.add('dark-mode'); localStorage.setItem('smarty_theme', 'dark');
        if (themeToggleBtn) { themeToggleBtn.textContent = '☀️'; themeToggleBtn.style.background = '#f1c40f'; themeToggleBtn.style.color = '#333'; }
      } else {
        document.documentElement.classList.remove('dark-mode'); localStorage.setItem('smarty_theme', 'light');
        if (themeToggleBtn) { themeToggleBtn.textContent = '🌙'; themeToggleBtn.style.background = '#2c3e50'; themeToggleBtn.style.color = 'white'; }
      }
      window.dispatchEvent(new Event('appThemeChanged'));
    }
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter:['class'] });

  // 워크스페이스(배경) 기본 CSS
  if (!document.getElementById('smarty-app-base-css')) {
    const style = document.createElement('style');
    style.id = 'smarty-app-base-css';
    style.innerHTML = `
      body.dark-mode #minimapArea { background-color: #21252b !important; }
      body:not(.dark-mode) #minimapArea { background-color: #ecf0f1 !important; }
      body.dark-mode #serialMonitorContent { background-color: #21252b !important; color: #bdc3c7 !important; }
    `;
    document.head.appendChild(style);
  }
  
  try {
    if (!(window as any).__blocklyColorPatched) {
      const origSetColour = Blockly.Block.prototype.setColour;
      Blockly.Block.prototype.setColour = function(colour: any) {
        if (!(this as any).originalColourHex_) { (this as any).originalColourHex_ = colour; }
        const season = (window as any).__currentSeason;
        const mappedColor = (window as any).__blockColorMap[this.type];
        if (season && season !== 'autumn' && mappedColor) {
          (this as any).styleName_ = undefined; origSetColour.call(this, mappedColor);
        } else origSetColour.call(this, colour);
      };
      (window as any).__blocklyColorPatched = true;
    }
  } catch (err) {}

  function applyAppThemeToWorkspace(themeMode: string) {
    try {
      const targetSeason = themeMode === 'auto' ? getAppAutoSeason() : themeMode;
      (window as any).__currentSeason = targetSeason;
      const isDefault = targetSeason === 'autumn';
      const palette = appThemeColors[targetSeason] ||[];
      const tree = workspace.options.languageTree;
      let treeItems: any = null; let isJson = false;
      (window as any).__blockColorMap = {};

      if (Array.isArray(tree)) { treeItems = tree; isJson = true; }
      else if (tree && Array.isArray((tree as any).contents)) { treeItems = (tree as any).contents; isJson = true; }

      const extractTypesAndMap = (catData: any, newColor: string) => {
        const findTypes = (obj: any) => {
          if (!obj) return;
          if (typeof obj === 'object') {
            if (obj.kind && obj.kind.toLowerCase() === 'block' && obj.type) (window as any).__blockColorMap[obj.type] = newColor; 
            if (obj.type && typeof obj.type === 'string') (window as any).__blockColorMap[obj.type] = newColor; 
            Object.values(obj).forEach(val => findTypes(val));
          }
        };
        if (typeof catData === 'object' && !catData.outerHTML) findTypes(catData);
        else {
          const catStr = typeof catData === 'string' ? catData : (catData.outerHTML || JSON.stringify(catData));
          if (catStr) {
            let match; const regex = /["']type["']\s*[:=]\s*["']([^"']+)["']/gi;
            while ((match = regex.exec(catStr)) !== null) (window as any).__blockColorMap[match[1]] = newColor;
          }
        }
      };

      if (isJson && treeItems) {
        let catIdx = 0;
        const mapJsonCats = (items: any[]) => {
          items.forEach((item: any) => {
            if (item.kind && item.kind.toLowerCase() === 'category') {
              if (item.originalColor_ === undefined) item.originalColor_ = item.colour || '';
              const newColor = isDefault ? item.originalColor_ : palette[catIdx % palette.length];
              extractTypesAndMap(item, newColor || palette[0]); catIdx++;
            }
            if (item.contents && Array.isArray(item.contents)) mapJsonCats(item.contents);
          });
        };
        mapJsonCats(treeItems);
      }
      workspace.getAllBlocks(false).forEach(b => {
        if (isDefault) { if ((b as any).originalColourHex_) Blockly.Block.prototype.setColour.call(b, (b as any).originalColourHex_); } 
        else if ((window as any).__blockColorMap[b.type]) Blockly.Block.prototype.setColour.call(b, (window as any).__blockColorMap[b.type]);
      });
      window.dispatchEvent(new CustomEvent('appThemeChanged', { detail: { theme: targetSeason } }));
    } catch (err) {}
  }

  setTimeout(() => applyAppThemeToWorkspace(AppUIState.currentTheme), 1000);

  function updateAppPanelVisibility() {
    const cContainer = document.getElementById('codeContainer'); 
    const mContainer = document.getElementById('serialMonitor');
    if (cContainer) cContainer.style.display = AppUIState.isCodeVisible ? 'flex' : 'none';
    if (mContainer) mContainer.style.display = AppUIState.isMonitorVisible ? 'flex' : 'none';
    setTimeout(() => Blockly.svgResize(workspace), 100);
  }
  
  // 🌟 분리된 파일(settings.ts)의 설정 모달 초기화 함수 호출
  initSettingsModal({
    updateVisibility: (code, monitor) => {
      AppUIState.isCodeVisible = code;
      AppUIState.isMonitorVisible = monitor;
      updateAppPanelVisibility();
    },
    applyTheme: (theme) => {
      AppUIState.currentTheme = theme;
      applyAppThemeToWorkspace(theme);
    },
    getState: () => ({
      code: AppUIState.isCodeVisible,
      monitor: AppUIState.isMonitorVisible,
      theme: AppUIState.currentTheme
    })
  });
}

// ==========================================
// 🤖 스마티 마스코트 애니메이션 전담 함수
// ==========================================
export function initMascotAnimation(workspace: Blockly.WorkspaceSvg) {
  const mascot = document.getElementById('smarty-mascot');
  if (!mascot) return;
  mascot.style.pointerEvents = 'auto'; mascot.style.transition = 'transform 0.2s, opacity 0.3s ease-in-out'; 
  mascot.addEventListener('mouseenter', () => { mascot.style.opacity = '0.1'; });
  mascot.addEventListener('mouseleave', () => { mascot.style.opacity = '1'; });
  let sleepTimer: any = null; let thinkTimer: any = null; let isAnimating = false;
  const setMascotState = (stateClass: string) => { if (isAnimating && stateClass !== 'smarty-done') return; mascot.className = ''; mascot.classList.add(stateClass); };
  (window as any).setSmartyState = (state: 'idle' | 'thinking' | 'done' | 'sleeping') => {
    if (state === 'done') { isAnimating = true; setMascotState('smarty-done'); setTimeout(() => { isAnimating = false; setMascotState('smarty-idle'); resetSleepTimer(); }, 1500); } 
    else { setMascotState(`smarty-${state}`); if (state === 'idle') resetSleepTimer(); }
  };
  setMascotState('smarty-idle');
  const resetSleepTimer = () => { clearTimeout(sleepTimer); sleepTimer = setTimeout(() => { if (!isAnimating) setMascotState('smarty-sleeping'); }, 10000); };
  resetSleepTimer(); 
  document.addEventListener('mousemove', () => { if (isAnimating) return; setMascotState('smarty-thinking'); clearTimeout(thinkTimer); thinkTimer = setTimeout(() => { setMascotState('smarty-idle'); }, 300); resetSleepTimer(); });
  workspace.addChangeListener((event: any) => { if (event.type === Blockly.Events.BLOCK_MOVE && !event.isStart) { if (event.newParentId && event.newParentId !== event.oldParentId) { isAnimating = true; setMascotState('smarty-done'); setTimeout(() => { isAnimating = false; setMascotState('smarty-idle'); }, 500); resetSleepTimer(); } } });
}