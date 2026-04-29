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
// 🚨 fetchSettingsFromGit 함수를 추가로 불러옵니다!
import { initRobotBlocks, fetchSettingsFromGit } from './robotBlocks';

// 🚨 비동기(다운로드) 작업을 기다려야 하므로 앞에 'async'를 붙여줍니다!
export async function initSmartyBlocks(arduinoGenerator: any) {
  
  console.log("🌐 서버(Git)에서 최신 로봇 설정값을 다운로드하는 중...");
  // 🚨 여기서 설정값을 다 받아올 때까지 다음 코드로 넘어가지 않고 기다립니다(await).
  await fetchSettingsFromGit();
  
  // 0. 아두이노 핵심 시스템 장착! (가장 중요)
  // initArduinoBlocks(arduinoGenerator);
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
  
  // 🚨 위에서 다운받은 최신 설정값이 이 시점에 로봇 블록에 완벽하게 쏙 들어갑니다!
  initRobotBlocks(arduinoGenerator);

  console.log("🚀 스마티 로봇의 모든 카테고리 블록 장전 완벽 완료!");
}