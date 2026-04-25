/*========================================================================
  src/renderer/help/sensorBlocksHelp.ts
  - 스마티의 기본 센서, 스위치 및 확장(I2C) 센서 블록 도움말 데이터
=================================================*/

export const SensorBlocksHelp: Record<string, string> = {

  'smarty_switch': `
    <h2 style="color: #2980b9;">🔘 스위치가 눌렸는가?</h2>
    <hr>
    <p>로봇 윗면의 <b>SW1(왼쪽) 또는 SW2(오른쪽) 버튼이 현재 눌려있는지 확인</b>합니다.</p>
    <ul>
      <li>버튼이 눌려있으면 <b>참(True)</b>, 안 눌려있으면 <b>거짓(False)</b>을 반환합니다.</li>
      <li>주로 <code>[만약 ~라면]</code> 블록과 함께 사용하여, 버튼을 누를 때 특정 행동을 하도록 만듭니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">readSw(SW1)</span>
    </div>
  `,

  'smarty_sensor': `
    <h2 style="color: #2980b9;">🔍 일반 센서값 읽기</h2>
    <hr>
    <p>초음파 센서(거리), 마이크(소리 크기), 조도 센서(빛 밝기), 바닥 IR(선 감지) 등 <b>로봇의 기본 센서 값을 숫자로 읽어옵니다.</b></p>
    <ul>
      <li><b>초음파 거리:</b> 앞에 있는 물체와의 거리를 cm 단위로 알려줍니다.</li>
      <li><b>소리/빛:</b> 주변의 소리나 빛의 크기를 0~1023 사이의 숫자로 알려줍니다.</li>
      <li><b>바닥 IR:</b> 바닥의 검은색 라인을 감지할 때 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">getSonar()</span>, <span style="color:#e74c3c;">getMic()</span> 등
    </div>
  `,

  'smarty_adv_sensor_init': `
    <h2 style="color: #2980b9;">🛠️ 확장 센서 시작하기 (초기화)</h2>
    <hr>
    <p>컬러 센서, 자이로 센서, 정밀 거리 센서, 범퍼 보드 등 <b>고급(I2C) 센서를 사용하기 전 반드시 실행해야 하는 준비 블록</b>입니다.</p>
    <ul>
      <li>이 블록은 가급적 프로그램의 <code>[처음 한 번 실행 (setup)]</code> 공간에 넣어주어야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">beginGyroSensor();</span> 등
    </div>
  `,

  'smarty_adv_sensor_read': `
    <h2 style="color: #2980b9;">📡 확장 센서값 읽기</h2>
    <hr>
    <p>초기화를 마친 <b>고급 확장 센서들의 구체적인 데이터</b>를 읽어옵니다.</p>
    <ul>
      <li><b>컬러 센서:</b> 물체의 색상 번호나 R, G, B 색상 값을 분리해서 읽습니다.</li>
      <li><b>자이로 센서:</b> 로봇이 얼마나 회전했는지 각도(X, Y, Z축)를 정밀하게 읽습니다.</li>
      <li><b>정밀 거리 센서:</b> 광학이나 초음파 방식을 이용해 더 정확한 거리를 측정합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">getColorNumber()</span>, <span style="color:#e74c3c;">getGyroDgree()</span> 등
    </div>
  `,

  'smarty_gyro_action': `
    <h2 style="color: #2980b9;">🧭 자이로 센서 영점 맞추기</h2>
    <hr>
    <p>로봇이 바라보고 있는 <b>현재의 방향을 기준점(0도)으로 새롭게 설정</b>합니다.</p>
    <ul>
      <li>주행 중 로봇이 정확히 90도씩 회전하게 만들고 싶을 때, 회전 직전에 이 블록을 사용하여 각도를 0도로 맟추면 계산이 매우 쉬워집니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">setGyroInit();</span>
    </div>
  `,

  'smarty_bumper_read': `
    <h2 style="color: #2980b9;">🚗 범퍼 센서값 읽기</h2>
    <hr>
    <p>로봇 앞쪽에 장착된 범퍼 보드에서 <b>근접(물체 감지) 및 라인(바닥 선 감지) 센서 값을 읽어옵니다.</b></p>
    <ul>
      <li>디지털 값(0 또는 1)이나 아날로그 값(0~1023) 중 상황에 맞게 선택할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">getBumperLeftPrx()</span> 등
    </div>
  `,

  'waitUntilAdc': `
    <h2 style="color: #2980b9;">⏳ 아날로그 값 대기</h2>
    <hr>
    <p>아날로그 센서(A1~A8) 값이 <b>내가 지정한 조건(예: 500보다 커질 때)을 만족할 때까지 로봇의 동작을 일시 정지하고 기다립니다.</b></p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">waitUntilAdc(A1, ">", 500);</span>
    </div>
  `,

  'waitUntilSw': `
    <h2 style="color: #2980b9;">⏳ 스위치 대기 (누름/뗌)</h2>
    <hr>
    <p>지정한 스위치가 <b>눌릴 때까지, 또는 떼어질 때까지 다음 명령을 실행하지 않고 기다립니다.</b></p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">waitUntilSw(SW1, ON);</span>
    </div>
  `,

  'initBump': `
    <h2 style="color: #2980b9;">🚗 범퍼 센서 초기화 (기본)</h2>
    <hr>
    <p>범퍼 센서 보드를 사용하기 위해 초기 통신(I2C)을 설정하는 블록입니다. (주로 setup에 사용)</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">initBump();</span>
    </div>
  `,

  'findBumpObject': `
    <h2 style="color: #2980b9;">🛑 범퍼 장애물 감지 여부</h2>
    <hr>
    <p>범퍼 앞의 <b>지정한 거리(DIST) 안에 장애물이 감지되었는지</b> 확인하여 참(True)/거짓(False)으로 알려줍니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">findBumpObject(위치, 거리)</span>
    </div>
  `,

  'findBumpLine': `
    <h2 style="color: #2980b9;">〰️ 범퍼 라인 감지 여부</h2>
    <hr>
    <p>범퍼 아래쪽 센서가 <b>지정한 기준값(LINE)에 따라 바닥의 선(라인)을 감지했는지</b> 확인하여 참(True)/거짓(False)으로 알려줍니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">findBumpLine(위치, 라인기준값)</span>
    </div>
  `
};