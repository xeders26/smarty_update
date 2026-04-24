/*================
src/preload/api.ts
===============*/ 
import { IpcRenderer } from 'electron'

export function createApi(ipcRenderer: IpcRenderer) {
  return {
    uploadCode: (code: string, board: string, port: string) => ipcRenderer.invoke('upload-code', code, board, port),
    getConnectedPort: () => ipcRenderer.invoke('get-connected-port'),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    saveFileAs: (data: string) => ipcRenderer.invoke('dialog:saveFileAs', data),
    saveFile: (filePath: string, data: string) => ipcRenderer.invoke('fs:saveFile', filePath, data),
    getExamplesTree: () => ipcRenderer.invoke('get-examples-tree'),
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates')
  }
}
