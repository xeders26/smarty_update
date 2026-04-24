/*================
  src/renderer/ui/modal.ts
=================*/
import * as Blockly from 'blockly';

export function showCuteModal(type: 'alert' | 'confirm' | 'prompt', message: string, defaultValue: string, callback: Function) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;justify-content:center;align-items:center;`;
  
  const box = document.createElement('div');
  // 🌟 [수정] 폰트 프리텐다드 적용
  box.style.cssText = `background:white;padding:30px;border-radius:20px;width:340px;box-shadow:0 15px 30px rgba(0,0,0,0.3);text-align:center;font-family:'Pretendard Variable', Pretendard, sans-serif;border:4px solid #A0E7E5;`;
  
  const title = document.createElement('div');
  title.innerHTML = message.replace(/\n/g, '<br>');
  // 🌟 [수정] 가독성을 위해 제목 굵기(font-weight: 600) 추가
  title.style.cssText = `margin-bottom:20px;font-size:18px;font-weight:600;color:#2c3e50;line-height:1.5;`;
  box.appendChild(title);
  
  let input: HTMLInputElement | null = null;
  if (type === 'prompt') {
    input = document.createElement('input');
    input.type = 'text';
    input.value = defaultValue;
    // 🌟[수정] 폰트 적용 및 입력창 글자 굵기(500) 추가
    input.style.cssText = `width:90%;padding:10px;margin-bottom:20px;border:2px solid #bdc3c7;border-radius:12px;font-size:16px;outline:none;font-family:'Pretendard Variable', Pretendard, sans-serif;font-weight:500;text-align:center;`;
    input.onfocus = () => { input!.style.borderColor = '#A0E7E5'; };
    input.onblur = () => { input!.style.borderColor = '#bdc3c7'; };
    box.appendChild(input);
  }
  
  const btnDiv = document.createElement('div');
  btnDiv.style.cssText = `display:flex;justify-content:center;gap:15px;`;
  
  if (type === 'confirm' || type === 'prompt') {
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '아니오 (취소)';
    // 🌟[수정] 폰트 적용 및 취소 버튼 굵기(600) 추가
    cancelBtn.style.cssText = `padding:10px 18px;cursor:pointer;background:#ecf0f1;color:#7f8c8d;border:none;border-radius:15px;font-family:'Pretendard Variable', Pretendard, sans-serif;font-weight:600;font-size:16px;transition:0.2s;`;
    cancelBtn.onmouseover = () => cancelBtn.style.background = '#bdc3c7';
    cancelBtn.onmouseout = () => cancelBtn.style.background = '#ecf0f1';
    cancelBtn.onclick = () => { document.body.removeChild(overlay); callback(type === 'prompt' ? null : false); };
    btnDiv.appendChild(cancelBtn);
  }
  
  const okBtn = document.createElement('button');
  okBtn.textContent = type === 'alert' ? '확인' : (type === 'confirm' ? '네! (저장)' : '확인');
  // 🌟 [수정] 폰트 적용 및 확인 버튼 굵기(600) 추가
  okBtn.style.cssText = `padding:10px 20px;cursor:pointer;background:#FFB7B2;color:white;border:none;border-radius:15px;font-family:'Pretendard Variable', Pretendard, sans-serif;font-weight:600;font-size:16px;box-shadow:0 4px 0px #FF9E99;transition:0.1s;`;
  okBtn.onmousedown = () => { okBtn.style.transform = 'translateY(4px)'; okBtn.style.boxShadow = 'none'; };
  okBtn.onmouseup = () => { okBtn.style.transform = 'none'; okBtn.style.boxShadow = '0 4px 0px #FF9E99'; };
  okBtn.onclick = () => { 
    document.body.removeChild(overlay); 
    if (type === 'alert') callback();
    else if (type === 'confirm') callback(true);
    else if (type === 'prompt') callback(input!.value);
  };
  
  if (input) {
    input.onkeydown = (e) => { if (e.key === 'Enter') okBtn.click(); else if (e.key === 'Escape') { document.body.removeChild(overlay); callback(null); } };
  }
  
  btnDiv.appendChild(okBtn);
  box.appendChild(btnDiv);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  
  if (input) { input.focus(); input.select(); }
}

export function installBlocklyDialogs() {
  Blockly.dialog.setAlert((msg: any, callback: any) => showCuteModal('alert', msg, '', callback));
  Blockly.dialog.setConfirm((msg: any, callback: any) => showCuteModal('confirm', msg, '', callback));
  Blockly.dialog.setPrompt((msg: any, def: any, callback: any) => showCuteModal('prompt', msg, def, callback));
}