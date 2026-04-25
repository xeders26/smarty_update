/*========================================================================
  src/renderer/help/motorBlocksHelp.ts
  - 메카넘 휠, DC 모터, 서보 모터 등 구동계 블록 도움말 데이터
=================================================*/

export const MotorBlocksHelp: Record<string, string> = {

  'mecanumDrive': `
    <h2 style="color: #2980b9;">🚗 메카넘 휠 전방향 주행</h2>
    <hr>
    <p>스마티의 특수 바퀴인 <b>메카넘 휠을 사용하여 로봇의 방향을 틀지 않고도 전후좌우, 대각선으로 미끄러지듯 이동</b>하는 강력한 블록입니다.</p>
    <ul>
      <li><b>방향:</b> 앞, 뒤, 좌, 우, 대각선(4방향), 제자리 회전, 정지 등 11가지 동작을 선택할 수 있습니다.</li>
      <li><b>속도:</b> 0부터 255 사이의 숫자로 이동 속도를 조절합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">driveMecanum(방향_번호, 속도);</span>
    </div>
  `,

  'smarty_servo': `
    <h2 style="color: #2980b9;">📐 서보모터 제어 (통합)</h2>
    <hr>
    <p>로봇 팔이나 관절에 쓰이는 <b>서보모터(S1~S4)의 각도를 지정하거나 힘을 푸는 블록</b>입니다.</p>
    <ul>
      <li><b>즉시이동:</b> 지정한 각도(보통 0~180도)로 모터 축이 빠르게 회전합니다.</li>
      <li><b>힘 빼기(OFF):</b> 모터에 들어가는 전기를 끊어, 손으로 부드럽게 움직일 수 있게 만듭니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">runServo(S1, 90);</span> // 90도로 이동<br>
      <span style="color:#e74c3c;">offServo(S1);</span> // 힘 빼기
    </div>
  `,

  'runServo': `
    <h2 style="color: #2980b9;">📐 서보모터 구동 (각도 이동)</h2>
    <hr>
    <p>지정한 서보모터를 <b>원하는 각도(0~180도)로 즉시 회전</b>시킵니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">runServo(ID, 각도);</span>
    </div>
  `,

  'offServo': `
    <h2 style="color: #2980b9;">🔓 서보모터 힘 빼기 (끄기)</h2>
    <hr>
    <p>서보모터에 인가되는 <b>신호를 끊어 관절을 부드럽게 풀어주는 블록</b>입니다. 로봇의 자세를 손으로 직접 잡아줄 때 유용합니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">offServo(ID);</span>
    </div>
  `,

  'setupServo': `
    <h2 style="color: #2980b9;">⚙️ 서보모터 펄스폭(영점) 설정</h2>
    <hr>
    <p>모터마다 미세하게 다른 <b>0도와 180도의 기준점(펄스폭 길이)을 정밀하게 보정</b>하는 고급 설정 블록입니다.</p>
    <ul>
      <li>보통 <code>[처음 한 번 실행]</code>에 넣어서 사용하며, 모터가 너무 끝까지 돌아서 "찌직" 소리가 나는 것을 방지할 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">setupServo(ID, 0도_펄스, 180도_펄스);</span>
    </div>
  `,

  'slowServo': `
    <h2 style="color: #2980b9;">🐢 서보모터 부드럽게(천천히) 이동</h2>
    <hr>
    <p>서보모터를 한 번에 홱! 돌리지 않고, <b>지정한 속도와 간격에 맞춰 부드럽게 천천히 움직이게(Sweep)</b> 하는 블록입니다.</p>
    <ul>
      <li>시작 각도에서 목표 각도까지, <b>증감량(각도)</b>만큼 <b>간격(ms)</b>을 두고 천천히 이동합니다. 로봇의 움직임을 훨씬 자연스럽게 만들어 줍니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">slowServo(ID, 시작, 최종, 증감량, 간격);</span>
    </div>
  `,

  'runDcMotor': `
    <h2 style="color: #2980b9;">⚙️ DC모터 제어 (통합)</h2>
    <hr>
    <p>로봇의 바퀴나 일반 회전 장치에 쓰이는 <b>DC모터(M1~M4)를 제어</b>하는 블록입니다.</p>
    <ul>
      <li><b>회전:</b> 지정한 속도(0~255)로 모터를 돌립니다.</li>
      <li><b>정지-부드럽게:</b> 전기를 끊어 모터가 관성에 의해 스르륵 멈추게 합니다.</li>
      <li><b>정지-급제동:</b> 브레이크를 걸어 모터를 즉시 꽉 멈춥니다.</li>
      <li><b>역회전:</b> 현재 돌고 있는 방향의 반대 방향으로 회전시킵니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">runMotor(M1, 150);</span> // 회전<br>
      <span style="color:#e74c3c;">stopMotor(M1, 1);</span> // 급제동
    </div>
  `,

  'runMotor': `
    <h2 style="color: #2980b9;">⚙️ DC모터 구동 (속도 지정)</h2>
    <hr>
    <p>지정한 DC모터를 <b>원하는 속도(0~255)로 회전</b>시킵니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">runMotor(ID, 속도);</span>
    </div>
  `,

  'stopMotor': `
    <h2 style="color: #2980b9;">🛑 DC모터 정지</h2>
    <hr>
    <p>돌고 있는 DC모터를 멈춥니다. <b>BRAKE_ON</b>은 급제동, <b>BRAKE_OFF</b>는 부드럽게 미끄러지며 멈춥니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">stopMotor(ID, 타입);</span>
    </div>
  `,

  'reverseMotor': `
    <h2 style="color: #2980b9;">🔄 DC모터 역회전</h2>
    <hr>
    <p>모터의 <b>현재 회전 방향을 반대로 뒤집습니다.</b> (시계방향 → 반시계방향, 또는 그 반대)</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">reverseMotor(ID);</span>
    </div>
  `,

  'runDcMotor_acc': `
    <h2 style="color: #2980b9;">🚀 DC모터 부드러운 가감속</h2>
    <hr>
    <p>자동차가 출발할 때 서서히 빨라지고, 멈출 때 서서히 느려지듯이 <b>모터의 속도를 부드럽게 변화</b>시키는 블록입니다.</p>
    <ul>
      <li>시작 속도에서 목표 속도까지, 지정한 <b>증감량</b>과 <b>간격(시간)</b>에 맞춰 속도를 서서히 올리거나 내립니다. 바퀴가 헛도는 것을 방지합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">accDecMotor(ID, 시작, 최종, 증감량, 간격);</span>
    </div>
  `,

  'accDecMotor': `
    <h2 style="color: #2980b9;">🚀 DC모터 가감속 (상세)</h2>
    <hr>
    <p>DC모터의 속도를 한 번에 바꾸지 않고 지정한 수치(변위, 간격)에 따라 <b>점진적으로 가속하거나 감속</b>합니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">accDecMotor(ID, 시작, 최종, 변위, 간격);</span>
    </div>
  `,

  'waitAccDecMotor': `
    <h2 style="color: #2980b9;">⏳ 모터 가감속 완료 대기</h2>
    <hr>
    <p>가속이나 감속 명령을 내린 뒤, <b>해당 모터가 목표 속도에 완전히 도달할 때까지 다음 코드로 넘어가지 않고 기다리는 블록</b>입니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">waitAccDecMotor(ID);</span>
    </div>
  `
};