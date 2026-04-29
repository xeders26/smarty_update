/*========================================================================
  /src/renderer/help/bluetoothBlocksHelp.ts
  - Bluetooth Blocks 도움말 데이터 파일입니다.
=================================================*/
export const BluetoothBlocksHelp: Record<string, string> = {

  'turnBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">블루투스 전원 켜기/끄기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마티 로봇에 장착된 블루투스 모듈의 전원을 제어합니다.</p>
    <ul style="font-weight: normal;">
      <li>배터리를 절약하거나 통신을 초기화하고 싶을 때 껐다가 켤 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 전원 제어 옵션 : </span><span style="color:#e67e22;">켜기(1) 또는 끄기(0) 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">블루투스 모듈의 전원 상태를 변경함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">turnBt(1);</span> <span style="color:#9aa5a6;">// 켜기</span><br>
      <span style="color:#9aa5a6;">turnBt(0);</span> <span style="color:#9aa5a6;">// 끄기</span>
    </div>
  `,

  'setModeBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">블루투스 모드 설정</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">블루투스의 작동 모드를 데이터 통신 모드 또는 설정(AT명령) 모드로 변경합니다.</p>
    <ul style="font-weight: normal;">
      <li>데이터 모드(1): 다른 로봇이나 스마트폰과 실제로 데이터를 주고받을 때 사용합니다.</li>
      <li>AT명령 모드(0): 블루투스의 이름, 비밀번호, 대장/부하 여부를 설정할 때 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 동작 모드 번호 : </span><span style="color:#e67e22;">데이터 모드(1) 또는 AT명령 모드(0) 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">선택한 모드로 블루투스 상태를 전환함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setModeBt(모드번호);</span>
    </div>
  `,

  'setMainBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">블루투스를 마스터(Main)로 설정</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">이 스마티 로봇을 연결의 주체가 되는 대장(마스터) 역할로 설정합니다.</p>
    <ul style="font-weight: normal;">
      <li>이 블록을 사용하기 전에 반드시 모드를 AT명령 모드(0)로 바꿔야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">로봇의 통신 역할을 마스터(Main)로 지정함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setMainBt();</span>
    </div>
  `,

  'setSubBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">블루투스를 슬레이브(Sub)로 설정</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">이 스마티 로봇을 대장의 명령을 기다리는 부하(슬레이브) 역할로 설정합니다.</p>
    <ul style="font-weight: normal;">
      <li>이 블록을 사용하기 전에 반드시 모드를 AT명령 모드(0)로 바꿔야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">로봇의 통신 역할을 슬레이브(Sub)로 지정함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setSubBt();</span>
    </div>
  `,

  'setNameBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">블루투스 이름 설정</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">스마트폰이나 다른 기기에서 검색할 때 나타나는 블루투스의 이름을 변경합니다.</p>
    <ul style="font-weight: normal;">
      <li>(예: "SMARTY_01")</li>
      <li>설정 변경을 위해 AT명령 모드(0)에서 실행해야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 새로운 이름 : </span><span style="color:#e67e22;">기기 검색에 표시될 문자열(String) 이름</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">모듈에 새로운 이름을 등록함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setNameBt("이름");</span>
    </div>
  `,

  'setPinBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">블루투스 비밀번호 설정</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">로봇끼리 짝을 맺을 때 사용할 비밀번호(PIN)를 설정합니다.</p>
    <ul style="font-weight: normal;">
      <li>대장 로봇과 부하 로봇의 비밀번호가 똑같아야 연결됩니다. (기본값: "0000")</li>
      <li>설정 변경을 위해 AT명령 모드(0)에서 실행해야 합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 새로운 비밀번호 : </span><span style="color:#e67e22;">페어링 시 사용할 문자열 형태의 PIN 번호</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">모듈에 새로운 비밀번호를 등록함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setPinBt("비밀번호");</span>
    </div>
  `,

  'getStateBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">블루투스 연결 상태 확인</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">블루투스가 스마트폰이나 다른 로봇과 연결되었는지 상태를 숫자로 확인합니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 연결 상태 코드 (정수형) : </span><span style="color:#e67e22;">현재 연결 여부를 나타내는 숫자 값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getStateBt()</span>
    </div>
  `,

  'getByteBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">블루투스 데이터 읽기 (1Byte)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">도착한 무선 데이터 중 딱 1개의 글자(1바이트)만 잘라서 읽어옵니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 수신 문자 데이터 : </span><span style="color:#e67e22;">도착한 데이터 중 1바이트 크기의 문자(char) 또는 아스키코드 정수(int) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">getByteBt()</span>
    </div>
  `,

  'availableBt': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📶 블루투스 수신 데이터가 있는가?</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">블루투스를 통해 나에게 도착한 편지(데이터)가 있는지 확인합니다.</p>
    <ul style="font-weight: normal;">
      <li>수신 대기 중인 데이터가 있다면 참(True), 없다면 거짓(False)을 반환합니다.</li>
      <li>주로 [만약] 블록과 함께 사용하여 "메시지가 왔을 때만" 특정 동작을 하도록 만듭니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 수신 대기 여부 (논리형) : </span><span style="color:#e67e22;">데이터가 대기 중이면 참(true), 아니면 거짓(false) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">(Serial1.available() > 0)</span>
    </div>
  `,

  'smarty_bt_wait_cmd': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 무선 조종 명령 수신 기다리기 (문자)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">블루투스로 데이터가 도착할 때까지 다른 동작을 멈추고 하염없이 기다립니다.</p>
    <ul style="font-weight: normal;">
      <li>데이터가 도착하면 영문자(글자) 형태로 결과를 반환합니다.</li>
      <li>(예: 스마트폰 방향키 'F', 'B' 등을 받을 때 사용)</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 명령 데이터 (문자형) : </span><span style="color:#e67e22;">데이터 수신 시 1바이트 글자로 반환, 도착 전까지 코드 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">waitBtCmd()</span>
    </div>
  `,

  'smarty_bt_wait_val': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 무선 조종 값 수신 기다리기 (숫자)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">블루투스로 데이터가 도착할 때까지 대기하다가, 도착하면 숫자 형태로 결과를 반환합니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 수치 데이터 (정수형) : </span><span style="color:#e67e22;">데이터 수신 시 변환된 숫자 반환, 도착 전까지 코드 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">waitBtVal()</span>
    </div>
  `,

  'smarty_bt_send_int': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📶 BT 정수 보내기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">상대방 로봇이나 기기에게 소수점이 없는 정수(숫자)를 무선으로 전송합니다.</p>
    <ul style="font-weight: normal;">
      <li>하드웨어 시리얼포트(Serial1)를 통해 빠르고 안정적으로 보냅니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 전송할 숫자 데이터 : </span><span style="color:#e67e22;">정수(int) 형태의 데이터 입력</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">입력된 숫자를 블루투스로 송신함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">Serial1.println(숫자);</span>
    </div>
  `,

  'smarty_bt_send_string': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📶 BT 문자 보내기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">상대방 로봇이나 기기에게 문자열(글자)을 무선으로 전송합니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 전송할 문자 데이터 : </span><span style="color:#e67e22;">문자열(String) 형태의 텍스트 입력</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">입력된 문자열을 블루투스로 송신함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">Serial1.println("문자열");</span>
    </div>
  `,

  'smarty_bt_read_int': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📶 BT 정수 받기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">블루투스로 날아온 데이터 중 지정한 바이트(길이)만큼을 모아서 숫자(정수)로 변환합니다.</p>
    <ul style="font-weight: normal;">
      <li>(예: "123"이라는 3바이트 글자를 받아서 123이라는 숫자로 조립합니다.)</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 수신할 크기 : </span><span style="color:#e67e22;">읽어들일 데이터의 길이 (바이트 수, 정수형)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 조립된 수치 데이터 : </span><span style="color:#e67e22;">지정한 바이트만큼 조합하여 완성된 정수 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">readBtInt(바이트수);</span>
    </div>
  `,

  'smarty_bt_read_string': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📶 BT 문자열 받기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">블루투스로 날아온 데이터 중 지정한 바이트(길이)만큼을 모아서 하나의 단어나 문장으로 만듭니다.</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 수신할 크기 : </span><span style="color:#e67e22;">읽어들일 데이터의 길이 (바이트 수, 정수형)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 조립된 문자 데이터 : </span><span style="color:#e67e22;">지정한 바이트만큼 조합하여 완성된 문자열(String) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">readBtString(바이트수);</span>
    </div>
  `,

  'smarty_p2p_setup_master': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">👑 스마티 대장(송신자) 모드로 준비하기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">군집 통신을 위한 원클릭 마법 블록! 이 로봇을 명령을 내리는 대장 로봇으로 완벽하게 자동 셋팅합니다.</p>
    <ul style="font-weight: normal;">
      <li>내부적으로[AT모드 진입 -> 마스터 설정 -> 비밀번호 설정 -> 데이터모드 복귀] 과정을 알아서 처리해 줍니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 그룹 비밀번호 : </span><span style="color:#e67e22;">페어링 그룹 식별을 위한 암호 (문자열)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">모듈을 대장(마스터) 모드로 자동 구성함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setModeBt(0);</span><br>
      <span style="color:#9aa5a6;">setMainBt();</span><br>
      <span style="color:#9aa5a6;">setPinBt("비밀번호");</span><br>
      <span style="color:#9aa5a6;">setModeBt(1);</span>
    </div>
  `,

  'smarty_p2p_setup_slave': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🤖 스마티 부하(수신자) 모드로 준비하기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">대장의 명령을 기다리는 부하 로봇으로 완벽하게 자동 셋팅합니다.</p>
    <ul style="font-weight: normal;">
      <li>대장 로봇과 같은 비밀번호를 입력해야 짝이 맺어집니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 그룹 비밀번호 : </span><span style="color:#e67e22;">대장과 연결하기 위한 암호 (문자열)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">모듈을 부하(슬레이브) 모드로 자동 구성함</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">setModeBt(0);</span><br>
      <span style="color:#9aa5a6;">setSubBt();</span><br>
      <span style="color:#9aa5a6;">setPinBt("비밀번호");</span><br>
      <span style="color:#9aa5a6;">setModeBt(1);</span>
    </div>
  `,

  'smarty_p2p_send': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📡 다른 로봇에게 메시지 보내기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">문자나 숫자를 다른 로봇(부하 또는 대장)에게 무선으로 전송합니다.</p>
    <ul style="font-weight: normal;">
      <li>수신하는 로봇이 메시지가 언제 끝나는지 알 수 있도록, 문장 끝에 자동으로 줄바꿈 기호(Enter)를 붙여 보냅니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 전송할 메시지 : </span><span style="color:#e67e22;">문자, 숫자 등 자동으로 변환되어 전송될 내용</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">메시지 끝에 개행문자(엔터)를 포함하여 블루투스 송신</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">Serial1.println(메시지);</span>
    </div>
  `,

  'smarty_p2p_read': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📩 도착한 메시지 통째로 읽기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">상대방이 보낸 편지를 한 글자씩 읽지 않고 한 문장(문자열)으로 통째로 읽어옵니다.</p>
    <ul style="font-weight: normal;">
      <li>상대방이 '줄바꿈 기호(Enter)'를 보낸 지점까지를 하나의 문장으로 인식하여 잘라옵니다.</li>
      <li>무한정 멈추는 것을 방지하기 위해 최대 0.1초(100ms)만 기다립니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 전체 문자열 데이터 : </span><span style="color:#e67e22;">줄바꿈 기호 전까지의 문장을 하나의 문자열(String)로 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">readSmartyMessage()</span>
    </div>
  `
};