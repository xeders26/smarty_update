/*========================================================================
  src/renderer/help/variableBlocksHelp.ts
  - 데이터 저장소인 변수(Variable)의 저장, 읽기, 변경 블록 도움말 데이터
=================================================*/

export const VariableBlocksHelp: Record<string, string> = {

  'smarty_variables_set': `
    <h2 style="color: #2980b9;">💾 변수에 값 저장하기 (덮어쓰기)</h2>
    <hr>
    <p>내가 만든 <b>변수(데이터를 담는 상자)에 새로운 숫자나 글자를 집어넣어 저장</b>하는 블록입니다.</p>
    <ul>
      <li>이전에 상자(변수)에 어떤 값이 들어있었든 상관없이, <b>새로 넣은 값으로 완전히 덮어쓰기</b>가 됩니다.</li>
      <li>센서의 현재 값을 기억해두거나, 게임의 초기 점수를 0점으로 세팅할 때 주로 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">변수이름 = 10;</span> // 또는 "Hello" 등
    </div>
  `,

  'smarty_variables_get': `
    <h2 style="color: #2980b9;">🗂️ 변수 값 꺼내 쓰기 (읽기)</h2>
    <hr>
    <p>변수 상자 안에 <b>현재 어떤 값이 들어있는지 읽어와서 사용하는 블록</b>입니다.</p>
    <ul>
      <li>이 블록은 단독으로 쓰이지 않고, 항상 "만약 ~라면", "계산식", "출력하기" 등의 다른 블록 <b>빈칸에 쏙 끼워 넣어서</b> 사용합니다.</li>
      <li>값을 꺼내 쓴다고 해서 상자 안의 값이 사라지지는 않습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">변수이름</span>
    </div>
  `,

  'smarty_variables_change': `
    <h2 style="color: #2980b9;">📈 변수 값 더하기 (누적시키기)</h2>
    <hr>
    <p>변수 상자에 <b>원래 들어있던 값에다가 내가 지정한 숫자만큼을 더해주는 블록</b>입니다.</p>
    <ul>
      <li><b>점수 올리기:</b> 빈칸에 <code>1</code>을 넣으면 실행될 때마다 점수가 1점씩 올라갑니다.</li>
      <li><b>점수 내리기:</b> 빈칸에 <code>-1</code>을 넣으면 빼기가 되어 1점씩 내려갑니다.</li>
      <li>버튼을 몇 번 눌렀는지 횟수를 세거나(카운터), 모터의 속도를 서서히 올릴 때 아주 유용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">변수이름 += 1;</span> // 1만큼 더하기
    </div>
  `
};