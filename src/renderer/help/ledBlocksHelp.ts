/*========================================================================
  src/renderer/help/ledBlocksHelp.ts
  - 스마티 내장 LED, 범퍼 LED, 스위치 블록 도움말 데이터
=================================================*/

export const LedBlocksHelp: Record<string, string> = {

  'smarty_led': `
    <h2 style="color: #2980b9;">💡 내장 LED 제어하기</h2>
    <hr>
    <p>스마티 로봇 윗면에 있는 <b>내장 LED(LED1, LED2)</b>를 켜거나 끄는 기본 블록입니다.</p>
    <ul>
      <li><b>켜기(ON) / 끄기(OFF):</b> 불을 켜거나 끕니다.</li>
      <li><b>상태 반전(Toggle):</b> 현재 켜져 있으면 끄고, 꺼져 있으면 켜는(스위치 같은) 동작을 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">turnLed(LED1, ON);</span><br>
      <span style="color:#e74c3c;">toggleLed(LED2);</span>
    </div>
  `,

  'smarty_led_blink': `
    <h2 style="color: #2980b9;">💡 내장 LED 깜빡이기</h2>
    <hr>
    <p>내장 LED를 <b>원하는 시간 간격으로 깜빡이게</b> 만드는 블록입니다.</p>
    <ul>
      <li><b>켜짐(ms) / 꺼짐(ms):</b> 불이 켜져 있는 시간과 꺼져 있는 시간을 밀리초(1초=1000ms) 단위로 설정합니다.</li>
      <li><b>반복 횟수:</b> 지정한 횟수만큼만 깜빡입니다. 만약 <b>0</b>을 입력하면 무한히 계속 깜빡입니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">blinkCntLed(LED1, 500, 500, 3);</span> // 3번 깜빡임<br>
      <span style="color:#e74c3c;">blinkLed(LED1, 500, 500);</span> // 무한 깜빡임
    </div>
  `,

  'turnBumpLED': `
    <h2 style="color: #2980b9;">🚗 범퍼 LED 켜기/끄기 (흰색, 노랑)</h2>
    <hr>
    <p>로봇 앞쪽 범퍼에 있는 <b>전조등(흰색)</b>이나 <b>방향지시등(노랑)</b>을 단순히 켜고 끄는 블록입니다.</p>
    <ul>
      <li>왼쪽, 오른쪽, 또는 양쪽 모두를 한 번에 제어할 수 있습니다.</li>
      <li>빨간색 LED는 별도의 블록을 사용해야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">turnBumperLeftY(1);</span> // 왼쪽 노랑 켜기<br>
      <span style="color:#e74c3c;">turnBumperW(1);</span> // 흰색 켜기
    </div>
  `,

  'smarty_bumper_blink': `
    <h2 style="color: #2980b9;">🚨 범퍼 LED 깜빡이기 (자동 깜빡이)</h2>
    <hr>
    <p>자동차의 깜빡이처럼 <b>범퍼 LED가 자동으로 점멸하도록 설정</b>하는 블록입니다.</p>
    <ul>
      <li>원하는 <b>방향과 색상</b>을 지정하고, 속도(간격 ms)를 입력하여 켤 수 있습니다.</li>
      <li>깜빡임을 멈추고 싶다면 동작을 <b>'끄기'</b>로 설정하여 실행하면 됩니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">setBumperBlinkY(500);</span> // 간격 설정<br>
      <span style="color:#e74c3c;">turnBumperBlinkLeftY(1);</span> // 깜빡이 켜기
    </div>
  `,

  'smarty_bumper_red': `
    <h2 style="color: #2980b9;">🚨 범퍼 빨강색 LED 켜기/끄기</h2>
    <hr>
    <p>로봇 앞쪽 범퍼 중앙 쪽에 있는 <b>빨간색 LED</b>를 켜거나 끄는 전용 블록입니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">turnBumperR(1);</span>
    </div>
  `,

  'smarty_bumper_red_blink': `
    <h2 style="color: #2980b9;">🚨 범퍼 빨강색 LED 깜빡이기</h2>
    <hr>
    <p>범퍼의 <b>빨간색 LED가 일정한 간격(ms)으로 깜빡이게</b> 만드는 블록입니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">setBumperBlinkR(500);</span><br>
      <span style="color:#e74c3c;">turnBumperBlinkR(1);</span>
    </div>
  `,

  'smarty_bumper_all_off': `
    <h2 style="color: #2980b9;">🚨 범퍼 LED 모두 끄기</h2>
    <hr>
    <p>현재 켜져 있거나 깜빡이고 있는 <b>모든 범퍼 LED(빨강, 노랑, 흰색)를 한 번에 전부 끄는</b> 강력한 블록입니다.</p>
    <ul>
      <li>프로그램을 초기화하거나, 더 이상 불빛이 필요 없을 때 사용하면 매우 편리합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">turnBumperAllOff();</span> // 기본 끄기<br>
      <span style="color:#e74c3c;">turnBumperBlinkLeftY(0);</span> // 깜빡이 끄기
    </div>
  `,

  'smarty_switch_wait': `
    <h2 style="color: #2980b9;">🔘 스위치 기다리기</h2>
    <hr>
    <p>지정한 스위치가 <b>눌리거나 떼어질 때까지 프로그램의 진행을 멈추고 기다리는</b> 블록입니다.</p>
    <ul>
      <li><b>LED1 / LED2:</b> 로봇 윗면에 있는 스위치를 지정합니다.</li>
      <li><b>둘 중 하나(EITHER):</b> 두 버튼 중 하나라도 조건이 맞으면 바로 다음으로 넘어갑니다.</li>
      <li><b>모두(BOTH):</b> 두 버튼이 동시에 조건이 맞아야만 넘어갑니다.</li>
      <li>특정 행동을 하기 전, 사용자의 신호(버튼 클릭)를 받을 때 유용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">while(readSw(1) != 1) { delay(1); }</span> // LED1 눌릴 때까지 대기
    </div>
  `
};