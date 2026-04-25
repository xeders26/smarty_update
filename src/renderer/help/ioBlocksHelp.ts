/*========================================================================
  src/renderer/help/ioBlocksHelp.ts
  - 아두이노 기본 입출력(I/O) 블록 도움말 데이터
=================================================*/

export const IoBlocksHelp: Record<string, string> = {

  'arduino_pin_mode': `
    <h2 style="color: #2980b9;">⚙️ 디지털 핀 모드 설정 (입력/출력)</h2>
    <hr>
    <p>아두이노의 디지털 핀을 <b>전기를 내보낼지(출력), 받아들일지(입력)</b> 결정하는 준비 블록입니다.</p>
    <ul>
      <li><b>출력(OUTPUT):</b> LED를 켜거나 모터를 돌릴 때 사용합니다. (전기를 내보냄)</li>
      <li><b>입력(INPUT):</b> 버튼이 눌렸는지 확인하거나 디지털 센서를 사용할 때 사용합니다. (전기를 받아들임)</li>
      <li>주의: 주로 <b>[처음 한 번 실행(setup)]</b> 공간에 넣어서 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">pinMode(핀번호, OUTPUT);</span> // 또는 INPUT
    </div>
  `,

  'arduino_digital_write': `
    <h2 style="color: #2980b9;">💡 디지털 핀 켜기/끄기</h2>
    <hr>
    <p>지정한 디지털 핀으로 <b>전기를 보내거나(켜기) 끊는(끄기)</b> 블록입니다.</p>
    <ul>
      <li><b>켜기(HIGH):</b> 5V의 전기를 내보냅니다. (예: LED 켜기)</li>
      <li><b>끄기(LOW):</b> 0V 상태로 만듭니다. (예: LED 끄기)</li>
      <li>이 블록을 사용하려면 해당 핀이 <b>출력(OUTPUT)</b> 모드로 설정되어 있어야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">digitalWrite(핀번호, HIGH);</span> // 또는 LOW
    </div>
  `,

  'arduino_digital_read': `
    <h2 style="color: #2980b9;">👀 디지털 핀 읽기 (0 또는 1)</h2>
    <hr>
    <p>지정한 디지털 핀에 <b>전기가 들어오고 있는지 확인</b>하는 블록입니다.</p>
    <ul>
      <li>전기가 들어오면 <b>1 (HIGH)</b>, 안 들어오면 <b>0 (LOW)</b>을 숫자 형태로 반환합니다.</li>
      <li>버튼을 눌렀는지, 혹은 닿았는지 판단하는 센서들에 주로 사용합니다.</li>
      <li>이 블록을 사용하려면 해당 핀이 <b>입력(INPUT)</b> 모드로 설정되어 있어야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">digitalRead(핀번호)</span>
    </div>
  `,

  'arduino_analog_write': `
    <h2 style="color: #2980b9;">🌊 아날로그 핀(PWM) 값 쓰기</h2>
    <hr>
    <p>단순히 켜고 끄는 것을 넘어, <b>전기의 세기를 0부터 255 사이로 미세하게 조절</b>하여 내보냅니다.</p>
    <ul>
      <li><b>0</b>은 완전히 끄는 것이고, <b>255</b>는 가장 세게(100%) 켜는 것입니다.</li>
      <li>LED의 밝기를 서서히 변하게 하거나, DC 모터의 속도를 부드럽게 조절할 때 사용합니다.</li>
      <li>주의: 아두이노의 핀 번호 옆에 <b>물결표시(~)</b>가 있는 PWM 전용 핀에서만 제대로 작동합니다. (예: 3, 5, 6, 9, 10, 11번)</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">analogWrite(핀번호, 0~255);</span>
    </div>
  `,

  'arduino_analog_read': `
    <h2 style="color: #2980b9;">🌡️ 아날로그 핀 읽기 (0~1023)</h2>
    <hr>
    <p>아날로그 핀(A0~A5)을 통해 들어오는 <b>전압의 크기를 아주 세밀하게 읽어옵니다.</b></p>
    <ul>
      <li>들어오는 신호의 세기를 <b>0부터 1023 사이의 숫자</b>로 나누어 반환합니다.</li>
      <li>빛의 밝기, 온도의 변화, 조이스틱의 기울기 등 <b>연속적으로 변하는 센서 값</b>을 읽을 때 필수적으로 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">analogRead(A0~A5)</span>
    </div>
  `
};