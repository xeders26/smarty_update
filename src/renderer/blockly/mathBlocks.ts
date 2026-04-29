/*================
  src/renderer/blockly/mathBlocks.ts
=================*/
import * as Blockly from 'blockly';

export function initMathBlocks(arduinoGenerator: any) {
  // ==========================================
  // 1. Math 블록 모양 정의 (Custom Blocks)
  // ==========================================
  Blockly.Blocks['arduino_math_abs'] = { init: function(this: any) { this.appendValueInput("NUM").setCheck("Number").appendField("절댓값"); this.setInputsInline(true); this.setOutput(true, "Number"); this.setColour("%{BKY_MATH_HUE}"); } };
  Blockly.Blocks['arduino_math_map'] = { init: function(this: any) { this.appendValueInput("VAL").setCheck("Number").appendField("값"); this.appendValueInput("FROMLOW").setCheck("Number").appendField("을(를)["); this.appendValueInput("FROMHIGH").setCheck("Number").appendField("~"); this.appendValueInput("TOLOW").setCheck("Number").appendField("] 에서["); this.appendValueInput("TOHIGH").setCheck("Number").appendField("~"); this.appendDummyInput().appendField("] (으)로 변환 (map)"); this.setInputsInline(true); this.setOutput(true, "Number"); this.setColour("%{BKY_MATH_HUE}"); } };
  Blockly.Blocks['smarty_math_in_range'] = { init: function(this: any) { this.jsonInit({ "type": "smarty_math_in_range", "message0": "📏 %1 이(가) %2 부터 %3 사이인가?", "args0":[ { "type": "input_value", "name": "VAL", "check": "Number" }, { "type": "input_value", "name": "MIN", "check": "Number" }, { "type": "input_value", "name": "MAX", "check": "Number" } ], "inputsInline": true, "output": "Boolean", "colour": "%{BKY_MATH_HUE}" }); } };
  Blockly.Blocks['arduino_math_minmax'] = { init: function(this: any) { this.jsonInit({ "type": "arduino_math_minmax", "message0": "⚖️ %1 와(과) %2 중 %3", "args0":[ { "type": "input_value", "name": "A", "check": "Number" }, { "type": "input_value", "name": "B", "check": "Number" }, { "type": "field_dropdown", "name": "OP", "options": [["더 큰 값 (최댓값)", "max"],["더 작은 값 (최솟값)", "min"]] } ], "inputsInline": true, "output": "Number", "colour": "%{BKY_MATH_HUE}" }); } };
  
  // (math_number, math_arithmetic, math_random_int 등은 Blockly 내장 블록이므로 모양 정의 생략)


  // ==========================================
  // 2. Math 블록 C++ 제너레이터 연결
  // ==========================================
  
  // --- 새로 추가된 기본(Built-in) 블록 제너레이터 ---
  
  // 1) 일반 숫자 블록
  arduinoGenerator.forBlock['math_number'] = function(block: any) { 
    const num = block.getFieldValue('NUM'); 
    return [num, 0]; 
  };

  // 2) 사칙연산 블록 (+, -, *, /, ^)
  arduinoGenerator.forBlock['math_arithmetic'] = function(block: any) { 
    const op = block.getFieldValue('OP'); 
    const a = arduinoGenerator.valueToCode(block, 'A', 0) || '0'; 
    const b = arduinoGenerator.valueToCode(block, 'B', 0) || '0'; 
    switch (op) {
      case 'ADD': return [`(${a} + ${b})`, 0];
      case 'MINUS': return [`(${a} - ${b})`, 0];
      case 'MULTIPLY': return [`(${a} * ${b})`, 0];
      case 'DIVIDE': return [`(${a} / ${b})`, 0];
      case 'POWER': return [`pow(${a}, ${b})`, 0]; // 아두이노의 pow() 함수 사용
      default: return ['0', 0];
    }
  };

  // 3) 랜덤 정수 블록 (아두이노 random 함수)
  arduinoGenerator.forBlock['math_random_int'] = function(block: any) { 
    const from = arduinoGenerator.valueToCode(block, 'FROM', 0) || '0'; 
    const to = arduinoGenerator.valueToCode(block, 'TO', 0) || '0'; 
    // 아두이노 random(min, max) 함수는 max 값을 포함하지 않으므로 +1 처리
    return [`random(${from}, ${to} + 1)`, 0]; 
  };


  // --- 기존 Custom 블록 제너레이터 ---
  
  arduinoGenerator.forBlock['arduino_math_abs'] = function(block: any) { 
    return[`abs(${arduinoGenerator.valueToCode(block, 'NUM', 0) || '0'})`, 0]; 
  };
  
  arduinoGenerator.forBlock['arduino_math_map'] = function(block: any) { 
    const val = arduinoGenerator.valueToCode(block, 'VAL', 0) || '0'; 
    const fl = arduinoGenerator.valueToCode(block, 'FROMLOW', 0) || '0'; 
    const fh = arduinoGenerator.valueToCode(block, 'FROMHIGH', 0) || '1023'; 
    const tl = arduinoGenerator.valueToCode(block, 'TOLOW', 0) || '0'; 
    const th = arduinoGenerator.valueToCode(block, 'TOHIGH', 0) || '255'; 
    return[`map(${val}, ${fl}, ${fh}, ${tl}, ${th})`, 0]; 
  };
  
  arduinoGenerator.forBlock['smarty_math_in_range'] = function(block: any) { 
    const val = arduinoGenerator.valueToCode(block, 'VAL', 0) || '0'; 
    const min = arduinoGenerator.valueToCode(block, 'MIN', 0) || '0'; 
    const max = arduinoGenerator.valueToCode(block, 'MAX', 0) || '100'; 
    return[`(${val} >= ${min} && ${val} <= ${max})`, 0]; 
  };
  
  arduinoGenerator.forBlock['arduino_math_minmax'] = function(block: any) { 
    const a = arduinoGenerator.valueToCode(block, 'A', 0) || '0'; 
    const b = arduinoGenerator.valueToCode(block, 'B', 0) || '0'; 
    const op = block.getFieldValue('OP'); 
    return[`${op}(${a}, ${b})`, 0]; 
  };
}