import * as Blockly from 'blockly';

export function initTextBlocks(arduinoGenerator: any) {
  // =========================================================================
  // [모양 정의]
  // =========================================================================
  Blockly.Blocks['wait_until_text_different'] = { init: function(this: any) { this.appendDummyInput().appendField("⏳"); this.appendValueInput("TEXT_A").setCheck(["String", "Number"]); this.appendDummyInput().appendField("글자와"); this.appendValueInput("TEXT_B").setCheck(["String", "Number"]); this.appendDummyInput().appendField("글자가 달라질 때까지 기다리기"); this.setInputsInline(true); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(45); } };
  Blockly.Blocks['wait_until_text_same'] = { init: function(this: any) { this.appendDummyInput().appendField("⏳"); this.appendValueInput("TEXT_A").setCheck(["String", "Number"]); this.appendDummyInput().appendField("글자와"); this.appendValueInput("TEXT_B").setCheck(["String", "Number"]); this.appendDummyInput().appendField("글자가 같아질 때까지 기다리기"); this.setInputsInline(true); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(45); } };

  // 🚀 [신규 추가 1] A 글자에 B 글자가 포함되어 있는가? (출력: Boolean)
  Blockly.Blocks['smarty_text_contains'] = { 
    init: function(this: any) { 
      this.appendValueInput("TEXT_A").setCheck(["String", "Number"]); 
      this.appendDummyInput().appendField("에"); 
      this.appendValueInput("TEXT_B").setCheck(["String", "Number"]); 
      this.appendDummyInput().appendField("글자가 포함되어 있는가?"); 
      this.setInputsInline(true); 
      this.setOutput(true, "Boolean"); 
      this.setColour(160); // 문자 카테고리 고유 색상 (초록 계열)
    } 
  };

  // 🚀 [신규 추가 2] A 글자와 B 글자가 완벽히 같은가? (출력: Boolean)
  Blockly.Blocks['smarty_text_equals'] = { 
    init: function(this: any) { 
      this.appendValueInput("TEXT_A").setCheck(["String", "Number"]); 
      this.appendDummyInput().appendField("와(과)"); 
      this.appendValueInput("TEXT_B").setCheck(["String", "Number"]); 
      this.appendDummyInput().appendField("글자가 같은가?"); 
      this.setInputsInline(true); 
      this.setOutput(true, "Boolean"); 
      this.setColour(160); 
    } 
  };

  // =========================================================================
  // [C++ 제너레이터]
  // =========================================================================
  arduinoGenerator.forBlock['text'] = function(b: any) { return['"' + b.getFieldValue('TEXT') + '"', 0]; };
  arduinoGenerator.forBlock['text_join'] = function(b: any) { let code = ''; for (let i = 0; i < b.itemCount_; i++) { let item = arduinoGenerator.valueToCode(b, 'ADD' + i, 0) || '""'; if (code === '') code = `String(${item})`; else code += ` + String(${item})`; } if (code === '') code = '""'; return[code, 0]; };
  arduinoGenerator.forBlock['wait_until_text_same'] = function(b: any) { const textA = arduinoGenerator.valueToCode(b, 'TEXT_A', 0) || '""'; const textB = arduinoGenerator.valueToCode(b, 'TEXT_B', 0) || '""'; return `  while(String(${textA}) != String(${textB})) { delay(10); }\n`; };
  arduinoGenerator.forBlock['wait_until_text_different'] = function(b: any) { const textA = arduinoGenerator.valueToCode(b, 'TEXT_A', 0) || '""'; const textB = arduinoGenerator.valueToCode(b, 'TEXT_B', 0) || '""'; return `  while(String(${textA}) == String(${textB})) { delay(10); }\n`; };

  // 🚀 [신규 추가 1 C++] 포함 여부 확인 (C++의 indexOf 활용)
  arduinoGenerator.forBlock['smarty_text_contains'] = function(b: any) { 
    const textA = arduinoGenerator.valueToCode(b, 'TEXT_A', 0) || '""'; 
    const textB = arduinoGenerator.valueToCode(b, 'TEXT_B', 0) || '""'; 
    // indexOf가 0 이상을 반환하면 포함되어 있다는 뜻입니다 (true 리턴)
    return [`(String(${textA}).indexOf(String(${textB})) >= 0)`, 0]; 
  };

  // 🚀 [신규 추가 2 C++] 일치 여부 확인 (C++의 == 연산자 활용)
  arduinoGenerator.forBlock['smarty_text_equals'] = function(b: any) { 
    const textA = arduinoGenerator.valueToCode(b, 'TEXT_A', 0) || '""'; 
    const textB = arduinoGenerator.valueToCode(b, 'TEXT_B', 0) || '""'; 
    // 두 글자가 정확히 일치하면 true 리턴
    return [`(String(${textA}) == String(${textB}))`, 0]; 
  };
}