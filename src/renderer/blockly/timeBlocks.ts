/*================
  src/renderer/blockly/timeBlocks.ts
=================*/
import * as Blockly from 'blockly'

export function initTimeBlocks(arduinoGenerator: any) {
  // ==========================================
  // [모양 정의]
  // ==========================================

  Blockly.Blocks['arduino_delay'] = { init: function(this: any) { this.appendValueInput("MS").setCheck("Number").appendField("⏱️"); this.appendDummyInput().appendField("밀리초(ms) 기다리기"); this.setInputsInline(true); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(45); } };
  
  Blockly.Blocks['smarty_timer'] = {
    init: function (this: any) {
      this.appendDummyInput()
        .appendField('⏱️ 타이머')
        .appendField(new Blockly.FieldDropdown([['T1', 'T1'],['T2', 'T2']]), 'TID')
        .appendField(new Blockly.FieldDropdown([['시작 (간격설정)', 'RUN'],['정지', 'STOP']]), 'ACT');
      
      // 🌟 [수정] 간격 입력 칸을 변수에 담아서 섀도우 블록을 연결할 수 있게 설정
      const intervalInput = this.appendValueInput('INTERVAL')
        .setCheck('Number')
        .appendField('간격(ms)');
      
      // 💡 [추가] 1000 숫자를 기본 섀도우 블록으로 삽입
      const shadowXml = Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">1000</field></shadow>');
      intervalInput.connection.setShadowDom(shadowXml);

      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(200);
    }
  }

  Blockly.Blocks['smarty_wait'] = {
    init: function (this: any) {
      this.appendDummyInput()
        .appendField('⏳ 대기하기: ')
        .appendField(new Blockly.FieldDropdown([['스위치1(SW1) 눌릴 때까지', 'waitSW(SW1)'],['스위치2(SW2) 눌릴 때까지', 'waitSW(SW2)']]), 'TYPE')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(120)
    }
  }

  Blockly.Blocks['smarty_timer_reset'] = {
    init: function (this: any) {
      this.appendDummyInput().appendField('⏱️ 초시계 초기화하기 (0초로 맞추기)')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#5CB1D6')
    }
  }

  Blockly.Blocks['smarty_timer_value'] = {
    init: function (this: any) {
      this.appendDummyInput().appendField('⏱️ 초시계 값 (초)')
      this.setOutput(true, 'Number')
      this.setColour('#5CB1D6')
    }
  }

  // 🚨 아까 삭제되어서 에러를 일으켰던 "참이 될때까지 / 비교 기다리기" 블록
  Blockly.Blocks['smarty_wait_until'] = { 
    init: function(this: any) { 
      this.appendValueInput("CONDITION").setCheck("Boolean").appendField("⏳"); 
      this.appendDummyInput().appendField("(이)가 참이 될 때까지 기다리기"); 
      this.setPreviousStatement(true, null); 
      this.setNextStatement(true, null); 
      this.setColour("#FFAB19"); 
    } 
  };
  
  Blockly.Blocks['smarty_wait_compare'] = { 
    init: function(this: any) { 
      this.jsonInit({ 
        "type": "smarty_wait_compare", 
        "message0": "⏳ %1 이(가) %2 %3 때까지 기다리기", 
        "args0":[ 
          { "type": "input_value", "name": "A" }, 
          { "type": "input_value", "name": "B" }, 
          { "type": "field_dropdown", "name": "OP", "options": [[ "보다 작아질 (<)", "LT" ],[ "보다 같거나 작아질 (<=)", "LTE" ],[ "보다 커질 (>)", "GT" ],[ "보다 같거나 커질 (>=)", "GTE" ],[ "와(과) 같아질 (==)", "EQ" ],[ "와(과) 달라질 (!=)", "NEQ" ] ] } 
        ], 
        "inputsInline": true, 
        "previousStatement": null, 
        "nextStatement": null, 
        "colour": "#FFAB19" 
      }); 
    } 
  };

  Blockly.Blocks['arduino_timer'] = { init: function(this: any) { this.appendDummyInput().appendField("⏳ 시작 후 흐른 시간").appendField(new Blockly.FieldDropdown([["밀리초(millis)", "millis"],["마이크로초(micros)", "micros"]]), "UNIT"); this.setOutput(true, "Number"); this.setColour(45); } };

  // ==========================================
  // [C++ 제너레이터]
  // ==========================================

  arduinoGenerator.forBlock['arduino_delay'] = function(block: any) { return `delay(${arduinoGenerator.valueToCode(block, 'MS', 0) || '1000'});\n`; };
 
  arduinoGenerator.forBlock['smarty_timer'] = function (block: any) {
    const id = block.getFieldValue('TID')
    const act = block.getFieldValue('ACT')
    const interval = arduinoGenerator.valueToCode(block, 'INTERVAL', 0) || '1000'
    if (act === 'RUN') return `runTimer(${id}, ${interval});\n`
    return `stopTimer(${id});\n`
  }

  arduinoGenerator.forBlock['smarty_wait'] = function (block: any) {
    const waitType = block.getFieldValue('TYPE')
    
    // SW1 버튼 로직
    if (waitType === 'waitSW(SW1)') {
      // 1. 눌릴 때까지 대기 (!readSw 이면 계속 루프)
      // 2. 떼어질 때까지 대기 (readSw 이면 계속 루프)
      return `while (!readSw(SW1)) { delay(10); }\nwhile (readSw(SW1)) { delay(10); }\n`
    } 
    // SW2 버튼 로직
    else if (waitType === 'waitSW(SW2)') {
      return `while (!readSw(SW2)) { delay(10); }\nwhile (readSw(SW2)) { delay(10); }\n`
    }
    
    return `\n`
  }

  arduinoGenerator.forBlock['smarty_timer_reset'] = function (block: any) {
    arduinoGenerator.definitions_['define_smarty_timer'] = 'unsigned long smarty_timer_start = 0;'
    return `smarty_timer_start = millis();\n`
  }

  arduinoGenerator.forBlock['smarty_timer_value'] = function (block: any) {
    arduinoGenerator.definitions_['define_smarty_timer'] = 'unsigned long smarty_timer_start = 0;'
    return [`((millis() - smarty_timer_start) / 1000.0)`, 0]
  }

  // 복구된 대기 블록의 제너레이터 코드
  arduinoGenerator.forBlock['smarty_wait_until'] = function(block: any) { 
    const condition = arduinoGenerator.valueToCode(block, 'CONDITION', 0) || 'false'; 
    return `while (!(${condition})) {\n  delay(1);\n}\n`; 
  };
  
  arduinoGenerator.forBlock['smarty_wait_compare'] = function(block: any) { 
    const a = arduinoGenerator.valueToCode(block, 'A', 0) || '0'; 
    const b = arduinoGenerator.valueToCode(block, 'B', 0) || '0'; 
    const op = block.getFieldValue('OP'); 
    let operator = '=='; 
    if (op === 'LT') operator = '<'; else if (op === 'LTE') operator = '<='; else if (op === 'GT') operator = '>'; else if (op === 'GTE') operator = '>='; else if (op === 'EQ') operator = '=='; else if (op === 'NEQ') operator = '!='; 
    return `while (!(${a} ${operator} ${b})) {\n  delay(1);\n}\n`; 
  };

  arduinoGenerator.forBlock['arduino_timer'] = function(block: any) { return[`${block.getFieldValue('UNIT')}()`, 0]; };

}