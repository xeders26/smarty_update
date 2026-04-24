/*===================================================================
  src/renderer/app/blocklySetup.ts (✨ 모듈화가 완료된 최종 클린 버전)
====================================================================*/
import * as Blockly from 'blockly';
import * as ko from 'blockly/msg/ko';
import '@blockly/block-plus-minus';
import { blocks as plusMinusBlocks } from '@blockly/block-plus-minus';
import { initSmartyBlocks } from '../blockly/smartyBlocks'; 
//import { initArduinoBlocks } from '../blockly/arduinoBlocks'; // 👈 [추가] 아두이노 블록 불러오기!

declare global {
  interface Window {
    api: any;
    openSerialMonitor: () => Promise<void>;
    closeSerialMonitor: () => Promise<void>;
    showSaveFilePicker: any;
  }
  interface Navigator {
    bluetooth: any;
  }
}
declare type BluetoothDevice = any;
declare type BluetoothRemoteGATTCharacteristic = any;

Blockly.setLocale(ko as any);

let arduinoPort: any = null;
let isSerialOpen = false;

if (plusMinusBlocks) {
  Object.keys(plusMinusBlocks).forEach((blockName) => {
    if (Blockly.registry.hasItem('block' as any, blockName)) {
      Blockly.registry.unregister('block' as any, blockName);
    }
  });
  Blockly.common.defineBlocks(plusMinusBlocks);
}

export const smartyTheme = Blockly.Theme.defineTheme('smartyTheme', {
  name: 'smartyTheme',
  base: Blockly.Themes.Classic,
  fontStyle: {
    family: "'Pretendard Variable', Pretendard, sans-serif",
    weight: '600', // 가독성을 위해 살짝 도톰한 SemiBold(600) 추천!
    size: 14       // 16은 조금 클 수 있어서 14 정도로 맞추면 깔끔합니다.
  }
});

// ==========================================
// 🌐 한글화 및 UI 텍스트 커스텀 (생략 없이 원본 유지)
// ==========================================
Blockly.Msg['CONTROLS_IF_MSG_IF'] = '? 만약';
Blockly.Msg['CONTROLS_IF_MSG_THEN'] = '라면';
Blockly.Msg['CONTROLS_IF_MSG_ELSEIF'] = '🤔 아니면 만약';
Blockly.Msg['CONTROLS_IF_MSG_ELSE'] = '🤷‍♂️ 아니면';
Blockly.Msg['TEXT_JOIN_TITLE_CREATEWITH'] = '글자에 글자 합하기';
Blockly.Msg['CONTROLS_REPEAT_TITLE'] = '%1 번 반복하기 (for)';
Blockly.Msg['CONTROLS_WHILEUNTIL_OPERATOR_WHILE'] = '조건이 참인 동안 반복 (while)';
Blockly.Msg['CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'] = '조건이 거짓인 동안 반복 (until)';
Blockly.Msg['LOGIC_BOOLEAN_TRUE'] = '참 (True)';
Blockly.Msg['LOGIC_BOOLEAN_FALSE'] = '거짓 (False)';
Blockly.Msg['LOGIC_OPERATION_AND'] = '그리고 (AND)';
Blockly.Msg['LOGIC_OPERATION_OR'] = '또는 (OR)';
Blockly.Msg['VARIABLES_DEFAULT_NAME'] = '정보';
Blockly.Msg['UNNAMED_KEY'] = '정보';
Blockly.Msg['PROCEDURES_BEFORE_PARAMS'] = '👇 아래 정보를 사용해서:';
Blockly.Msg['PROCEDURES_CALL_BEFORE_PARAMS'] = '👇 아래 정보를 사용해서:';
Blockly.Msg['PROCEDURES_DEFNORETURN_TITLE'] = '⚙️ 결과값 없는 블록 만들기 ➔ 이름:';
Blockly.Msg['PROCEDURES_DEFRETURN_TITLE'] = '⚙️ 결과값 있는 블록 만들기 ➔ 이름:';
Blockly.Msg['PROCEDURES_MUTATORCONTAINER_TITLE'] = '전달할 정보들';
Blockly.Msg['PROCEDURES_MUTATORCONTAINER_TOOLTIP'] = '이 함수에 새로운 정보를 추가, 삭제, 또는 순서를 바꿉니다.';
Blockly.Msg['PROCEDURES_MUTATORARG_TITLE'] = '정보 이름:';
Blockly.Msg['PROCEDURES_MUTATORARG_TOOLTIP'] = '함수에 전달할 정보를 하나 추가합니다.';
Blockly.Msg['PROCEDURES_DEF_DUPLICATE_WARNING'] = '⚠️ 경고: 이 함수에는 똑같은 이름의 정보가 있습니다.';
Blockly.Msg['PROCEDURES_DEFRETURN_RETURN'] = '결과값 ➔';
Blockly.Msg['PROCEDURES_IFRETURN_RETURN'] = '결과값 ➔';
Blockly.Msg['PROCEDURES_IFRETURN_TOOLTIP'] = '조건이 참이면, 함수를 끝내고 결과값을 돌려줍니다.';
Blockly.Msg['PROCEDURES_CREATE_DO'] = "'%1' 함수 만들기";
Blockly.Msg['DUPLICATE_BLOCK'] = '👯 복사하기';
Blockly.Msg['DELETE_BLOCK'] = '🗑️ 블록 삭제하기';
Blockly.Msg['DELETE_X_BLOCKS'] = '🗑️ %1개의 블록 모두 삭제하기';
Blockly.Msg['ADD_COMMENT'] = '💬 설명 달기';
Blockly.Msg['REMOVE_COMMENT'] = '설명 지우기';
Blockly.Msg['COLLAPSE_BLOCK'] = '➖ 블록 접기';
Blockly.Msg['COLLAPSE_ALL'] = '➖ 모든 블록 접기';
Blockly.Msg['EXPAND_BLOCK'] = '➕ 블록 펼치기';
Blockly.Msg['EXPAND_ALL'] = '➕ 모든 블록 펼치기';
Blockly.Msg['DISABLE_BLOCK'] = '🛑 블록 끄기 (실행 안 함)';
Blockly.Msg['ENABLE_BLOCK'] = '🟢 블록 켜기 (실행함)';
Blockly.Msg['HELP'] = '❓ 도움말';
Blockly.Msg['INLINE_INPUTS'] = '줄이기 (한 줄로)';
Blockly.Msg['EXTERNAL_INPUTS'] = '늘리기 (여러 줄로)';
Blockly.Msg['CLEAN_UP'] = '🧹 블록들 깔끔하게 정리하기';
Blockly.Msg['UNDO'] = '↩️ 실행 취소';
Blockly.Msg['REDO'] = '↪️ 다시 실행';
Blockly.Msg['RENAME_VARIABLE'] = '✏️ 변수 이름 바꾸기...';
Blockly.Msg['RENAME_VARIABLE_TITLE'] = "이 변수의 이름을 무엇으로 바꿀까요? '%1' ➔";
Blockly.Msg['DELETE_VARIABLE'] = "❌ '%1' 변수 삭제하기";
Blockly.Msg['DELETE_VARIABLE_CONFIRMATION'] = "'%2' 변수를 사용하는 %1개의 블록을 정말 삭제할까요?";
Blockly.Msg['VARIABLES_CREATE_GET'] = "📥 '%1' 가져오기 블록 만들기";
Blockly.Msg['VARIABLES_CREATE_SET'] = "📤 '%1' 정하기 블록 만들기";
Blockly.Msg['MATH_CHANGE_TITLE_ITEM'] = Blockly.Msg['VARIABLES_DEFAULT_NAME'];
Blockly.Msg['VARIABLES_SET_CREATE_GET'] = "📥 '%1' 가져오기 블록 만들기";
Blockly.Msg['VARIABLES_GET_CREATE_SET'] = "📤 '%1' 정하기 블록 만들기";
Blockly.Msg['VARIABLES_SET'] = '📦 %1 값을 %2 (으)로 정하기';
Blockly.Msg['MATH_CHANGE_TITLE'] = '📈 %1 값을 %2 만큼 바꾸기';
Blockly.Msg['NEW_VARIABLE'] = '➕ 변수 만들기...';
Blockly.Msg['NEW_STRING_VARIABLE'] = '➕ 문자열(글자) 변수 만들기...';
Blockly.Msg['NEW_NUMBER_VARIABLE'] = '➕ 숫자 변수 만들기...';
Blockly.Msg['NEW_COLOUR_VARIABLE'] = '➕ 색상 변수 만들기...';

