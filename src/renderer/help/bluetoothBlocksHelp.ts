export const BluetoothBlocksHelp: Record<string, string> = {

  'turnBt': `
    <h2 style="color: #2980b9;">블루투스 전원 켜기/끄기</h2>
    <hr>
    <p>스마티 로봇에 장착된 <b>블루투스 모듈의 전원</b>을 제어합니다.</p>
    <ul>
      <li>배터리를 절약하거나 통신을 초기화하고 싶을 때 껐다가 켤 수 있습니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">turnBt(1);</span> // 켜기<br>
      <span style="color:#e74c3c;">turnBt(0);</span> // 끄기
    </div>
  `,

  'setModeBt': `
    <h2 style="color: #2980b9;">블루투스 모드 설정</h2>
    <hr>
    <p>블루투스의 작동 모드를 <b>데이터 통신 모드</b> 또는 <b>설정(AT명령) 모드</b>로 변경합니다.</p>
    <ul>
      <li><b>데이터 모드(1):</b> 다른 로봇이나 스마트폰과 실제로 데이터를 주고받을 때 사용합니다.</li>
      <li><b>AT명령 모드(0):</b> 블루투스의 이름, 비밀번호, 대장/부하 여부를 설정할 때 사용합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">setModeBt(모드번호);</span>
    </div>
  `,

  'setMainBt': `
    <h2 style="color: #2980b9;">블루투스를 마스터(Main)로 설정</h2>
    <hr>
    <p>이 스마티 로봇을 연결의 주체가 되는 <b>대장(마스터)</b> 역할로 설정합니다.</p>
    <ul>
      <li>이 블록을 사용하기 전에 반드시 모드를 <b>AT명령 모드(0)</b>로 바꿔야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">setMainBt();</span>
    </div>
  `,

  'setSubBt': `
    <h2 style="color: #2980b9;">블루투스를 슬레이브(Sub)로 설정</h2>
    <hr>
    <p>이 스마티 로봇을 대장의 명령을 기다리는 <b>부하(슬레이브)</b> 역할로 설정합니다.</p>
    <ul>
      <li>이 블록을 사용하기 전에 반드시 모드를 <b>AT명령 모드(0)</b>로 바꿔야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">setSubBt();</span>
    </div>
  `,

  'setNameBt': `
    <h2 style="color: #2980b9;">블루투스 이름 설정</h2>
    <hr>
    <p>스마트폰이나 다른 기기에서 검색할 때 나타나는 <b>블루투스의 이름</b>을 변경합니다.</p>
    <ul>
      <li>(예: "SMARTY_01")</li>
      <li>설정 변경을 위해 <b>AT명령 모드(0)</b>에서 실행해야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">setNameBt("이름");</span>
    </div>
  `,

  'setPinBt': `
    <h2 style="color: #2980b9;">블루투스 비밀번호 설정</h2>
    <hr>
    <p>로봇끼리 짝을 맺을 때 사용할 <b>비밀번호(PIN)</b>를 설정합니다.</p>
    <ul>
      <li>대장 로봇과 부하 로봇의 비밀번호가 똑같아야 연결됩니다. (기본값: "0000")</li>
      <li>설정 변경을 위해 <b>AT명령 모드(0)</b>에서 실행해야 합니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">setPinBt("비밀번호");</span>
    </div>
  `,

  'getStateBt': `
    <h2 style="color: #2980b9;">블루투스 연결 상태 확인</h2>
    <hr>
    <p>블루투스가 스마트폰이나 다른 로봇과 <b>연결되었는지 상태를 숫자로 확인</b>합니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">getStateBt()</span>
    </div>
  `,

  'getByteBt': `
    <h2 style="color: #2980b9;">블루투스 데이터 읽기 (1Byte)</h2>
    <hr>
    <p>도착한 무선 데이터 중 <b>딱 1개의 글자(1바이트)</b>만 잘라서 읽어옵니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">getByteBt()</span>
    </div>
  `,

  'availableBt': `
    <h2 style="color: #2980b9;">📶 블루투스 수신 데이터가 있는가?</h2>
    <hr>
    <p>블루투스를 통해 나에게 <b>도착한 편지(데이터)가 있는지 확인</b>합니다.</p>
    <ul>
      <li>수신 대기 중인 데이터가 있다면 <b>참(True)</b>, 없다면 <b>거짓(False)</b>을 반환합니다.</li>
      <li>주로 [만약] 블록과 함께 사용하여 "메시지가 왔을 때만" 특정 동작을 하도록 만듭니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">(Serial1.available() > 0)</span>
    </div>
  `,

  'smarty_bt_wait_cmd': `
    <h2 style="color: #2980b9;">⏳ 무선 조종 명령 수신 기다리기 (문자)</h2>
    <hr>
    <p>블루투스로 데이터가 도착할 때까지 다른 동작을 멈추고 <b>하염없이 기다립니다.</b></p>
    <ul>
      <li>데이터가 도착하면 <b>영문자(글자) 형태</b>로 결과를 반환합니다.</li>
      <li>(예: 스마트폰 방향키 'F', 'B' 등을 받을 때 사용)</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">waitBtCmd()</span>
    </div>
  `,

  'smarty_bt_wait_val': `
    <h2 style="color: #2980b9;">⏳ 무선 조종 값 수신 기다리기 (숫자)</h2>
    <hr>
    <p>블루투스로 데이터가 도착할 때까지 대기하다가, 도착하면 <b>숫자 형태</b>로 결과를 반환합니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">waitBtVal()</span>
    </div>
  `,

  'smarty_bt_send_int': `
    <h2 style="color: #2980b9;">📶 BT 정수 보내기</h2>
    <hr>
    <p>상대방 로봇이나 기기에게 <b>소수점이 없는 정수(숫자)를 무선으로 전송</b>합니다.</p>
    <ul>
      <li>하드웨어 시리얼포트(Serial1)를 통해 빠르고 안정적으로 보냅니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">Serial1.println(숫자);</span>
    </div>
  `,

  'smarty_bt_send_string': `
    <h2 style="color: #2980b9;">📶 BT 문자 보내기</h2>
    <hr>
    <p>상대방 로봇이나 기기에게 <b>문자열(글자)을 무선으로 전송</b>합니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">Serial1.println("문자열");</span>
    </div>
  `,

  'smarty_bt_read_int': `
    <h2 style="color: #2980b9;">📶 BT 정수 받기</h2>
    <hr>
    <p>블루투스로 날아온 데이터 중 <b>지정한 바이트(길이)만큼을 모아서 숫자(정수)로 변환</b>합니다.</p>
    <ul>
      <li>(예: "123"이라는 3바이트 글자를 받아서 123이라는 숫자로 조립합니다.)</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">readBtInt(바이트수);</span>
    </div>
  `,

  'smarty_bt_read_string': `
    <h2 style="color: #2980b9;">📶 BT 문자열 받기</h2>
    <hr>
    <p>블루투스로 날아온 데이터 중 <b>지정한 바이트(길이)만큼을 모아서 하나의 단어나 문장으로</b> 만듭니다.</p>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">readBtString(바이트수);</span>
    </div>
  `,

  'smarty_p2p_setup_master': `
    <h2 style="color: #2980b9;">👑 스마티 대장(송신자) 모드로 준비하기</h2>
    <hr>
    <p>군집 통신을 위한 원클릭 마법 블록! 이 로봇을 <b>명령을 내리는 대장 로봇</b>으로 완벽하게 자동 셋팅합니다.</p>
    <ul>
      <li>내부적으로[AT모드 진입 -> 마스터 설정 -> 비밀번호 설정 -> 데이터모드 복귀] 과정을 알아서 처리해 줍니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">setModeBt(0);</span><br>
      <span style="color:#e74c3c;">setMainBt();</span><br>
      <span style="color:#e74c3c;">setPinBt("비밀번호");</span><br>
      <span style="color:#e74c3c;">setModeBt(1);</span>
    </div>
  `,

  'smarty_p2p_setup_slave': `
    <h2 style="color: #2980b9;">🤖 스마티 부하(수신자) 모드로 준비하기</h2>
    <hr>
    <p>대장의 명령을 기다리는 <b>부하 로봇</b>으로 완벽하게 자동 셋팅합니다.</p>
    <ul>
      <li>대장 로봇과 <b>같은 비밀번호</b>를 입력해야 짝이 맺어집니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b><br>
      <span style="color:#e74c3c;">setModeBt(0);</span><br>
      <span style="color:#e74c3c;">setSubBt();</span><br>
      <span style="color:#e74c3c;">setPinBt("비밀번호");</span><br>
      <span style="color:#e74c3c;">setModeBt(1);</span>
    </div>
  `,

  'smarty_p2p_send': `
    <h2 style="color: #2980b9;">📡 다른 로봇에게 메시지 보내기</h2>
    <hr>
    <p>문자나 숫자를 <b>다른 로봇(부하 또는 대장)에게 무선으로 전송</b>합니다.</p>
    <ul>
      <li>수신하는 로봇이 메시지가 언제 끝나는지 알 수 있도록, 문장 끝에 자동으로 <b>줄바꿈 기호(Enter)</b>를 붙여 보냅니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">Serial1.println(메시지);</span>
    </div>
  `,

  'smarty_p2p_read': `
    <h2 style="color: #2980b9;">📩 도착한 메시지 통째로 읽기</h2>
    <hr>
    <p>상대방이 보낸 편지를 한 글자씩 읽지 않고 <b>한 문장(문자열)으로 통째로 읽어옵니다.</b></p>
    <ul>
      <li>상대방이 '줄바꿈 기호(Enter)'를 보낸 지점까지를 하나의 문장으로 인식하여 잘라옵니다.</li>
      <li>무한정 멈추는 것을 방지하기 위해 최대 0.1초(100ms)만 기다립니다.</li>
    </ul>
    <div style="background:#f4f4f9; padding:10px; border-left:4px solid #f39c12; font-family: monospace;">
      <b style="color:#2c3e50;">C++ 변환 코드:</b> <span style="color:#e74c3c;">readSmartyMessage()</span>
    </div>
  `
};