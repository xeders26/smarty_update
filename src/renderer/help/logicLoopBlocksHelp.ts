/*========================================================================
  src/renderer/help/logicLoopBlocksHelp.ts
  - 논리(조건, 비교) 및 반복(루프) 블록 도움말 데이터
=================================================*/

export const LogicLoopBlocksHelp: Record<string, string> = {

  'controls_if': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">❓ 만약 ~라면 (조건문)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">상황에 따라 로봇이 스스로 판단하여 다른 행동을 하도록 만드는 가장 중요한 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>[+] 버튼: '아니면 만약(else if)'이나 '아니면(else)'을 추가하여 조건을 여러 개로 늘릴 수 있습니다.</li>
      <li>[-] 버튼: 필요 없는 조건을 다시 삭제합니다.</li>
      <li>위에서부터 차례대로 조건을 검사하며, 맞는 조건이 나오면 그 안의 코드만 실행하고 블록을 빠져나갑니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 판단 조건 : </span><span style="color:#e67e22;">참(true) 또는 거짓(false)을 판단할 논리 데이터</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">조건이 참(true)일 경우 내부에 있는 블록들을 실행함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">if (조건1) { ... }</span><br>
      <span style="color:#9aa5a6;">else if (조건2) { ... }</span><br>
      <span style="color:#9aa5a6;">else { ... }</span>
    </div>
  `,

  'logic_compare': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚖️ 비교 연산자 (크기/같음 비교)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">두 개의 숫자나 값을 비교하여 참(True)인지 거짓(False)인지 판단합니다.</p>
    <ul style="font-weight: normal;">
      <li>= (같다): 양쪽 값이 완전히 같으면 참</li>
      <li>≠ (다르다): 양쪽 값이 서로 다르면 참</li>
      <li><, >, ≤, ≥: 왼쪽 값이 오른쪽 값보다 작거나, 크거나, 같을 때 참</li>
      <li>주로 '만약 ~라면' 블록이나 '조건 반복' 블록의 빈칸에 넣어 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 비교 대상 데이터 : </span><span style="color:#e67e22;">비교할 두 개의 값 (정수, 실수, 문자열 등)</span><br>
        <span style="color:#f5b041;">• 비교 연산자 : </span><span style="color:#e67e22;">같다(=), 다르다(≠), 크다(>), 작다(<) 등 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 판단 결과 (논리형) : </span><span style="color:#e67e22;">비교 조건이 맞으면 참(true), 틀리면 거짓(false) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">A == B</span>, <span style="color:#9aa5a6;">A != B</span>, <span style="color:#9aa5a6;">A > B</span> <span style="color:#9aa5a6;">등</span>
    </div>
  `,

  'logic_operation': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔀 논리 연산자 (그리고/또는)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">두 개 이상의 조건을 하나로 묶어서 검사할 때 사용합니다.</p>
    <ul style="font-weight: normal;">
      <li>그리고 (AND): 양쪽 조건이 모두 참이어야만 전체가 참이 됩니다. (예: 앞이 막히고 AND 뒤도 막혔을 때)</li>
      <li>또는 (OR): 양쪽 조건 중 하나라도 참이면 전체가 참이 됩니다. (예: 왼쪽이 막히거나 OR 오른쪽이 막혔을 때)</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 결합할 조건 데이터 : </span><span style="color:#e67e22;">비교할 두 개의 논리값 (참/거짓 결과가 나오는 블록)</span><br>
        <span style="color:#f5b041;">• 논리 연산자 : </span><span style="color:#e67e22;">그리고(AND) 또는 또는(OR) 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 최종 판단 결과 (논리형) : </span><span style="color:#e67e22;">최종 결합 조건이 맞으면 참(true), 틀리면 거짓(false) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">A && B</span> <span style="color:#9aa5a6;">// 그리고 (AND)</span><br>
      <span style="color:#9aa5a6;">A || B</span> <span style="color:#9aa5a6;">// 또는 (OR)</span>
    </div>
  `,

  'controls_repeat_ext': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔁 정해진 횟수만큼 반복하기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">블록 안에 들어있는 명령들을 지정한 숫자(횟수)만큼 똑같이 반복합니다.</p>
    <ul style="font-weight: normal;">
      <li>같은 동작을 여러 번 써야 할 때, 코드를 아주 짧고 깔끔하게 만들어 줍니다.</li>
      <li>예: "LED를 5번 깜빡여라", "정사각형을 그리기 위해 앞으로 가고 도는 것을 4번 반복해라"</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반복 횟수 : </span><span style="color:#e67e22;">동작을 반복할 횟수 지정 (정수형 데이터)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">내부에 들어있는 블록들을 횟수만큼 반복 실행함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">for (int i = 0; i < 횟수; i++) { ... }</span>
    </div>
  `,

  'controls_whileUntil': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔄 조건에 따라 반복하기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">특정한 조건이 맞을 때까지(또는 맞는 동안) 계속해서 반복하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>~인 동안 (while): 조건이 참(True)인 동안 계속 반복합니다. 조건이 거짓이 되면 반복을 멈춥니다.</li>
      <li>~할 때까지 (until): 조건이 참(True)이 될 때까지 반복합니다. (거짓인 동안 반복)</li>
      <li>센서 값을 계속 확인하면서 기다리거나 동작할 때 매우 유용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반복 제어 조건 : </span><span style="color:#e67e22;">참(true) 또는 거짓(false)을 판단할 논리 데이터</span><br>
        <span style="color:#f5b041;">• 반복 방식 : </span><span style="color:#e67e22;">~인 동안(while) 또는 ~할 때까지(until) 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">조건에 따라 내부에 들어있는 블록들을 계속 반복 실행함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">while (조건) { ... }</span> <span style="color:#9aa5a6;">// ~인 동안</span><br>
      <span style="color:#9aa5a6;">while (!(조건)) { ... }</span> <span style="color:#9aa5a6;">// ~할 때까지</span>
    </div>
  `
};