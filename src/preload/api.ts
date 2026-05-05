/*================
src/preload/api.ts
===============*/ 
import { IpcRenderer } from 'electron'

export function createApi(ipcRenderer: IpcRenderer) {
  return {
    // === 기존 유지 기능 ===
    uploadCode: (code: string, board: string, port: string) => ipcRenderer.invoke('upload-code', code, board, port),
    getConnectedPort: () => ipcRenderer.invoke('get-connected-port'),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    saveFileAs: (data: string) => ipcRenderer.invoke('dialog:saveFileAs', data),
    saveFile: (filePath: string, data: string) => ipcRenderer.invoke('fs:saveFile', filePath, data),
    getStudyRoomTree: () => ipcRenderer.invoke('get-studyroom-tree'),
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),

    // 👇 === 새로 추가된 자료실 파일 관리 API === 👇
    deleteStudyItem: (itemPath: string) => ipcRenderer.invoke('delete-study-item', itemPath),
    renameStudyItem: (itemPath: string, newName: string) => ipcRenderer.invoke('rename-study-item', itemPath, newName),
    createStudyFolder: (parentPath: string, folderName: string) => ipcRenderer.invoke('create-study-folder', parentPath, folderName),
    uploadStudyFile: (targetPath: string) => ipcRenderer.invoke('upload-study-file', targetPath),

    // 👇 === 자료실 속성(Visible) 및 버전 파일(studyRoom_info) 통신 API === 👇
    readVisibleJson: () => ipcRenderer.invoke('read-visible-json'),
    updateVisibleJson: (data: any) => ipcRenderer.invoke('update-visible-json', data),
    readStudyRoomInfo: () => ipcRenderer.invoke('read-studyroom-info'),
    updateStudyRoomInfo: (data: any) => ipcRenderer.invoke('update-studyroom-info', data),

    // 👇 === Git 서버 통신(자동 배포/업데이트) API === 👇
    pushStudyRoomToGit: (token: string) => ipcRenderer.invoke('push-studyroom-git', token),
    syncStudyRoomFromGit: () => ipcRenderer.invoke('sync-studyroom-git')
  }
}