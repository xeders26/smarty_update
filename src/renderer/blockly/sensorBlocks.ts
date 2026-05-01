import * as Blockly from 'blockly';

export function initSensorBlocks(arduinoGenerator: any) {
  // ==========================================
  // [모양 정의]
  // ==========================================
  Blockly.Blocks['smarty_switch'] = { init: function(this: any) { this.appendDummyInput().appendField("🔘 스위치").appendField(new Blockly.FieldDropdown([["SW1 (왼쪽)","SW1"],["SW2 (오른쪽)","SW2"]]), "SW").appendField("가 눌렸는가?"); this.setOutput(true, "Boolean"); this.setColour(60); } };
  Blockly.Blocks['smarty_sensor'] = { init: function(this: any) { this.appendDummyInput().appendField("🔍 일반 센서값 읽기:").appendField(new Blockly.FieldDropdown([["초음파 거리(cm)", "getSonar()"],["소리 크기(Mic)", "getMic()"],["빛 밝기(Light)", "getLight()"],["바닥 IR 1번", "getIR(1)"],["바닥 IR 2번", "getIR(2)"],["바닥 IR 3번", "getIR(3)"],["바닥 IR 4번", "getIR(4)"],["바닥 IR 5번", "getIR(5)"],["아날로그 핀 1번", "readAdc(1)"],["디지털 핀 1번", "readDIO(1,0)"]]), "SENSOR"); this.setOutput(true, "Number"); this.setColour(60); } };
  Blockly.Blocks['smarty_adv_sensor_init'] = { init: function(this: any) { this.appendDummyInput().appendField("🛠️ 확장 센서 시작하기").appendField(new Blockly.FieldDropdown([["🎨 컬러 센서", "beginColorSensor()"],["🧭 자이로 센서", "beginGyroSensor()"],["📏 거리 센서", "beginRangeSensor()"],["🚗 범퍼 보드", "beginBumperSensor()"]]), "FUNC"); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(60); } };
  Blockly.Blocks['smarty_adv_sensor_read'] = { init: function(this: any) { this.appendDummyInput().appendField("📡 확장 센서값 읽기:").appendField(new Blockly.FieldDropdown([["🎨 컬러 색상번호", "getColorNumber()"],["🎨 컬러 Red", "getColorRed()"],["🎨 컬러 Green", "getColorGreen()"],["🎨 컬러 Blue", "getColorBlue()"],["🧭 자이로 방향각도", "getGyroDgree()"],["🧭 자이로 절대각도", "getGyroAbsolute()"],["🧭 자이로 X축", "getGyroAxisX()"],["🧭 자이로 Y축", "getGyroAxisY()"],["🧭 자이로 Z축", "getGyroAxisZ()"],["📏 초음파(I2C) 거리", "getRangeUltrasonic()"],["📏 광학(I2C) 거리", "getRangeOptical()"]]), "FUNC"); this.setOutput(true, "Number"); this.setColour(60); } };
  Blockly.Blocks['smarty_gyro_action'] = { init: function(this: any) { this.appendDummyInput().appendField("🧭 자이로 센서").appendField(new Blockly.FieldDropdown([["현재 방향을 0도로 저장", "saveGyroInit()"],["0도 리셋", "setGyroInit()"]]), "FUNC"); this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(60); } };
  Blockly.Blocks['smarty_bumper_read'] = { init: function(this: any) { this.appendDummyInput().appendField("🚗 범퍼 센서값 읽기:").appendField(new Blockly.FieldDropdown([["좌측 근접", "getBumperLeftPrx()"],["우측 근접", "getBumperRightPrx()"],["좌측 라인", "getBumperLeftLine()"],["우측 라인", "getBumperRightLine()"],["좌측 근접(아날로그)", "getBumperLeftPrxAnalog()"],["우측 근접(아날로그)", "getBumperRightPrxAnalog()"],["좌측 라인(아날로그)", "getBumperLeftLineAnalog()"],["우측 라인(아날로그)", "getBumperRightLineAnalog()"]] ), "FUNC"); this.setOutput(true, "Number"); this.setColour(60); } };

  // 🌟 입력 칸이 없어서 그대로 유지해도 되는 블록들
  Blockly.defineBlocksWithJsonArray([
    { "type": "getAdc", "message0": "아날로그 읽기 CH: %1", "args0":[{"type": "field_dropdown", "name": "CH", "options": [["A1", "A1"],["A2", "A2"],["A3", "A3"],["A4", "A4"],["A5", "A5"],["A6", "A6"],["A7", "A7"],["A8", "A8"]]}], "output": "Number", "colour": 120 },
    { "type": "readDIO", "message0": "디지털 읽기 CH: %1", "args0":[{"type": "field_dropdown", "name": "CH", "options": [["D1", "D1"], ["D2", "D2"],["D3", "D3"],["D4", "D4"], ["D5", "D5"],["D6", "D6"],["D7", "D7"], ["D8", "D8"]]}], "output": ["Number", "Boolean"], "colour": 120 },
    { "type": "readSw", "message0": "스위치 상태 읽기 ID: %1", "args0":[{"type": "field_dropdown", "name": "ID", "options": [["SW1", "SW1"], ["SW2", "SW2"]]}], "output": ["Number", "Boolean"], "colour": 60 },
    { "type": "waitUntilSw", "message0": "스위치 대기 ID: %1 상태: %2", "args0":[ {"type": "field_dropdown", "name": "ID", "options": [["SW1", "SW1"], ["SW2", "SW2"]]}, {"type": "field_dropdown", "name": "STATE", "options": [["누름", "ON"],["뗌", "OFF"]]} ], "previousStatement": null, "nextStatement": null, "colour": 60 },
    { "type": "initBump", "message0": "범퍼 센서 초기화", "previousStatement": null, "nextStatement": null, "colour": 30 }
  ]);

  // 🌟 [수정됨] 입력 칸이 있는 블록들은 섀도우(기본값)를 적용하기 위해 JS로 분리
  Blockly.Blocks['waitUntilAdc'] = {
    init: function(this: any) {
      this.appendDummyInput()
          .appendField("아날로그 대기 CH:")
          .appendField(new Blockly.FieldDropdown([["A1", "A1"],["A2", "A2"],["A3", "A3"],["A4", "A4"],["A5", "A5"],["A6", "A6"],["A7", "A7"],["A8", "A8"]]), "CH")
          .appendField("조건:")
          .appendField(new Blockly.FieldDropdown([["==", "\"==\""],[">", "\">\""],[">=", "\">=\""],["<", "\"<\""],["<=", "\"<=\""]]), "COM")
          .appendField("값:");
      const valInput = this.appendValueInput("VAL").setCheck("Number");
      valInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">500</field></shadow>')); // 기본값 500
      
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
    }
  };

  Blockly.Blocks['getSw'] = {
    init: function(this: any) {
      this.appendDummyInput()
          .appendField("스위치 눌림 확인(시간) ID:")
          .appendField(new Blockly.FieldDropdown([["SW1", "SW1"],["SW2", "SW2"]]), "ID")
          .appendField("대기시간(ms):");
      const intervalInput = this.appendValueInput("INTERVAL").setCheck("Number");
      intervalInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">50</field></shadow>')); // 기본값 50
      
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(60);
    }
  };

  Blockly.Blocks['findBumpLine'] = {
    init: function(this: any) {
      const posInput = this.appendValueInput("POS").setCheck("Number").appendField("범퍼 라인 감지(기본) POS:");
      posInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">1</field></shadow>')); // 기본값 1
      
      const lineInput = this.appendValueInput("LINE").setCheck("Number").appendField("LINE:");
      lineInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">500</field></shadow>')); // 기본값 500
      
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(30);
    }
  };

  Blockly.Blocks['findBumpObject'] = {
    init: function(this: any) {
      const posInput = this.appendValueInput("POS").setCheck("Number").appendField("범퍼 장애물 감지(기본) POS:");
      posInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">1</field></shadow>')); // 기본값 1
      
      const distInput = this.appendValueInput("DIST").setCheck("Number").appendField("DIST:");
      distInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">100</field></shadow>')); // 기본값 100
      
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(30);
    }
  };

  Blockly.Blocks['getBumpDistance'] = {
    init: function(this: any) {
      const posInput = this.appendValueInput("POS").setCheck("Number").appendField("범퍼 거리값 읽기(기본) POS:");
      posInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">1</field></shadow>')); // 기본값 1
      
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(30);
    }
  };

  Blockly.Blocks['getBumpLine'] = {
    init: function(this: any) {
      const posInput = this.appendValueInput("POS").setCheck("Number").appendField("범퍼 라인값 읽기(기본) POS:");
      posInput.connection.setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">1</field></shadow>')); // 기본값 1
      
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour(30);
    }
  };

  // ==========================================
  // [C++ 제너레이터]
  // ==========================================
  arduinoGenerator.forBlock['smarty_switch'] = function(block: any) { return[`readSw(${block.getFieldValue('SW')})`, 0]; };
  arduinoGenerator.forBlock['smarty_sensor'] = function(block: any) { return[`${block.getFieldValue('SENSOR')}`, 0]; };
  arduinoGenerator.forBlock['smarty_adv_sensor_init'] = function(block: any) { return `${block.getFieldValue('FUNC')};\n`; };
  arduinoGenerator.forBlock['smarty_adv_sensor_read'] = function(block: any) { return[`${block.getFieldValue('FUNC')}`, 0]; };
  arduinoGenerator.forBlock['smarty_gyro_action'] = function(block: any) { return `${block.getFieldValue('FUNC')};\n`; };
  arduinoGenerator.forBlock['smarty_bumper_read'] = function(block: any) { return[`${block.getFieldValue('FUNC')}`, 0]; };

  arduinoGenerator.forBlock['getAdc'] = function(block: any) { return [`readAdc(${block.getFieldValue('CH')})`, 0]; };
  arduinoGenerator.forBlock['waitUntilAdc'] = function(block: any) { const val = arduinoGenerator.valueToCode(block, 'VAL', 0) || '0'; return `waitUntilAdc(${block.getFieldValue('CH')}, ${block.getFieldValue('COM')}, ${val});\n`; };
  arduinoGenerator.forBlock['readDIO'] = function(block: any) { return[`readDIO(${block.getFieldValue('CH')})`, 0]; };
  arduinoGenerator.forBlock['getSw'] = function(block: any) { const interval = arduinoGenerator.valueToCode(block, 'INTERVAL', 0) || '50'; return [`getSw(${block.getFieldValue('ID')}, ${interval})`, 0]; };
  arduinoGenerator.forBlock['readSw'] = function(block: any) { return[`readSw(${block.getFieldValue('ID')})`, 0]; };
  arduinoGenerator.forBlock['waitUntilSw'] = function(block: any) { return `waitUntilSw(${block.getFieldValue('ID')}, ${block.getFieldValue('STATE')});\n`; };
  
  arduinoGenerator.forBlock['initBump'] = function(block: any) { return `initBump();\n`; };
  arduinoGenerator.forBlock['findBumpLine'] = function(block: any) { const pos = arduinoGenerator.valueToCode(block, 'POS', 0) || '0'; const line = arduinoGenerator.valueToCode(block, 'LINE', 0) || '0'; return [`findBumpLine(${pos}, ${line})`, 0]; };
  arduinoGenerator.forBlock['findBumpObject'] = function(block: any) { const pos = arduinoGenerator.valueToCode(block, 'POS', 0) || '0'; const dist = arduinoGenerator.valueToCode(block, 'DIST', 0) || '0'; return [`findBumpObject(${pos}, ${dist})`, 0]; };
  arduinoGenerator.forBlock['getBumpDistance'] = function(block: any) { const pos = arduinoGenerator.valueToCode(block, 'POS', 0) || '0'; return [`getBumpDistance(${pos})`, 0]; };
  arduinoGenerator.forBlock['getBumpLine'] = function(block: any) { const pos = arduinoGenerator.valueToCode(block, 'POS', 0) || '0'; return[`getBumpLine(${pos})`, 0]; };
}