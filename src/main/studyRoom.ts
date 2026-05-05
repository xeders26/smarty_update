/*============================
  src/main/studyRoom.ts    
=============================*/
import { app, ipcMain, dialog } from 'electron'
import * as fs from 'fs'
import { join, dirname, basename, relative } from 'path'
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

export function registerStudyRoomHandlers(): void {
  
  const getStudyRoomPath = () => {
    return app.isPackaged 
      ? join(process.resourcesPath, 'StudyRoom') 
      : join(process.cwd(), 'StudyRoom')
  }

  ipcMain.handle('get-studyroom-tree', async () => {
    const studyRoomPath = getStudyRoomPath()

    if (!fs.existsSync(studyRoomPath)) return []

    function scanDirectory(dir: string) {
      const results: any[] = []
      const items = fs.readdirSync(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const stat = fs.statSync(fullPath)
        const relPath = relative(studyRoomPath, fullPath).replace(/\\/g, '/')

        if (stat.isDirectory()) {
          const children = scanDirectory(fullPath)
          results.push({ type: 'folder', name: item, path: fullPath, relPath, children })
        } else if (item.endsWith('.json') && item !== 'visible.json' && item !== 'studyRoom_info.json') { 
          const baseName = item.replace(/\.json$/, '')
          const helpPath = join(dir, `${baseName}.txt`)
          
          let helpText = '이 소스 화일에 대한 도움말이 없습니다.'
          if (fs.existsSync(helpPath)) helpText = fs.readFileSync(helpPath, 'utf-8')
          
          const fileContent = fs.readFileSync(fullPath, 'utf-8')
          
          results.push({ type: 'file', name: baseName, path: fullPath, relPath, code: fileContent, help: helpText, ext: 'json' })
        } else if (item === 'visible.json' || item === 'studyRoom_info.json') {
          results.push({ type: 'file', name: item, path: fullPath, relPath, ext: 'json' })
        }
      }
      return results
    }

    return scanDirectory(studyRoomPath)
  })

  ipcMain.handle('delete-study-item', async (_event, itemPath) => {
    if (fs.existsSync(itemPath)) {
      fs.rmSync(itemPath, { recursive: true, force: true });
      if (itemPath.endsWith('.json')) {
        const txtPath = itemPath.replace('.json', '.txt');
        if (fs.existsSync(txtPath)) fs.rmSync(txtPath, { force: true });
      }
      return true;
    }
    return false;
  })

  ipcMain.handle('rename-study-item', async (_event, itemPath, newName) => {
    const isJson = itemPath.endsWith('.json');
    let newPath = join(dirname(itemPath), newName);
    if (isJson) newPath += '.json';
    fs.renameSync(itemPath, newPath);
    if (isJson) {
      const oldTxtPath = itemPath.replace('.json', '.txt');
      const newTxtPath = newPath.replace('.json', '.txt');
      if (fs.existsSync(oldTxtPath)) fs.renameSync(oldTxtPath, newTxtPath);
    }
    return true;
  })

  ipcMain.handle('create-study-folder', async (_event, parentPath, folderName) => {
    const targetDir = parentPath ? parentPath : getStudyRoomPath();
    const newDirPath = join(targetDir, folderName);
    if (!fs.existsSync(newDirPath)) {
      fs.mkdirSync(newDirPath, { recursive: true });
      return true;
    }
    return false;
  })

  ipcMain.handle('upload-study-file', async (_event, targetFolderPath) => {
    const result = dialog.showOpenDialogSync({
      title: '업로드할 자료실 파일(JSON)을 선택하세요',
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
      properties: ['openFile']
    });

    if (result && result.length > 0) {
      const sourceFile = result[0];
      const fileName = basename(sourceFile);
      const destFile = join(targetFolderPath, fileName);

      fs.copyFileSync(sourceFile, destFile);
      const sourceTxt = sourceFile.replace('.json', '.txt');
      const destTxt = destFile.replace('.json', '.txt');
      if (fs.existsSync(sourceTxt)) fs.copyFileSync(sourceTxt, destTxt);

      const baseName = fileName.replace('.json', '');
      let helpText = '이 소스 화일에 대한 도움말이 없습니다.';
      if (fs.existsSync(destTxt)) helpText = fs.readFileSync(destTxt, 'utf-8');
      
      const relPath = relative(getStudyRoomPath(), destFile).replace(/\\/g, '/');

      return { type: 'file', name: baseName, path: destFile, relPath, code: fs.readFileSync(destFile, 'utf-8'), help: helpText, ext: 'json' };
    }
    return null;
  })

  ipcMain.handle('read-studyroom-info', async () => {
    const infoPath = join(getStudyRoomPath(), 'studyRoom_info.json');
    if (fs.existsSync(infoPath)) return JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
    
    const visPath = join(getStudyRoomPath(), 'visible.json');
    if (fs.existsSync(visPath)) return { version: "1.0.0", visible: JSON.parse(fs.readFileSync(visPath, 'utf-8')) };
    
    return { version: "1.0.0", visible: {} };
  })

  ipcMain.handle('update-studyroom-info', async (_event, visibleData) => {
    const infoPath = join(getStudyRoomPath(), 'studyRoom_info.json');
    let info = { version: "1.0.0", visible: {} };
    if (fs.existsSync(infoPath)) info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
    
    info.visible = visibleData;
    
    const parts = info.version.split('.');
    if (parts.length === 3) {
      parts[2] = (parseInt(parts[2]) + 1).toString();
      info.version = parts.join('.');
    }
    fs.writeFileSync(infoPath, JSON.stringify(info, null, 2), 'utf-8');

    const visPath = join(getStudyRoomPath(), 'visible.json');
    fs.writeFileSync(visPath, JSON.stringify(visibleData, null, 2), 'utf-8');
    return true;
  })

  ipcMain.handle('read-visible-json', async () => {
    const visPath = join(getStudyRoomPath(), 'visible.json');
    if (fs.existsSync(visPath)) return JSON.parse(fs.readFileSync(visPath, 'utf-8'));
    return {};
  })

  ipcMain.handle('update-visible-json', async (_event, data) => {
    const visPath = join(getStudyRoomPath(), 'visible.json');
    fs.writeFileSync(visPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  })

  // 🌟 [수정됨] 다운로드(Pull) 시 부모 폴더 기준 적용
  ipcMain.handle('sync-studyroom-git', async () => {
    try {
      const studyRoomDir = getStudyRoomPath();
      const gitRootDir = dirname(studyRoomDir); // 부모 폴더 기준

      if (!fs.existsSync(join(gitRootDir, '.git'))) return { updated: false, version: "오프라인 (Git 미설정)" };

      const { stdout } = await execPromise('git pull origin main', { cwd: gitRootDir });
      
      const infoPath = join(studyRoomDir, 'studyRoom_info.json');
      let version = "1.0.0";
      if (fs.existsSync(infoPath)) version = JSON.parse(fs.readFileSync(infoPath, 'utf-8')).version || "1.0.0";

      return { updated: !stdout.includes('Already up to date'), version };
    } catch (err) {
      console.warn("Git Pull 에러:", err);
      return { updated: false, version: "오프라인" };
    }
  })

  // 🌟 [수정됨] 배포(Push) 시 부모 폴더 기준 적용 및 충돌 방지 로직
  ipcMain.handle('push-studyroom-git', async (_event, token) => {
    try {
      const studyRoomDir = getStudyRoomPath();
      const gitRootDir = dirname(studyRoomDir); // 🌟 여기가 핵심! (smarty-config.json이 있는 부모 폴더)
      const remoteUrl = `https://${token}@github.com/xeders26/smarty_update.git`;

      // 1. 혹시 이전에 StudyRoom 폴더 안에 잘못 만들어진 .git이 있다면 삭제 (투명 취급 방지)
      const wrongGitPath = join(studyRoomDir, '.git');
      if (fs.existsSync(wrongGitPath)) {
        fs.rmSync(wrongGitPath, { recursive: true, force: true });
        console.log("잘못된 하위 Git 저장소 삭제 완료");
      }

      // 2. 부모 폴더에 .git이 없으면 초기화
      const correctGitPath = join(gitRootDir, '.git');
      if (!fs.existsSync(correctGitPath)) {
        await execPromise('git init', { cwd: gitRootDir });
        await execPromise('git branch -M main', { cwd: gitRootDir });
        await execPromise('git config user.name "SmartyAdmin"', { cwd: gitRootDir });
        await execPromise('git config user.email "admin@smarty.com"', { cwd: gitRootDir });
      }
      
      // 3. 부모 폴더 안의 모든 것(smarty-config.json, StudyRoom 폴더 등)을 싹 다 담기!
      await execPromise('git add .', { cwd: gitRootDir });
      await execPromise(`git commit -m "🚀 자료실 자동 배포 (버전 업데이트)"`, { cwd: gitRootDir }).catch(() => console.log("새로운 커밋 없음"));
      
      // 4. 강제 덮어쓰기 배포
      await execPromise(`git push -f "${remoteUrl}" HEAD:main`, { cwd: gitRootDir });
      
      return true;
    } catch (err) {
      console.error("Git Push 에러:", err);
      throw err;
    }
  })
}