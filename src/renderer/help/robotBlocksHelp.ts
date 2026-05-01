/*========================================================================
  src/renderer/help/robotBlocksHelp.ts
  - 스마트 로봇 전용 (블루/레드 핸드 및 슬라이드) 제어 블록 도움말 데이터
=================================================*/

export const RobotBlocksHelp: Record<string, string> = {

  'moveBlueHand': `
    <h3 style="color: #2196F3; margin-top:0; font-size: 1.0rem; font-weight: normal;">🖐🔵 블루팀 핸드 제어</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">파란색 로봇의 팔이나 집게(서보모터)를 설정된 안전 범위 내에서만 움직이게 하는 스마트 전용 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>입력한 각도가 허용 범위를 벗어나면, 블록에 시각적 경고(⚠️)가 즉시 나타납니다.</li>
      <li>C++ 코드로 변환될 때 내부적으로 범위를 검사하는 보호 코드가 자동 추가되어 로봇 고장을 원천 차단합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #2196F3 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#42A5F5;">• 서보 포트 : </span><span style="color:#90CAF9;">핸드 모터가 연결된 포트 (S1, S2, S3, S4 중 선택)</span><br>
        <span style="color:#42A5F5;">• 각도 : </span><span style="color:#90CAF9;">블록 양옆에 표시된 최소~최대 범위(예: 0 ~ 180) 내의 정수</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#42A5F5;">• 반환값 없음 : </span><span style="color:#90CAF9;">해당 포트의 핸들을 지정한 각도로 안전하게 이동시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드 (자동 안전 장치 포함):</span><br>
      <span style="color:#9aa5a6;">if (각도 &gt;= 제한최소 && 각도 &lt;= 제한최대) {<br>&nbsp;&nbsp;runServo(포트, 각도);<br>}</span>
    </div>
  `,

  'moveRedHand': `
    <h3 style="color: #F44336; margin-top:0; font-size: 1.0rem; font-weight: normal;">🖐🔴 레드팀 핸드 제어</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">빨간색 로봇의 팔이나 집게(서보모터)를 안전하게 제어하는 전용 블록입니다. 지정된 허용 범위를 넘는 명령은 자동으로 차단됩니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #F44336 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#EF5350;">• 서보 포트 : </span><span style="color:#EF9A9A;">핸드 모터가 연결된 포트 (S1, S2, S3, S4 중 선택)</span><br>
        <span style="color:#EF5350;">• 각도 : </span><span style="color:#EF9A9A;">블록 양옆에 표시된 허용 범위 내의 정수</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#EF5350;">• 반환값 없음 : </span><span style="color:#EF9A9A;">해당 포트의 핸들을 지정한 각도로 안전하게 이동시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드 (자동 안전 장치 포함):</span><br>
      <span style="color:#9aa5a6;">if (각도 &gt;= 제한최소 && 각도 &lt;= 제한최대) {<br>&nbsp;&nbsp;runServo(포트, 각도);<br>}</span>
    </div>
  `,

  'moveBlueSlide': `
    <h3 style="color: #2196F3; margin-top:0; font-size: 1.0rem; font-weight: normal;">↔️🔵 블루팀 슬라이드 제어</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">파란색 로봇의 슬라이드 축(위치 이동 장치)을 부딪히지 않고 안전하게 제어하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>인터넷이 연결되어 있으면 대회 룰이나 기체 상태에 맞춰 서버로부터 최신 가동 범위(Min/Max)를 자동으로 받아옵니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #2196F3 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#42A5F5;">• 서보 포트 : </span><span style="color:#90CAF9;">슬라이드 모터가 연결된 포트 (S1, S2, S3, S4 중 선택)</span><br>
        <span style="color:#42A5F5;">• 위치(각도) : </span><span style="color:#90CAF9;">제한 범위 내에서 이동할 목표 위치값</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#42A5F5;">• 반환값 없음 : </span><span style="color:#90CAF9;">슬라이드를 해당 위치로 안전하게 구동시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드 (자동 안전 장치 포함):</span><br>
      <span style="color:#9aa5a6;">if (위치 &gt;= 제한최소 && 위치 &lt;= 제한최대) {<br>&nbsp;&nbsp;runServo(포트, 위치);<br>}</span>
    </div>
  `,

  'moveRedSlide': `
    <h3 style="color: #F44336; margin-top:0; font-size: 1.0rem; font-weight: normal;">↔️🔴 레드팀 슬라이드 제어</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">빨간색 로봇의 슬라이드 축(위치 이동 장치)을 파손 위험 없이 안전하게 이동시키는 전용 블록입니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #F44336 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#EF5350;">• 서보 포트 : </span><span style="color:#EF9A9A;">슬라이드 모터가 연결된 포트 (S1, S2, S3, S4 중 선택)</span><br>
        <span style="color:#EF5350;">• 위치(각도) : </span><span style="color:#EF9A9A;">제한 범위 내에서 이동할 목표 위치값</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#EF5350;">• 반환값 없음 : </span><span style="color:#EF9A9A;">슬라이드를 해당 위치로 안전하게 구동시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드 (자동 안전 장치 포함):</span><br>
      <span style="color:#9aa5a6;">if (위치 &gt;= 제한최소 && 위치 &lt;= 제한최대) {<br>&nbsp;&nbsp;runServo(포트, 위치);<br>}</span>
    </div>
  `
};