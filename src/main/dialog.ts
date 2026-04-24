/*============================
  src/main/dialog.ts    
=============================*/
import { dialog, ipcMain } from 'electron'
import * as fs from 'fs'

export function registerDialogHandlers(): void {
  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: '스마티 프로젝트', extensions: ['json'] }]
    })

    if (canceled || filePaths.length === 0) {
      return { canceled: true }
    }

    const data = fs.readFileSync(filePaths[0], 'utf-8')
    return { canceled: false, filePaths, data }
  })

  ipcMain.handle('dialog:saveFileAs', async (_event, data) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      filters: [{ name: '스마티 프로젝트', extensions: ['json'] }]
    })
    if (canceled || !filePath) {
      return { canceled: true }
    }
    fs.writeFileSync(filePath, data, 'utf-8')
    return { canceled: false, filePath }
  })

  ipcMain.handle('fs:saveFile', async (_event, filePath, data) => {
    try {
      fs.writeFileSync(filePath, data, 'utf-8')
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  })
}
