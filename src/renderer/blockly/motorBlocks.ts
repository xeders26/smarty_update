
/*================
  src/renderer/blockly/motorBlocks.ts
=================*/

import * as Blockly from 'blockly'

export function initMotorBlocks(arduinoGenerator: any) {
  // [모양 정의]
  Blockly.Blocks['mecanumDrive'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('메카넘 주행, 이동 방향')
        .appendField(
          new Blockly.FieldDropdown([
            ['앞으로 (N)', '0'],
            ['오른쪽 대각선 앞 (NE)', '1'],
            ['오른쪽으로 (E)', '2'],
            ['오른쪽 대각선 뒤 (SE)', '3'],
            ['뒤로 (S)', '4'],
            ['왼쪽 대각선 뒤 (SW)', '5'],
            ['왼쪽으로 (W)', '6'],
            ['왼쪽 대각선 앞 (NW)', '7'],
            ['제자리 우회전', '8'],
            ['제자리 좌회전', '9'],
            ['정지 (Stop)', '10']
          ]),
          'DIR'
        )

      this.appendValueInput('SPD').setCheck('Number').appendField('속도')

      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF5722') // 스마티 전용 컬러 (주황색 계열)
      this.setTooltip('스마티의 메카넘 휠을 지정한 방향과 속도(0~255)로 움직입니다.')
    }
  }

  Blockly.Blocks['smarty_servo'] = {
    init: function (this: any) {
      this.appendDummyInput()
        .appendField('📐 서보모터')
        .appendField(
          new Blockly.FieldDropdown([
            ['S1', 'S1'],
            ['S2', 'S2'],
            ['S3', 'S3'],
            ['S4', 'S4']
          ]),
          'ID'
        )
        .appendField(
          new Blockly.FieldDropdown([
            ['즉시이동', 'RUN'],
            ['힘 빼기(OFF)', 'OFF']
          ]),
          'ACT'
        )
      this.appendValueInput('ANGLE').setCheck('Number').appendField('각도')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(230)
    }
  }
  Blockly.Blocks['runDcMotor'] = {
    init: function (this: any) {
      this.appendDummyInput()
        .appendField('⚙️ DC모터')
        .appendField(
          new Blockly.FieldDropdown([
            ['M1', 'M1'],
            ['M2', 'M2'],
            ['M3', 'M3'],
            ['M4', 'M4']
          ]),
          'ID'
        )
        .appendField(
          new Blockly.FieldDropdown([
            ['회전(Run)', 'runMotor'],
            ['정지-부드럽게', 'stopOff'],
            ['정지-급제동', 'stopOn'],
            ['역회전(Reverse)', 'reverse']
          ]),
          'ACT'
        )
      this.appendValueInput('SPD').setCheck('Number').appendField('속도/목표')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(230)
    }
  }
  Blockly.Blocks['runDcMotor_acc'] = {
    init: function (this: any) {
      this.appendDummyInput()
        .appendField('⚙️ DC모터 가감속')
        .appendField(
          new Blockly.FieldDropdown([
            ['M1', 'M1'],
            ['M2', 'M2'],
            ['M3', 'M3'],
            ['M4', 'M4']
          ]),
          'ID'
        )
      this.appendValueInput('START').setCheck('Number').appendField('시작속도')
      this.appendValueInput('FINAL').setCheck('Number').appendField('목표속도')
      this.appendValueInput('STEP').setCheck('Number').appendField('증감량')
      this.appendValueInput('INTV').setCheck('Number').appendField('간격(ms)')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(230)
    }
  }

  Blockly.defineBlocksWithJsonArray([
    {
      type: 'accDecMotor',
      message0: '모터 가감속 ID: %1 시작속도: %2 최종속도: %3 변위: %4 간격: %5',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['M1', 'M1'],
            ['M2', 'M2'],
            ['M3', 'M3'],
            ['M4', 'M4']
          ]
        },
        { type: 'input_value', name: 'START_SPD', check: 'Number' },
        { type: 'input_value', name: 'FINAL_SPD', check: 'Number' },
        { type: 'input_value', name: 'STEP_SPD', check: 'Number' },
        { type: 'input_value', name: 'INTERVAL', check: 'Number' }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230
    },
    {
      type: 'reverseMotor',
      message0: '모터 역회전 ID: %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['M1', 'M1'],
            ['M2', 'M2'],
            ['M3', 'M3'],
            ['M4', 'M4']
          ]
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230
    },
    {
      type: 'runMotor',
      message0: '모터 구동 ID: %1 속도: %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['M1', 'M1'],
            ['M2', 'M2'],
            ['M3', 'M3'],
            ['M4', 'M4']
          ]
        },
        { type: 'input_value', name: 'SPD', check: 'Number' }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230
    },
    {
      type: 'stopMotor',
      message0: '모터 정지 ID: %1 제동타입: %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['M1', 'M1'],
            ['M2', 'M2'],
            ['M3', 'M3'],
            ['M4', 'M4']
          ]
        },
        {
          type: 'field_dropdown',
          name: 'TYPE',
          options: [
            ['BRAKE_ON', 'BRAKE_ON'],
            ['BRAKE_OFF', 'BRAKE_OFF']
          ]
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230
    },
    {
      type: 'waitAccDecMotor',
      message0: '모터 가감속 완료 대기 ID: %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['M1', 'M1'],
            ['M2', 'M2'],
            ['M3', 'M3'],
            ['M4', 'M4']
          ]
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230
    },
    {
      type: 'offServo',
      message0: '서보모터 끄기 ID: %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['S1', 'S1'],
            ['S2', 'S2'],
            ['S3', 'S3'],
            ['S4', 'S4']
          ]
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 180
    },
    {
      type: 'runServo',
      message0: '서보모터 구동 ID: %1 각도: %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['S1', 'S1'],
            ['S2', 'S2'],
            ['S3', 'S3'],
            ['S4', 'S4']
          ]
        },
        { type: 'input_value', name: 'DEG', check: 'Number', value:0}
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 180
    },
    {
      type: 'setupServo',
      message0: '서보모터 펄스폭 설정 ID: %1 0도: %2 180도: %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['S1', 'S1'],
            ['S2', 'S2'],
            ['S3', 'S3'],
            ['S4', 'S4']
          ]
        },
        { type: 'input_value', name: 'DEG0', check: 'Number', "fields": { "NUM": 0 }},
        { type: 'input_value', name: 'DEG180', check: 'Number' , "fields": { "NUM": 180 }}
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 180
    },
    {
      type: 'slowServo',
      message0: '서보모터 슬로우 ID: %1 시작각: %2 최종각: %3 단위: %4 간격: %5',
      args0: [
        {
          type: 'field_dropdown',
          name: 'ID',
          options: [
            ['S1', 'S1'],
            ['S2', 'S2'],
            ['S3', 'S3'],
            ['S4', 'S4']
          ]
        },
        { type: 'input_value', name: 'START', check: 'Number' , value:0},
        { type: 'input_value', name: 'FINAL', check: 'Number', value:180 },
        { type: 'input_value', name: 'STEP', check: 'Number' , value:1},
        { type: 'input_value', name: 'INTERVAL', check: 'Number', value:15 }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 180
    }
  ])

  // [C++ 제너레이터]
  arduinoGenerator.forBlock['mecanumDrive'] = function (block: any) {
    const dir = block.getFieldValue('DIR')
    const speed = arduinoGenerator.valueToCode(block, 'SPD', 0) || '150'
    return `driveMecanum(${dir}, ${speed});\n`
  }
  arduinoGenerator.forBlock['smarty_servo'] = function (block: any) {
    const id = block.getFieldValue('ID')
    const act = block.getFieldValue('ACT')
    const angle = arduinoGenerator.valueToCode(block, 'ANGLE', 0) || '90'
    if (act === 'OFF') return `offServo(${id});\n`
    return `runServo(${id}, ${angle});\n`
  }
  arduinoGenerator.forBlock['runDcMotor'] = function (block: any) {
    const id = block.getFieldValue('ID')
    const act = block.getFieldValue('ACT')
    const spd = arduinoGenerator.valueToCode(block, 'SPD', 0) || '0'
    if (act === 'runMotor') return `runMotor(${id}, ${spd});\n`
    if (act === 'stopOff') return `stopMotor(${id}, 0);\n`
    if (act === 'stopOn') return `stopMotor(${id}, 1);\n`
    return `reverseMotor(${id});\n`
  }
  arduinoGenerator.forBlock['runDcMotor_acc'] = function (block: any) {
    const id = block.getFieldValue('ID')
    const st = arduinoGenerator.valueToCode(block, 'START', 0) || '0'
    const fn = arduinoGenerator.valueToCode(block, 'FINAL', 0) || '255'
    const step = arduinoGenerator.valueToCode(block, 'STEP', 0) || '5'
    const intv = arduinoGenerator.valueToCode(block, 'INTV', 0) || '10'
    return `accDecMotor(${id}, ${st}, ${fn}, ${step}, ${intv});\n`
  }

  arduinoGenerator.forBlock['accDecMotor'] = function (block: any) {
    const id = block.getFieldValue('ID')
    const startSpd = arduinoGenerator.valueToCode(block, 'START_SPD', 0) || '0'
    const finalSpd = arduinoGenerator.valueToCode(block, 'FINAL_SPD', 0) || '0'
    const stepSpd = arduinoGenerator.valueToCode(block, 'STEP_SPD', 0) || '0'
    const interval = arduinoGenerator.valueToCode(block, 'INTERVAL', 0) || '0'
    return `accDecMotor(${id}, ${startSpd}, ${finalSpd}, ${stepSpd}, ${interval});\n`
  }
  arduinoGenerator.forBlock['reverseMotor'] = function (block: any) {
    return `reverseMotor(${block.getFieldValue('ID')});\n`
  }
  arduinoGenerator.forBlock['runMotor'] = function (block: any) {
    const spd = arduinoGenerator.valueToCode(block, 'SPD', 0) || '0'
    return `runMotor(${block.getFieldValue('ID')}, ${spd});\n`
  }
  arduinoGenerator.forBlock['stopMotor'] = function (block: any) {
    return `stopMotor(${block.getFieldValue('ID')}, ${block.getFieldValue('TYPE')});\n`
  }
  arduinoGenerator.forBlock['waitAccDecMotor'] = function (block: any) {
    return `waitAccDecMotor(${block.getFieldValue('ID')});\n`
  }
  arduinoGenerator.forBlock['offServo'] = function (block: any) {
    return `offServo(${block.getFieldValue('ID')});\n`
  }
  arduinoGenerator.forBlock['runServo'] = function (block: any) {
    const deg = arduinoGenerator.valueToCode(block, 'DEG', 0) || '0'
    return `runServo(${block.getFieldValue('ID')}, ${deg});\n`
  }
  arduinoGenerator.forBlock['setupServo'] = function (block: any) {
    const deg0 = arduinoGenerator.valueToCode(block, 'DEG0', 0) || '600'
    const deg180 = arduinoGenerator.valueToCode(block, 'DEG180', 0) || '2400'
    return `setupServo(${block.getFieldValue('ID')}, ${deg0}, ${deg180});\n`
  }
  arduinoGenerator.forBlock['slowServo'] = function (block: any) {
    const start = arduinoGenerator.valueToCode(block, 'START', 0) || '0'
    const finalDeg = arduinoGenerator.valueToCode(block, 'FINAL', 0) || '0'
    const step = arduinoGenerator.valueToCode(block, 'STEP', 0) || '1'
    const interval = arduinoGenerator.valueToCode(block, 'INTERVAL', 0) || '10'
    return `slowServo(${block.getFieldValue('ID')}, ${start}, ${finalDeg}, ${step}, ${interval});\n`
  }
}
