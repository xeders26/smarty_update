/*=========================================
  AI 예제 업로더 모달 구현
  - AI가 생성한 도움말을 GitHub에 예제로 배포하는 기능
  - 3단계로 구성된 모달 UI와 단계별 로직 포함
===========================================*/
import * as Blockly from 'blockly';
import { arduinoGenerator } from './blocklySetup';

// 대장님 GitHub 정보 (수정 금지)
const GITHUB_OWNER = 'xeders26'; 
const GITHUB_REPO = 'smarty_update';

export function openExampleUploadModal(workspace: Blockly.WorkspaceSvg, currentTabName: string = "새_예제") {
  if (document.getElementById('smarty-ai-upload-modal')) return;

  const overlay = document.createElement('div');
  overlay.id = 'smarty-ai-upload-modal';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: rgba(0, 0, 0, 0.85); z-index: 999999;
    display: flex; justify-content: center; align-items: center;
    font-family: 'Pretendard', sans-serif;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: #fff; padding: 25px; border-radius: 12px; width: 600px;
    max-width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    display: flex; flex-direction: column; gap: 15px; position: relative;
  `;

  const savedGitToken = localStorage.getItem('smarty_admin_token') || '';
  const savedOpenAIKey = localStorage.getItem('smarty_openai_key') || '';

  modal.innerHTML = `
    <h3 style="margin: 0; color: #2980b9; text-align: center;">🚀 스마티 예제 AI 자동 생성 및 배포</h3>
    <button id="btnAiClose" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 20px; cursor: pointer; color: #999;">✖</button>

    <!-- Step 1: 비밀번호 및 API 키 확인 -->
    <div id="step1_auth">
      <div style="background:#f8f9fa; padding:15px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px;">
        <label style="font-size: 12px; font-weight: bold; color: #d32f2f;">🔑 관리자 암호</label>
        <input type="password" id="inputAdminPwd" placeholder="암호 입력" style="width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 15px; border:1px solid #ccc; border-radius:4px;">
        
        <label style="font-size: 12px; font-weight: bold; color: #16a085;">🤖 OpenAI API Key</label>
        <input type="password" id="inputOpenAI" value="${savedOpenAIKey}" placeholder="sk-..." style="width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 15px; border:1px solid #ccc; border-radius:4px;">
        
        <label style="font-size: 12px; font-weight: bold; color: #2c3e50;">🐙 GitHub Token</label>
        <input type="password" id="inputGitToken" value="${savedGitToken}" placeholder="ghp_..." style="width: 100%; padding: 8px; margin-top: 5px; border:1px solid #ccc; border-radius:4px;">
      </div>
      <button id="btnGenerateAI" style="width: 100%; padding: 12px; background: #2980b9; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 14px;">✨ AI 도움말 작성 시작</button>
    </div>

    <!-- Step 2: AI 결과 확인 및 수정 -->
    <div id="step2_preview" style="display: none;">
      <p style="font-size: 12px; color: #666; margin:0;">AI가 작성한 도움말입니다. (수정 가능)</p>
      <textarea id="aiResultText" style="width: 100%; height: 250px; padding: 10px; border-radius: 6px; border: 1px solid #ccc; resize: none; font-size: 12px; box-sizing: border-box;"></textarea>
      
      <!-- 🌟 [추가됨] 뒤로 가기 버튼이 포함된 하단 버튼 영역 -->
      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <button id="btnBackToStep1" style="flex: 1; padding: 12px; background: #7f8c8d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">⬅️ 다시 입력 (뒤로)</button>
        <button id="btnGoToUpload" style="flex: 2; padding: 12px; background: #27ae60; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">✅ 확인 및 등록(배포) 단계로 이동</button>
      </div>
    </div>

    <!-- Step 3: 저장 위치 및 파일명 입력 후 배포 -->
    <div id="step3_upload" style="display: none;">
      <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <div style="flex: 1;">
          <label style="font-size: 12px; font-weight: bold; color: #333;">📁 폴더 이름 (예: 기본예제, 심화과정)</label>
          <input type="text" id="inputFolder" value="기본예제" style="width: 100%; padding: 8px; margin-top: 5px; border:1px solid #ccc; border-radius:4px; box-sizing: border-box;">
        </div>
        <div style="flex: 1;">
          <label style="font-size: 12px; font-weight: bold; color: #333;">📄 파일 이름 (확장자 제외)</label>
          <input type="text" id="inputFile" value="${currentTabName}" style="width: 100%; padding: 8px; margin-top: 5px; border:1px solid #ccc; border-radius:4px; box-sizing: border-box;">
        </div>
      </div>
      <p id="uploadStatusMsg" style="color: #2980b9; font-size: 13px; text-align: center; height: 16px; margin-bottom: 15px; font-weight:bold;"></p>
      
      <!-- 🌟 [추가됨] 뒤로 가기 버튼이 포함된 하단 버튼 영역 -->
      <div style="display: flex; gap: 10px;">
        <button id="btnBackToStep2" style="flex: 1; padding: 12px; background: #7f8c8d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">⬅️ 도움말 확인 (뒤로)</button>
        <button id="btnGitUpload" style="flex: 2; padding: 12px; background: #e74c3c; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🚀 GitHub에 예제 완벽 배포하기</button>
      </div>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById('btnAiClose')?.addEventListener('click', () => overlay.remove());

  // 🌟 [추가됨] 뒤로 가기 이벤트 연결
  document.getElementById('btnBackToStep1')?.addEventListener('click', () => {
    document.getElementById('step2_preview')!.style.display = 'none';
    document.getElementById('step1_auth')!.style.display = 'block';
  });

  document.getElementById('btnBackToStep2')?.addEventListener('click', () => {
    document.getElementById('step3_upload')!.style.display = 'none';
    document.getElementById('step2_preview')!.style.display = 'block';
    document.getElementById('uploadStatusMsg')!.innerText = ''; // 오류 메시지 초기화
  });

  // ==========================================
  // [1단계] AI 도움말 작성 로직
  // ==========================================
  document.getElementById('btnGenerateAI')?.addEventListener('click', async () => {
    const pwd = (document.getElementById('inputAdminPwd') as HTMLInputElement).value;
    if (pwd !== 'smartygood') { alert("❌ 암호가 틀렸습니다."); return; }

    const code = arduinoGenerator.workspaceToCode(workspace);
    if (!code || code.trim() === '') { alert("⚠️ 화면에 조립된 블록이 없습니다."); return; }

    const openAIKey = (document.getElementById('inputOpenAI') as HTMLInputElement).value;
    const gitToken = (document.getElementById('inputGitToken') as HTMLInputElement).value;
    
    if(!openAIKey || !gitToken) { alert("⚠️ API 키와 토큰을 모두 입력해주세요!"); return; }

    localStorage.setItem('smarty_openai_key', openAIKey);
    localStorage.setItem('smarty_admin_token', gitToken);

    document.getElementById('step1_auth')!.style.display = 'none';
    document.getElementById('step2_preview')!.style.display = 'block';
    
    const textArea = document.getElementById('aiResultText') as HTMLTextAreaElement;
    textArea.value = "⏳ AI가 코드의 목적을 분석하고 초등학생용 HTML 도움말 양식을 생성 중입니다... (약 10초 소요)";

    const systemPrompt = `
너는 로봇 코딩 교육 전문가야. 아래 제공된 아두이노 코드를 분석해서, 사용자가 제공한 HTML 양식과 **완벽하게 동일한 구조와 CSS 스타일**을 유지하며 도움말을 작성해.
반드시 아래의 양식을 그대로 복사해서 내용만 바꿔서 출력해. (Markdown 코드 블록 기호 \`\`\`html 등은 쓰지 말고 순수 HTML 텍스트만 출력해)

[양식]
<h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🎯 (예제의 핵심 제목)</h3>
<hr style="border-color: rgba(255,255,255,0.1);">
<p style="font-weight: normal;">(이 예제가 무엇을 하는지 초등학생이 이해하기 쉽게 1~2줄로 설명)</p>
<ul style="font-weight: normal;">
  <li>(작동 원리 설명 1)</li>
  <li>(작동 원리 설명 2 또는 주의사항)</li>
</ul>

<div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
  <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">핵심 입력/센서 정보</span></div>
  <div style="padding-left: 20px;">
    <span style="color:#f5b041;">• (사용한 센서/값) : </span><span style="color:#e67e22;">(설명)</span>
  </div>
  <div style="height: 12px;"></div>
  <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">핵심 출력/동작 정보</span></div>
  <div style="padding-left: 20px;">
    <span style="color:#f5b041;">• (동작하는 모터/LED) : </span><span style="color:#e67e22;">(설명)</span>
  </div>
</div>

<div style="height: 8px;"></div>
<div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
  <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드 요약:</span><br>
  <span style="color:#9aa5a6;">(코드의 가장 핵심이 되는 부분 1~2줄 작성)</span>
</div>
`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openAIKey}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `분석할 코드:\n${code}` }
          ]
        })
      });
      if (response.ok) {
        const data = await response.json();
        textArea.value = data.choices[0].message.content.trim();
      } else {
        throw new Error("API 요청 실패");
      }
    } catch (e: any) {
      textArea.value = "❌ AI 생성 실패. OpenAI API 키가 만료되었거나 올바르지 않습니다.\n\n아래 [⬅️ 다시 입력 (뒤로)] 버튼을 눌러 키를 다시 확인해주세요.";
    }
  });

  // ==========================================
  // [2단계] 미리보기 -> 업로드 화면 전환
  // ==========================================
  document.getElementById('btnGoToUpload')?.addEventListener('click', () => {
    document.getElementById('step2_preview')!.style.display = 'none';
    document.getElementById('step3_upload')!.style.display = 'block';
  });

  // ==========================================
  // [3단계] GitHub 파일(JSON, TXT) 2개 동시 배포 로직
  // ==========================================
  document.getElementById('btnGitUpload')?.addEventListener('click', async () => {
    const gitToken = localStorage.getItem('smarty_admin_token');
    const folder = (document.getElementById('inputFolder') as HTMLInputElement).value.trim();
    const fileName = (document.getElementById('inputFile') as HTMLInputElement).value.trim();
    const helpHtml = (document.getElementById('aiResultText') as HTMLTextAreaElement).value;
    const statusMsg = document.getElementById('uploadStatusMsg')!;
    
    if (!folder || !fileName) { statusMsg.innerText = "⚠️ 폴더와 파일명을 적어주세요!"; return; }

    statusMsg.innerText = "🔄 블록 데이터(JSON)와 도움말(TXT)을 배포하는 중...";
    const btnUpload = document.getElementById('btnGitUpload') as HTMLButtonElement;
    btnUpload.disabled = true;

    const workspaceJson = Blockly.serialization.workspaces.save(workspace);
    const jsonStr = JSON.stringify(workspaceJson, null, 2);

    const uploadToGit = async (extension: string, contentStr: string) => {
      const fullPath = `examples/${folder}/${fileName}.${extension}`;
      const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${fullPath}`;
      const headers = { 'Authorization': `token ${gitToken}`, 'Content-Type': 'application/json' };
      
      let sha = '';
      const getRes = await fetch(apiUrl, { headers });
      if (getRes.ok) sha = (await getRes.json()).sha;

      const contentB64 = btoa(unescape(encodeURIComponent(contentStr)));
      const body: any = { message: `🚀 예제 업데이트: ${folder}/${fileName}.${extension}`, content: contentB64 };
      if (sha) body.sha = sha;

      const putRes = await fetch(apiUrl, { method: 'PUT', headers, body: JSON.stringify(body) });
      if (!putRes.ok) throw new Error(`${extension} 업로드 실패`);
    };

    try {
      await uploadToGit('json', jsonStr);
      await uploadToGit('txt', helpHtml);

      statusMsg.style.color = '#27ae60';
      statusMsg.innerText = "🎉 완벽하게 배포되었습니다! 앱을 통해 즉시 확인할 수 있습니다.";
      setTimeout(() => overlay.remove(), 2500);
    } catch (e: any) {
      statusMsg.style.color = 'red';
      statusMsg.innerText = `❌ 업로드 실패! GitHub 토큰을 확인하세요.`;
      btnUpload.disabled = false;
      // 실패 시 하단의 [⬅️ 도움말 확인 (뒤로)] 버튼을 누른 뒤, 거기서 한 번 더 [뒤로 가기]를 눌러 1단계(토큰입력)로 갈 수 있습니다.
    }
  });
}