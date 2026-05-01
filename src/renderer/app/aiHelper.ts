/*=========================================================
  AI 설명서 생성 모달 구현
  - 조립된 블록을 AI가 분석해서 초등학생 눈높이에 맞는 설명서로 변환
  - OpenAI API를 활용한 가스라이팅 프롬프트 적용
  - API 키 관리, 로딩 상태 표시, 결과 복사 기능 포함
==========================================================*/
import * as Blockly from 'blockly';
import { arduinoGenerator } from './blocklySetup';

export async function openAIGeneratorModal(workspace: Blockly.WorkspaceSvg) {
  // 1. 현재 화면에 조립된 블록을 C++ 코드로 변환
  const code = arduinoGenerator.workspaceToCode(workspace);
  
  if (!code || code.trim() === '') {
    alert("⚠️ 조립된 블록이 없습니다! 블록을 먼저 조립해주세요.");
    return;
  }

  // 2. 내 PC에 저장된 OpenAI 키가 있는지 확인
  let apiKey = localStorage.getItem('smarty_openai_key');
  if (!apiKey) {
    apiKey = prompt("🔑 OpenAI API Key를 입력해주세요. (sk- 로 시작하는 키)\n한 번 입력하면 이 PC에 안전하게 저장됩니다.");
    if (!apiKey) return;
    localStorage.setItem('smarty_openai_key', apiKey);
  }

  // 3. AI 로딩 모달 띄우기
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.7); z-index: 999999;
    display: flex; justify-content: center; align-items: center;
    font-family: 'Pretendard', sans-serif;
  `;
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: #fff; padding: 25px; border-radius: 12px;
    width: 600px; max-width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    display: flex; flex-direction: column; gap: 15px;
  `;
  modal.innerHTML = `
    <h3 style="margin: 0; color: #673AB7; text-align: center;">🤖 AI 스마티가 설명서를 작성하고 있습니다...</h3>
    <textarea id="aiResultText" style="width: 100%; height: 300px; padding: 10px; border-radius: 6px; border: 1px solid #ccc; resize: none; font-size: 13px;" readonly>⏳ 코드를 분석하고 초등학생 눈높이에 맞게 번역하는 중입니다. 5~10초 정도 걸립니다...</textarea>
    <div style="display: flex; gap: 10px;">
      <button id="btnAiClose" style="flex: 1; padding: 12px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">닫기</button>
      <button id="btnAiCopy" style="flex: 1; padding: 12px; background: #4CAF50; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">📋 복사하기</button>
    </div>
  `;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById('btnAiClose')?.addEventListener('click', () => overlay.remove());
  document.getElementById('btnAiCopy')?.addEventListener('click', () => {
    const text = (document.getElementById('aiResultText') as HTMLTextAreaElement).value;
    navigator.clipboard.writeText(text);
    alert("✅ 설명서가 복사되었습니다! 원하는 곳에 붙여넣기 하세요.");
  });

  // 4. OpenAI API에 요청 보내기 (가스라이팅 프롬프트)
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 가장 빠르고 저렴한 최신 모델
        messages: [
          {
            role: "system",
            content: `너는 초등학생 대상 로봇(스마티) 코딩 교육 전문가야. 
아래 아두이노 기반의 코드를 분석해서 다음 양식(Markdown)에 맞춰서 친절하게 설명서를 작성해줘. 이모지도 적절히 섞어줘.

# 🎯 이 예제의 목표
(무엇을 하는 프로그램인지 1~2줄로 설명)

# ⚙️ 작동 원리
(코드가 어떤 순서로 동작하는지 초등학생이 이해하기 쉽게 1, 2, 3 단계로 설명)

# ⚠️ 주의사항 및 팁
(로봇 각도나 모터 등 주의할 점 1~2가지)`
          },
          {
            role: "user",
            content: `분석할 코드:\n\n${code}`
          }
        ],
        temperature: 0.7
      })
    });

    if (response.ok) {
      const data = await response.json();
      const resultText = data.choices[0].message.content;
      (document.getElementById('aiResultText') as HTMLTextAreaElement).value = resultText;
      (document.getElementById('aiResultText') as HTMLTextAreaElement).removeAttribute('readonly');
    } else {
      const err = await response.json();
      if (err.error?.code === 'invalid_api_key') {
        localStorage.removeItem('smarty_openai_key');
        (document.getElementById('aiResultText') as HTMLTextAreaElement).value = "❌ API 키가 잘못되었거나 만료되었습니다. 창을 닫고 다시 시도해주세요.";
      } else {
        throw new Error(err.error?.message || "알 수 없는 에러");
      }
    }
  } catch (error: any) {
    (document.getElementById('aiResultText') as HTMLTextAreaElement).value = `❌ 에러 발생: ${error.message}`;
  }
}