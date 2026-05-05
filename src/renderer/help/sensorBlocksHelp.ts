/*========================================================================
  src/renderer/help/sensorBlocksHelp.ts
  - 스마티의 기본 센서, 스위치 및 확장(I2C) 센서 블록 도움말 데이터
=================================================*/

export const SensorBlocksHelp: Record<string, string> = {

  // ==========================================
  // [1] 통합 센서 및 확장 센서 블록
  // ==========================================
  'smarty_sensor': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔍 일반 센서값 통합 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">초음파, 소리, 빛, 바닥 IR 등 로봇의 기본 센서 값을 메뉴에서 선택하여 숫자로 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>초음파 거리: 앞에 있는 물체와의 거리를 cm 단위로 알려줍니다.</li>
      <li>바닥 IR: 1번~5번 위치의 바닥 검은색 라인을 감지할 때 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 종류 : </span><span style="color:#e67e22;">초음파, 소리, 빛, 바닥 IR(1~5), 핀 번호 등 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 측정값 (정수/실수형) : </span><span style="color:#e67e22;">각 센서의 종류에 맞는 수치값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getSonar()</span>, <span style="color:#9aa5a6;">getIR(1)</span> <span style="color:#9aa5a6;">등</span>
    </div>
  `,

  'smarty_adv_sensor_init': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🛠️ 확장 센서 시작하기 (초기화)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">컬러, 자이로, 정밀 거리, 범퍼 보드 등 고급(I2C) 센서를 사용하기 전 반드시 실행해야 하는 준비 블록입니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 종류 : </span><span style="color:#e67e22;">초기화할 고급 센서 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">선택한 센서의 통신 환경 준비</span>
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
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정 데이터 : </span><span style="color:#e67e22;">컬러값, 각도, 정밀 거리 등 세부 항목 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 측정값 : </span><span style="color:#e67e22;">선택한 데이터에 따라 정수/실수형 값 반환</span>
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
    <p style="font-weight: normal;">로봇이 바라보고 있는 현재의 방향을 기준점(0도)으로 새롭게 설정하거나 저장합니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 동작 선택 : </span><span style="color:#e67e22;">0도 저장 또는 0도 리셋 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">현재 각도를 0도로 설정함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setGyroInit();</span>
    </div>
  `,

  'smarty_bumper_read': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚗 범퍼 센서값 통합 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇 앞쪽에 장착된 범퍼 보드에서 근접/라인 센서 값을 메뉴로 선택하여 읽어옵니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 위치 : </span><span style="color:#e67e22;">좌측/우측 및 디지털/아날로그 방식 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정값 (정수형) : </span><span style="color:#e67e22;">선택한 방식에 따라 값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getBumperLeftPrx()</span> <span style="color:#9aa5a6;">등</span>
    </div>
  `,

  // ==========================================
  // [2] 개별/직접 읽기 블록
  // ==========================================
  'getAdc': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🎛️ 아날로그 핀 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 아날로그 핀(A1 ~ A8)에 연결된 센서의 값을 숫자로 정밀하게 읽어옵니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 채널(CH) : </span><span style="color:#e67e22;">읽어올 아날로그 핀 번호 (A1 ~ A8)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정값 (정수형) : </span><span style="color:#e67e22;">0 ~ 1023 사이의 아날로그 센서 수치</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">readAdc(A1)</span>
    </div>
  `,

  'readDIO': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔌 디지털 핀 상태 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 디지털 핀(D1 ~ D8)의 상태가 켜짐(High)인지 꺼짐(Low)인지 확인합니다.</p>
    <ul style="font-weight: normal;">
      <li>[만약 ~라면] 블록의 육각형 홈에 연결하여 논리값으로 바로 사용할 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 채널(CH) : </span><span style="color:#e67e22;">읽어올 디지털 핀 번호 (D1 ~ D8)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 (논리/정수형) : </span><span style="color:#e67e22;">전기가 흐르면 참(true)/1, 아니면 거짓(false)/0</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">readDIO(D1)</span>
    </div>
  `,

  'readSw': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔘 스위치 상태 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇 윗면의 SW1(왼쪽) 또는 SW2(오른쪽) 버튼이 현재 눌려있는지 확인합니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 스위치 ID : </span><span style="color:#e67e22;">확인할 스위치 (SW1, SW2 중 선택)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 (논리/정수형) : </span><span style="color:#e67e22;">눌림 상태면 참(true)/1, 아니면 거짓(false)/0</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">readSw(SW1)</span>
    </div>
  `,

  // ==========================================
  // [3] 대기 (Wait Until) 블록
  // ==========================================
  'waitUntilSw': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 스위치 대기 (누름/뗌)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 스위치가 눌릴 때까지, 또는 떼어질 때까지 다음 명령을 실행하지 않고 기다립니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 스위치 : </span><span style="color:#e67e22;">SW1, SW2 중 선택</span><br>
        <span style="color:#f5b041;">• 목표 상태 : </span><span style="color:#e67e22;">누름(ON) 또는 뗌(OFF) 상태 선택</span>
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

  'waitUntilAdc': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 아날로그 값 대기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">아날로그 센서(A1~A8) 값이 지정한 조건(예: 500보다 커질 때)을 만족할 때까지 기다립니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 포트 : </span><span style="color:#e67e22;">아날로그 핀 (A1 ~ A8)</span><br>
        <span style="color:#f5b041;">• 비교 조건 : </span><span style="color:#e67e22;">크다(>), 작다(<), 같다(==) 등 연산자</span><br>
        <span style="color:#f5b041;">• 기준값 (블록) : </span><span style="color:#e67e22;">비교할 목표 수치 블록 (기본값 500)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">조건을 만족할 때까지 다음 코드 진행 안 함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">waitUntilAdc(A1, ">", 500);</span>
    </div>
  `,

  // ==========================================
  // [4] 범퍼 특화 기능 블록 (JS 동적 블록)
  // ==========================================
  'initBump': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚗 범퍼 센서 초기화</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">범퍼 센서 보드를 사용하기 위해 초기 통신을 설정하는 블록입니다. (주로 설정 영역에 배치)</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
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

  'findBumpLine': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">〰️ 범퍼 라인 감지 여부</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 위치(POS)의 범퍼 하단 센서가 바닥의 선을 기준값(LINE)에 따라 인식했는지 육각형(논리형) 값으로 알려줍니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 위치 (POS) : </span><span style="color:#e67e22;">위치 번호 블록 (기본값 1)</span><br>
        <span style="color:#f5b041;">• 감지 기준값 (LINE) : </span><span style="color:#e67e22;">명암 판단 수치 블록 (기본값 500)</span>
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
      <span style="color:#9aa5a6;">findBumpLine(1, 500)</span>
    </div>
  `,

  'findBumpObject': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🛑 범퍼 장애물 감지 여부</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 위치(POS)의 범퍼 센서가 특정 거리(DIST) 안에 있는 장애물을 감지했는지 육각형(논리형) 값으로 알려줍니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 위치 (POS) : </span><span style="color:#e67e22;">위치 번호 블록 (기본값 1)</span><br>
        <span style="color:#f5b041;">• 감지 거리 (DIST) : </span><span style="color:#e67e22;">장애물 판단 거리 블록 (기본값 100)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 (논리형) : </span><span style="color:#e67e22;">물체가 감지되면 참(true), 없으면 거짓(false)</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">findBumpObject(1, 100)</span>
    </div>
  `,

  'getBumpDistance': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📏 범퍼 거리값 정밀 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 위치(POS)의 범퍼 거리 센서 값을 숫자로 직접 읽어옵니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 위치 (POS) : </span><span style="color:#e67e22;">위치 번호 블록 (기본값 1)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정값 (정수형) : </span><span style="color:#e67e22;">해당 위치 센서의 현재 거리 측정 수치</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getBumpDistance(1)</span>
    </div>
  `,

  'getBumpLine': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">〰️ 범퍼 라인값 정밀 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 위치(POS)의 범퍼 하단 라인 센서(빛 반사) 값을 숫자로 직접 읽어옵니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 센서 위치 (POS) : </span><span style="color:#e67e22;">위치 번호 블록 (기본값 1)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 측정값 (정수형) : </span><span style="color:#e67e22;">해당 위치 센서의 바닥 명암 측정 수치</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getBumpLine(1)</span>
    </div>
  `
};