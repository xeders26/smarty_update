/*================
  src/renderer/blockly/ledBlocks.ts
=================*/
import * as Blockly from 'blockly';

export function initLedBlocks(arduinoGenerator: any) {
  // =========================================================================
  // 🧱[모양 정의]
  // =========================================================================
  
  // 💡 7. 내장 LED (모두 추가)
  Blockly.Blocks['smarty_led'] = { 
    init: function(this: any) { 
      this.appendDummyInput()
          .appendField("💡 내장 LED")
          .appendField(new Blockly.FieldDropdown([["LED1","LED1"],["LED2","LED2"], ["모두","ALL"]]), "ID")
          .appendField(new Blockly.FieldDropdown([["켜기(ON)","ON"], ["끄기(OFF)","OFF"],["상태 반전(Toggle)","TOGGLE"]]), "ACT"); 
      this.setPreviousStatement(true, null); 
      this.setNextStatement(true, null); 
      this.setColour(330); 
    } 
  };
  
  // 💡 8 & 9. 내장LED깜빡이기 (기본값 추가)
  Blockly.Blocks['smarty_led_blink'] = { 
    init: function(this: any) { 
      this.appendDummyInput()
          .appendField("💡 내장LED깜빡이기")
          .appendField(new Blockly.FieldDropdown([["LED1","LED1"], ["LED2","LED2"], ["모두","ALL"]]), "ID"); 
      
      const onTimeInput = this.appendValueInput("ON_T").setCheck("Number").appendField("켜짐(ms)"); 
      onTimeInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">500</field></shadow>')); // 기본값 500
      
      const offTimeInput = this.appendValueInput("OFF_T").setCheck("Number").appendField("꺼짐(ms)"); 
      offTimeInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">500</field></shadow>')); // 기본값 500
      
      const cntInput = this.appendValueInput("CNT").setCheck("Number").appendField("반복횟수(0은 무한)"); 
      cntInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">0</field></shadow>')); // 기본값 0
      
      this.setInputsInline(true); 
      this.setPreviousStatement(true, null); 
      this.setNextStatement(true, null); 
      this.setColour(330); 
    } 
  };
 
  // 🚨 3. 범퍼 LED 깜빡이기 (기본값 추가)
  Blockly.Blocks['smarty_bumper_blink'] = {
    init: function(this: any) {
      this.appendDummyInput()
          .appendField("🚨 범퍼 LED 깜빡이기")
          .appendField("방향:")
          .appendField(new Blockly.FieldDropdown([
            ["모두 (양쪽)", "ALL"],["왼쪽", "LEFT"], 
            ["오른쪽", "RIGHT"]
          ]), "DIR")
          .appendField("색상:")
          .appendField(new Blockly.FieldDropdown([
            ["흰색", "WHITE"],
            ["노랑", "YELLOW"],
            ["전부", "ALL_COLORS"] 
          ]), "COLOR")
          .appendField("동작:")
          .appendField(new Blockly.FieldDropdown([
            ["켜기", "1"], 
            ["끄기", "0"]
          ]), "STATE");
          
      const timeInput = this.appendValueInput("TIME").setCheck("Number").appendField("간격(ms):");
      timeInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">500</field></shadow>')); // 기본값 500
      
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30); 
      this.setTooltip("범퍼 센서의 LED를 원하는 방향/색상으로 깜빡이게 하거나 깜빡임을 끕니다.");
    }
  };

  // 🚨 4. 범퍼 빨강색 LED 동작 추가
  Blockly.Blocks['smarty_bumper_red'] = {
    init: function(this: any) {
      this.appendDummyInput()
          .appendField("🚨 범퍼 빨강색 LED")
          .appendField("동작:")
          .appendField(new Blockly.FieldDropdown([["켜기", "1"], ["끄기", "0"]]), "STATE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    }
  };

  // 🚨 5. 범퍼 빨강색 LED 깜빡이기 (기본값 추가)
  Blockly.Blocks['smarty_bumper_red_blink'] = {
    init: function(this: any) {
      this.appendDummyInput()
          .appendField("🚨 범퍼 빨강색 LED 깜빡이기")
          .appendField("동작:")
          .appendField(new Blockly.FieldDropdown([
            ["켜기", "1"], 
            ["끄기", "0"]
          ]), "STATE");
          
      const timeInput = this.appendValueInput("TIME").setCheck("Number").appendField("간격(ms):");
      timeInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">500</field></shadow>')); // 기본값 500
      
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    }
  };

  // 🚨 6. 범퍼 LED 모두 끄기 추가
  Blockly.Blocks['smarty_bumper_all_off'] = {
    init: function(this: any) {
      this.appendDummyInput()
          .appendField("🚨 범퍼 LED 모두 끄기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
    }
  };

  // 🔘 10. 스위치 기다리기 블록 추가
  Blockly.Blocks['smarty_switch_wait'] = {
    init: function(this: any) {
      this.appendDummyInput()
          .appendField("🔘 스위치 기다리기")
          .appendField(new Blockly.FieldDropdown([
            ["SW1", "1"],["SW2", "2"],
            ["SW1 또는 SW2", "EITHER"],
            ["모두", "BOTH"]
          ]), "SW")
          .appendField("상태")
          .appendField(new Blockly.FieldDropdown([
            ["눌릴 때까지", "1"],
            ["뗄 때까지", "0"]
          ]), "STATE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
    }
  };

  // 🚨 2. 범퍼 LED에서 색상 빨강 제외 & 전부 추가 (Json 방식)
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "turnBumpLED",
      "message0": "🚗 범퍼 LED 방향: %1 색상: %2 동작: %3",
      "args0":[
        {
          "type": "field_dropdown",
          "name": "DIR",
          "options": [["왼쪽", "0"], ["오른쪽", "1"], ["양쪽", "2"]]
        },
        {
          "type": "field_dropdown",
          "name": "COLOR",
          "options": [["흰색", "0"], ["노랑색", "1"],["전부", "3"]]
        },
        {
          "type": "field_dropdown",
          "name": "STATE",
          "options": [["켜기", "1"], ["끄기", "0"]]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 30
    }
  ]);

  // =========================================================================
  // ⚙️ [C++ 제너레이터]
  // =========================================================================

  arduinoGenerator.forBlock['smarty_led'] = function(block: any) { 
    const id = block.getFieldValue('ID'); 
    const act = block.getFieldValue('ACT'); 
    if (id === 'ALL') {
      if (act === "TOGGLE") return `toggleLed(LED1);\ntoggleLed(LED2);\n`; 
      return `turnLed(LED1, ${act});\nturnLed(LED2, ${act});\n`; 
    } else {
      if (act === "TOGGLE") return `toggleLed(${id});\n`; 
      return `turnLed(${id}, ${act});\n`; 
    }
  };

  arduinoGenerator.forBlock['smarty_led_blink'] = function(block: any) { 
    const id = block.getFieldValue('ID'); 
    const onT = arduinoGenerator.valueToCode(block, 'ON_T', 0) || '500'; 
    const offT = arduinoGenerator.valueToCode(block, 'OFF_T', 0) || '500'; 
    const cnt = arduinoGenerator.valueToCode(block, 'CNT', 0) || '0'; 
    
    if (id === 'ALL') {
      if (cnt === '0') return `blinkLed(LED1, ${onT}, ${offT});\nblinkLed(LED2, ${onT}, ${offT});\n`; 
      return `blinkCntLed(LED1, ${onT}, ${offT}, ${cnt});\nblinkCntLed(LED2, ${onT}, ${offT}, ${cnt});\n`; 
    } else {
      if (cnt === '0') return `blinkLed(${id}, ${onT}, ${offT});\n`; 
      return `blinkCntLed(${id}, ${onT}, ${offT}, ${cnt});\n`; 
    }
  };

  arduinoGenerator.forBlock['turnBumpLED'] = function(block: any) { 
    const dir = block.getFieldValue('DIR');
    const color = block.getFieldValue('COLOR');
    const state = block.getFieldValue('STATE');
    
    let code = '';
    
    if (color === '1') { // 노랑
      if (dir === '0') code = `turnBumperLeftY(${state});\n`;
      else if (dir === '1') code = `turnBumperRightY(${state});\n`;
      else code = `turnBumperLeftY(${state});\nturnBumperRightY(${state});\n`; 
    } else if (color === '3') { // 전부 (흰색 + 노랑, 빨강은 제외된 상태)
      if (dir === '0') code = `turnBumperLeftY(${state});\nturnBumperW(${state});\n`;
      else if (dir === '1') code = `turnBumperRightY(${state});\nturnBumperW(${state});\n`;
      else code = `turnBumperLeftY(${state});\nturnBumperRightY(${state});\nturnBumperW(${state});\n`; 
    } else if (color === '0') { // 흰색
      code = `turnBumperW(${state});\n`;
    }
    
    return code; 
  };

  arduinoGenerator.forBlock['smarty_bumper_red'] = function(block: any) {
    const state = block.getFieldValue('STATE');
    return `turnBumperR(${state});\n`;
  };

  // 🚨 5. 범퍼 빨강색 LED 깜빡이기 C++ 제너레이터
  arduinoGenerator.forBlock['smarty_bumper_red_blink'] = function(block: any) {
    const state = block.getFieldValue('STATE'); // '1'(켜기) 또는 '0'(끄기)
    const time = arduinoGenerator.valueToCode(block, 'TIME', 0) || '500';

    let code = '';
    
    // 켤 때는 깜빡임 속도를 먼저 설정해주고 켭니다.
    if (state === '1') {
      code += `setBumperBlinkR(${time});\n`;
    }
    
    // 켜거나 끕니다.
    code += `turnBumperBlinkR(${state});\n`;

    return code;
  };

  arduinoGenerator.forBlock['smarty_bumper_all_off'] = function(block: any) {
    return `turnBumperAllOff();\nturnBumperBlinkLeftY(0);\nturnBumperBlinkRightY(0);\nturnBumperBlinkW(0);\nturnBumperBlinkR(0);\n`;
  };

  // 🚨 3. 범퍼 LED 깜빡이기 C++ 제너레이터 (켜기/끄기 완벽 적용)
  arduinoGenerator.forBlock['smarty_bumper_blink'] = function(block: any) {
    const dir = block.getFieldValue('DIR');
    const color = block.getFieldValue('COLOR');
    const state = block.getFieldValue('STATE'); // '1'(켜기) 또는 '0'(끄기)
    const time = arduinoGenerator.valueToCode(block, 'TIME', 0) || '500';

    let code = '';

    // 🟡 노랑색 제어
    if (color === 'YELLOW' || color === 'ALL_COLORS') {
      if (state === '1') code += `setBumperBlinkY(${time});\n`; // 켤 때만 시간 설정
      
      if (dir === 'ALL' || dir === 'LEFT') {
        code += `turnBumperBlinkLeftY(${state});\n`;
      }
      if (dir === 'ALL' || dir === 'RIGHT') {
        code += `turnBumperBlinkRightY(${state});\n`;
      }
    }

    // ⚪ 흰색 제어
    if (color === 'WHITE' || color === 'ALL_COLORS') {
      if (state === '1') code += `setBumperBlinkW(${time});\n`;
      code += `turnBumperBlinkW(${state});\n`;
    }

    // 🔴 전부(ALL_COLORS)일 경우 빨강색 추가 제어
    if (color === 'ALL_COLORS') {
      if (state === '1') code += `setBumperBlinkR(${time});\n`;
      code += `turnBumperBlinkR(${state});\n`;
    }

    return code;
  };
  
  // 🔘 10. 스위치 대기 C++ 제너레이터 (C++ 논리 완벽 구현!)
  arduinoGenerator.forBlock['smarty_switch_wait'] = function(block: any) {
    const sw = block.getFieldValue('SW');
    const state = block.getFieldValue('STATE');
    
    // 눌릴 때까지(1) -> 스위치 값이 1이 아닐 때까지 계속 delay
    // 뗄 때까지(0) -> 스위치 값이 0이 아닐 때까지 계속 delay
    if (sw === 'EITHER') { // 둘 중 하나라도 만족하면 탈출 (De Morgan의 법칙)
      return `while(readSw(1) != ${state} && readSw(2) != ${state}) { delay(1); }\n`;
    } else if (sw === 'BOTH') { // 둘 다 만족해야 탈출
      return `while(readSw(1) != ${state} || readSw(2) != ${state}) { delay(1); }\n`;
    } else { // 특정 스위치 하나
      return `while(readSw(${sw}) != ${state}) { delay(1); }\n`;
    }
  };
}