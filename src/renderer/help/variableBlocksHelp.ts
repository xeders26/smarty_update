/*========================================================================
  src/renderer/help/variableBlocksHelp.ts
  - 데이터 저장소인 변수(Variable)의 저장, 읽기, 변경 블록 도움말 데이터
=================================================*/

export const VariableBlocksHelp: Record<string, string> = {

  'smarty_variables_set': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">💾 변수에 값 저장하기 (덮어쓰기)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">내가 만든 변수(데이터를 담는 상자)에 새로운 숫자나 글자를 집어넣어 저장하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>이전에 상자(변수)에 어떤 값이 들어있었든 상관없이, 새로 넣은 값으로 완전히 덮어쓰기가 됩니다.</li>
      <li>센서의 현재 값을 기억해두거나, 게임의 초기 점수를 0점으로 세팅할 때 주로 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 변수 : </span><span style="color:#e67e22;">값을 저장할 변수의 이름 선택</span><br>
        <span style="color:#f5b041;">• 저장할 값 : </span><span style="color:#e67e22;">변수에 새롭게 넣을 데이터 (숫자, 문자열, 논리형 등)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">지정한 변수에 값을 저장(덮어쓰기)함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">변수이름 = 10;</span> <span style="color:#9aa5a6;">// 또는 "Hello" 등</span>
    </div>
  `,

  'smarty_variables_get': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🗂️ 변수 값 꺼내 쓰기 (읽기)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">변수 상자 안에 현재 어떤 값이 들어있는지 읽어와서 사용하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>이 블록은 단독으로 쓰이지 않고, 항상 "만약 ~라면", "계산식", "출력하기" 등의 다른 블록 빈칸에 쏙 끼워 넣어서 사용합니다.</li>
      <li>값을 꺼내 쓴다고 해서 상자 안의 값이 사라지지는 않습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 변수 : </span><span style="color:#e67e22;">읽어올 변수의 이름 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 변수 데이터 : </span><span style="color:#e67e22;">해당 변수에 저장되어 있던 값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">변수이름</span>
    </div>
  `,

  'smarty_variables_change': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📈 변수 값 더하기 (누적시키기)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">변수 상자에 원래 들어있던 값에다가 내가 지정한 숫자만큼을 더해주는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>점수 올리기: 빈칸에 1을 넣으면 실행될 때마다 점수가 1점씩 올라갑니다.</li>
      <li>점수 내리기: 빈칸에 -1을 넣으면 빼기가 되어 1점씩 내려갑니다.</li>
      <li>버튼을 몇 번 눌렀는지 횟수를 세거나(카운터), 모터의 속도를 서서히 올릴 때 아주 유용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 변수 : </span><span style="color:#e67e22;">값을 변화시킬 변수의 이름 선택</span><br>
        <span style="color:#f5b041;">• 증감할 수치 : </span><span style="color:#e67e22;">더해줄 숫자 값 (음수를 넣으면 빼기가 됨)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">기존 값에 새로운 수치를 누적 연산하여 저장함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">변수이름 += 1;</span> <span style="color:#9aa5a6;">// 1만큼 더하기</span>
    </div>
  `
};