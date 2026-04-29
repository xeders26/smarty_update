/*========================================================================
  src/renderer/help/motorBlocksHelp.ts
  - 메카넘 휠, DC 모터, 서보 모터 등 구동계 블록 도움말 데이터
=================================================*/

export const MotorBlocksHelp: Record<string, string> = {

  'mecanumDrive': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚗 메카넘 휠 전방향 주행</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티의 특수 바퀴인 메카넘 휠을 사용하여 로봇의 방향을 틀지 않고도 전후좌우, 대각선으로 미끄러지듯 이동하는 강력한 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>방향: 앞, 뒤, 좌, 우, 대각선(4방향), 제자리 회전, 정지 등 11가지 동작을 선택할 수 있습니다.</li>
      <li>속도: 0부터 255 사이의 숫자로 이동 속도를 조절합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 주행 방향 : </span><span style="color:#e67e22;">전, 후, 좌, 우, 대각선 등 11가지 옵션 선택</span><br>
        <span style="color:#f5b041;">• 속도 : </span><span style="color:#e67e22;">0 ~ 255 사이의 정수</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">로봇 주행 동작을 수행하고 다음 블록으로 넘어감</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">driveMecanum(방향_번호, 속도);</span>
    </div>
  `,

  'smarty_servo': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📐 서보모터 제어 (통합)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇 팔이나 관절에 쓰이는 서보모터(S1~S4)의 각도를 지정하거나 힘을 푸는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>즉시이동: 지정한 각도(보통 0~180도)로 모터 축이 빠르게 회전합니다.</li>
      <li>힘 빼기(OFF): 모터에 들어가는 전기를 끊어, 손으로 부드럽게 움직일 수 있게 만듭니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 서보 포트 : </span><span style="color:#e67e22;">S1, S2, S3, S4 중 선택</span><br>
        <span style="color:#f5b041;">• 제어 방식 : </span><span style="color:#e67e22;">즉시이동, 힘빼기 중 선택</span><br>
        <span style="color:#f5b041;">• 각도 : </span><span style="color:#e67e22;">0 ~ 180 도 사이의 정수 (힘빼기일 경우 무시됨)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">각도 이동 또는 힘 빼기 수행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">runServo(S1, 90);</span> <span style="color:#9aa5a6;">// 90도로 이동</span><br>
      <span style="color:#9aa5a6;">offServo(S1);</span> <span style="color:#9aa5a6;">// 힘 빼기</span>
    </div>
  `,

  'runServo': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📐 서보모터 구동 (각도 이동)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 서보모터를 원하는 각도(0~180도)로 즉시 회전시킵니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 서보 포트 : </span><span style="color:#e67e22;">S1, S2, S3, S4 중 선택</span><br>
        <span style="color:#f5b041;">• 목표 각도 : </span><span style="color:#e67e22;">0 ~ 180 도 사이의 정수</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">서보모터를 지정한 각도로 이동시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">runServo(ID, 각도);</span>
    </div>
  `,

  'offServo': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔓 서보모터 힘 빼기 (끄기)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">서보모터에 인가되는 신호를 끊어 관절을 부드럽게 풀어주는 블록입니다. 로봇의 자세를 손으로 직접 잡아줄 때 유용합니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 서보 포트 : </span><span style="color:#e67e22;">S1, S2, S3, S4 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">해당 포트의 서보모터 전력을 차단</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">offServo(ID);</span>
    </div>
  `,

  'setupServo': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚙️ 서보모터 펄스폭(영점) 설정</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">모터마다 미세하게 다른 0도와 180도의 기준점(펄스폭 길이)을 정밀하게 보정하는 고급 설정 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>보통 [처음 한 번 실행]에 넣어서 사용하며, 모터가 너무 끝까지 돌아서 "찌직" 소리가 나는 것을 방지할 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 서보 포트 : </span><span style="color:#e67e22;">S1, S2, S3, S4 중 선택</span><br>
        <span style="color:#f5b041;">• 0도 펄스폭 : </span><span style="color:#e67e22;">0도를 나타내는 펄스 길이 단위(us), (보통 544)</span><br>
        <span style="color:#f5b041;">• 180도 펄스폭 : </span><span style="color:#e67e22;">180도를 나타내는 펄스 길이 단위(us), (보통 2400)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">내부적으로 기준 영점을 설정</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setupServo(ID, 0도_펄스, 180도_펄스);</span>
    </div>
  `,

  'slowServo': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🐢 서보모터 부드럽게(천천히) 이동</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">서보모터를 한 번에 홱! 돌리지 않고, 지정한 속도와 간격에 맞춰 부드럽게 천천히 움직이게(Sweep) 하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>시작 각도에서 목표 각도까지, 증감량(각도)만큼 간격(ms)을 두고 천천히 이동합니다. 로봇의 움직임을 훨씬 자연스럽게 만들어 줍니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 서보 포트 : </span><span style="color:#e67e22;">S1, S2, S3, S4 중 선택</span><br>
        <span style="color:#f5b041;">• 시작 각도 : </span><span style="color:#e67e22;">이동을 시작할 현재 각도 (0 ~ 180 도)</span><br>
        <span style="color:#f5b041;">• 최종 각도 : </span><span style="color:#e67e22;">도달할 목표 각도 (0 ~ 180 도)</span><br>
        <span style="color:#f5b041;">• 각도 증감량 : </span><span style="color:#e67e22;">한 스텝당 변할 각도 크기 (정수)</span><br>
        <span style="color:#f5b041;">• 변화 간격 시간 : </span><span style="color:#e67e22;">스텝 사이의 대기 시간 단위(ms)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">부드러운 이동을 완료한 후 다음 블록 실행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">slowServo(ID, 시작, 최종, 증감량, 간격);</span>
    </div>
  `,

  'runDcMotor': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚙️ DC모터 제어 (통합)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇의 바퀴나 일반 회전 장치에 쓰이는 DC모터(M1~M4)를 제어하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>회전: 지정한 속도(0~255)로 모터를 돌립니다.</li>
      <li>정지-부드럽게: 전기를 끊어 모터가 관성에 의해 스르륵 멈추게 합니다.</li>
      <li>정지-급제동: 브레이크를 걸어 모터를 즉시 꽉 멈춥니다.</li>
      <li>역회전: 현재 돌고 있는 방향의 반대 방향으로 회전시킵니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• DC 모터 포트 : </span><span style="color:#e67e22;">M1, M2, M3, M4 중 선택</span><br>
        <span style="color:#f5b041;">• 제어 방식 : </span><span style="color:#e67e22;">회전, 정지-부드럽게, 정지-급제동, 역회전 중 선택</span><br>
        <span style="color:#f5b041;">• 속도 : </span><span style="color:#e67e22;">0 ~ 255 사이의 정수 (정지일 경우 무시됨)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">모터 제어 명령 수행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">runMotor(M1, 150);</span> <span style="color:#9aa5a6;">// 회전</span><br>
      <span style="color:#9aa5a6;">stopMotor(M1, 1);</span> <span style="color:#9aa5a6;">// 급제동</span>
    </div>
  `,

  'runMotor': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚙️ DC모터 구동 (속도 지정)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 DC모터를 원하는 속도(0~255)로 회전시킵니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• DC 모터 포트 : </span><span style="color:#e67e22;">M1, M2, M3, M4 중 선택</span><br>
        <span style="color:#f5b041;">• 회전 속도 : </span><span style="color:#e67e22;">0 ~ 255 사이의 정수</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">해당 속도로 모터 구동 수행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">runMotor(ID, 속도);</span>
    </div>
  `,

  'stopMotor': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🛑 DC모터 정지</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">돌고 있는 DC모터를 멈춥니다. BRAKE_ON은 급제동, BRAKE_OFF는 부드럽게 미끄러지며 멈춥니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• DC 모터 포트 : </span><span style="color:#e67e22;">M1, M2, M3, M4 중 선택</span><br>
        <span style="color:#f5b041;">• 제동 방식 : </span><span style="color:#e67e22;">BRAKE_ON (급제동), BRAKE_OFF (전력 차단 후 부드러운 정지) 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">모터 정지 명령 수행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">stopMotor(ID, 타입);</span>
    </div>
  `,

  'reverseMotor': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔄 DC모터 역회전</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">모터의 현재 회전 방향을 반대로 뒤집습니다. (시계방향 → 반시계방향, 또는 그 반대)</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• DC 모터 포트 : </span><span style="color:#e67e22;">방향을 반대로 바꿀 모터 (M1, M2, M3, M4 중 선택)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">현재 회전 방향을 반전시킴</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">reverseMotor(ID);</span>
    </div>
  `,

  'runDcMotor_acc': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚀 DC모터 부드러운 가감속</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">자동차가 출발할 때 서서히 빨라지고, 멈출 때 서서히 느려지듯이 모터의 속도를 부드럽게 변화시키는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>시작 속도에서 목표 속도까지, 지정한 증감량과 간격(시간)에 맞춰 속도를 서서히 올리거나 내립니다. 바퀴가 헛도는 것을 방지합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• DC 모터 포트 : </span><span style="color:#e67e22;">M1, M2, M3, M4 중 선택</span><br>
        <span style="color:#f5b041;">• 시작 속도 : </span><span style="color:#e67e22;">기준 속도 (0 ~ 255 사이의 정수)</span><br>
        <span style="color:#f5b041;">• 목표 속도 : </span><span style="color:#e67e22;">도달할 최종 속도 (0 ~ 255 사이의 정수)</span><br>
        <span style="color:#f5b041;">• 속도 증감량 : </span><span style="color:#e67e22;">한 스텝당 변할 속도값 (정수)</span><br>
        <span style="color:#f5b041;">• 변화 주기 : </span><span style="color:#e67e22;">스텝 사이의 대기 시간 단위(ms)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">모터 가감속 수행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">accDecMotor(ID, 시작, 최종, 증감량, 간격);</span>
    </div>
  `,

  'accDecMotor': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🚀 DC모터 가감속 (상세)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">DC모터의 속도를 한 번에 바꾸지 않고 지정한 수치(변위, 간격)에 따라 점진적으로 가속하거나 감속합니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• DC 모터 포트 : </span><span style="color:#e67e22;">M1, M2, M3, M4 중 선택</span><br>
        <span style="color:#f5b041;">• 시작 속도 : </span><span style="color:#e67e22;">현재 또는 기준 속도 (0 ~ 255 사이의 정수)</span><br>
        <span style="color:#f5b041;">• 최종 속도 : </span><span style="color:#e67e22;">도달할 최종 속도 (0 ~ 255 사이의 정수)</span><br>
        <span style="color:#f5b041;">• 변위 : </span><span style="color:#e67e22;">한 번에 변화할 속도 변화량 (정수)</span><br>
        <span style="color:#f5b041;">• 간격 : </span><span style="color:#e67e22;">스텝 사이의 시간 간격 단위(ms)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">모터 가감속 명령 실행</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">accDecMotor(ID, 시작, 최종, 변위, 간격);</span>
    </div>
  `,

  'waitAccDecMotor': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 모터 가감속 완료 대기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">가속이나 감속 명령을 내린 뒤, 해당 모터가 목표 속도에 완전히 도달할 때까지 다음 코드로 넘어가지 않고 기다리는 블록입니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• DC 모터 포트 : </span><span style="color:#e67e22;">가감속 완료를 대기할 포트 (M1, M2, M3, M4 중 선택)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">목표 속도에 도달할 때까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">waitAccDecMotor(ID);</span>
    </div>
  `
};