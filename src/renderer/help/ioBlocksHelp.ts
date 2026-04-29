/*========================================================================
  src/renderer/help/ioBlocksHelp.ts
  - 아두이노 기본 입출력(I/O) 블록 도움말 데이터
=================================================*/

export const IoBlocksHelp: Record<string, string> = {

  'arduino_pin_mode': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚙️ 디지털 핀 모드 설정 (입력/출력)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">아두이노의 디지털 핀을 전기를 내보낼지(출력), 받아들일지(입력) 결정하는 준비 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>출력(OUTPUT): LED를 켜거나 모터를 돌릴 때 사용합니다. (전기를 내보냄)</li>
      <li>입력(INPUT): 버튼이 눌렸는지 확인하거나 디지털 센서를 사용할 때 사용합니다. (전기를 받아들임)</li>
      <li>주의: 주로 [처음 한 번 실행(setup)] 공간에 넣어서 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 핀 번호 : </span><span style="color:#e67e22;">설정할 대상 디지털 핀의 숫자 번호</span><br>
        <span style="color:#f5b041;">• 모드 설정 : </span><span style="color:#e67e22;">입력(INPUT) 또는 출력(OUTPUT) 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">아두이노 보드의 해당 핀 상태를 준비시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">pinMode(핀번호, OUTPUT);</span> <span style="color:#9aa5a6;">// 또는 INPUT</span>
    </div>
  `,

  'arduino_digital_write': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">💡 디지털 핀 켜기/끄기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 디지털 핀으로 전기를 보내거나(켜기) 끊는(끄기) 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>켜기(HIGH): 5V의 전기를 내보냅니다. (예: LED 켜기)</li>
      <li>끄기(LOW): 0V 상태로 만듭니다. (예: LED 끄기)</li>
      <li>이 블록을 사용하려면 해당 핀이 출력(OUTPUT) 모드로 설정되어 있어야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 핀 번호 : </span><span style="color:#e67e22;">제어할 디지털 핀의 숫자 번호</span><br>
        <span style="color:#f5b041;">• 전원 상태 : </span><span style="color:#e67e22;">켜기(HIGH) 또는 끄기(LOW) 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">해당 핀으로 전기를 출력하거나 차단함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">digitalWrite(핀번호, HIGH);</span> <span style="color:#9aa5a6;">// 또는 LOW</span>
    </div>
  `,

  'arduino_digital_read': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">👀 디지털 핀 읽기 (0 또는 1)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 디지털 핀에 전기가 들어오고 있는지 확인하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>전기가 들어오면 1 (HIGH), 안 들어오면 0 (LOW)을 숫자 형태로 반환합니다.</li>
      <li>버튼을 눌렀는지, 혹은 닿았는지 판단하는 센서들에 주로 사용합니다.</li>
      <li>이 블록을 사용하려면 해당 핀이 입력(INPUT) 모드로 설정되어 있어야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 핀 번호 : </span><span style="color:#e67e22;">확인할 디지털 핀의 숫자 번호</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 전기 상태 (정수형) : </span><span style="color:#e67e22;">전기가 감지되면 1, 아니면 0 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">digitalRead(핀번호)</span>
    </div>
  `,

  'arduino_analog_write': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🌊 아날로그 핀(PWM) 값 쓰기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">단순히 켜고 끄는 것을 넘어, 전기의 세기를 0부터 255 사이로 미세하게 조절하여 내보냅니다.</p>
    <ul style="font-weight: normal;">
      <li>0은 완전히 끄는 것이고, 255는 가장 세게(100%) 켜는 것입니다.</li>
      <li>LED의 밝기를 서서히 변하게 하거나, DC 모터의 속도를 부드럽게 조절할 때 사용합니다.</li>
      <li>주의: 아두이노의 핀 번호 옆에 물결표시(~)가 있는 PWM 전용 핀에서만 제대로 작동합니다. (예: 3, 5, 6, 9, 10, 11번)</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 핀 번호 : </span><span style="color:#e67e22;">출력할 PWM 지원 핀 번호</span><br>
        <span style="color:#f5b041;">• 세기 값 : </span><span style="color:#e67e22;">0부터 255 사이의 출력 세기(정수)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">지정한 세기만큼 PWM 전기를 내보냄</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">analogWrite(핀번호, 0~255);</span>
    </div>
  `,

  'arduino_analog_read': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🌡️ 아날로그 핀 읽기 (0~1023)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">아날로그 핀(A0~A5)을 통해 들어오는 전압의 크기를 아주 세밀하게 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>들어오는 신호의 세기를 0부터 1023 사이의 숫자로 나누어 반환합니다.</li>
      <li>빛의 밝기, 온도의 변화, 조이스틱의 기울기 등 연속적으로 변하는 센서 값을 읽을 때 필수적으로 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 핀 번호 : </span><span style="color:#e67e22;">값을 읽어올 아날로그 핀 (A0 ~ A5 중 선택)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 아날로그 측정값 (정수형) : </span><span style="color:#e67e22;">전압의 크기를 0부터 1023 사이의 숫자로 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">analogRead(A0~A5)</span>
    </div>
  `
};