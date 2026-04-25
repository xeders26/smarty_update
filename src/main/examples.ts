/*============================
  src/main/examples.ts    
=============================*/
import { app, ipcMain } from 'electron'
import * as fs from 'fs'
import { join } from 'path'

export function registerExampleHandlers(): void {
  ipcMain.handle('get-examples-tree', async () => {
    // 패키징(빌드) 여부에 따라 example 폴더 경로를 자동으로 찾습니다.
    const examplesPath = app.isPackaged 
      ? join(process.resourcesPath, 'examples') 
      : join(process.cwd(), 'examples')

    console.log('====================================')
    console.log('🔍 [예제 스캔] 폴더를 찾는 중입니다...')
    console.log('👉 실제 경로:', examplesPath)

    // 폴더가 없으면 빈 배열 반환
    if (!fs.existsSync(examplesPath)) {
      console.log('❌ [실패] example 폴더가 없습니다!')
      return []
    }

    // 재귀적으로 폴더를 스캔하는 함수
    function scanDirectory(dir: string) {
      const results: any[] = []
      const items = fs.readdirSync(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          // 1. 폴더인 경우: 안쪽을 계속 스캔합니다.
          const children = scanDirectory(fullPath)
          if (children.length > 0) {
            results.push({ type: 'folder', name: item, children })
          }
        } else if (item.endsWith('.json')) { 
          // 2. 파일인 경우: .json 파일만 예제로 인식합니다!
          const baseName = item.replace(/\.json$/, '')
          const helpPath = join(dir, `${baseName}.txt`)
          
          let helpText = '이 예제에 대한 도움말이 없습니다.'
          if (fs.existsSync(helpPath)) {
            helpText = fs.readFileSync(helpPath, 'utf-8') // txt 도움말 완벽하게 챙김!
          }
          
          const fileContent = fs.readFileSync(fullPath, 'utf-8') // json 소스 완벽하게 챙김!
          
          // 프론트엔드로 보따리 싸서 던져주기!
          results.push({ 
            type: 'file', 
            name: baseName, 
            code: fileContent, 
            help: helpText,
            ext: 'json'  // 블록리가 헷갈리지 않게 꼬리표 부착!
          })
        }
      }
      return results
    }

    return scanDirectory(examplesPath)
  })
}