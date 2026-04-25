/*========================================================================
  src/renderer/help/functionsBlocksHelp.ts
  - 함수(Functions / Procedures) 블록 도움말 데이터
=================================================*/

export const FunctionsBlocksHelp: Record<string, string> = {

  'procedures_defnoreturn': `
    <h2 style="color: #2980b9;">🛠️ 함수 만들기 (반환값 없음)</h2>
    <hr>
    <p>길고 복잡한 코드를 하나로 묶어서 <b>나만의 새로운 명령(함수)</b>으로 만드는 블록입니다.</p>
    <ul>
      <li>자주 사용하는 동작(예: "앞으로 갔다가 돌기")을 하나로 묶어두면 메인 코드가 아주 깔끔해집니다.</li>
      <li>동작만 실행하고 어떤 값을 결과로 돌려주지는 않습니다.</li>
      <li>톱니바퀴 아이콘을 눌러 매개변수(입력값)를 추가할 수도 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">void 함수이름() {</span><br>
      <span style="color:#e74c3c;">&nbsp;&nbsp;// 내가 만든 코드들...</span><br>
      <span style="color:#e74c3c;">}</span>
    </div>
  `,

  'procedures_defreturn': `
    <h2 style="color: #2980b9;">🛠️ 함수 만들기 (반환값 있음)</h2>
    <hr>
    <p>나만의 새로운 계산식이나 판단 기능을 만들고, <b>마지막에 결과값을 돌려주는 함수</b>입니다.</p>
    <ul>
      <li>내부에서 복잡한 계산이나 센서 판단을 수행한 뒤, 최종 결과(예: 거리 값, 계산된 숫자)를 <b>return</b> 블록에 넣어 돌려줍니다.</li>
      <li>이 블록으로 만든 함수는 다른 블록의 빈칸에 쏙 집어넣어 사용할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">double 함수이름() {</span><br>
      <span style="color:#e74c3c;">&nbsp;&nbsp;// 계산 코드들...</span><br>
      <span style="color:#e74c3c;">&nbsp;&nbsp;return 결과값;</span><br>
      <span style="color:#e74c3c;">}</span>
    </div>
  `,

  'procedures_callnoreturn': `
    <h2 style="color: #2980b9;">📣 함수 실행하기 (반환값 없음)</h2>
    <hr>
    <p>'함수 만들기' 블록을 통해 만든 <b>나만의 명령을 실제로 불러와서 실행</b>합니다.</p>
    <ul>
      <li>함수는 만들기만 하면 작동하지 않습니다. 반드시 메인 프로그램(loop)에서 이 블록을 사용해 <b>호출(Call)</b>해야 작동합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">함수이름();</span>
    </div>
  `,

  'procedures_callreturn': `
    <h2 style="color: #2980b9;">📣 함수 실행하고 값 가져오기 (반환값 있음)</h2>
    <hr>
    <p>'결과값이 있는 함수'를 실행하고, 그 <b>계산된 결과값을 숫자나 문자로 가져옵니다.</b></p>
    <ul>
      <li>가져온 결과값은 변수에 저장하거나, 조건문(만약 ~라면)에서 크기를 비교할 때 유용하게 사용할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">함수이름()</span>
    </div>
  `,

  'procedures_ifreturn': `
    <h2 style="color: #2980b9;">🔄 조건부 반환 (만약 ~이면 빠져나가기)</h2>
    <hr>
    <p>함수 안에서 실행 도중 <b>특정 조건이 맞으면, 즉시 함수를 멈추고 빠져나가는 블록</b>입니다.</p>
    <ul>
      <li><b>반환값이 있는 함수</b> 안에서 쓰면: 지정한 값을 돌려주면서 함수가 즉시 끝납니다.</li>
      <li><b>반환값이 없는 함수</b> 안에서 쓰면: 값 없이 그냥 함수 작동을 바로 멈추고 메인 코드로 돌아갑니다.</li>
      <li>이 블록은 반드시 '함수 만들기' 블록 안에서만 사용할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">if (조건) return 값;</span>
    </div>
  `
};