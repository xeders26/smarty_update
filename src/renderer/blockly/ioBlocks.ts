import * as Blockly from 'blockly';

export function initIoBlocks(arduinoGenerator: any) {
  // ==========================================
  // 1. 아두이노 필수 기본 블록들 정의
  // ==========================================
  
  Blockly.Blocks['arduino_digital_write'] = { 
    init: function(this: any) { 
      this.appendDummyInput()
          .appendField("디지털 핀")
          .appendField(new Blockly.FieldNumber(13, 0, 100), "PIN")
          .appendField("번을"); 
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["켜기(HIGH)", "HIGH"],["끄기(LOW)", "LOW"]]), "STATE")
          .appendField("상태로 만들기"); 
      this.setPreviousStatement(true, null); 
      this.setNextStatement(true, null); 
      this.setColour(160); 
      
      // 🚨 가로로 한 줄 펴기 (추가됨)
      this.setInputsInline(true); 
    } 
  };
  
  Blockly.Blocks['arduino_pin_mode'] = { 
    init: function(this: any) { 
      this.appendDummyInput()
          .appendField("디지털 핀")
          .appendField(new Blockly.FieldNumber(13, 0, 100), "PIN")
          .appendField("번을"); 
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["출력(OUTPUT)", "OUTPUT"],["입력(INPUT)", "INPUT"]]), "MODE")
          .appendField("모드로 설정"); 
      this.setPreviousStatement(true, null); 
      this.setNextStatement(true, null); 
      this.setColour(160); 
      
      // 🚨 가로로 한 줄 펴기 (추가됨)
      this.setInputsInline(true); 
    } 
  };
  
  Blockly.Blocks['arduino_digital_read'] = { init: function(this: any) { this.appendDummyInput().appendField("디지털 핀").appendField(new Blockly.FieldNumber(2, 0, 100), "PIN").appendField("번 읽기"); this.setOutput(true, "Number"); this.setColour(160); } };
  Blockly.Blocks['arduino_analog_read'] = { init: function(this: any) { this.appendDummyInput().appendField("아날로그 핀").appendField(new Blockly.FieldDropdown([["A1","A1"],["A2","A2"],["A3","A3"],["A4","A4"],["A5","A5"],["A6","A6"],["A7","A7"],["A8","A8"]]), "PIN").appendField("읽기"); this.setOutput(true, "Number"); this.setColour(160); } };
  Blockly.Blocks['arduino_analog_write'] = { init: function(this: any) { this.appendDummyInput().appendField("아날로그 핀(PWM)").appendField(new Blockly.FieldNumber(9, 0, 100), "PIN").appendField("번에"); this.appendValueInput("VAL").setCheck("Number"); this.appendDummyInput().appendField("값 쓰기"); this.setInputsInline(true); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(160); } };
  
  // ==========================================
  // 3. 아두이노 블록 제너레이터 연결
  // ==========================================

  arduinoGenerator.forBlock['arduino_digital_write'] = function(block: any) { return `digitalWrite(${block.getFieldValue('PIN')}, ${block.getFieldValue('STATE')});\n`; };
  arduinoGenerator.forBlock['arduino_pin_mode'] = function(block: any) { return `pinMode(${block.getFieldValue('PIN')}, ${block.getFieldValue('MODE')});\n`; };
  arduinoGenerator.forBlock['arduino_digital_read'] = function(block: any) { return[`digitalRead(${block.getFieldValue('PIN')})`, 0]; };
  arduinoGenerator.forBlock['arduino_analog_read'] = function(block: any) { return[`analogRead(${block.getFieldValue('PIN')})`, 0]; };
  arduinoGenerator.forBlock['arduino_analog_write'] = function(block: any) { return `analogWrite(${block.getFieldValue('PIN')}, ${arduinoGenerator.valueToCode(block, 'VAL', 0) || '0'});\n`; };
}