/*========================================================================
  src/renderer/help/sensorBlocksHelp.ts
  - 스마티의 기본 센서, 스위치 및 확장(I2C) 센서 블록 도움말 데이터
=================================================*/

export const SensorBlocksHelp: Record<string, string> = {

  'smarty_switch': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔘 스위치가 눌렸는가?</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇 윗면의 SW1(왼쪽) 또는 SW2(오른쪽) 버튼이 현재 눌려있는지 확인합니다.</p>
    <ul style="font-weight: normal;">
      <li>버튼이 눌려있으면 참(True), 안 눌려있으면 거짓(False)을 반환합니다.</li>
      <li>주로 [만약 ~라면] 블록과 함께 사용하여, 버튼을 누를 때 특정 행동을 하도록 만듭니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 스위치 포트 : </span><span style="color:#e67e22;">확인할 스위치 (SW1, SW2 중 선택)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 (논리형) : </span><span style="color:#e67e22;">눌림 상태면 참(true), 아니면 거짓(false)</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">readSw(SW1)</span>
    </div>
  `,

  'smarty_sensor': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔍 일반 센서값 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">초음파 센서(거리), 마이크(소리 크기), 조도 센서(빛 밝기), 바닥 IR(선 감지) 등 로봇의 기본 센서 값을 숫자로 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>초음파 거리: 앞에 있는 물체와의 거리를 cm 단위로 알려줍니다.</li>
      <li>소리/빛: 주변의 소리나 빛의 크기를 0~1023 사이의 숫자로 알려줍니다.</li>
      <li>바닥 IR: 바닥의 검은색 라인을 감지할 때 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 종류 : </span><span style="color:#e67e22;">초음파, 마이크, 조도, 바닥 IR (좌/우) 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 측정값 (정수형) : </span><span style="color:#e67e22;">아날로그는 0 ~ 1023, 초음파 거리는 cm 단위 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getSonar()</span>, <span style="color:#9aa5a6;">getMic()</span> <span style="color:#9aa5a6;">등</span>
    </div>
  `,

  'smarty_adv_sensor_init': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🛠️ 확장 센서 시작하기 (초기화)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">컬러 센서, 자이로 센서, 정밀 거리 센서, 범퍼 보드 등 고급(I2C) 센서를 사용하기 전 반드시 실행해야 하는 준비 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>이 블록은 가급적 프로그램의 [처음 한 번 실행 (setup)] 공간에 넣어주어야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 종류 : </span><span style="color:#e67e22;">컬러, 자이로, 정밀 거리, 범퍼 중 초기화할 센서 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">선택한 센서의 통신 환경을 준비함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">beginGyroSensor();</span> <span style="color:#9aa5a6;">등</span>
    </div>
  `,

  'smarty_adv_sensor_read': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📡 확장 센서값 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">초기화를 마친 고급 확장 센서들의 구체적인 데이터를 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>컬러 센서: 물체의 색상 번호나 R, G, B 색상 값을 분리해서 읽습니다.</li>
      <li>자이로 센서: 로봇이 얼마나 회전했는지 각도(X, Y, Z축)를 정밀하게 읽습니다.</li>
      <li>정밀 거리 센서: 광학이나 초음파 방식을 이용해 더 정확한 거리를 측정합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정 데이터 : </span><span style="color:#e67e22;">컬러(RGB, 번호), 자이로(X, Y, Z 각도), 정밀 거리(mm) 등 세부 항목 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 측정값 : </span><span style="color:#e67e22;">선택한 데이터에 따라 정수형 또는 실수형 값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getColorNumber()</span>, <span style="color:#9aa5a6;">getGyroDgree()</span> <span style="color:#9aa5a6;">등</span>
    </div>
  `,

  'smarty_gyro_action': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🧭 자이로 센서 영점 맞추기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇이 바라보고 있는 현재의 방향을 기준점(0도)으로 새롭게 설정합니다.</p>
    <ul style="font-weight: normal;">
      <li>주행 중 로봇이 정확히 90도씩 회전하게 만들고 싶을 때, 회전 직전에 이 블록을 사용하여 각도를 0도로 맞추면 계산이 매우 쉬워집니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 동작 선택 : </span><span style="color:#e67e22;">영점 설정 등 자이로 제어 옵션 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">현재 각도를 0도로 초기화함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setGyroInit();</span>
    </div>
  `,

  'smarty_bumper_read': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚗 범퍼 센서값 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇 앞쪽에 장착된 범퍼 보드에서 근접(물체 감지) 및 라인(바닥 선 감지) 센서 값을 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>디지털 값(0 또는 1)이나 아날로그 값(0~1023) 중 상황에 맞게 선택할 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 종류 : </span><span style="color:#e67e22;">근접 센서, 라인 센서, 충돌 스위치 중 선택</span><br>
        <span style="color:#f5b041;">• 측정 위치 : </span><span style="color:#e67e22;">좌측, 우측, 중앙 등 범퍼 상의 센서 위치 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정값 (정수형) : </span><span style="color:#e67e22;">센서 형태에 따라 아날로그(0~1023) 또는 디지털(0/1) 값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getBumperLeftPrx()</span> <span style="color:#9aa5a6;">등</span>
    </div>
  `,

  'waitUntilAdc': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 아날로그 값 대기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">아날로그 센서(A1~A8) 값이 내가 지정한 조건(예: 500보다 커질 때)을 만족할 때까지 로봇의 동작을 일시 정지하고 기다립니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 포트 : </span><span style="color:#e67e22;">아날로그 핀 (A1 ~ A8 중 선택)</span><br>
        <span style="color:#f5b041;">• 비교 조건 : </span><span style="color:#e67e22;">크다(>), 작다(<), 같다(==) 등 연산자 선택</span><br>
        <span style="color:#f5b041;">• 기준값 : </span><span style="color:#e67e22;">비교할 목표 수치 (보통 0 ~ 1023 사이의 정수)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">조건을 만족할 때까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">waitUntilAdc(A1, ">", 500);</span>
    </div>
  `,

  'waitUntilSw': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 스위치 대기 (누름/뗌)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 스위치가 눌릴 때까지, 또는 떼어질 때까지 다음 명령을 실행하지 않고 기다립니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 포트 : </span><span style="color:#e67e22;">스위치 포트 (SW1, SW2 중 선택)</span><br>
        <span style="color:#f5b041;">• 목표 상태 : </span><span style="color:#e67e22;">눌림(ON) 또는 떼어짐(OFF) 상태 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">조건을 만족할 때까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">waitUntilSw(SW1, ON);</span>
    </div>
  `,

  'initBump': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚗 범퍼 센서 초기화 (기본)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">범퍼 센서 보드를 사용하기 위해 초기 통신(I2C)을 설정하는 블록입니다. (주로 setup에 사용)</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">범퍼 센서 통신 환경을 준비함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">initBump();</span>
    </div>
  `,

  'findBumpObject': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🛑 범퍼 장애물 감지 여부</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">범퍼 앞의 지정한 거리(DIST) 안에 장애물이 감지되었는지 확인하여 참(True)/거짓(False)으로 알려줍니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 위치 : </span><span style="color:#e67e22;">범퍼 좌측, 우측, 중앙 등 선택</span><br>
        <span style="color:#f5b041;">• 감지 기준 거리 : </span><span style="color:#e67e22;">물체를 감지했다고 판단할 거리 수치</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 (논리형) : </span><span style="color:#e67e22;">기준 거리 내에 물체가 있으면 참(true), 없으면 거짓(false)</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">findBumpObject(위치, 거리)</span>
    </div>
  `,

  'findBumpLine': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">〰️ 범퍼 라인 감지 여부</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">범퍼 아래쪽 센서가 지정한 기준값(LINE)에 따라 바닥의 선(라인)을 감지했는지 확인하여 참(True)/거짓(False)으로 알려줍니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 위치 : </span><span style="color:#e67e22;">범퍼 좌측, 우측, 중앙 등 선택</span><br>
        <span style="color:#f5b041;">• 감지 기준 명암 : </span><span style="color:#e67e22;">라인을 인식했다고 판단할 빛 반사 수치 기준값</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 (논리형) : </span><span style="color:#e67e22;">라인이 감지되면 참(true), 아니면 거짓(false)</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">findBumpLine(위치, 라인기준값)</span>
    </div>
  `
};