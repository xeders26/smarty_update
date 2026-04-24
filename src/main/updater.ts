/*============================
  src/main/updater.ts    
=============================*/
import { app, ipcMain, dialog } from 'electron' 
import { autoUpdater } from 'electron-updater'
import { is } from '@electron-toolkit/utils'
import * as fs from 'fs'
import * as path from 'path'

// 사용자가 직접 버튼을 눌렀는지 기억하는 변수
let isManualCheck = false;

export function registerUpdateHandlers(): void {
  ipcMain.handle('check-for-updates', async () => {
    // 🚨 [안전망 1] 개발 모드일 때는 무시하지 말고 친절하게 안내창 띄우기!
    if (!app.isPackaged) {
      dialog.showMessageBox({
        type: 'info',
        title: '개발 모드 안내 🛠️',
        message: '현재 코드를 수정하는 개발 모드로 실행 중입니다.\n업데이트 기능은 빌드(설치) 완료 후에 정상 작동합니다!',
        buttons: ['알겠습니다']
      });
      return { success: false, reason: 'dev-mode' };
    }

    isManualCheck = true; 
    try {
      await autoUpdater.checkForUpdates();
      
      // 🚨 [안전망 2] 이벤트가 무시되고 조용히 검사가 끝났을 때 강제 알림!
      // (electron-updater가 이미 최신임을 알고 이벤트를 안 터뜨린 경우)
      if (isManualCheck) {
        dialog.showMessageBox({
          type: 'info',
          title: '업데이트 확인',
          message: `현재 최신 버전(v${app.getVersion()})을 사용 중입니다!\n더 이상 업데이트할 내용이 없습니다.`,
          buttons: ['확인']
        });
        isManualCheck = false; // 완료 후 초기화
      }

      return { success: true }
    } catch (error: any) {
      if (isManualCheck) { 
        dialog.showErrorBox('업데이트 검사 실패 🚨', `버전 정보를 가져오지 못했습니다.\n(인터넷 연결이나 Github 최신 릴리즈 상태를 확인해주세요)\n\n상세 오류: ${error.message || error}`);
        isManualCheck = false;
      }
      return { success: false, error: String(error) }
    }
  })
}

// 🌟 스마티가 방금 업데이트 되었는지 검사하고 알림창을 띄우는 함수!
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
      dialog.showMessageBox({
        type: 'info',
        title: '🎉 업데이트 완료!',
        message: `스마티가 성공적으로 최신 버전(v${currentVersion})으로 업데이트 되었습니다!`,
        detail: '새로운 기능과 개선된 환경을 즐겨보세요! 🚀',
        buttons: ['확인']
      })
    }

    fs.writeFileSync(versionFilePath, JSON.stringify({ version: currentVersion }), 'utf-8')
  } catch (error) {
    console.error('버전 체크 중 오류 발생:', error)
  }
}

export function setupAutoUpdater(): void {
  checkUpdateSuccessNotify()

  autoUpdater.autoDownload = true
  autoUpdater.allowPrerelease = false

  autoUpdater.on('checking-for-update', () => console.log('🔄 업데이트 확인 중...'))
  
  autoUpdater.on('update-available', () => {
    console.log('✅ 업데이트가 있습니다. 다운로드를 시작합니다.')
    if (isManualCheck) {
      dialog.showMessageBox({
        type: 'info',
        title: '업데이트 발견! 🎉',
        message: `새로운 버전이 발견되었습니다!\n백그라운드에서 다운로드를 시작합니다.\n(다운로드가 100% 완료되면 다시 창을 띄워드릴게요!)`,
        buttons: ['확인']
      })
    }
  })
  
  autoUpdater.on('update-not-available', () => {
    console.log('✅ 최신 버전입니다.')
    if (isManualCheck) {
      dialog.showMessageBox({
        type: 'info',
        title: '업데이트 확인',
        message: `현재 최신 버전(v${app.getVersion()})을 사용 중입니다!\n더 이상 업데이트할 내용이 없습니다.`,
        buttons: ['확인']
      })
      isManualCheck = false; // 알림 띄우고 상태 초기화
    }
  })
  
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(`⬇️ 다운로드 진행: ${Math.round(progressObj.percent || 0)}%`)
  })

  autoUpdater.on('update-downloaded', () => {
    console.log('📦 업데이트 다운로드 완료! 즉시 재시작 및 설치를 진행합니다.')
    isManualCheck = false; 
    
    const dialogOpts = {
      type: 'info' as const,
      buttons:['지금 껐다 켜기 (업데이트)', '나중에 (내가 끌 때)'],
      title: '스마티 업데이트 준비 완료! 🎁',
      message: '새로운 버전의 다운로드가 완료되었습니다.',
      detail: '지금 재시작하여 새로운 버전을 설치하시겠습니까?\n(작업 중인 내용은 미리 저장해 주세요!)'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) {
        autoUpdater.quitAndInstall(false, true)
      }
    })
  })

  autoUpdater.on('error', (error) => {
    console.error('❌ 자동 업데이트 오류:', error)
    if (isManualCheck) {
      dialog.showErrorBox('업데이트 오류 🚨', `업데이트 중 문제가 발생했습니다.\n\n${error.message}`);
      isManualCheck = false;
    }
  })

  if (!is.dev && app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify().catch((error) => {
      console.error('자동 업데이트 초기화 실패:', error)
    })
  }
}