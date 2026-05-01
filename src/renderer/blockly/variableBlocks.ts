/*==========================================================================
  src/renderer/blockly/variableBlocks.ts
  - 커스텀 프롬프트 창(모달) 유지 & 문자열 길이 입력 분기
  - '선택' 변수 유지
  - 에러 유발 블록 삭제
  - 🌟 [완벽 해결] 숫자/문자열/불리안 절대 교차 대입 불가 (강력한 Type Checking)
==========================================================================*/

import * as Blockly from 'blockly';

export function initVariableBlocks(arduinoGenerator: any) {
  
  if (Blockly.Msg) {
    Blockly.Msg['VARIABLES_DEFAULT_NAME'] = '선택';
  }

  // =========================================================================
  // 🚨 [강력한 보안 검색대] 엄격한 타입 검사기 (Strict Connection Checker) 설치!
  // =========================================================================
  if (!(window as any).__patchedConnectionChecker) {
    (window as any).__patchedConnectionChecker = true;

    // 워크스페이스가 생성될 때마다 커스텀 체커를 주입하기 위해 패치
    const origInit = (Blockly.WorkspaceSvg.prototype as any).init;
    (Blockly.WorkspaceSvg.prototype as any).init = function(...args: any[]) {
      origInit.apply(this, args);
      
      // 블록리 기본 체커를 덮어씁니다.
       const originalDoTypeCheck = (this.connectionChecker as any).doTypeChecks.bind(this.connectionChecker);
      (this.connectionChecker as any).doTypeChecks = function(a: Blockly.Connection, b: Blockly.Connection) {
        // 기존 블록리 타입 체크 로직 실행
        const baseCheck = originalDoTypeCheck(a, b);
        if (!baseCheck) return false;

        // 추가 검사: 둘 중 하나의 check 배열이 비어있으면(null) 통과시키지만,
        // 둘 다 명시적인 타입이 있다면 엄격하게 비교합니다.
        const checkA = a.getCheck();
        const checkB = b.getCheck();

        if (checkA && checkB) {
          // 'Number', 'String', 'Boolean' 간의 교차 결합을 완벽 차단
          const strictTypes = ['Number', 'String', 'Boolean'];
          
          let aStrict = checkA.find(t => strictTypes.includes(t));
          let bStrict = checkB.find(t => strictTypes.includes(t));

          // 둘 다 엄격한 타입 중 하나를 가지고 있다면, 무조건 같아야만 결합 가능!
          if (aStrict && bStrict) {
            if (aStrict !== bStrict) return false; // ❌ 다르면 무조건 튕겨냄!
          }
        }
        
        return true; 
      };
    };
  }

  // =========================================================================
  // 🚨 변수 생성 가로채기
  // =========================================================================
  if (!(window as any).__patchedVariableCreation) {
    (window as any).__patchedVariableCreation = true;
    
    const origCreateVariable = Blockly.Workspace.prototype.createVariable;
    Blockly.Workspace.prototype.createVariable = function(name: string, type: string, id: string) {
      const vars = this.getVariableMap() ? this.getVariableMap().getAllVariables() : this.getAllVariables();
      
      if (name && name !== '선택' && name !== '항목' && name !== 'item') {
        const existing = vars.find((v: any) => v.name === name);
        if (existing) return existing; 
      }

      const newVar = origCreateVariable.call(this, name, type, id);

      setTimeout(() => {
        const ws = Blockly.getMainWorkspace();
        if (ws && typeof (ws as any).getToolbox === 'function') {
          const toolbox = (ws as any).getToolbox();
          if (toolbox && typeof toolbox.refreshSelection === 'function') toolbox.refreshSelection();
        }
      }, 50);

      return newVar;
    };
  }

  // =========================================================================
  // 🎨 예쁜 다크 테마 프롬프트 창
  // =========================================================================
  if (Blockly.dialog && typeof Blockly.dialog.setPrompt === 'function' && !(window as any).__promptPatched) {
    (window as any).__promptPatched = true;

    Blockly.dialog.setPrompt(function(message: string, defaultValue: string, callback: (result: string | null) => void) {
      if (message.includes("최대 길이") || message.includes("배열 크기")) {
        const savedLen = (window as any).__lastStringLength || '20';
        callback(savedLen);
        return;
      }
      if (!message.includes("새") && !message.includes("이름")) {
        callback(window.prompt(message, defaultValue));
        return;
      }

      const existingModal = document.getElementById('smarty-var-prompt-modal');
      if (existingModal) existingModal.remove();

      const isStringArray = message.includes('문자열');

      const modal = document.createElement('div');
      modal.id = 'smarty-var-prompt-modal';
      modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.6); z-index: 999999; display: flex; justify-content: center; align-items: center; font-family: 'Pretendard', sans-serif;`;

      const box = document.createElement('div');
      box.style.cssText = `background: #2b2b2b; padding: 25px 35px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); width: 350px; display: flex; flex-direction: column; gap: 10px; border: 1px solid #444; box-sizing: border-box;`;

      const title = document.createElement('div');
      title.style.cssText = `color: #fff; font-size: 16px; font-weight: bold; margin-bottom: 5px;`;
      title.innerText = message;

      const inputCss = `width: 100% !important; box-sizing: border-box !important; padding: 10px !important; margin: 0 !important; border-radius: 6px !important; border: 1px solid #555 !important; background: #1e1e1e !important; color: #fff !important; font-size: 15px !important; outline: none !important; appearance: none !important; box-shadow: none !important;`;

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = '';
      nameInput.placeholder = "정보 이름을 만들어 주세요";
      nameInput.style.cssText = inputCss;

      let lenInput: HTMLInputElement | null = null;
      box.appendChild(title);
      box.appendChild(nameInput);

      if (isStringArray) {
        const lenLabel = document.createElement('div');
        lenLabel.innerText = "최대 저장 글자 수 (길이):";
        lenLabel.style.cssText = `color: #ccc; font-size: 13px; font-weight: bold; margin-top: 5px;`;
        lenInput = document.createElement('input');
        lenInput.type = 'number';
        lenInput.value = '20';
        lenInput.min = '1';
        lenInput.style.cssText = inputCss;
        box.appendChild(lenLabel);
        box.appendChild(lenInput);
      }

      const errorMsg = document.createElement('div');
      errorMsg.style.cssText = `color: #ff5252; font-size: 13px; min-height: 18px; font-weight: bold; margin-top: 5px;`;
      box.appendChild(errorMsg);

      const btnGroup = document.createElement('div');
      btnGroup.style.cssText = `display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;`;

      const cancelBtn = document.createElement('button');
      cancelBtn.innerText = '취소';
      cancelBtn.style.cssText = `padding: 8px 16px; border-radius: 6px; border: none; background: #444; color: #fff; cursor: pointer; font-weight: bold;`;
      cancelBtn.onclick = () => { modal.remove(); callback(null); };

      const okBtn = document.createElement('button');
      okBtn.innerText = '확인';
      okBtn.style.cssText = `padding: 8px 16px; border-radius: 6px; border: none; background: #5a5ce6; color: #fff; cursor: pointer; font-weight: bold;`;
      
      okBtn.onclick = () => {
        const val = nameInput.value.trim();
        if (!val) { errorMsg.innerText = `⚠️ 이름을 입력해주세요!`; nameInput.focus(); return; }
        if (/^[0-9]/.test(val)) { errorMsg.innerText = `⚠️ 이름은 숫자로 시작할 수 없습니다!`; nameInput.focus(); return; }

        const ws = Blockly.getMainWorkspace();
        if (ws) {
          const vars = ws.getVariableMap() ? ws.getVariableMap().getAllVariables() : ws.getAllVariables();
          if (vars.find((v: any) => v.name === val)) {
            errorMsg.innerText = `⚠️ "${val}"(은)는 이미 사용 중인 이름입니다!`; nameInput.focus(); return;
          }
        }

        if (isStringArray && lenInput) {
          const lengthVal = parseInt(lenInput.value, 10);
          if (isNaN(lengthVal) || lengthVal < 1) { errorMsg.innerText = `⚠️ 올바른 길이를 입력해주세요!`; return; }
          (window as any).__lastStringLength = lengthVal.toString(); 
        }

        modal.remove();
        callback(val);
      };

      nameInput.onkeydown = (e) => {
        if (e.key === 'Enter') okBtn.click();
        if (e.key === 'Escape') cancelBtn.click();
      };

      btnGroup.appendChild(cancelBtn);
      btnGroup.appendChild(okBtn);
      box.appendChild(btnGroup);
      modal.appendChild(box);
      document.body.appendChild(modal);

      nameInput.focus();
    });
  }

  // =========================================================================
  // 🧱 순정 블록 정의 
  // =========================================================================
  const getBlocklyCheckType = (type: string) => {
    if (!type) return null; 
    if (type === 'boolean') return ['Boolean']; 
    if (type === 'int' || type === 'float' || type === 'char') return ['Number']; // 정수, 실수, 문자는 모두 '숫자(Number)' 취급
    if (type === 'string' || type === 'string_array' || type.startsWith('char[')) return ['String']; 
    return null;
  };

  const getVarSafe = (workspace: any, varId: string) => {
    if (!workspace || !varId) return null;
    const map = workspace.getVariableMap();
    if (map && typeof map.getVariableById === 'function') return map.getVariableById(varId) || map.getVariable(varId);
    if (typeof workspace.getVariableById === 'function') return workspace.getVariableById(varId);
    if (typeof workspace.getVariable === 'function') return workspace.getVariable(varId);
    return null;
  };

  const defineBlockSafe = (name: string, def: any) => {
    if (Blockly.Blocks[name]) delete Blockly.Blocks[name];
    Blockly.Blocks[name] = def;
  };

  const setBlockDef = {
    init: function(this: any) {
      this.appendValueInput('VALUE').appendField('💾').appendField(new Blockly.FieldVariable('선택'), 'VAR').appendField('에 저장');
      this.setPreviousStatement(true, null); this.setNextStatement(true, null); this.setColour(330);
    },
    onchange: function(this: any, e: any) {
      if (!this.workspace) return;
      const varId = this.getFieldValue('VAR');
      if (varId) {
        const v = getVarSafe(this.workspace, varId);
        if (v && this.getInput('VALUE') && this.getInput('VALUE').connection) {
           const conn = this.getInput('VALUE').connection;
           const targetType = getBlocklyCheckType(v.type);

           if (JSON.stringify(conn.check_) !== JSON.stringify(targetType)) {
             
             // 1. 구멍의 허용 타입 강력 변경
             conn.setCheck(targetType);

             // 2. 이미 블록이 꽂혀있는데 타입이 안 맞으면 강제 분리(튕겨냄)
             const targetBlock = conn.targetBlock();
             if (targetBlock && targetBlock.outputConnection) {
               const childCheck = targetBlock.outputConnection.check_;
               if (targetType && childCheck) {
                 // 서로 교차 불가능한 타입이면 끊어버림!
                 if (targetType[0] !== childCheck[0]) {
                   conn.disconnect();
                 }
               }
             }

             if (this.rendered) {
               if (typeof this.queueRender === 'function') this.queueRender();
               else if (typeof this.render === 'function') this.render();
             }
           }
        }
      }
    }
  };

  const getBlockDef = {
    init: function(this: any) {
      this.appendDummyInput().appendField('🗂️').appendField(new Blockly.FieldVariable('선택'), 'VAR').appendField('값');
      this.setOutput(true, null); 
      this.setColour(330);
    },
    onchange: function(this: any, e: any) {
      if (!this.workspace) return;
      const varId = this.getFieldValue('VAR');
      if (varId) {
        const v = getVarSafe(this.workspace, varId);
        
        if (this.outputConnection) {
          const targetType = getBlocklyCheckType(v ? v.type : '');

          if (JSON.stringify(this.outputConnection.check_) !== JSON.stringify(targetType)) {
            
            this.setOutput(true, targetType);

            if (targetType && targetType[0] === 'Boolean') {
              if ((Blockly as any).OUTPUT_SHAPE_HEXAGONAL !== undefined) this.outputShape_ = (Blockly as any).OUTPUT_SHAPE_HEXAGONAL;
            } else {
              if ((Blockly as any).OUTPUT_SHAPE_ROUND !== undefined) this.outputShape_ = (Blockly as any).OUTPUT_SHAPE_ROUND;
              else this.outputShape_ = null;
            }

            // 부모 블록에 꽂혀있는데 타입이 안 맞게 변했다면 스스로 떨어짐!
            const parentBlock = this.getParent();
            if (parentBlock) {
               const parentConnection = this.outputConnection.targetConnection;
               if (parentConnection && parentConnection.check_) {
                 if (targetType && targetType[0] !== parentConnection.check_[0]) {
                    this.unplug(); 
                 }
               }
            }

            if (this.rendered) {
              if (typeof this.queueRender === 'function') this.queueRender();
              else if (typeof this.render === 'function') this.render();
            }
          }
        }
      }
    }
  };

  defineBlockSafe('smarty_variables_set', setBlockDef);
  defineBlockSafe('smarty_variables_get', getBlockDef);

  const legacyTypes = ['int', 'float', 'char', 'string', 'boolean', 'string_array'];
  legacyTypes.forEach(t => {
    defineBlockSafe(`smarty_var_set_${t}`, setBlockDef);
    defineBlockSafe(`smarty_var_get_${t}`, getBlockDef);
  });

  // =========================================================================
  // 🚀 C++ 변수 생성기
  // =========================================================================
  const originalInit = arduinoGenerator.init;
  arduinoGenerator.init = function(this: any, workspace: any) {
    if (originalInit) {
      try { originalInit.call(this, workspace); } catch(e) {}
    }
    if (!this.definitions_) this.definitions_ = Object.create(null);

    try {
      const map = workspace.getVariableMap();
      const variables = map ? map.getAllVariables() : workspace.getAllVariables();
      
      let varCode = '// 📦 변수 선언\n';
      let hasVars = false;

      for (let i = 0; i < variables.length; i++) {
        const v = variables[i];
        const varName = v ? v.name : '';
        
        if (!varName || varName === '선택' || varName === '항목' || varName === 'item') continue;

        let safeName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
        if (this.nameDB_ && typeof this.nameDB_.getName === 'function') safeName = this.nameDB_.getName(varName, Blockly.VARIABLE_CATEGORY_NAME);

        const type = v.type || '';
        let cppDef = `int ${safeName} = 0;`; 
        
        if (type === 'int') cppDef = `int ${safeName} = 0;`;
        else if (type === 'float') cppDef = `double ${safeName} = 0.0;`;
        else if (type === 'char') cppDef = `char ${safeName} = ' ';`;
        else if (type.startsWith('char[') || type === 'string_array' || type === 'string') {
          let len = '20';
          const match = type.match(/char\[(\d+)\]/);
          if (match) len = match[1];
          cppDef = `char ${safeName}[${len}] = "";`;
        }
        else if (type === 'boolean') cppDef = `bool ${safeName} = false;`;

        varCode += cppDef + '\n';
        hasVars = true;
      }

      if (hasVars) this.definitions_['smarty_perfect_vars'] = varCode;
    } catch(e) {}
  };

  const originalFinish = arduinoGenerator.finish;
  arduinoGenerator.finish = function(this: any, code: string) {
    if (this.definitions_) {
      const rogueKeys: string[] = []; 
      for (const key in this.definitions_) {
        if (key !== 'smarty_perfect_vars') {
          const defStr = this.definitions_[key];
          if (typeof defStr === 'string' && (key === 'variables' || key.startsWith('var_') || defStr.includes('double 선택'))) {
            rogueKeys.push(key);
          }
        }
      }
      for (const k of rogueKeys) delete this.definitions_[k];
    }
    
    return originalFinish ? originalFinish.call(this, code) : code;
  };

  // =========================================================================
  // ⚙️ 블록 동작 C++ 생성기
  // =========================================================================
  const ORDER_ATOMIC = 0;
  const ORDER_ASSIGNMENT = 13;

  const generateSetCode = function(b: any) {
    const variable = getVarSafe(b.workspace, b.getFieldValue('VAR'));
    const varName = variable ? variable.name : '';
    if (!varName || varName === '선택' || varName === '항목' || varName === 'item') return '';
    
    let safeName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
    if (arduinoGenerator.nameDB_ && typeof arduinoGenerator.nameDB_.getName === 'function') safeName = arduinoGenerator.nameDB_.getName(varName, Blockly.VARIABLE_CATEGORY_NAME);
    const type = variable ? (variable.type || '') : '';
    let val = arduinoGenerator.valueToCode(b, 'VALUE', ORDER_ASSIGNMENT) || '0';

    if (type === 'char') return val.includes('()') ? `  ${safeName} = ${val};\n` : `  ${safeName} = '${val.replace(/^['"]|['"]$/g, '').charAt(0) || ' '}';\n`;
    if (type.startsWith('char[') || type === 'string_array' || type === 'string') {
      let len = '20';
      const match = type.match(/char\[(\d+)\]/);
      if (match) len = match[1];
      return `  String(${val}).toCharArray(${safeName}, ${len});\n`;
    }
    return `  ${safeName} = ${val};\n`;
  };

  const generateGetCode = function(b: any) {
    const variable = getVarSafe(b.workspace, b.getFieldValue('VAR'));
    const varName = variable ? variable.name : '';
    if (!varName || varName === '선택' || varName === '항목' || varName === 'item') return ['0', ORDER_ATOMIC];

    let safeName = varName.replace(/[^a-zA-Z0-9_]/g, '_');
    if (arduinoGenerator.nameDB_ && typeof arduinoGenerator.nameDB_.getName === 'function') safeName = arduinoGenerator.nameDB_.getName(varName, Blockly.VARIABLE_CATEGORY_NAME);
    return [safeName, ORDER_ATOMIC];
  };

  const mapGenerator = (name: string, func: any) => {
    if (!arduinoGenerator.forBlock) arduinoGenerator.forBlock = {};
    arduinoGenerator.forBlock[name] = func;
    arduinoGenerator[name] = func; 
  };

  mapGenerator('smarty_variables_set', generateSetCode);
  mapGenerator('smarty_variables_get', generateGetCode);

  legacyTypes.forEach(t => {
    mapGenerator(`smarty_var_set_${t}`, generateSetCode);
    mapGenerator(`smarty_var_get_${t}`, generateGetCode);
  });
  
  mapGenerator('variables_set', generateSetCode);
  mapGenerator('variables_get', generateGetCode);
}