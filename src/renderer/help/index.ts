import { BaseBlocksHelp } from './baseBlocksHelp';
import { BluetoothBlocksHelp } from './bluetoothBlocksHelp';
import { FunctionsBlocksHelp } from './functionsBlocksHelp';
import { IoBlocksHelp } from './ioBlocksHelp';
import { LedBlocksHelp } from './ledBlockshelp';  
import { LogicLoopBlocksHelp } from './logicLoopBlocksHelp';  
import { MathBlocksHelp } from './mathBlocksHelp';
import { MotorBlocksHelp } from './motorBlocksHelp';
import { SensorBlocksHelp } from './sensorBlocksHelp';
import { TextBlocksHelp } from './textBlocksHelp';
import { TimeBlocksHelp } from './timeBlocksHelp';

// 🌟 마지막 퍼즐! 변수 블록 도움말을 불러옵니다! (.ts 없음)
import { VariableBlocksHelp } from './variableBlocksHelp';

export const HelpData: Record<string, string> = {
  // 스마티 블록리 카테고리 전체 통합
  ...BaseBlocksHelp,
  ...BluetoothBlocksHelp,
  ...FunctionsBlocksHelp,
  ...IoBlocksHelp,
  ...LedBlocksHelp,
  ...LogicLoopBlocksHelp,
  ...MathBlocksHelp,
  ...MotorBlocksHelp,
  ...SensorBlocksHelp,
  ...TextBlocksHelp,
  ...TimeBlocksHelp,

  // 🌟 변수 블록 도움말 최종 합체 완료!
  ...VariableBlocksHelp,
};