/*========================================================================
  src/renderer/help/functionsBlocksHelp.ts
  - 함수(Functions / Procedures) 블록 도움말 데이터
=================================================*/

export const FunctionsBlocksHelp: Record<string, string> = {

  'procedures_defnoreturn': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚙️ 결과값 없는 함수 만들기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">길고 복잡한 코드를 하나로 묶어서 나만의 새로운 명령(함수)으로 만드는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>동작만 실행하고 어떤 값을 결과로 돌려주지는 않습니다. 주로 자주 쓰는 움직임을 묶어둘 때 사용합니다.</li>
      <li><strong>✨ [입력 추가 ➕] 마법:</strong> 버튼을 눌러 함수에 필요한 재료(정수, 실수, 문자열, 논리값)를 바로 추가할 수 있습니다. 이름과 종류를 자유롭게 바꾸거나 언제든 삭제(⛔)할 수도 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 매개변수 (선택) : </span><span style="color:#e67e22;">함수 내부에서 사용할 다양한 종류의 데이터를 자유롭게 추가 가능</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">지정한 코드 블록들의 동작만 순서대로 수행함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">void 함수이름(int 입력1) {</span><br>
      <span style="color:#9aa5a6;">&nbsp;&nbsp;// 내가 만든 코드들...</span><br>
      <span style="color:#9aa5a6;">}</span>
    </div>
  `,

  'procedures_defreturn': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚙️ 결과값 있는 함수 만들기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">나만의 새로운 계산식이나 판단 기능을 만들고, 마지막에 결과값을 돌려주는 고급 함수 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>[입력 추가 ➕]를 통해 계산에 필요한 재료를 받고, 상단의 드롭다운에서 돌려줄 결과의 종류(정수, 실수, 문자, 논리)를 선택합니다.</li>
      <li><strong>🛡️ 스마트 방어 기능:</strong> 선택한 결과의 종류와 맞지 않는 블록을 [➔ 결과 반환] 홈에 억지로 끼우면 자동으로 튕겨냅니다!</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 매개변수 (선택) : </span><span style="color:#e67e22;">연산에 필요한 다양한 데이터 종류 추가 가능</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 연산 결과 데이터 : </span><span style="color:#e67e22;">설정한 타입에 맞는 정확한 결과값을 반환함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">long 함수이름(int 입력1) {</span><br>
      <span style="color:#9aa5a6;">&nbsp;&nbsp;// 계산 코드들...</span><br>
      <span style="color:#9aa5a6;">&nbsp;&nbsp;return 결과값;</span><br>
      <span style="color:#9aa5a6;">}</span>
    </div>
  `,

  'procedures_callnoreturn': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📣 함수 실행하기 (결과값 없음)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">'결과값 없는 함수 만들기'를 통해 완성한 나만의 명령을 실제로 불러와서 작동시키는 호출 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>함수는 만들기만 하면 작동하지 않습니다. 메인 코드 안에서 이 블록을 사용해 불러주어야(Call) 비로소 작동합니다.</li>
      <li><strong>🛡️ 철통 보안:</strong> 함수를 만들 때 설정한 재료의 종류(예: 정수)에 맞지 않는 다른 블록(예: 문자열)을 끼우면 작동 오류를 막기 위해 스스로 튕겨냅니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 함수 입력값 : </span><span style="color:#e67e22;">함수에 지정된 정확한 종류(타입)의 데이터 전달</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">해당 함수 내부의 동작들을 차례대로 실행시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">함수이름(100);</span>
    </div>
  `,

  'procedures_callreturn': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📣 함수 실행하고 값 가져오기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">'결과값 있는 함수 만들기'로 제작한 함수를 실행하고, 계산된 최종 결과를 가져와서 사용하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li><strong>✨ 육각형 변신 마법:</strong> 함수를 만들 때 결과를 [논리값]으로 설정하면, 이 블록이 스스로 끝이 뾰족한 <strong>육각형</strong>으로 변신하여 [만약 ~라면] 조건문 홈에 쏙 들어갑니다! (정수나 문자열일 때는 다시 둥근 모양으로 변합니다)</li>
      <li>만약 결과의 종류와 현재 끼워진 블록 공간의 종류가 맞지 않으면 스스로 튕겨 나와 에러를 예방합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 함수 입력값 : </span><span style="color:#e67e22;">정해진 타입에 맞는 데이터(파라미터) 전달</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 연산 결과 데이터 : </span><span style="color:#e67e22;">설정된 타입에 맞는 수치나 논리값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">함수이름(100)</span>
    </div>
  `,

  'procedures_ifreturn': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔄 조건부 함수 빠져나가기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">함수 안에서 코드를 실행하던 도중 특정 조건이 맞으면, 즉시 함수를 멈추고 빠져나가는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>결과값이 있는 함수 안에서 쓸 경우: 지정한 값을 돌려주면서 함수가 즉시 종료됩니다.</li>
      <li>결과값이 없는 함수 안에서 쓸 경우: 값 없이 바로 함수의 작동을 멈추고 호출했던 메인 코드로 돌아갑니다.</li>
      <li>이 블록은 반드시 '함수 만들기' 블록 내부에서만 사용할 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 탈출 조건 (논리형) : </span><span style="color:#e67e22;">함수를 빠져나갈 기준 조건식 (참일 때 탈출)</span><br>
        <span style="color:#f5b041;">• 반환할 값 (선택) : </span><span style="color:#e67e22;">결과가 있는 함수일 경우, 반환할 결과 데이터 지정</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">조건이 참이면 실행 중인 함수를 즉시 종료하고 메인으로 돌아감</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">if (조건) return 값;</span>
    </div>
  `
};