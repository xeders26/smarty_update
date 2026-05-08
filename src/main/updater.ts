/*============================
  src/main/updater.ts    
  * 🌟 [업데이트] 이미지 왜곡 방지 및 고해상도 아이콘 적용 완료!
=============================*/
import { app, ipcMain, dialog, BrowserWindow, nativeImage } from 'electron'
import { autoUpdater } from 'electron-updater'
import { is } from '@electron-toolkit/utils'
import * as fs from 'fs'
import * as path from 'path'

let isManualCheck = false;
let progressWindow: BrowserWindow | null = null; 

// 🌟 현재 화면에 띄워진 메인 창을 찾아내는 함수
function getMainWindow(): BrowserWindow | undefined {
  return BrowserWindow.getAllWindows().find(w => !w.isDestroyed() && w.isVisible());
}

// 🌟 다이얼로그(시스템 알림창)용 고해상도 네이티브 아이콘 생성 함수
function getSmartyNativeIcon(): Electron.NativeImage | undefined {
  try {
    let iconPath = path.join(__dirname, '../renderer/assets/logo.png');
    if (!fs.existsSync(iconPath)) {
      iconPath = path.join(app.getAppPath(), 'out', 'renderer', 'assets', 'logo.png');
    }
    if (fs.existsSync(iconPath)) {
      // 다이얼로그 창에서 아이콘이 깨지거나 너무 거대해지는 것을 방지 (64x64 최적화)
      return nativeImage.createFromPath(iconPath).resize({ width: 64, height: 64 });
    }
  } catch (err) {
    console.error("네이티브 아이콘 로드 실패:", err);
  }
  return undefined;
}

