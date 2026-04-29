/*========================================================================
  src/renderer/help/functionsBlocksHelp.ts
  - 함수(Functions / Procedures) 블록 도움말 데이터
=================================================*/

export const FunctionsBlocksHelp: Record<string, string> = {

  'procedures_defnoreturn': `
    <h2 style="color: #2980b9;">⚙️ 결과값 없는 함수 만들기</h2>
    <hr>
    <p>길고 복잡한 코드를 하나로 묶어서 <b>나만의 새로운 명령(함수)</b>으로 만드는 블록입니다.</p>
    <ul>
      <li>자주 사용하는 동작(예: "앞으로 갔다가 돌기")을 하나로 묶어두면 메인 코드가 아주 깔끔해집니다.</li>
      <li>동작만 실행하고 어떤 값을 결과로 돌려주지는 않습니다.</li>
      <li><b>[입력 추가 ➕]</b> 버튼을 눌러 정수, 실수, 문자열, 논리값 등 함수에 필요한 재료(매개변수)를 바로 추가하고 편집할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">void 함수이름(int 입력1) {</span><br>
      <span style="color:#e74c3c;">&nbsp;&nbsp;// 내가 만든 코드들...</span><br>
      <span style="color:#e74c3c;">}</span>
    </div>
  `,

  'procedures_defreturn': `
    <h2 style="color: #2980b9;">⚙️ 결과값 있는 함수 만들기</h2>
    <hr>
    <p>나만의 새로운 계산식이나 판단 기능을 만들고, <b>마지막에 결과값을 돌려주는 함수</b>입니다.</p>
    <ul>
      <li>내부에서 복잡한 계산이나 센서 판단을 수행한 뒤, 최종 결과를 <b>[➔ 결과 반환]</b> 빈칸에 넣어 돌려줍니다.</li>
      <li><b>[입력 추가 ➕]</b>를 통해 입력값을 받고, 오른쪽 끝에 있는 드롭다운으로 <b>반환될 결과값의 종류(정수, 실수 등)</b>도 설정할 수 있습니다.</li>
      <li>이 블록으로 만든 함수는 다른 블록의 빈칸에 쏙 집어넣어 사용할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">long 함수이름(int 입력1) {</span><br>
      <span style="color:#e74c3c;">&nbsp;&nbsp;// 계산 코드들...</span><br>
      <span style="color:#e74c3c;">&nbsp;&nbsp;return 결과값;</span><br>
      <span style="color:#e74c3c;">}</span>
    </div>
  `,

  'procedures_callnoreturn': `
    <h2 style="color: #2980b9;">📣 함수 실행하기 (결과값 없음)</h2>
    <hr>
    <p>'결과값 없는 함수 만들기' 블록을 통해 만든 <b>나만의 명령을 실제로 불러와서 실행</b>합니다.</p>
    <ul>
      <li>함수는 만들기만 하면 작동하지 않습니다. 반드시 메인 프로그램(loop)에서 이 블록을 사용해 <b>호출(Call)</b>해야 작동합니다.</li>
      <li>만약 함수를 만들 때 입력을 추가했다면, 이 블록에도 값을 넣을 수 있는 구멍이 자동으로 생겨납니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">함수이름(100);</span>
    </div>
  `,

  'procedures_callreturn': `
    <h2 style="color: #2980b9;">📣 함수 실행하고 값 가져오기</h2>
    <hr>
    <p>'결과값 있는 함수 만들기'를 통해 만든 함수를 실행하고, 그 <b>계산된 결과값을 가져오는 블록</b>입니다.</p>
    <ul>
      <li>함수가 돌려주는 값(정수, 실수, 논리값 등)에 맞추어 변수에 저장하거나 조건문(만약 ~라면)에서 비교할 때 유용하게 사용할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">함수이름(100)</span>
    </div>
  `,

  'procedures_ifreturn': `
    <h2 style="color: #2980b9;">🔄 조건부 함수 빠져나가기</h2>
    <hr>
    <p>함수 안에서 코드를 실행하던 도중 <b>특정 조건이 맞으면, 즉시 함수를 멈추고 빠져나가는 블록</b>입니다.</p>
    <ul>
      <li><b>결과값이 있는 함수</b> 안에서 쓸 경우: 지정한 값을 돌려주면서 함수가 즉시 종료됩니다.</li>
      <li><b>결과값이 없는 함수</b> 안에서 쓸 경우: 값 없이 바로 함수의 작동을 멈추고 호출했던 메인 코드로 돌아갑니다.</li>
      <li>이 블록은 반드시 <b>'함수 만들기' 블록 내부</b>에서만 사용할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">if (조건) return 값;</span>
    </div>
  `
};