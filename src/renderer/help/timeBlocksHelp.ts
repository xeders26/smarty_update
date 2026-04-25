/*========================================================================
  src/renderer/help/timeBlocksHelp.ts
  - 시간 지연, 대기(Wait), 초시계 및 타이머 블록 도움말 데이터
=================================================*/

export const TimeBlocksHelp: Record<string, string> = {

  'arduino_delay': `
    <h2 style="color: #2980b9;">⏱️ 밀리초(ms) 기다리기</h2>
    <hr>
    <p>로봇이 현재 하고 있는 동작을 <b>지정한 시간 동안 그대로 유지하며 다음 명령으로 넘어가지 않고 멈춰있는 블록</b>입니다.</p>
    <ul>
      <li><b>1000 밀리초(ms)</b>는 <b>1초</b>와 같습니다. (예: 500을 입력하면 0.5초 대기)</li>
      <li>모터를 켜고 이 블록을 쓰면 그 시간 동안 계속 이동하고, LED를 켜고 쓰면 그 시간 동안 계속 켜져 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">delay(1000);</span>
    </div>
  `,

  'smarty_timer': `
    <h2 style="color: #2980b9;">⏱️ 내부 타이머 (T1, T2)</h2>
    <hr>
    <p>스마티 로봇의 백그라운드에서 <b>지정한 시간 간격마다 일정한 동작을 실행하게 해주는 내부 타이머</b>를 설정합니다.</p>
    <ul>
      <li>동작을 멈추지 않고(delay 없이) 여러 가지 일을 동시에 처리해야 할 때 사용하는 고급 기능입니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">runTimer(T1, 1000);</span> // 1초 간격 설정<br>
      <span style="color:#e74c3c;">stopTimer(T1);</span> // 정지
    </div>
  `,

  'smarty_wait': `
    <h2 style="color: #2980b9;">⏳ 스위치 기다리기 (클릭 감지)</h2>
    <hr>
    <p>스마티 윗면의 스위치(SW1 또는 SW2)가 <b>눌렸다가 떼어지는 순간(클릭)까지 프로그램 진행을 멈추고 대기</b>합니다.</p>
    <ul>
      <li>누르고 있는 동안에는 넘어가지 않으며, <b>손을 떼는 순간 다음 블록이 실행</b>됩니다. 아주 정확한 시작 신호로 사용하기 좋습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">while(true) { ... break; }</span>
    </div>
  `,

  'smarty_timer_reset': `
    <h2 style="color: #2980b9;">⏱️ 초시계 초기화하기 (0초로)</h2>
    <hr>
    <p>엔트리의 초시계처럼 <b>내부 시간을 재는 스톱워치를 0초로 리셋하여 다시 측정하기 시작</b>합니다.</p>
    <ul>
      <li>어떤 동작이 얼마나 걸렸는지 시간을 잴 때 항상 먼저 이 블록을 실행하여 초시계를 0으로 맞춰야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">smarty_timer_start = millis();</span>
    </div>
  `,

  'smarty_timer_value': `
    <h2 style="color: #2980b9;">⏱️ 초시계 값 (초)</h2>
    <hr>
    <p>초시계가 초기화(0초)된 후부터 <b>지금까지 흐른 시간을 소수점이 있는 초 단위(예: 3.5초)로 읽어옵니다.</b></p>
    <ul>
      <li>"만약 초시계 값 > 10 이면" 처럼 10초가 지났을 때 특정 동작을 하게 만들 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">((millis() - smarty_timer_start) / 1000.0)</span>
    </div>
  `,

  'smarty_wait_until': `
    <h2 style="color: #2980b9;">⏳ 참(True)이 될 때까지 기다리기</h2>
    <hr>
    <p>빈칸에 넣은 <b>조건이 참(True)으로 바뀔 때까지 로봇의 행동을 멈추고 무한히 기다립니다.</b></p>
    <ul>
      <li><b>사용 예시:</b> 센서 값을 계속 감시하다가 조건이 맞을 때 다음 행동을 실행해야 할 때 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">while(!(조건)) { delay(1); }</span>
    </div>
  `,

  'smarty_wait_compare': `
    <h2 style="color: #2980b9;">⏳ 비교 조건 맞을 때까지 기다리기</h2>
    <hr>
    <p>왼쪽 값과 오른쪽 값을 비교하여 <b>내가 지정한 조건(작다, 크다, 같다 등)이 만족될 때까지 기다리는 블록</b>입니다.</p>
    <ul>
      <li><b>사용 예시:</b> "초음파 거리 값이 10보다 작아질 때까지 기다리기" (장애물이 가까워질 때까지 대기)</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">while(!(A < B)) { delay(1); }</span>
    </div>
  `,

  'arduino_timer': `
    <h2 style="color: #2980b9;">⏳ 시작 후 흐른 시간 (전체 시간)</h2>
    <hr>
    <p>로봇의 <b>전원이 켜진 후부터 지금까지 흐른 절대적인 총시간</b>을 가져옵니다.</p>
    <ul>
      <li><b>millis:</b> 밀리초(1/1000초) 단위로 가져옵니다.</li>
      <li><b>micros:</b> 마이크로초(1/1,000,000초) 단위로 아주 정밀하게 가져옵니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">millis()</span> 또는 <span style="color:#e74c3c;">micros()</span>
    </div>
  `
};