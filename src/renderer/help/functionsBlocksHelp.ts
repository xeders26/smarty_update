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
      <li>자주 사용하는 동작(예: "앞으로 갔다가 돌기")을 하나로 묶어두면 메인 코드가 아주 깔끔해집니다.</li>
      <li>동작만 실행하고 어떤 값을 결과로 돌려주지는 않습니다.</li>
      <li>[입력 추가 ➕] 버튼을 눌러 정수, 실수, 문자열, 논리값 등 함수에 필요한 재료(매개변수)를 바로 추가하고 편집할 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 매개변수 (옵션) : </span><span style="color:#e67e22;">함수 내부에서 사용할 데이터(정수, 실수, 문자열 등) 추가 가능</span>
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
    <p style="font-weight: normal;">나만의 새로운 계산식이나 판단 기능을 만들고, 마지막에 결과값을 돌려주는 함수입니다.</p>
    <ul style="font-weight: normal;">
      <li>내부에서 복잡한 계산이나 센서 판단을 수행한 뒤, 최종 결과를 [➔ 결과 반환] 빈칸에 넣어 돌려줍니다.</li>
      <li>[입력 추가 ➕]를 통해 입력값을 받고, 오른쪽 끝에 있는 드롭다운으로 반환될 결과값의 종류(정수, 실수 등)도 설정할 수 있습니다.</li>
      <li>이 블록으로 만든 함수는 다른 블록의 빈칸에 쏙 집어넣어 사용할 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 매개변수 (옵션) : </span><span style="color:#e67e22;">함수 내부 연산에 사용할 데이터 추가 가능</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 연산 결과 데이터 : </span><span style="color:#e67e22;">드롭다운에서 지정한 타입(정수, 실수 등)의 결과값 반환</span>
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
    <p style="font-weight: normal;">'결과값 없는 함수 만들기' 블록을 통해 만든 나만의 명령을 실제로 불러와서 실행합니다.</p>
    <ul style="font-weight: normal;">
      <li>함수는 만들기만 하면 작동하지 않습니다. 반드시 메인 프로그램(loop)에서 이 블록을 사용해 호출(Call)해야 작동합니다.</li>
      <li>만약 함수를 만들 때 입력을 추가했다면, 이 블록에도 값을 넣을 수 있는 구멍이 자동으로 생겨납니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 함수 입력값 : </span><span style="color:#e67e22;">함수 정의 시 만들어둔 매개변수 수에 맞춰 데이터 입력</span>
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
    <p style="font-weight: normal;">'결과값 있는 함수 만들기'를 통해 만든 함수를 실행하고, 그 계산된 결과값을 가져오는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>함수가 돌려주는 값(정수, 실수, 논리값 등)에 맞추어 변수에 저장하거나 조건문(만약 ~라면)에서 비교할 때 유용하게 사용할 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 함수 입력값 : </span><span style="color:#e67e22;">함수 정의 시 만들어둔 매개변수 수에 맞춰 데이터 전달</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 연산 결과 데이터 : </span><span style="color:#e67e22;">함수 실행이 완료된 후 계산된 최종 결과값 반환</span>
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
        <span style="color:#f5b041;">• 반환할 값 (옵션) : </span><span style="color:#e67e22;">결과가 있는 함수일 경우, 반환할 결과 데이터 지정</span>
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