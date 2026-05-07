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
  
  // 🌟 [핵심 변경] 빈방 문제 해결! 원본 파일을 안전 구역으로 "복사"해옵니다!
  // 🌟 [최종 수정본] 빈 방 문제 완벽 해결 & 설정 파일 절대 터치 금지!
  const getStudyRoomPath = () => {
    const isDev = !app.isPackaged;
    const workspaceFolderName = isDev ? 'SmartyWorkspace_Dev' : 'SmartyWorkspace';
    const workspacePath = join(app.getPath('userData'), workspaceFolderName);
    const studyRoomPath = join(workspacePath, 'StudyRoom');

    // 1. 안전 구역에 폴더가 아예 없으면 일단 빈 폴더 생성
    if (!fs.existsSync(studyRoomPath)) {
      fs.mkdirSync(studyRoomPath, { recursive: true });
    }

    // 2. 🌟 [핵심 해결] 폴더는 있는데 안이 "텅텅 비어있다면?" 원본에서 무조건 꽉꽉 채워 넣습니다!
    if (fs.readdirSync(studyRoomPath).length === 0) {
      const sourceStudyRoom = isDev 
        ? join(process.cwd(), 'StudyRoom') 
        : join(process.resourcesPath, 'StudyRoom');

      if (fs.existsSync(sourceStudyRoom)) {
        fs.cpSync(sourceStudyRoom, studyRoomPath, { recursive: true }); 
      }
    }
    
    // 💥 대장님을 화나게 했던 smarty-config.json 건드리는 코드는 우주 끝으로 날려버렸습니다! 절대 안 건드립니다!
    
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

  ipcMain.handle('sync-studyroom-git', async () => {
    try {
      const studyRoomDir = getStudyRoomPath();
      const gitRootDir = dirname(studyRoomDir);

      // 🌟 학생 PC에 Git 저장소가 없으면 즉시 생성하고 서버 주소를 연결해 줍니다!
      const gitPath = join(gitRootDir, '.git');
      if (!fs.existsSync(gitPath)) {
        await execPromise('git init', { cwd: gitRootDir });
        await execPromise('git branch -M main', { cwd: gitRootDir });
        // 토큰 없이 공개 주소로 연결 (학생들은 읽기만 하니까 토큰 불필요)
        await execPromise('git remote add origin https://github.com/xeders26/smarty_update.git', { cwd: gitRootDir }).catch(() => {});
      }

      // 서버에서 최신 파일 당겨오기
      const { stdout } = await execPromise('git pull origin main', { cwd: gitRootDir });

      const infoPath = join(studyRoomDir, 'studyRoom_info.json');
      let version = "1.0.0";
      if (fs.existsSync(infoPath)) {
        version = JSON.parse(fs.readFileSync(infoPath, 'utf-8')).version || "1.0.0";
      }

      return { updated: !stdout.includes('Already up to date'), version };
    } catch (err) {
      console.warn("Git Pull 에러:", err);
      return { updated: false, version: "오프라인" };
    }
  })

  ipcMain.handle('push-studyroom-git', async (_event, token) => {
    try {
      const studyRoomDir = getStudyRoomPath();
      const gitRootDir = dirname(studyRoomDir); // 이제 이 경로는 AppData 쪽 안전한 경로가 됩니다.
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
      
      await execPromise('git add .', { cwd: gitRootDir });
      await execPromise(`git commit -m "🚀 자료실 자동 배포 (버전 업데이트)"`, { cwd: gitRootDir }).catch(() => console.log("새로운 커밋 없음"));
      
      await execPromise(`git push -f "${remoteUrl}" HEAD:main`, { cwd: gitRootDir });
      
      return true;
    } catch (err) {
      console.error("Git Push 에러:", err);
      throw err;
    }
  })
}