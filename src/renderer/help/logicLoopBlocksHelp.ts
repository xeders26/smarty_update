/*========================================================================
  src/renderer/help/logicLoopBlocksHelp.ts
  - 논리(조건, 비교) 및 반복(루프) 블록 도움말 데이터
=================================================*/

export const LogicLoopBlocksHelp: Record<string, string> = {

  'controls_if': `
    <h2 style="color: #2980b9;">❓ 만약 ~라면 (조건문)</h2>
    <hr>
    <p>상황에 따라 <b>로봇이 스스로 판단하여 다른 행동을 하도록</b> 만드는 가장 중요한 블록입니다.</p>
    <ul>
      <li><b>[+] 버튼:</b> '아니면 만약(else if)'이나 '아니면(else)'을 추가하여 조건을 여러 개로 늘릴 수 있습니다.</li>
      <li><b>[-] 버튼:</b> 필요 없는 조건을 다시 삭제합니다.</li>
      <li>위에서부터 차례대로 조건을 검사하며, 맞는 조건이 나오면 그 안의 코드만 실행하고 블록을 빠져나갑니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">if (조건1) { ... }</span><br>
      <span style="color:#e74c3c;">else if (조건2) { ... }</span><br>
      <span style="color:#e74c3c;">else { ... }</span>
    </div>
  `,

  'logic_compare': `
    <h2 style="color: #2980b9;">⚖️ 비교 연산자 (크기/같음 비교)</h2>
    <hr>
    <p>두 개의 숫자나 값을 비교하여 <b>참(True)인지 거짓(False)인지 판단</b>합니다.</p>
    <ul>
      <li><b>= (같다):</b> 양쪽 값이 완전히 같으면 참</li>
      <li><b>≠ (다르다):</b> 양쪽 값이 서로 다르면 참</li>
      <li><b><, >, ≤, ≥:</b> 왼쪽 값이 오른쪽 값보다 작거나, 크거나, 같을 때 참</li>
      <li>주로 '만약 ~라면' 블록이나 '조건 반복' 블록의 빈칸에 넣어 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">A == B</span>, <span style="color:#e74c3c;">A != B</span>, <span style="color:#e74c3c;">A > B</span> 등
    </div>
  `,

  'logic_operation': `
    <h2 style="color: #2980b9;">🔀 논리 연산자 (그리고/또는)</h2>
    <hr>
    <p>두 개 이상의 조건을 <b>하나로 묶어서 검사</b>할 때 사용합니다.</p>
    <ul>
      <li><b>그리고 (AND):</b> 양쪽 조건이 <b>모두</b> 참이어야만 전체가 참이 됩니다. (예: 앞이 막히고 AND 뒤도 막혔을 때)</li>
      <li><b>또는 (OR):</b> 양쪽 조건 중 <b>하나라도</b> 참이면 전체가 참이 됩니다. (예: 왼쪽이 막히거나 OR 오른쪽이 막혔을 때)</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">A && B</span> // 그리고 (AND)<br>
      <span style="color:#e74c3c;">A || B</span> // 또는 (OR)
    </div>
  `,

  'controls_repeat_ext': `
    <h2 style="color: #2980b9;">🔁 정해진 횟수만큼 반복하기</h2>
    <hr>
    <p>블록 안에 들어있는 명령들을 <b>지정한 숫자(횟수)만큼 똑같이 반복</b>합니다.</p>
    <ul>
      <li>같은 동작을 여러 번 써야 할 때, 코드를 아주 짧고 깔끔하게 만들어 줍니다.</li>
      <li>예: "LED를 5번 깜빡여라", "정사각형을 그리기 위해 앞으로 가고 도는 것을 4번 반복해라"</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">for (int i = 0; i < 횟수; i++) { ... }</span>
    </div>
  `,

  'controls_whileUntil': `
    <h2 style="color: #2980b9;">🔄 조건에 따라 반복하기</h2>
    <hr>
    <p>특정한 <b>조건이 맞을 때까지(또는 맞는 동안) 계속해서 반복</b>하는 블록입니다.</p>
    <ul>
      <li><b>~인 동안 (while):</b> 조건이 <b>참(True)</b>인 동안 계속 반복합니다. 조건이 거짓이 되면 반복을 멈춥니다.</li>
      <li><b>~할 때까지 (until):</b> 조건이 <b>참(True)이 될 때까지</b> 반복합니다. (거짓인 동안 반복)</li>
      <li>센서 값을 계속 확인하면서 기다리거나 동작할 때 매우 유용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">while (조건) { ... }</span> // ~인 동안<br>
      <span style="color:#e74c3c;">while (!(조건)) { ... }</span> // ~할 때까지
    </div>
  `
};