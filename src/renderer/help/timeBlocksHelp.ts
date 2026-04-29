/*========================================================================
  src/renderer/help/timeBlocksHelp.ts
  - 시간 지연, 대기(Wait), 초시계 및 타이머 블록 도움말 데이터
=================================================*/

export const TimeBlocksHelp: Record<string, string> = {

  'arduino_delay': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏱️ 밀리초(ms) 기다리기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇이 현재 하고 있는 동작을 지정한 시간 동안 그대로 유지하며 다음 명령으로 넘어가지 않고 멈춰있는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>1000 밀리초(ms)는 1초와 같습니다. (예: 500을 입력하면 0.5초 대기)</li>
      <li>모터를 켜고 이 블록을 쓰면 그 시간 동안 계속 이동하고, LED를 켜고 쓰면 그 시간 동안 계속 켜져 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대기 시간 : </span><span style="color:#e67e22;">기다릴 시간 (정수형 단위: ms)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">지정한 시간(ms) 동안 현재 상태를 유지하며 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">delay(1000);</span>
    </div>
  `,

  'smarty_timer': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏱️ 내부 타이머 (T1, T2)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티 로봇의 백그라운드에서 지정한 시간 간격마다 일정한 동작을 실행하게 해주는 내부 타이머를 설정합니다.</p>
    <ul style="font-weight: normal;">
      <li>동작을 멈추지 않고(delay 없이) 여러 가지 일을 동시에 처리해야 할 때 사용하는 고급 기능입니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 타이머 번호 : </span><span style="color:#e67e22;">사용할 타이머 (T1, T2 중 선택)</span><br>
        <span style="color:#f5b041;">• 간격 : </span><span style="color:#e67e22;">동작을 반복할 시간 간격 (ms 단위 정수)</span><br>
        <span style="color:#f5b041;">• 제어 명령 : </span><span style="color:#e67e22;">타이머 실행 또는 정지 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">백그라운드 타이머 설정 적용</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">runTimer(T1, 1000);</span> <span style="color:#9aa5a6;">// 1초 간격 설정</span><br>
      <span style="color:#9aa5a6;">stopTimer(T1);</span> <span style="color:#9aa5a6;">// 정지</span>
    </div>
  `,

  'smarty_wait': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 스위치 기다리기 (클릭 감지)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티 윗면의 스위치(SW1 또는 SW2)가 눌렸다가 떼어지는 순간(클릭)까지 프로그램 진행을 멈추고 대기합니다.</p>
    <ul style="font-weight: normal;">
      <li>누르고 있는 동안에는 넘어가지 않으며, 손을 떼는 순간 다음 블록이 실행됩니다. 아주 정확한 시작 신호로 사용하기 좋습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 포트 : </span><span style="color:#e67e22;">감지할 스위치 (SW1, SW2 중 선택)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">스위치가 눌렸다 떼어질 때까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">while(true) { ... break; }</span>
    </div>
  `,

  'smarty_timer_reset': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏱️ 초시계 초기화하기 (0초로)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">엔트리의 초시계처럼 내부 시간을 재는 스톱워치를 0초로 리셋하여 다시 측정하기 시작합니다.</p>
    <ul style="font-weight: normal;">
      <li>어떤 동작이 얼마나 걸렸는지 시간을 잴 때 항상 먼저 이 블록을 실행하여 초시계를 0으로 맞춰야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">내부 초시계 값을 0초로 초기화</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">smarty_timer_start = millis();</span>
    </div>
  `,

  'smarty_timer_value': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏱️ 초시계 값 (초)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">초시계가 초기화(0초)된 후부터 지금까지 흐른 시간을 소수점이 있는 초 단위(예: 3.5초)로 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>"만약 초시계 값 > 10 이면" 처럼 10초가 지났을 때 특정 동작을 하게 만들 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정 시간 (실수형) : </span><span style="color:#e67e22;">초기화 이후 흐른 시간을 초 단위(예: 3.5초)로 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">((millis() - smarty_timer_start) / 1000.0)</span>
    </div>
  `,

  'smarty_wait_until': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 참(True)이 될 때까지 기다리기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">빈칸에 넣은 조건이 참(True)으로 바뀔 때까지 로봇의 행동을 멈추고 무한히 기다립니다.</p>
    <ul style="font-weight: normal;">
      <li>사용 예시: 센서 값을 계속 감시하다가 조건이 맞을 때 다음 행동을 실행해야 할 때 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대기 조건 : </span><span style="color:#e67e22;">참(true)이 될 때까지 기다릴 논리 조건 블록</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">조건이 참(true)이 될 때까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">while(!(조건)) { delay(1); }</span>
    </div>
  `,

  'smarty_wait_compare': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 비교 조건 맞을 때까지 기다리기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">왼쪽 값과 오른쪽 값을 비교하여 내가 지정한 조건(작다, 크다, 같다 등)이 만족될 때까지 기다리는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>사용 예시: "초음파 거리 값이 10보다 작아질 때까지 기다리기" (장애물이 가까워질 때까지 대기)</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 비교 대상 1 : </span><span style="color:#e67e22;">확인할 대상 데이터 (변수나 센서값 등)</span><br>
        <span style="color:#f5b041;">• 비교 연산자 : </span><span style="color:#e67e22;">크다(>), 작다(<), 같다(==) 등 연산자 선택</span><br>
        <span style="color:#f5b041;">• 비교 대상 2 : </span><span style="color:#e67e22;">조건이 되는 기준 수치 데이터</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">비교 조건이 참(true)이 될 때까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">while(!(A < B)) { delay(1); }</span>
    </div>
  `,

  'arduino_timer': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 시작 후 흐른 시간 (전체 시간)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇의 전원이 켜진 후부터 지금까지 흐른 절대적인 총시간을 가져옵니다.</p>
    <ul style="font-weight: normal;">
      <li>millis: 밀리초(1/1000초) 단위로 가져옵니다.</li>
      <li>micros: 마이크로초(1/1,000,000초) 단위로 아주 정밀하게 가져옵니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 단위 선택 : </span><span style="color:#e67e22;">밀리초(millis) 또는 마이크로초(micros) 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정 시간 (정수형) : </span><span style="color:#e67e22;">전원 인가 후 흐른 절대 시간 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">millis()</span> <span style="color:#9aa5a6;">또는</span> <span style="color:#9aa5a6;">micros()</span>
    </div>
  `
};