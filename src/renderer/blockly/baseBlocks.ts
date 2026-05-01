/*================
  src/renderer/blockly/baseBlocks.ts
=================*/
import * as Blockly from 'blockly'

export function initBaseBlocks(arduinoGenerator: any) {
  // [모양 정의]
  Blockly.Blocks['smarty_begin'] = {
    init: function (this: any) {
      this.appendDummyInput().appendField('🤖 스마티 초기화')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(200)
    }
  }
  
  Blockly.Blocks['smarty_get_battery'] = {
    init: function (this: any) {
      this.appendDummyInput().appendField('🔋 배터리 전압(V) 읽기')
      this.setOutput(true, 'Number')
      this.setColour(200)
    }
  }

  Blockly.Blocks['arduino_serial_print'] = { 
    init: function(this: any) { 
      this.appendValueInput("TEXT")
          .setCheck(["String", "Number", "Boolean"]) // 숫자, 문자열, 논리 허용
          .appendField("🖥️ PC 모니터에"); 
      this.appendDummyInput().appendField("출력하기"); 
      this.appendDummyInput()
          .appendField(new Blockly.FieldCheckbox("TRUE"), "NEWLINE")
          .appendField("줄바꿈(Enter)"); 
      this.setInputsInline(true); 
      this.setPreviousStatement(true, null); 
      this.setNextStatement(true, null); 
      this.setColour(230); 
    } 
  };

  Blockly.Blocks['arduino_serial_available'] = { 
    init: function(this: any) { 
      this.appendDummyInput().appendField("⌨️ 키보드 입력이 들어왔는가?"); 
      this.setOutput(true, "Boolean"); 
      this.setColour(230); 
    } 
  };

  Blockly.Blocks['arduino_serial_read'] = { 
    init: function(this: any) { 
      // 🌟 [수정됨] 문구 순서를 "키보드 입력을 [선택박스] 로 읽기"로 변경했습니다.
      this.appendDummyInput()
          .appendField("⌨️ 키보드 입력을")
          .appendField(new Blockly.FieldDropdown([
            ["정수 (int)", "parseInt"],
            ["실수 (float)", "parseFloat"],
            ["문자열 (String)", "readString"],
            ["문자 (char)", "read"]
          ]), "TYPE")
          .appendField("로 읽기"); 
      
      this.setOutput(true, null); 
      this.setColour(230); 
    } 
  };
 
  Blockly.Blocks['arduino_main'] = { 
    init: function(this: any) { 
      this.appendDummyInput().appendField("🚀 스마티 프로그램"); 
      this.appendStatementInput("SETUP").setCheck(null).appendField("처음 한 번 실행 (setup)"); 
      this.appendStatementInput("LOOP").setCheck(null).appendField("계속 반복 실행 (loop)"); 
      this.setColour(290); 
      this.setDeletable(false); 
    } 
  };

  // ==========================================
  // 3. 아두이노 블록 제너레이터 연결
  // ==========================================
  arduinoGenerator.forBlock['arduino_main'] = function(block: any) {
    const setupCode = arduinoGenerator.statementToCode(block, 'SETUP') || '';
    const loopCode = arduinoGenerator.statementToCode(block, 'LOOP') || '';
    let setupSetups = '';
    if (arduinoGenerator.setups_) {
      for (let name in arduinoGenerator.setups_) {
        setupSetups += '  ' + arduinoGenerator.setups_[name] + '\n';
      }
    }
    return `void setup() {\n${setupSetups}${setupCode}}\n\nvoid loop() {\n${loopCode}}\n`;
  };

  // [C++ 제너레이터]
  arduinoGenerator.forBlock['smarty_begin'] = function (block: any) {
    return 'beginSmarty();\n  turnBumperAllOff();\nturnBumperBlinkLeftY(0);\nturnBumperBlinkRightY(0);\nturnBumperBlinkW(0);\nturnBumperBlinkR(0);\n waitSW(SW1);\n'
  }

  arduinoGenerator.forBlock['smarty_get_battery'] = function (block: any) {
    return ['getBattery()', 0]
  }

  arduinoGenerator.forBlock['arduino_serial_available'] = function(block: any) { 
    return ["(Serial.available() > 0)", 0]; 
  };

  arduinoGenerator.forBlock['arduino_serial_read'] = function(block: any) { 
    const type = block.getFieldValue('TYPE'); 
    if (type === 'read') return ["(char)Serial.read()", 0]; 
    return [`Serial.${type}()`, 0]; 
  };

  arduinoGenerator.forBlock['arduino_serial_print'] = function(block: any) { 
    const text = arduinoGenerator.valueToCode(block, 'TEXT', 0) || '""'; 
    return block.getFieldValue('NEWLINE') === 'TRUE' ? `Serial.println(${text});\n` : `Serial.print(${text});\n`; 
  };

}