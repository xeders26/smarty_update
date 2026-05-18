/*=================================================================
/src/main/studyRoom.ts

  ================*/
import { app, ipcMain, dialog } from 'electron'   
import * as fs from 'fs'
import { join, dirname, basename, relative } from 'path'
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

export function registerStudyRoomHandlers(): void {
  
  const getStudyRoomPath = () => {
    const workspaceFolderName = app.isPackaged ? 'SmartyWorkspace' : 'SmartyWorkspace_Dev';
    const workspacePath = join(app.getPath('userData'), workspaceFolderName);
    const studyRoomPath = join(workspacePath, 'StudyRoom');

    if (!fs.existsSync(studyRoomPath)) {
      fs.mkdirSync(workspacePath, { recursive: true });
      
      const resourceStudyRoom = join(process.resourcesPath, 'StudyRoom');
      if (fs.existsSync(resourceStudyRoom)) {
        fs.cpSync(resourceStudyRoom, studyRoomPath, { recursive: true }); 
      } else {
        fs.mkdirSync(studyRoomPath, { recursive: true });
      }
    }

    const resourceConfig = join(process.resourcesPath, 'smarty-config.json');
    const workspaceConfig = join(workspacePath, 'smarty-config.json');
    if (fs.existsSync(resourceConfig) && !fs.existsSync(workspaceConfig)) {
      fs.copyFileSync(resourceConfig, workspaceConfig);
    }

    // 🌟 [해결 1] 깃허브가 쓰레기 폴더(.smarty_)들을 쳐다보지도 않게 보호막(.gitignore) 강화!
    const gitignorePath = join(workspacePath, '.gitignore');
    const ignoreContent = "smarty-config.json\n.smarty_*\n";
    fs.writeFileSync(gitignorePath, ignoreContent, 'utf-8');

    return studyRoomPath;
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

  // =========================================================================
  // 🌟 [핵심 해결] 오류를 내뿜던 병합(git pull)을 버리고, 강제 덮어쓰기(fetch+reset)로 교체!
  // =========================================================================
  ipcMain.handle('sync-studyroom-git', async () => {
    try {
      const studyRoomDir = getStudyRoomPath();
      const gitRootDir = dirname(studyRoomDir); 

      // 로컬에 .git 폴더 자체가 없으면 오류가 나지 않도록 초기화부터 진행
      if (!fs.existsSync(join(gitRootDir, '.git'))) {
        await execPromise('git init', { cwd: gitRootDir });
        await execPromise('git branch -M main', { cwd: gitRootDir });
      }

      await execPromise('git remote add origin https://github.com/xeders26/smarty_update.git', { cwd: gitRootDir }).catch(() => {});

      // 1. 업데이트 전 해시(버전) 기억
      const oldHash = await execPromise('git rev-parse HEAD', { cwd: gitRootDir }).catch(() => ({ stdout: '' }));
      
      // 2. 서버에서 최신 데이터 무조건 다운로드 (fetch)
      await execPromise('git fetch origin main', { cwd: gitRootDir });
      
      // 3. 로컬 파일들의 상태를 묻지도 따지지도 않고 서버와 100% 똑같이 강제 일치! (충돌/병합 에러 완전 차단)
      await execPromise('git reset --hard origin/main', { cwd: gitRootDir });
      
      // 4. 업데이트 후 해시 비교 (바뀌었다면 업데이트 된 것)
      const newHash = await execPromise('git rev-parse HEAD', { cwd: gitRootDir }).catch(() => ({ stdout: '' }));
      const isUpdated = oldHash.stdout.trim() !== newHash.stdout.trim();

      const infoPath = join(studyRoomDir, 'studyRoom_info.json');
      let version = "1.0.0";
      if (fs.existsSync(infoPath)) version = JSON.parse(fs.readFileSync(infoPath, 'utf-8')).version || "1.0.0";

      return { updated: isUpdated, version };
    } catch (err: any) {
      console.warn("Git Sync 에러 발생:", err);
      // 에러 메시지 프론트로 전달
      return { updated: false, version: "오프라인", error: err.message || String(err) };
    }
  })

  ipcMain.handle('push-studyroom-git', async (_event, token) => {
    try {
      const studyRoomDir = getStudyRoomPath();
      const gitRootDir = dirname(studyRoomDir); 
      const remoteUrl = `https://${token}@github.com/xeders26/smarty_update.git`;

      const wrongGitPath = join(studyRoomDir, '.git');
      if (fs.existsSync(wrongGitPath)) {
        fs.rmSync(wrongGitPath, { recursive: true, force: true });
      }

      const correctGitPath = join(gitRootDir, '.git');
      if (!fs.existsSync(correctGitPath)) {
        await execPromise('git init', { cwd: gitRootDir });
        await execPromise('git branch -M main', { cwd: gitRootDir });
        await execPromise('git config user.name "SmartyAdmin"', { cwd: gitRootDir });
        await execPromise('git config user.email "admin@smarty.com"', { cwd: gitRootDir });
      }
      
      // 🌟 [해결 2] 깃허브 서버에 이미 올라가 있는 쓰레기 폴더 및 설정 파일을 찾아내서 삭제(캐시 클리어)
      await execPromise('git rm -r --cached ".smarty_*"', { cwd: gitRootDir }).catch(() => {});
      await execPromise('git rm --cached "smarty-config.json"', { cwd: gitRootDir }).catch(() => {});

      // 🌟 [해결 3] 전체(.)를 올리지 않고, 우리가 필요한 "StudyRoom" 폴더 딱 하나만 정확하게 올립니다!
      await execPromise('git add StudyRoom', { cwd: gitRootDir });
      
      await execPromise(`git commit -m "🚀 자료실 자동 배포 (버전 업데이트)"`, { cwd: gitRootDir }).catch(() => console.log("새로운 커밋 없음"));
      
      await execPromise(`git push -f "${remoteUrl}" HEAD:main`, { cwd: gitRootDir });
      
      return true;
    } catch (err) {
      console.error("Git Push 에러:", err);
      throw err;
    }
  })
}