/*========================================================================
  /src/renderer/help/baseBlocksHelp.ts
  - Base Blocks 도움말 데이터 파일입니다.
  - 각 블록의 고유한 ID를 키로 사용하여 HTML 문자열 형태의 도움말을 저장하는 객체를 내보냅니다.
  - 이 도움말 데이터는 app/helpTab.ts에서 불러와서 각 블록에 매핑되어 표시됩니다.  
=================================================*/
export const BaseBlocksHelp: Record<string, string> = {
  
  'smarty_begin': `
    <h2 style="color: #2980b9;">🤖 스마티 초기화</h2>
    <hr>
    <p>스마티 로봇을 사용하기 위해 가장 먼저 실행해야 하는 <b>필수 초기화 블록</b>입니다.</p>
    <ul>
      <li>센서, 모터, LED 등을 제어하기 위한 내부 설정을 마칩니다.</li>
      <li>기본적으로 범퍼 LED를 끄고, <b>SW1 스위치를 누를 때까지 대기</b>합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">beginSmarty();</span><br>
      <span style="color:#e74c3c;">turnBumperAllOff();</span><br>
      <span style="color:#e74c3c;">waitSW(SW1);</span>
    </div>
  `,

  'smarty_get_battery': `
    <h2 style="color: #2980b9;">🔋 배터리 전압(V) 읽기</h2>
    <hr>
    <p>스마티 로봇에 연결된 <b>배터리의 현재 전압</b>을 소수점이 있는 숫자(실수) 형태로 읽어옵니다.</p>
    <ul>
      <li>배터리가 부족한지 확인할 때(예: 조건문) 유용하게 사용할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">getBattery()</span>
    </div>
  `,

  'arduino_serial_print': `
    <h2 style="color: #2980b9;">🖥️ PC 모니터에 출력하기</h2>
    <hr>
    <p>스마티 로봇에서 측정한 센서 값이나 문자를 PC의 <b>시리얼 모니터 창으로 전송</b>합니다.</p>
    <ul>
      <li><b>줄바꿈(Enter) 체크:</b> 값을 출력한 뒤 다음 줄로 넘어갑니다. (println)</li>
      <li><b>체크 해제:</b> 값을 출력하고 줄을 바꾸지 않아, 다음 글자가 바로 옆에 이어져서 나옵니다. (print)</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">Serial.println(값);</span>  // 줄바꿈 O<br>
      <span style="color:#e74c3c;">Serial.print(값);</span> // 줄바꿈 X
    </div>
  `,

  'arduino_serial_available': `
    <h2 style="color: #2980b9;">⌨️ 키보드 입력이 들어왔는가?</h2>
    <hr>
    <p>PC(시리얼 모니터)에서 키보드로 입력한 데이터가 스마티 로봇에 <b>도착했는지 확인</b>합니다.</p>
    <ul>
      <li>도착한 데이터가 있으면 <b>참(True)</b>, 없으면 <b>거짓(False)</b>을 반환합니다.</li>
      <li>주로 <b>[만약(if)]</b> 논리 블록과 함께 짝을 이루어 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">(Serial.available() > 0)</span>
    </div>
  `,

  'arduino_serial_read': `
    <h2 style="color: #2980b9;">⌨️ 키보드 입력값 읽기</h2>
    <hr>
    <p>PC에서 스마티로 전송한 데이터(명령)를 선택한 <b>자료형(형태)에 맞춰 읽어옵니다.</b></p>
    <ul>
      <li><b>정수:</b> 소수점이 없는 숫자 (예: 123)</li>
      <li><b>실수:</b> 소수점이 있는 숫자 (예: 3.14)</li>
      <li><b>문자/문자열:</b> 알파벳이나 텍스트</li>
      <li><b>주의:</b> 반드시 '키보드 입력이 들어왔는가?' 블록으로 확인한 후에 사용해야 안전합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">Serial.parseInt()</span> // 정수<br>
      <span style="color:#e74c3c;">Serial.parseFloat()</span> // 실수<br>
      <span style="color:#e74c3c;">Serial.readString()</span> // 문자열<br>
      <span style="color:#e74c3c;">(char)Serial.read()</span> // 문자
    </div>
  `,

  'arduino_main': `
    <h2 style="color: #2980b9;">🚀 스마티 프로그램 (메인)</h2>
    <hr>
    <p>스마티 로봇 프로그램의 <b>가장 기본이 되는 뼈대(구조)</b> 블록입니다. 지울 수 없습니다.</p>
    <ul>
      <li><b>처음 한 번 실행 (setup):</b> 전원이 켜지거나 리셋될 때 처음에 딱 한 번만 실행되는 공간입니다. 주로 초기화 블록들을 넣습니다.</li>
      <li><b>계속 반복 실행 (loop):</b> setup이 끝난 후 무한히 반복해서 실행되는 공간입니다. 로봇의 주된 행동(모터, 센서 제어)을 넣습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">void setup() { ... }</span><br>
      <span style="color:#e74c3c;">void loop() { ... }</span>
    </div>
  `
};