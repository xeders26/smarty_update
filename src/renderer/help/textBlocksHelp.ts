/*========================================================================
  src/renderer/help/textBlocksHelp.ts
  - 문자(텍스트) 입력, 병합, 비교 및 대기 블록 도움말 데이터
=================================================*/

export const TextBlocksHelp: Record<string, string> = {

  'text': `
    <h2 style="color: #2980b9;">🔤 글자(문자열) 입력</h2>
    <hr>
    <p>단어나 문장을 직접 타자로 입력할 수 있는 <b>가장 기본이 되는 글자 블록</b>입니다.</p>
    <ul>
      <li>빈칸에 원하는 글자(예: "Hello", "GO", "STOP")를 입력하여 다른 블록에 끼워 넣습니다.</li>
      <li>PC 모니터에 글자를 출력하거나, 블루투스로 명령을 보낼 때 주로 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">"입력한_글자"</span>
    </div>
  `,

  'text_join': `
    <h2 style="color: #2980b9;">🔗 글자 이어 붙이기</h2>
    <hr>
    <p>여러 개의 글자나 센서의 숫자 값들을 <b>하나의 긴 문장으로 기차처럼 연결해 주는 블록</b>입니다.</p>
    <ul>
      <li>톱니바퀴 아이콘을 눌러 연결할 칸의 개수를 늘리거나 줄일 수 있습니다.</li>
      <li><b>사용 예시:</b> "거리: " + [초음파 센서 값] + " cm" ➔ <b>"거리: 15 cm"</b></li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">String(A) + String(B)</span>
    </div>
  `,

  'wait_until_text_same': `
    <h2 style="color: #2980b9;">⏳ 글자가 같아질 때까지 기다리기</h2>
    <hr>
    <p>비교하는 두 글자(또는 변수 값)가 <b>완벽하게 똑같아질 때까지 다음 명령을 실행하지 않고 기다리는 블록</b>입니다.</p>
    <ul>
      <li><b>사용 예시:</b> 스마트폰(블루투스)에서 "START"라는 글자가 날아올 때까지 로봇을 출발시키지 않고 대기시킬 때 유용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">while(String(A) != String(B)) { delay(10); }</span>
    </div>
  `,

  'wait_until_text_different': `
    <h2 style="color: #2980b9;">⏳ 글자가 달라질 때까지 기다리기</h2>
    <hr>
    <p>비교하는 두 글자가 <b>서로 다른 상태가 될 때까지 기다리는 블록</b>입니다.</p>
    <ul>
      <li>현재 상태가 변하는 바로 그 순간(예: "정지" 상태에서 다른 상태로 바뀔 때)을 포착하여 다음 코드로 넘어갈 때 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">while(String(A) == String(B)) { delay(10); }</span>
    </div>
  `,

  'smarty_text_contains': `
    <h2 style="color: #2980b9;">🔍 글자가 포함되어 있는가?</h2>
    <hr>
    <p>어떤 긴 문장 안에 <b>내가 찾고 싶은 특정 단어나 글자가 쏙 들어있는지 확인</b>하는 블록입니다.</p>
    <ul>
      <li>포함되어 있으면 <b>참(True)</b>, 없으면 <b>거짓(False)</b>을 알려줍니다.</li>
      <li><b>사용 예시:</b> "HELLO WORLD" 안에 "WORLD"가 포함되어 있는지 검사할 때.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">(String(A).indexOf(String(B)) >= 0)</span>
    </div>
  `,

  'smarty_text_equals': `
    <h2 style="color: #2980b9;">⚖️ 두 글자가 완전히 같은가?</h2>
    <hr>
    <p>두 개의 문장이나 단어가 <b>띄어쓰기와 대소문자까지 토씨 하나 안 틀리고 똑같은지 확인</b>합니다.</p>
    <ul>
      <li>똑같으면 <b>참(True)</b>, 조금이라도 다르면 <b>거짓(False)</b>을 알려줍니다.</li>
      <li>"만약 ~라면" 블록과 짝을 이루어, 특정 명령어("GO", "STOP" 등)가 들어왔을 때만 로봇이 움직이게 만들 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">(String(A) == String(B))</span>
    </div>
  `
};