// 🌟 다운로드 미니 창 생성 (로고 이미지 포함)
function createProgressWindow() {
  if (progressWindow) return; 
  
  const mainWindow = getMainWindow();

  progressWindow = new BrowserWindow({
    parent: mainWindow, 
    modal: true,        
    width: 450,
    height: 250, 
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,  
    autoHideMenuBar: true,
    title: "스마티 업데이트 다운로드",
    icon: getSmartyNativeIcon(), // 👈 창 자체의 좌측 상단 및 작업표시줄 아이콘도 이쁘게 적용
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 🌟 로고 이미지를 읽어서 Base64 문자열로 변환
  let logoBase64 = '';
  try {
    let logoPath = path.join(__dirname, '../renderer/assets/logo.png');
    if (!fs.existsSync(logoPath)) {
      logoPath = path.join(app.getAppPath(), 'out', 'renderer', 'assets', 'logo.png');
    }
    
    if (fs.existsSync(logoPath)) {
      const imgData = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${imgData.toString('base64')}`;
    }
  } catch (err) {
    console.error("로고 이미지 로드 실패:", err);
  }

  // 🌟 [핵심] width: auto; object-fit: contain; 적용하여 절대 찌그러지지 않게 방지!
  const logoHtml = logoBase64 ? `<img src="${logoBase64}" class="smarty-logo" alt="Smarty Logo">` : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          font-family: 'Pretendard', 'Malgun Gothic', sans-serif; 
          background: #ffffff; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
          margin: 0; 
        }
        /* 🌟 이미지 왜곡 방지 및 렌더링 최적화 CSS */
        .smarty-logo {
          width: auto;
          height: auto;
          max-width: 80%;
          max-height: 65px;
          object-fit: contain; 
          margin-bottom: 15px;
          image-rendering: -webkit-optimize-contrast; /* 이미지를 더 선명하게 렌더링 */
          -webkit-user-drag: none; /* 드래그 방지 */
        }
        h2 { font-size: 17px; color: #333; margin-top: 0; margin-bottom: 20px; }
        .progress-container { width: 85%; background: #e0e0e0; border-radius: 12px; overflow: hidden; height: 24px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.2); }
        .progress-bar { width: 0%; background: linear-gradient(90deg, #4CAF50, #8BC34A); height: 100%; transition: width 0.3s ease-in-out; border-radius: 12px; }
        .progress-text { margin-top: 15px; font-weight: bold; font-size: 15px; color: #555; }
      </style>
    </head>
    <body>
      ${logoHtml}
      <h2>📦 새 버전을 다운로드하고 있습니다...</h2>
      <div class="progress-container">
        <div id="bar" class="progress-bar"></div>
      </div>
      <div id="text" class="progress-text">0% 완료</div>
    </body>
    </html>
  `;
  progressWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  
  progressWindow.on('closed', () => { progressWindow = null; });
}

export function registerUpdateHandlers(): void {
  ipcMain.handle('check-for-updates', async () => {
    const mainWindow = getMainWindow();

    if (!app.isPackaged) {
      const opts = { 
        icon: getSmartyNativeIcon(), // 🌟 다이얼로그 아이콘 적용
        type: 'info' as const, 
        title: '개발 모드 안내 🛠️', 
        message: '개발 모드로 실행 중입니다.\n업데이트 기능은 빌드 후에 작동합니다!', 
        buttons:['알겠습니다'] 
      };
      if (mainWindow) dialog.showMessageBox(mainWindow, opts);
      else dialog.showMessageBox(opts);
      return { success: false, reason: 'dev-mode' };
    }

    isManualCheck = true; 
    try {
      await autoUpdater.checkForUpdates();
      
      if (isManualCheck) {
        const opts = { 
          icon: getSmartyNativeIcon(), 
          type: 'info' as const, 
          title: '업데이트 확인', 
          message: `현재 최신 버전(v${app.getVersion()})을 사용 중입니다!\n더 이상 업데이트할 내용이 없습니다.`, 
          buttons: ['확인'] 
        };
        if (mainWindow) dialog.showMessageBox(mainWindow, opts);
        else dialog.showMessageBox(opts);
        isManualCheck = false; 
      }
      return { success: true }
    } catch (error: any) {
      if (isManualCheck) { 
        let cleanErrorMsg = error.message || String(error);
        
        if (cleanErrorMsg.includes('<!DOCTYPE html>') || cleanErrorMsg.includes('Unicorn')) {
          cleanErrorMsg = "서버(GitHub)에서 버전을 찾을 수 없습니다.\n(저장소가 비공개이거나, 배포된 릴리즈(Release)가 없습니다.)";
        } else if (cleanErrorMsg.length > 200) {
          cleanErrorMsg = cleanErrorMsg.substring(0, 200) + '... (이하 생략)';
        }

        if (mainWindow) dialog.showErrorBox('업데이트 검사 실패 🚨', `버전 정보를 가져오지 못했습니다.\n\n상세 오류: ${cleanErrorMsg}`);
        else dialog.showErrorBox('업데이트 검사 실패 🚨', `상세 오류: ${cleanErrorMsg}`);
        isManualCheck = false;
      }
      return { success: false, error: String(error) }
    }
  })
}

function checkUpdateSuccessNotify() {
  try {
    const userDataPath = app.getPath('userData')
    const versionFilePath = path.join(userDataPath, 'smarty-version.json')
    const currentVersion = app.getVersion() 

    let lastVersion = ''
    
    if (fs.existsSync(versionFilePath)) {
      const data = fs.readFileSync(versionFilePath, 'utf-8')
      const parsed = JSON.parse(data)
      lastVersion = parsed.version || ''
    }

    if (lastVersion && lastVersion !== currentVersion) {
      const mainWindow = getMainWindow();
      const opts = {
        icon: getSmartyNativeIcon(), // 🌟 다이얼로그 아이콘 적용
        type: 'info' as const,
        title: '🎉 업데이트 완료!',
        message: `스마티가 성공적으로 최신 버전(v${currentVersion})으로 업데이트 되었습니다!`,
        detail: '새로운 기능과 개선된 환경을 즐겨보세요! 🚀',
        buttons: ['확인']
      };
      
      if (mainWindow) dialog.showMessageBox(mainWindow, opts);
      else dialog.showMessageBox(opts);
    }

    fs.writeFileSync(versionFilePath, JSON.stringify({ version: currentVersion }), 'utf-8')
  } catch (error) {
    console.error('버전 체크 중 오류 발생:', error)
  }
}

export function setupAutoUpdater(): void {
  setTimeout(() => checkUpdateSuccessNotify(), 1500);

  autoUpdater.autoDownload = true
  autoUpdater.allowPrerelease = false

  autoUpdater.on('checking-for-update', () => console.log('🔄 업데이트 확인 중...'))
  
  autoUpdater.on('update-available', () => {
    console.log('✅ 업데이트가 있습니다. 다운로드를 시작합니다.')
    if (isManualCheck) {
      createProgressWindow();
      isManualCheck = false; 
    }
  })
  
  autoUpdater.on('update-not-available', () => {
    if (isManualCheck) {
      const mainWindow = getMainWindow();
      const opts = { 
        icon: getSmartyNativeIcon(),
        type: 'info' as const, 
        title: '업데이트 확인', 
        message: `현재 최신 버전(v${app.getVersion()})을 사용 중입니다!`, 
        buttons: ['확인'] 
      };
      if (mainWindow) dialog.showMessageBox(mainWindow, opts);
      else dialog.showMessageBox(opts);
      isManualCheck = false; 
    }
  })
  
  autoUpdater.on('download-progress', (progressObj) => {
    const percent = Math.round(progressObj.percent || 0);
    if (progressWindow) {
      progressWindow.webContents.executeJavaScript(`
        document.getElementById('bar').style.width = '${percent}%';
        document.getElementById('text').innerText = '${percent}% 완료';
      `).catch(()=>{});
    }
  })

  autoUpdater.on('update-downloaded', () => {
    if (progressWindow) progressWindow.close();
    
    const mainWindow = getMainWindow();
    const dialogOpts = {
      icon: getSmartyNativeIcon(), // 🌟 다이얼로그 아이콘 적용
      type: 'info' as const,
      buttons:['지금 껐다 켜기 (업데이트)', '나중에 (내가 끌 때)'],
      title: '스마티 업데이트 준비 완료! 🎁',
      message: '새로운 버전의 다운로드가 완료되었습니다.',
      detail: '지금 재시작하여 새로운 버전을 설치하시겠습니까?\n(작업 중인 내용은 미리 저장해 주세요!)'
    }

    if (mainWindow) {
      dialog.showMessageBox(mainWindow, dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall(false, true)
      })
    } else {
      dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall(false, true)
      })
    }
  })

  autoUpdater.on('error', (error) => {
    if (progressWindow) progressWindow.close();

    if (isManualCheck) {
      const mainWindow = getMainWindow();
      
      let cleanErrorMsg = error.message || String(error);
      if (cleanErrorMsg.includes('<!DOCTYPE html>') || cleanErrorMsg.includes('Unicorn')) {
        cleanErrorMsg = "업데이트 서버(GitHub)에서 올바른 응답을 받지 못했습니다.\n(저장소가 비공개이거나, 아직 등록된 릴리즈(Release)가 없습니다.)";
      } else if (cleanErrorMsg.length > 200) {
        cleanErrorMsg = cleanErrorMsg.substring(0, 200) + '... (이하 생략)';
      }

      if (mainWindow) dialog.showErrorBox('업데이트 오류 🚨', `업데이트 중 문제가 발생했습니다.\n\n${cleanErrorMsg}`);
      else dialog.showErrorBox('업데이트 오류 🚨', `상세 오류: ${cleanErrorMsg}`);
      isManualCheck = false;
    }
  })

  if (!is.dev && app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify().catch(console.error)
  }
}