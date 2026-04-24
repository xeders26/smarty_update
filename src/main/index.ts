/*================
src/main/index.ts
================*/
import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createMainWindow } from './window'
import { registerSerialHandlers } from './serial'
import { registerUploadHandler, initArduinoCLI } from './upload' // 👈 initArduinoCLI 추가!
import { registerDialogHandlers } from './dialog'
import { registerExampleHandlers } from './examples'
import { setupAutoUpdater, registerUpdateHandlers } from './updater'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.xeders.smarty')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  registerSerialHandlers()
  registerUploadHandler()
  registerDialogHandlers()
  registerExampleHandlers()
  registerUpdateHandlers()
  setupAutoUpdater()

  createMainWindow()

  // 🚨 앱 창이 열리자마자 백그라운드에서 아두이노 CLI 환경 세팅 시작!
  // 사용자는 아무것도 깔 필요 없이 앱을 켜기만 하면 됩니다.
  initArduinoCLI()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})