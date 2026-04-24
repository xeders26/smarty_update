/*================
  src/renderer/blockly/smartyBlocks.ts
=================*/

import { initMathBlocks } from './mathBlocks';
import { initBaseBlocks } from './baseBlocks';
import { initMotorBlocks } from './motorBlocks';
import { initSensorBlocks } from './sensorBlocks';
import { initLedBlocks } from './ledBlocks';
import { initBluetoothBlocks } from './bluetoothBlocks';
import { initTextBlocks } from './textBlocks';
import { initVariableBlocks } from './variableBlocks';
import { initLogicLoopBlocks } from './logicLoopBlocks';
import { initFunctionBlocks } from './functionBlocks';
import { initTimeBlocks } from './timeBlocks';
import { initIoBlocks } from './ioBlocks';

export function initSmartyBlocks(arduinoGenerator: any) {
  
  // 0. 아두이노 핵심 시스템 장착! (가장 중요)
//  initArduinoBlocks(arduinoGenerator);
  initIoBlocks(arduinoGenerator);

  // 1. 커스텀 블록 부대들 호출

  initBaseBlocks(arduinoGenerator);
  initMathBlocks(arduinoGenerator);
  initMotorBlocks(arduinoGenerator);
  initSensorBlocks(arduinoGenerator);
  initLedBlocks(arduinoGenerator);
  initBluetoothBlocks(arduinoGenerator);

  // 👇 2. 기본 표준 블록 부대들 호출
  initTextBlocks(arduinoGenerator);
  initVariableBlocks(arduinoGenerator);
  initLogicLoopBlocks(arduinoGenerator);
  initFunctionBlocks(arduinoGenerator);
  initTimeBlocks(arduinoGenerator);

  console.log("🚀 스마티 로봇의 모든 카테고리 블록 장전 완벽 완료!");
}