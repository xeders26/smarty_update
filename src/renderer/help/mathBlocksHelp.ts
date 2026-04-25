/*========================================================================
  src/renderer/help/mathBlocksHelp.ts
  - 절댓값, 범위 변환(map), 최댓값/최솟값 등 수학 연산 블록 도움말 데이터
=================================================*/

export const MathBlocksHelp: Record<string, string> = {

  'arduino_math_abs': `
    <h2 style="color: #2980b9;">➖➕ 절댓값 구하기</h2>
    <hr>
    <p>숫자의 부호(+, -)를 떼어버리고 <b>무조건 0보다 큰 양수(양의 정수/실수)로 만들어주는 블록</b>입니다.</p>
    <ul>
      <li>예: <b>-5</b>를 넣으면 <b>5</b>가 나옵니다. <b>5</b>를 넣어도 <b>5</b>가 나옵니다.</li>
      <li>모터가 거꾸로 돌 때 발생할 수 있는 마이너스(-) 값을 방지하거나, 두 센서 값의 단순한 '차이(거리)'를 계산할 때 매우 유용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">abs(숫자)</span>
    </div>
  `,

  'arduino_math_map': `
    <h2 style="color: #2980b9;">🗺️ 값 범위 변환하기 (map)</h2>
    <hr>
    <p>어떤 숫자의 범위를 <b>내가 원하는 새로운 범위의 비율로 쫙 늘리거나 압축해서 변환</b>해 주는 마법 같은 블록입니다.</p>
    <ul>
      <li><b>사용 예시:</b> 빛 센서에서 읽은 값의 범위가 <code>0 ~ 1023</code>인데, 이 값을 LED의 밝기 값인 <code>0 ~ 255</code>에 맞춰서 줄이고 싶을 때 사용합니다.</li>
      <li>비례식을 컴퓨터가 알아서 계산해 주므로, 아날로그 센서 값을 모터 속도나 불빛 밝기로 바꿀 때 가장 많이 쓰이는 필수 블록입니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">map(값, 현재_최솟값, 현재_최댓값, 바꿀_최솟값, 바꿀_최댓값)</span>
    </div>
  `,

  'smarty_math_in_range': `
    <h2 style="color: #2980b9;">📏 값이 특정 범위 안에 있는가?</h2>
    <hr>
    <p>검사할 숫자가 <b>지정한 최솟값과 최댓값 사이에 안전하게 들어있는지 확인</b>하는 블록입니다.</p>
    <ul>
      <li>사이에 있다면 <b>참(True)</b>, 범위를 벗어났다면 <b>거짓(False)</b>을 반환합니다.</li>
      <li>"만약 ~라면" 블록과 짝꿍으로 사용하여, "센서 값이 10~50 사이일 때만 모터를 멈춰라" 같은 명령을 쉽게 만들 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">(값 >= 최솟값 && 값 <= 최댓값)</span>
    </div>
  `,

  'arduino_math_minmax': `
    <h2 style="color: #2980b9;">⚖️ 두 숫자 중 최댓값/최솟값 고르기</h2>
    <hr>
    <p>입력한 두 개의 숫자 중에서 <b>더 큰 값(최댓값)이나 더 작은 값(최솟값)을 알아서 골라주는 블록</b>입니다.</p>
    <ul>
      <li><b>최댓값 (max):</b> 두 숫자 중 큰 숫자를 내보냅니다. (예: 모터 속도가 0 밑으로 떨어지지 않게 막을 때)</li>
      <li><b>최솟값 (min):</b> 두 숫자 중 작은 숫자를 내보냅니다. (예: 센서 값이 255를 넘어가지 않게 천장을 만들 때)</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">max(A, B)</span> // 더 큰 값<br>
      <span style="color:#e74c3c;">min(A, B)</span> // 더 작은 값
    </div>
  `
};