/*==========================================================================
  src/renderer/blockly/variableBlocks.ts
  - 완벽 방어형 변수 블록 정의 및 C++ 생성기
  - 기존 시스템과의 충돌을 완벽히 격리하여, 어떤 상황에서도 안정적으로 작동하도록 설계되었습니다.
  - TypeScript 6.0.2, ESNext 모듈 시스템, 번들러 모듈 해상도, ESNext 타겟, lib.esnext.d.ts/lib.dom.d.ts/lib.dom.iterable.d.ts 포함
==========================================================================*/

import * as Blockly from 'blockly';
import { getSafeVarName } from '../app/blocklySetup';

export function initVariableBlocks(arduinoGenerator: any) {
  
  const defineBlockSafe = (name: string, def: any) => {
    if (Blockly.Blocks[name]) delete Blockly.Blocks[name];
    Blockly.Blocks[name] = def;
  };

  // =========================================================================
  // 🧱 1. 단일 마스터 블록 정의
  // =========================================================================
  const setBlockDef = {
    init: function(this: any) {
      this.appendValueInput('VALUE')
          .appendField('💾')
          .appendField(new Blockly.FieldVariable('정보'), 'VAR')
          .appendField('에 저장');
      this.setPreviousStatement(true, null); 
      this.setNextStatement(true, null); 
      this.setColour(330);
    },
    onchange: function(this: any, e: any) {
      if (!this.workspace || this.isInFlyout) return;
      if (this.workspace.isDragging()) return;

      if (e.type === Blockly.Events.BLOCK_CHANGE && e.blockId === this.id && e.name === 'VAR') {
        const varId = this.getFieldValue('VAR');
        const variableMap = this.workspace.getVariableMap();
        const variable = variableMap ? variableMap.getVariableById(varId) : this.workspace.getVariable(varId);
        
        if (variable) {
          const type = variable.type || '';
          const valueInput = this.getInput('VALUE');
          
          if (valueInput && valueInput.connection) {
            let shadowType = 'math_number';
            let fieldName = 'NUM';
            let fieldValue = '0';

            if (type === 'float') {
              fieldValue = '0.0';
            } else if (type === 'char') {
              shadowType = 'text'; fieldName = 'TEXT'; fieldValue = 'A';
            } else if (type.startsWith('char[') || type === 'string_array' || type === 'string') {
              shadowType = 'text'; fieldName = 'TEXT'; fieldValue = 'hello';
            } else if (type === 'boolean') {
              shadowType = 'logic_boolean'; fieldName = 'BOOL'; fieldValue = 'TRUE';
            }

            const shadowXml = `<shadow type="${shadowType}"><field name="${fieldName}">${fieldValue}</field></shadow>`;
            
            try {
              // 🌟 [수정] Blockly.Xml을 any로 캐스팅하여 textToDom 타입 에러 우회!
              const xmlAny = Blockly.Xml as any;
              const dom = (xmlAny && xmlAny.textToDom) ? xmlAny.textToDom(shadowXml) : Blockly.utils.xml.textToDom(shadowXml);
              
              valueInput.connection.setShadowDom(dom);
              
              const targetBlock = valueInput.connection.targetBlock();
              if (!targetBlock || targetBlock.isShadow()) {
                if (targetBlock) targetBlock.dispose(false); 
                setTimeout(() => {
                  if (valueInput.connection && typeof (valueInput.connection as any).respawnShadow_ === 'function') {
                    (valueInput.connection as any).respawnShadow_();
                  }
                }, 10);
              }
            } catch(err) {
              console.error("블록 변신 에러 방어 완료:", err);
            }
          }
        }
      }
    }
  };

  const getBlockDef = {
    init: function(this: any) {
      this.appendDummyInput().appendField('🗂️').appendField(new Blockly.FieldVariable('정보'), 'VAR').appendField('값');
      this.setOutput(true, null); this.setColour(330);
    }
  };

  const changeBlockDef = {
    init: function(this: any) {
      this.appendValueInput('DELTA').setCheck('Number').appendField('📈').appendField(new Blockly.FieldVariable('정보'), 'VAR').appendField('값을');
      this.appendDummyInput().appendField('만큼 더하기');
      this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(330);
    }
  };

  defineBlockSafe('smarty_variables_set', setBlockDef);
  defineBlockSafe('smarty_variables_get', getBlockDef);
  defineBlockSafe('smarty_variables_change', changeBlockDef);

  const legacyTypes =['int', 'float', 'char', 'string', 'boolean', 'string_array'];
  legacyTypes.forEach(t => {
    defineBlockSafe(`smarty_var_set_${t}`, setBlockDef);
    defineBlockSafe(`smarty_var_get_${t}`, getBlockDef);
    defineBlockSafe(`smarty_var_change_${t}`, changeBlockDef);
  });

  // =========================================================================
  // 🚀 2. C++ 변수 선언 생성기 (완벽 격리 및 중복 방지)
  // =========================================================================
  const originalInit = arduinoGenerator.init;
  arduinoGenerator.init = function(this: any, workspace: any) {
    if (originalInit) {
      try { originalInit.call(this, workspace); } catch(e) {}
    }
    
    if (!this.definitions_) this.definitions_ = Object.create(null);

    try {
      const variableMap = workspace.getVariableMap();
      const variables = variableMap ? variableMap.getAllVariables() : workspace.getAllVariables();
      
      let varCode = '// 📦 변수 선언\n';
      let hasVars = false;

      for (let i = 0; i < variables.length; i++) {
        const v = variables[i];
        const varName = v ? v.name : '';
        if (!varName || varName === '정보' || varName === '항목') continue;

        let safeName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
        if (this.nameDB_ && typeof this.nameDB_.getName === 'function') {
          safeName = this.nameDB_.getName(varName, Blockly.VARIABLE_CATEGORY_NAME);
        }

        const type = v.type || '';
        let cppDef = '';
        if (type === 'int') cppDef = `int ${safeName} = 0;`;
        else if (type === 'float') cppDef = `double ${safeName} = 0.0;`;
        else if (type === 'char') cppDef = `char ${safeName} = ' ';`;
        else if (type.startsWith('char[') || type === 'string_array' || type === 'string') {
          let len = '20';
          if (type.startsWith('char[')) len = type.replace('char[', '').replace(']', '');
          cppDef = `char ${safeName}[${len}] = "";`;
        }
        else if (type === 'boolean') cppDef = `bool ${safeName} = false;`;
        else cppDef = `int ${safeName} = 0;`; 

        varCode += cppDef + '\n';
        hasVars = true;
      }

      if (hasVars) this.definitions_['smarty_perfect_vars'] = varCode;
    } catch(e) {
      console.error("변수 초기화 중 에러 방어:", e);
    }
  };

  // =========================================================================
  // 🧹 2.5 C++ 최종 조립 단계: 쓰레기 코드(double 덩어리) 완벽 소각!
  // =========================================================================
  const originalFinish = arduinoGenerator.finish;
  arduinoGenerator.finish = function(this: any, code: string) {
    if (this.definitions_) {
      // 🌟 [수정] string[] 타입을 명시하여 TS never 배열 에러 완벽 해결!
      const rogueKeys: string[] =[];
      
      for (const key in this.definitions_) {
        if (key !== 'smarty_perfect_vars') {
          const defStr = this.definitions_[key];
          if (typeof defStr === 'string') {
            if (key === 'variables' || key.startsWith('var_') || defStr.includes('double 정보')) {
              rogueKeys.push(key);
            }
          }
        }
      }
      for (const k of rogueKeys) {
        delete this.definitions_[k];
      }
    }
    
    let finalCode = originalFinish ? originalFinish.call(this, code) : code;
    
    const badRegex = /\/\/\s*📦\s*변수 선언\n(?:double\s+[^\n]+;\n)+/g;
    finalCode = finalCode.replace(badRegex, '');

    return finalCode;
  };

  // =========================================================================
  // ⚙️ 3. 블록 동작 C++ 생성기 
  // =========================================================================
  const ORDER_ATOMIC = 0;
  const ORDER_ASSIGNMENT = 13;

  const getVariableSafe = (workspace: any, varId: string) => {
    const map = workspace.getVariableMap();
    return map ? map.getVariableById(varId) : workspace.getVariable(varId);
  };

  const generateSetCode = function(b: any) {
    try {
      const varId = b.getFieldValue('VAR');
      const variable = getVariableSafe(b.workspace, varId);
      const varName = variable ? variable.name : varId;
      if (!varName || varName === '정보' || varName === '항목') return '';
      
      let safeName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
      if (arduinoGenerator.nameDB_ && typeof arduinoGenerator.nameDB_.getName === 'function') {
        safeName = arduinoGenerator.nameDB_.getName(varName, Blockly.VARIABLE_CATEGORY_NAME);
      }
      const type = variable ? (variable.type || '') : '';
      
      let val = arduinoGenerator.valueToCode(b, 'VALUE', ORDER_ASSIGNMENT);
      if (!val) val = arduinoGenerator.valueToCode(b, 'DELTA', ORDER_ASSIGNMENT);
      if (!val) val = '0';

      if (type === 'char') {
        // 🛡️ [핵심 방어막] 값 안에 괄호 '()' 가 들어있으면 이것은 함수이므로 절대 자르지 않고 통째로 넘김!
        if (val.includes('()')) {
          return `  ${safeName} = ${val};\n`;
        } else {
          // 함수가 아닌 일반 문자열일 경우에만 양옆 따옴표 떼고 앞글자 하나만 추출!
          let cleanVal = val.replace(/^['"]|['"]$/g, '');
          if (!cleanVal) cleanVal = ' ';
          return `  ${safeName} = '${cleanVal.charAt(0)}';\n`;
        }
      }
      if (type.startsWith('char[') || type === 'string_array' || type === 'string') {
        let len = '20';
        if (type.startsWith('char[')) len = type.replace('char[', '').replace(']', '');
        return `  String(${val}).toCharArray(${safeName}, ${len});\n`;
      }
      return `  ${safeName} = ${val};\n`;
    } catch(err) {
      return `  // ⚠️ 변수 저장 에러 방어됨\n`;
    }
  };

  const generateGetCode = function(b: any) {
    try {
      const varId = b.getFieldValue('VAR');
      const variable = getVariableSafe(b.workspace, varId);
      const varName = variable ? variable.name : varId;
      if (!varName || varName === '정보' || varName === '항목') return['0', ORDER_ATOMIC];

      let safeName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
      if (arduinoGenerator.nameDB_ && typeof arduinoGenerator.nameDB_.getName === 'function') {
        safeName = arduinoGenerator.nameDB_.getName(varName, Blockly.VARIABLE_CATEGORY_NAME);
      }
      return [safeName, ORDER_ATOMIC];
    } catch(err) {
      return ['0', ORDER_ATOMIC];
    }
  };

  const generateChangeCode = function(b: any) {
    try {
      const varId = b.getFieldValue('VAR');
      const variable = getVariableSafe(b.workspace, varId);
      const varName = variable ? variable.name : varId;
      if (!varName || varName === '정보' || varName === '항목') return '';
      
      let safeName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
      if (arduinoGenerator.nameDB_ && typeof arduinoGenerator.nameDB_.getName === 'function') {
        safeName = arduinoGenerator.nameDB_.getName(varName, Blockly.VARIABLE_CATEGORY_NAME);
      }
      let val = arduinoGenerator.valueToCode(b, 'DELTA', ORDER_ASSIGNMENT);
      if (!val) val = arduinoGenerator.valueToCode(b, 'VALUE', ORDER_ASSIGNMENT);
      if (!val) val = '0';

      return `  ${safeName} += ${val};\n`;
    } catch(err) {
      return `  // ⚠️ 변수 더하기 에러 방어됨\n`;
    }
  };

  const mapGenerator = (name: string, func: any) => {
    if (!arduinoGenerator.forBlock) arduinoGenerator.forBlock = {};
    arduinoGenerator.forBlock[name] = func;
    arduinoGenerator[name] = func; 
  };

  mapGenerator('smarty_variables_set', generateSetCode);
  mapGenerator('smarty_variables_get', generateGetCode);
  mapGenerator('smarty_variables_change', generateChangeCode);

  legacyTypes.forEach(t => {
    mapGenerator(`smarty_var_set_${t}`, generateSetCode);
    mapGenerator(`smarty_var_get_${t}`, generateGetCode);
    mapGenerator(`smarty_var_change_${t}`, generateChangeCode);
  });

  mapGenerator('variables_set', generateSetCode);
  mapGenerator('variables_get', generateGetCode);
  mapGenerator('math_change', generateChangeCode);

  // =========================================================================
  // 🚨 [긴급 방어망] 엔진이 기본 그림자 블록을 번역하지 못하고 뻗는 현상 차단!
  // =========================================================================
  if (!arduinoGenerator.forBlock['math_number']) {
    arduinoGenerator.forBlock['math_number'] = function(b: any) {
      return[String(b.getFieldValue('NUM') || '0'), ORDER_ATOMIC];
    };
  }
  if (!arduinoGenerator.forBlock['text']) {
    arduinoGenerator.forBlock['text'] = function(b: any) {
      return['"' + String(b.getFieldValue('TEXT') || '') + '"', ORDER_ATOMIC];
    };
  }
  if (!arduinoGenerator.forBlock['logic_boolean']) {
    arduinoGenerator.forBlock['logic_boolean'] = function(b: any) {
      return[(b.getFieldValue('BOOL') === 'TRUE' ? 'true' : 'false'), ORDER_ATOMIC];
    };
  }
}