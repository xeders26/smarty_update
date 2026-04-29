/*========================================================================
  /src/renderer/help/baseBlocksHelp.ts
=================================================*/
export const BaseBlocksHelp: Record<string, string> = {
  
  'smarty_begin': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🤖 스마티 초기화</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티 로봇을 사용하기 위해 가장 먼저 실행해야 하는 필수 초기화 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>센서, 모터, LED 등을 제어하기 위한 내부 설정을 마칩니다.</li>
      <li>기본적으로 범퍼 LED를 끄고, SW1 스위치를 누를 때까지 대기합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">스마티 로봇의 내부 초기화 동작만 수행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">beginSmarty();</span><br>
      <span style="color:#9aa5a6;">turnBumperAllOff();</span><br>
      <span style="color:#9aa5a6;">waitSW(SW1);</span>
    </div>
  `,

  'smarty_get_battery': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔋 배터리 전압(V) 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티 로봇에 연결된 배터리의 현재 전압을 소수점이 있는 숫자(실수) 형태로 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>배터리가 부족한지 확인할 때(예: 조건문) 유용하게 사용할 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 전압 측정값 (실수형) : </span><span style="color:#e67e22;">배터리 전압을 약 0.0 ~ 9.0 사이의 값(단위: V)으로 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getBattery()</span>
    </div>
  `,

  'arduino_serial_print': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🖥️ PC 모니터에 출력하기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티 로봇에서 측정한 센서 값이나 문자를 PC의 시리얼 모니터 창으로 전송합니다.</p>
    <ul style="font-weight: normal;">
      <li>줄바꿈(Enter) 체크: 값을 출력한 뒤 다음 줄로 넘어갑니다. (println)</li>
      <li>체크 해제: 값을 출력하고 줄을 바꾸지 않아, 다음 글자가 바로 옆에 이어져서 나옵니다. (print)</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 출력할 데이터 : </span><span style="color:#e67e22;">모니터로 전송할 데이터 (정수, 실수, 문자열 등 자동 인식)</span><br>
        <span style="color:#f5b041;">• 줄바꿈 여부 : </span><span style="color:#e67e22;">출력 후 다음 줄로 넘어갈지 선택 (체크: println, 해제: print)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">시리얼 통신으로 PC에 데이터를 전송함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">Serial.println(값);</span> <span style="color:#9aa5a6;">// 줄바꿈 O</span><br>
      <span style="color:#9aa5a6;">Serial.print(값);</span> <span style="color:#9aa5a6;">// 줄바꿈 X</span>
    </div>
  `,

  'arduino_serial_available': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⌨️ 키보드 입력이 들어왔는가?</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">PC(시리얼 모니터)에서 키보드로 입력한 데이터가 스마티 로봇에 도착했는지 확인합니다.</p>
    <ul style="font-weight: normal;">
      <li>도착한 데이터가 있으면 참(True), 없으면 거짓(False)을 반환합니다.</li>
      <li>주로 [만약(if)] 논리 블록과 함께 짝을 이루어 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 수신 여부 (논리형) : </span><span style="color:#e67e22;">데이터가 도착했으면 참(true), 아니면 거짓(false) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">(Serial.available() > 0)</span>
    </div>
  `,

  'arduino_serial_read': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⌨️ 키보드 입력값 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">PC에서 스마티로 전송한 데이터(명령)를 선택한 자료형(형태)에 맞춰 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>정수: 소수점이 없는 숫자 (예: 123)</li>
      <li>실수: 소수점이 있는 숫자 (예: 3.14)</li>
      <li>문자/문자열: 알파벳이나 텍스트</li>
      <li>주의: 반드시 '키보드 입력이 들어왔는가?' 블록으로 확인한 후에 사용해야 안전합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 읽어올 자료형 : </span><span style="color:#e67e22;">정수, 실수, 문자열, 문자 중 하나를 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 수신된 데이터 : </span><span style="color:#e67e22;">선택한 자료형(int, float, String, char)에 맞춰 변환된 값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">Serial.parseInt()</span> <span style="color:#9aa5a6;">// 정수</span><br>
      <span style="color:#9aa5a6;">Serial.parseFloat()</span> <span style="color:#9aa5a6;">// 실수</span><br>
      <span style="color:#9aa5a6;">Serial.readString()</span> <span style="color:#9aa5a6;">// 문자열</span><br>
      <span style="color:#9aa5a6;">(char)Serial.read()</span> <span style="color:#9aa5a6;">// 문자</span>
    </div>
  `,

  'arduino_main': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚀 스마티 프로그램 (메인)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티 로봇 프로그램의 가장 기본이 되는 뼈대(구조) 블록입니다. 지울 수 없습니다.</p>
    <ul style="font-weight: normal;">
      <li>처음 한 번 실행 (setup): 전원이 켜지거나 리셋될 때 처음에 딱 한 번만 실행되는 공간입니다. 주로 초기화 블록들을 넣습니다.</li>
      <li>계속 반복 실행 (loop): setup이 끝난 후 무한히 반복해서 실행되는 공간입니다. 로봇의 주된 행동(모터, 센서 제어)을 넣습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">C++ 프로그램의 필수 뼈대(setup, loop) 역할만 수행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">void setup() { ... }</span><br>
      <span style="color:#9aa5a6;">void loop() { ... }</span>
    </div>
  `
};