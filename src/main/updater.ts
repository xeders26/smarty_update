/*============================
  src/main/updater.ts    
=============================*/
import { app, ipcMain, dialog, BrowserWindow } from 'electron'
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

// 🌟 다운로드 미니 창 생성 (로고 이미지 포함)
function createProgressWindow() {
  if (progressWindow) return; 
  
  const mainWindow = getMainWindow();

  progressWindow = new BrowserWindow({
    parent: mainWindow, 
    modal: true,        
    width: 450,
    height: 250, // 👈 로고가 들어가므로 높이를 살짝 키웠습니다.
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,  
    autoHideMenuBar: true,
    title: "스마티 업데이트 다운로드",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 🌟 로고 이미지를 읽어서 Base64 문자열로 변환 (경로 오류 원천 차단!)
  let logoBase64 = '';
  try {
    // 빌드된 후의 경로를 추적합니다. (asar 패키징 내부에서도 작동하도록)
    const logoPath = path.join(__dirname, '../renderer/assets/logo.png');
    
    if (fs.existsSync(logoPath)) {
      const imgData = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${imgData.toString('base64')}`;
    } else {
      // 혹시 경로가 다를 경우를 대비한 대체 경로 탐색
      const altPath = path.join(app.getAppPath(), 'out', 'renderer', 'assets', 'logo.png');
      if (fs.existsSync(altPath)) {
        const imgData = fs.readFileSync(altPath);
        logoBase64 = `data:image/png;base64,${imgData.toString('base64')}`;
      }
    }
  } catch (err) {
    console.error("로고 이미지 로드 실패:", err);
  }

  // 로고가 있으면 img 태그 생성, 없으면 빈 문자열
  const logoHtml = logoBase64 ? `<img src="${logoBase64}" alt="Smarty Logo" style="max-height: 50px; margin-bottom: 15px;">` : '';

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
      const opts = { type: 'info' as const, title: '개발 모드 안내 🛠️', message: '개발 모드로 실행 중입니다.\n업데이트 기능은 빌드 후에 작동합니다!', buttons:['알겠습니다'] };
      if (mainWindow) dialog.showMessageBox(mainWindow, opts);
      else dialog.showMessageBox(opts);
      return { success: false, reason: 'dev-mode' };
    }

    isManualCheck = true; 
    try {
      await autoUpdater.checkForUpdates();
      
      if (isManualCheck) {
        const opts = { type: 'info' as const, title: '업데이트 확인', message: `현재 최신 버전(v${app.getVersion()})을 사용 중입니다!\n더 이상 업데이트할 내용이 없습니다.`, buttons: ['확인'] };
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
      const opts = { type: 'info' as const, title: '업데이트 확인', message: `현재 최신 버전(v${app.getVersion()})을 사용 중입니다!`, buttons: ['확인'] };
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