const procedureBlocks =['procedures_defnoreturn', 'procedures_defreturn'];
procedureBlocks.forEach(blockType => {
  const blockDef = Blockly.Blocks[blockType];
  if (blockDef) {
    const originalOnChange = blockDef.onchange;
    blockDef.onchange = function(this: Blockly.Block, event: any) {
      if (originalOnChange) originalOnChange.call(this, event);
      this.inputList.forEach((input: Blockly.Input) => {
        input.fieldRow.forEach((field: any) => {
          if (field.getValue && field.getValue() === 'variable:') {
            field.setValue('정보:');
          }
        });
      });
    };
  }
});

// ==========================================
// ⚙️ 번역 엔진 (Generator) 초기 세팅
// ==========================================
export const arduinoGenerator = new Blockly.Generator('Arduino');

export function getSafeVarName(rawName: string) {
  return rawName.replace(/[^a-zA-Z0-9_가-힣]/g, '_');
}

;(arduinoGenerator as any).forBlock = Object.create(null);

arduinoGenerator.scrub_ = function(block: Blockly.Block, code: any, thisOnly: boolean) {
  if (Array.isArray(code)) return code;
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = thisOnly ? '' : arduinoGenerator.blockToCode(nextBlock);
  return code + nextCode;
};

// 👉 [핵심 수정] 타입스크립트 에러를 피하기 위해 any로 우회합니다!
arduinoGenerator.finish = function(code: string) {
  const definitions: string[] =[];
  const gen = arduinoGenerator as any; // 🌟 핵심: as any 추가!
  
  if (gen.definitions_) {
    for (let name in gen.definitions_) definitions.push(gen.definitions_[name]);
  }
  const includes: string[] =[];
  if (gen.includes_) {
    for (let name in gen.includes_) includes.push(gen.includes_[name]);
  }
  includes.push('#include "smartyLib.h"');

  const allHeaders = includes.join('\n') + '\n' + definitions.join('\n');
  return allHeaders + '\n\n' + code;
};

// ==========================================
// 🚀 [핵심] 모든 블록 모듈 장착!
// ==========================================
initSmartyBlocks(arduinoGenerator);
//initArduinoBlocks(arduinoGenerator); // 👈 [추가됨] 드디어 아두이노 블록들이 정상적으로 연결됩니다!

export { arduinoPort, isSerialOpen };