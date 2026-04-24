/*================
  src/renderer/blockly/bluetoothBlocks.ts
=================*/
import * as Blockly from 'blockly';

export function initBluetoothBlocks(arduinoGenerator: any) {
  
  // =========================================================================
  // 🧱 1. 스마티 라이브러리(smartyLib) 전용 순수 JSON 블록 정의
  // =========================================================================

  Blockly.defineBlocksWithJsonArray([
    { 
      "type": "turnBt", 
      "message0": "블루투스 전원 %1", 
      "args0": [{"type": "field_dropdown", "name": "STATE", "options": [["켜기(1)", "1"], ["끄기(0)", "0"]]}], 
      "previousStatement": null, 
      "nextStatement": null, 
      "colour": 290 
    },
    {
      "type": "setModeBt",
      "message0": "블루투스 모드 %1",
      "args0": [{"type": "field_dropdown", "name": "MODE", "options": [["데이터 모드(1)", "1"], ["AT명령 모드(0)", "0"]]}],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 290
    },
    {
      "type": "setMainBt",
      "message0": "블루투스를 마스터(Main)로 설정",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 290
    },
    {
      "type": "setSubBt",
      "message0": "블루투스를 슬레이브(Sub)로 설정",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 290
    },
    { 
      "type": "setNameBt", 
      "message0": "블루투스 이름 설정 %1", 
      "args0": [{"type": "input_value", "name": "NAME", "check": "String"}], 
      "previousStatement": null, 
      "nextStatement": null, 
      "colour": 290 
    },
    { 
      "type": "setPinBt", 
      "message0": "블루투스 비밀번호 설정 %1", 
      "args0": [{"type": "input_value", "name": "PIN", "check": "String"}], 
      "previousStatement": null, 
      "nextStatement": null, 
      "colour": 290 
    },
    { 
      "type": "getStateBt", 
      "message0": "블루투스 연결 상태 확인", 
      "output": "Number", 
      "colour": 290 
    },
    { 
      "type": "getByteBt", 
      "message0": "블루투스 데이터 읽기(1Byte)", 
      "output": "Number", 
      "colour": 290 
    },
    {
      "type": "availableBt",
      "message0": "📶 블루투스 수신 데이터가 있는가?",
      "output": "Boolean",
      "colour": 290,
      "tooltip": "블루투스로 수신 대기 중인 데이터가 있다면 참(true), 없다면 거짓(false)을 반환합니다."
    },
    {
      "type": "smarty_bt_wait_cmd",
      "message0": "⏳ 무선 조종 명령(1Byte) 수신 기다리기 (문자 반환)",
      "output": "String",
      "colour": 290,
      "tooltip": "블루투스로 데이터가 들어올 때까지 기다렸다가 문자로 반환합니다."
    },
    {
      "type": "smarty_bt_wait_val",
      "message0": "⏳ 무선 조종 값(1Byte) 수신 기다리기 (숫자 반환)",
      "output": "Number",
      "colour": 290,
      "tooltip": "블루투스로 데이터가 들어올 때까지 기다렸다가 숫자로 반환합니다."
    },

    // 🚀 [요청 신규 블록] 1. BT 정수 보내기
    {
      "type": "smarty_bt_send_int",
      "message0": "📶 BT 정수 보내기 %1",
      "args0": [{"type": "input_value", "name": "VALUE", "check": "Number"}],
      "output": "Number",
      "colour": 290,
      "tooltip": "정수를 블루투스로 전송하고, 전송된 바이트 수를 반환합니다."
    },
    // 🚀 [요청 신규 블록] 2. BT 문자 보내기
    {
      "type": "smarty_bt_send_string",
      "message0": "📶 BT 문자 보내기 %1",
      "args0": [{"type": "input_value", "name": "TEXT", "check": "String"}],
      "output": "Number",
      "colour": 290,
      "tooltip": "문자열을 블루투스로 전송하고, 전송된 바이트 수를 반환합니다."
    },
    // 🚀 [요청 신규 블록] 3. BT 정수 받기
    {
      "type": "smarty_bt_read_int",
      "message0": "📶 BT 정수 받기 수신 바이트 수: %1",
      "args0": [{"type": "input_value", "name": "BYTES", "check": "Number"}],
      "output": "Number",
      "colour": 290,
      "tooltip": "지정된 바이트 수만큼 데이터를 받아 정수로 반환합니다."
    },
    // 🚀 [요청 신규 블록] 4. BT 문자열 받기
    {
      "type": "smarty_bt_read_string",
      "message0": "📶 BT 문자열 받기  수신 바이트 수: %1",
      "args0": [{"type": "input_value", "name": "BYTES", "check": "Number"}],
      "output": "String",
      "colour": 290,
      "tooltip": "지정된 바이트 수만큼 데이터를 받아 문자열로 반환합니다."
    },
        // 🤖 [군집 통신 전용] 1. 스마티 대장(Master) 원클릭 설정
    {
      "type": "smarty_p2p_setup_master",
      "message0": "👑 스마티 대장(송신자) 모드로 준비하기 (비밀번호: %1)",
      "args0": [{"type": "input_value", "name": "PIN", "check": "String"}],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 290,
      "tooltip": "자동으로 AT모드 진입 후 마스터로 설정하고 비밀번호를 맞춥니다."
    },
    // 🤖 [군집 통신 전용] 2. 스마티 부하(Slave) 원클릭 설정
    {
      "type": "smarty_p2p_setup_slave",
      "message0": "🤖 스마티 부하(수신자) 모드로 준비하기 (비밀번호: %1)",
      "args0": [{"type": "input_value", "name": "PIN", "check": "String"}],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 290,
      "tooltip": "자동으로 AT모드 진입 후 슬레이브로 설정하고 비밀번호를 맞춥니다."
    },
    // 🤖 [군집 통신 전용] 3. 로봇에게 메시지 보내기
    {
      "type": "smarty_p2p_send",
      "message0": "📡 다른 로봇에게 메시지 보내기 %1",
      "args0": [{"type": "input_value", "name": "MSG", "check": ["String", "Number"]}],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 290,
      "tooltip": "문자나 숫자를 다른 로봇에게 전송합니다. (자동으로 끝에 줄바꿈 추가)"
    },
    // 🤖 [군집 통신 전용] 4. 도착한 메시지 통째로 읽기
    {
      "type": "smarty_p2p_read",
      "message0": "📩 도착한 메시지 통째로 읽기 (문자열)",
      "output": "String",
      "colour": 290,
      "tooltip": "스마티 라이브러리를 이용해 수신된 메시지를 한 번에 읽어옵니다."
    }
  ]);

  // =========================================================================
  // ⚙️ 2. 아두이노 코드 생성기 (Generator)
  // =========================================================================

  arduinoGenerator.forBlock['turnBt'] = function(block: any) { 
    return `turnBt(${block.getFieldValue('STATE')});\n`; 
  };
  arduinoGenerator.forBlock['setModeBt'] = function(block: any) { 
    return `setModeBt(${block.getFieldValue('MODE')});\n`; 
  };
  arduinoGenerator.forBlock['setMainBt'] = function(block: any) { 
    return `setMainBt();\n`; 
  };
  arduinoGenerator.forBlock['setSubBt'] = function(block: any) { 
    return `setSubBt();\n`; 
  };
  arduinoGenerator.forBlock['setNameBt'] = function(block: any) { 
    const name = arduinoGenerator.valueToCode(block, 'NAME', 0) || '""';
    return `setNameBt(${name});\n`; 
  };
  arduinoGenerator.forBlock['setPinBt'] = function(block: any) { 
    const pin = arduinoGenerator.valueToCode(block, 'PIN', 0) || '""';
    return `setPinBt(${pin});\n`; 
  };
  arduinoGenerator.forBlock['getStateBt'] = function(block: any) { 
    return ['getStateBt()', 0]; 
  };
  arduinoGenerator.forBlock['getByteBt'] = function(block: any) { 
    return ['getByteBt()', 0]; 
  };
  arduinoGenerator.forBlock['availableBt'] = function(block: any) {
    return ['(Serial1.available() > 0)', 0];
  };

  // 🚀 [신규 제너레이터] BT 송신 (스마티 BT 하드웨어 시리얼포트 Serial1 사용, 보낸 바이트 수 리턴)
  arduinoGenerator.forBlock['smarty_bt_send_int'] = function(block: any) {
    const val = arduinoGenerator.valueToCode(block, 'VALUE', 0) || '0';
    return [`Serial1.println(${val})`, 0]; 
  };

  arduinoGenerator.forBlock['smarty_bt_send_string'] = function(block: any) {
    const text = arduinoGenerator.valueToCode(block, 'TEXT', 0) || '""';
    return [`Serial1.println(${text})`, 0]; 
  };

  // 🚀 [신규 제너레이터] BT 수신을 위한 헬퍼 함수 (스마티 라이브러리 getByteBt 사용)
  const readBtIntFunc = 
    'long readBtInt(int len) {\n' +
    '  String s = "";\n' +
    '  unsigned long start = millis();\n' +
    '  while (s.length() < len && millis() - start < 1000) {\n' +
    '    short b = getByteBt();\n' +
    '    if (b >= 0) s += (char)b;\n' +
    '  }\n' +
    '  return s.toInt();\n' +
    '}\n';

  const readBtStringFunc = 
    'String readBtString(int len) {\n' +
    '  String s = "";\n' +
    '  unsigned long start = millis();\n' +
    '  while (s.length() < len && millis() - start < 1000) {\n' +
    '    short b = getByteBt();\n' +
    '    if (b >= 0) s += (char)b;\n' +
    '  }\n' +
    '  return s;\n' +
    '}\n';

  arduinoGenerator.forBlock['smarty_bt_read_int'] = function(block: any) {
    const bytes = arduinoGenerator.valueToCode(block, 'BYTES', 0) || '1';
    arduinoGenerator.definitions_['func_read_bt_int'] = readBtIntFunc;
    return [`readBtInt(${bytes})`, 0];
  };

  arduinoGenerator.forBlock['smarty_bt_read_string'] = function(block: any) {
    const bytes = arduinoGenerator.valueToCode(block, 'BYTES', 0) || '1';
    arduinoGenerator.definitions_['func_read_bt_string'] = readBtStringFunc;
    return [`readBtString(${bytes})`, 0];
  };

  // =========================================================================
  // 🛡️ [유지] 헬퍼 함수 및 대기 블록 제너레이터
  // =========================================================================

  const waitCmdFunction = 
    'char waitBtCmd() {\n' +
    '  short data = -1;\n' +
    '  while (true) {\n' +
    '    data = getByteBt();\n' +
    '    if (data >= 0) break;\n' +
    '    delay(1);\n' +
    '  }\n' +
    '  return (char)data;\n' +
    '}\n';

  const waitValFunction = 
    'int waitBtVal() {\n' +
    '  short data = -1;\n' +
    '  while (true) {\n' +
    '    data = getByteBt();\n' +
    '    if (data >= 0) break;\n' +
    '    delay(1);\n' +
    '  }\n' +
    '  return (int)data;\n' +
    '}\n';

  arduinoGenerator.forBlock['smarty_bt_wait_cmd'] = function(block: any) {
    arduinoGenerator.definitions_['func_wait_bt_cmd'] = waitCmdFunction;
    return ['waitBtCmd()', 0]; 
  };

  arduinoGenerator.forBlock['smarty_bt_wait_val'] = function(block: any) {
    arduinoGenerator.definitions_['func_wait_bt_val'] = waitValFunction;
    return ['waitBtVal()', 0]; 
  };

  // =========================================================================
  // ⚠️ [잔해 처리] rc_command 관련은 모두 삭제. 기존 잔여 더미만 유지.
  // =========================================================================
  const dummyBlocks = ['smarty_ble_setup', 'smarty_bt_read']; // rc 관련 블록은 삭제
  dummyBlocks.forEach(type => {
    if (!Blockly.Blocks[type]) {
      Blockly.Blocks[type] = {
        init: function() {
          this.appendDummyInput().appendField(`⚠️ 삭제된 블록 (사용 불가)`);
          this.setColour("#A0A0A0");
        }
      };
    }
    arduinoGenerator.forBlock[type] = function() { 
      return type.includes('read') ? ['0', 0] : ''; 
    };
  });
    // =========================================================================
  // 🤖 [군집 통신 전용] 제너레이터 구현 (스마티 라이브러리 100% 활용)
  // =========================================================================

  // 👑 대장(Master) 자동 설정
  arduinoGenerator.forBlock['smarty_p2p_setup_master'] = function(block: any) {
    const pin = arduinoGenerator.valueToCode(block, 'PIN', 0) || '"0000"';
    return `setModeBt(0);\nsetMainBt();\nsetPinBt(${pin});\nsetModeBt(1);\ndelay(1000);\n`;
  };

  // 🤖 부하(Slave) 자동 설정
  arduinoGenerator.forBlock['smarty_p2p_setup_slave'] = function(block: any) {
    const pin = arduinoGenerator.valueToCode(block, 'PIN', 0) || '"0000"';
    return `setModeBt(0);\nsetSubBt();\nsetPinBt(${pin});\nsetModeBt(1);\ndelay(1000);\n`;
  };

  // 📡 메시지 보내기 (println을 써서 뒤에 줄바꿈(\n) 기호를 붙여 전송! -> 수신 측에서 끊어 읽기 편하게 만듦)
  arduinoGenerator.forBlock['smarty_p2p_send'] = function(block: any) {
    const msg = arduinoGenerator.valueToCode(block, 'MSG', 0) || '""';
    return `Serial1.println(${msg});\n`;
  };

  // 📩 메시지 통째로 읽기 (스마티 라이브러리 getByteBt 활용, 줄바꿈(\n)이 나올 때까지 싹 다 읽음)
  const readSmartyMessageFunc = 
    'String readSmartyMessage() {\n' +
    '  String s = "";\n' +
    '  unsigned long start = millis();\n' +
    '  while (millis() - start < 100) { // 100ms 타임아웃 (무한정지 방지)\n' +
    '    short b = getByteBt();\n' +
    '    if (b >= 0) {\n' +
    '      if ((char)b == \'\\n\') break; // 줄바꿈 기호면 읽기 종료\n' +
    '      if ((char)b != \'\\r\') s += (char)b; // 진짜 글자만 저장\n' +
    '    }\n' +
    '  }\n' +
    '  return s;\n' +
    '}\n';

  arduinoGenerator.forBlock['smarty_p2p_read'] = function(block: any) {
    arduinoGenerator.definitions_['func_read_smarty_message'] = readSmartyMessageFunc;
    return ['readSmartyMessage()', 0];
  };
}