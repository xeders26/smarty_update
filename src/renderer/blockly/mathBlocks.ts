/*================
  src/renderer/blockly/mathBlocks.ts
=================*/
import * as Blockly from 'blockly';

export function initMathBlocks(arduinoGenerator: any) {
  // ==========================================
  // 1. Math 블록 모양 정의
  // ==========================================
  Blockly.Blocks['arduino_math_abs'] = { init: function(this: any) { this.appendValueInput("NUM").setCheck("Number").appendField("절댓값"); this.setInputsInline(true); this.setOutput(true, "Number"); this.setColour("%{BKY_MATH_HUE}"); } };
  Blockly.Blocks['arduino_math_map'] = { init: function(this: any) { this.appendValueInput("VAL").setCheck("Number").appendField("값"); this.appendValueInput("FROMLOW").setCheck("Number").appendField("을(를)["); this.appendValueInput("FROMHIGH").setCheck("Number").appendField("~"); this.appendValueInput("TOLOW").setCheck("Number").appendField("] 에서["); this.appendValueInput("TOHIGH").setCheck("Number").appendField("~"); this.appendDummyInput().appendField("] (으)로 변환 (map)"); this.setInputsInline(true); this.setOutput(true, "Number"); this.setColour("%{BKY_MATH_HUE}"); } };
  Blockly.Blocks['smarty_math_in_range'] = { init: function(this: any) { this.jsonInit({ "type": "smarty_math_in_range", "message0": "📏 %1 이(가) %2 부터 %3 사이인가?", "args0":[ { "type": "input_value", "name": "VAL", "check": "Number" }, { "type": "input_value", "name": "MIN", "check": "Number" }, { "type": "input_value", "name": "MAX", "check": "Number" } ], "inputsInline": true, "output": "Boolean", "colour": "%{BKY_MATH_HUE}" }); } };
  Blockly.Blocks['arduino_math_minmax'] = { init: function(this: any) { this.jsonInit({ "type": "arduino_math_minmax", "message0": "⚖️ %1 와(과) %2 중 %3", "args0":[ { "type": "input_value", "name": "A", "check": "Number" }, { "type": "input_value", "name": "B", "check": "Number" }, { "type": "field_dropdown", "name": "OP", "options": [["더 큰 값 (최댓값)", "max"],["더 작은 값 (최솟값)", "min"]] } ], "inputsInline": true, "output": "Number", "colour": "%{BKY_MATH_HUE}" }); } };

  // ==========================================
  // 2. Math 블록 C++ 제너레이터 연결
  // ==========================================
  arduinoGenerator.forBlock['arduino_math_abs'] = function(block: any) { return[`abs(${arduinoGenerator.valueToCode(block, 'NUM', 0) || '0'})`, 0]; };
  arduinoGenerator.forBlock['arduino_math_map'] = function(block: any) { const val = arduinoGenerator.valueToCode(block, 'VAL', 0) || '0'; const fl = arduinoGenerator.valueToCode(block, 'FROMLOW', 0) || '0'; const fh = arduinoGenerator.valueToCode(block, 'FROMHIGH', 0) || '1023'; const tl = arduinoGenerator.valueToCode(block, 'TOLOW', 0) || '0'; const th = arduinoGenerator.valueToCode(block, 'TOHIGH', 0) || '255'; return[`map(${val}, ${fl}, ${fh}, ${tl}, ${th})`, 0]; };
  arduinoGenerator.forBlock['smarty_math_in_range'] = function(block: any) { const val = arduinoGenerator.valueToCode(block, 'VAL', 0) || '0'; const min = arduinoGenerator.valueToCode(block, 'MIN', 0) || '0'; const max = arduinoGenerator.valueToCode(block, 'MAX', 0) || '100'; return[`(${val} >= ${min} && ${val} <= ${max})`, 0]; };
  arduinoGenerator.forBlock['arduino_math_minmax'] = function(block: any) { const a = arduinoGenerator.valueToCode(block, 'A', 0) || '0'; const b = arduinoGenerator.valueToCode(block, 'B', 0) || '0'; const op = block.getFieldValue('OP'); return[`${op}(${a}, ${b})`, 0]; };
}