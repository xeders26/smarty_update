/*========================================================================
  src/renderer/help/ledBlocksHelp.ts
  - 스마티 내장 LED, 범퍼 LED, 스위치 블록 도움말 데이터
=================================================*/

export const LedBlocksHelp: Record<string, string> = {

  'smarty_led': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">💡 내장 LED 제어하기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티 로봇 윗면에 있는 내장 LED(LED1, LED2)를 켜거나 끄는 기본 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>켜기(ON) / 끄기(OFF): 불을 켜거나 끕니다.</li>
      <li>상태 반전(Toggle): 현재 켜져 있으면 끄고, 꺼져 있으면 켜는(스위치 같은) 동작을 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 제어 대상 : </span><span style="color:#e67e22;">제어할 내장 LED (LED1, LED2 중 선택)</span><br>
        <span style="color:#f5b041;">• 동작 선택 : </span><span style="color:#e67e22;">켜기(ON), 끄기(OFF), 반전(Toggle) 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">선택한 LED를 지정한 상태로 제어함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">turnLed(LED1, ON);</span><br>
      <span style="color:#9aa5a6;">toggleLed(LED2);</span>
    </div>
  `,

  'smarty_led_blink': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">💡 내장 LED 깜빡이기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">내장 LED를 원하는 시간 간격으로 깜빡이게 만드는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>켜짐(ms) / 꺼짐(ms): 불이 켜져 있는 시간과 꺼져 있는 시간을 밀리초(1초=1000ms) 단위로 설정합니다.</li>
      <li>반복 횟수: 지정한 횟수만큼만 깜빡입니다. 만약 0을 입력하면 무한히 계속 깜빡입니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 LED : </span><span style="color:#e67e22;">깜빡일 내장 LED (LED1, LED2 중 선택)</span><br>
        <span style="color:#f5b041;">• 켜짐/꺼짐 시간 : </span><span style="color:#e67e22;">밀리초(ms) 단위의 켜짐 및 꺼짐 유지 시간 설정</span><br>
        <span style="color:#f5b041;">• 반복 횟수 : </span><span style="color:#e67e22;">깜빡임을 반복할 횟수 (정수, 0이면 무한 반복)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">지정한 시간 간격과 횟수만큼 LED를 점멸시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">blinkCntLed(LED1, 500, 500, 3);</span> <span style="color:#9aa5a6;">// 3번 깜빡임</span><br>
      <span style="color:#9aa5a6;">blinkLed(LED1, 500, 500);</span> <span style="color:#9aa5a6;">// 무한 깜빡임</span>
    </div>
  `,

  'turnBumpLED': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚗 범퍼 LED 켜기/끄기 (흰색, 노랑)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇 앞쪽 범퍼에 있는 전조등(흰색)이나 방향지시등(노랑)을 단순히 켜고 끄는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>왼쪽, 오른쪽, 또는 양쪽 모두를 한 번에 제어할 수 있습니다.</li>
      <li>빨간색 LED는 별도의 블록을 사용해야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 위치/색상 : </span><span style="color:#e67e22;">전조등(흰색) 또는 방향지시등(왼쪽/오른쪽/양쪽 노랑) 선택</span><br>
        <span style="color:#f5b041;">• 동작 선택 : </span><span style="color:#e67e22;">켜기 또는 끄기 상태 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">선택한 범퍼 LED의 전원을 제어함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">turnBumperLeftY(1);</span> <span style="color:#9aa5a6;">// 왼쪽 노랑 켜기</span><br>
      <span style="color:#9aa5a6;">turnBumperW(1);</span> <span style="color:#9aa5a6;">// 흰색 켜기</span>
    </div>
  `,

  'smarty_bumper_blink': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚨 범퍼 LED 깜빡이기 (자동 깜빡이)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">자동차의 깜빡이처럼 범퍼 LED가 자동으로 점멸하도록 설정하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>원하는 방향과 색상을 지정하고, 속도(간격 ms)를 입력하여 켤 수 있습니다.</li>
      <li>깜빡임을 멈추고 싶다면 동작을 '끄기'로 설정하여 실행하면 됩니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 방향/색상 : </span><span style="color:#e67e22;">깜빡일 전조등(흰색) 또는 방향지시등(노랑) 선택</span><br>
        <span style="color:#f5b041;">• 속도 간격 : </span><span style="color:#e67e22;">점멸 간격 (밀리초 단위 정수형)</span><br>
        <span style="color:#f5b041;">• 동작 선택 : </span><span style="color:#e67e22;">깜빡임 시작(켜기) 또는 중지(끄기) 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">범퍼 LED의 자동 점멸 상태를 제어함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setBumperBlinkY(500);</span> <span style="color:#9aa5a6;">// 간격 설정</span><br>
      <span style="color:#9aa5a6;">turnBumperBlinkLeftY(1);</span> <span style="color:#9aa5a6;">// 깜빡이 켜기</span>
    </div>
  `,

  'smarty_bumper_red': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚨 범퍼 빨강색 LED 켜기/끄기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇 앞쪽 범퍼 중앙 쪽에 있는 빨간색 LED를 켜거나 끄는 전용 블록입니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 동작 선택 : </span><span style="color:#e67e22;">빨간색 범퍼 LED의 켜기 또는 끄기 상태 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">빨간색 범퍼 LED 전원을 제어함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">turnBumperR(1);</span>
    </div>
  `,

  'smarty_bumper_red_blink': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚨 범퍼 빨강색 LED 깜빡이기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">범퍼의 빨간색 LED가 일정한 간격(ms)으로 깜빡이게 만드는 블록입니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 속도 간격 : </span><span style="color:#e67e22;">점멸 간격 (밀리초 단위 정수형)</span><br>
        <span style="color:#f5b041;">• 동작 선택 : </span><span style="color:#e67e22;">깜빡임 시작(켜기) 또는 중지(끄기) 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">빨간색 범퍼 LED의 자동 점멸 상태를 제어함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setBumperBlinkR(500);</span><br>
      <span style="color:#9aa5a6;">turnBumperBlinkR(1);</span>
    </div>
  `,

  'smarty_bumper_all_off': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚨 범퍼 LED 모두 끄기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">현재 켜져 있거나 깜빡이고 있는 모든 범퍼 LED(빨강, 노랑, 흰색)를 한 번에 전부 끄는 강력한 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>프로그램을 초기화하거나, 더 이상 불빛이 필요 없을 때 사용하면 매우 편리합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">켜져 있거나 깜빡이는 모든 범퍼 LED를 즉시 끔</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">turnBumperAllOff();</span> <span style="color:#9aa5a6;">// 기본 끄기</span><br>
      <span style="color:#9aa5a6;">turnBumperBlinkLeftY(0);</span> <span style="color:#9aa5a6;">// 깜빡이 끄기</span>
    </div>
  `,

  'smarty_switch_wait': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔘 스위치 기다리기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 스위치가 눌리거나 떼어질 때까지 프로그램의 진행을 멈추고 기다리는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>LED1 / LED2: 로봇 윗면에 있는 스위치를 지정합니다.</li>
      <li>둘 중 하나(EITHER): 두 버튼 중 하나라도 조건이 맞으면 바로 다음으로 넘어갑니다.</li>
      <li>모두(BOTH): 두 버튼이 동시에 조건이 맞아야만 넘어갑니다.</li>
      <li>특정 행동을 하기 전, 사용자의 신호(버튼 클릭)를 받을 때 유용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 스위치 : </span><span style="color:#e67e22;">LED1(SW1), LED2(SW2), 둘 중 하나, 또는 둘 다 선택</span><br>
        <span style="color:#f5b041;">• 목표 상태 : </span><span style="color:#e67e22;">눌림 또는 떨어짐(떼어짐) 상태 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">지정한 스위치 조건이 만족될 때까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">while(readSw(1) != 1) { delay(1); }</span> <span style="color:#9aa5a6;">// LED1 눌릴 때까지 대기</span>
    </div>
  `
};