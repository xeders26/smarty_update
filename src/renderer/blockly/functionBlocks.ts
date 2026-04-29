import * as Blockly from 'blockly';

export function initFunctionBlocks(arduinoGenerator: any) {
  
  // =========================================================
  // 🚨 [툴박스 버튼 툴팁 패치] 블록리가 무시하는 버튼 툴팁을 강제로 활성화합니다.
  // =========================================================
  if (!(window as any).__patchedFlyoutButtonTooltip) {
    (window as any).__patchedFlyoutButtonTooltip = true;
    if (Blockly.FlyoutButton && Blockly.FlyoutButton.prototype) {
      const origCreateDom = Blockly.FlyoutButton.prototype.createDom;
      Blockly.FlyoutButton.prototype.createDom = function() {
        const svgGroup = origCreateDom.call(this); // 원래 버튼 생성 로직 실행
        
        // 우리가 툴박스 JSON에 추가한 tooltip 속성이 있다면?
        if (this.info_ && this.info_.tooltip) {
          // 브라우저 기본 툴팁(SVG title) 강제 주입!
          const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          title.textContent = this.info_.tooltip;
          svgGroup.appendChild(title);
          
          // 블록리 자체 툴팁 시스템에도 연결
          this.tooltip = this.info_.tooltip;
          if (Blockly.Tooltip && Blockly.Tooltip.bindMouseEvents) {
            Blockly.Tooltip.bindMouseEvents(svgGroup, this, svgGroup);
          }
        }
        return svgGroup;
      };
    }
  }

  if ((window as any).__smartyFuncPatched) return;
  (window as any).__smartyFuncPatched = true;

  const genUid = () => Blockly.utils?.idGenerator?.genUid ? Blockly.utils.idGenerator.genUid() : ('smarty_' + Math.random().toString(36).substring(2, 10));

  // =========================================================
  // 🚨 [무적 툴박스 강제 새로고침] 
  // =========================================================
  const syncToolbox = (block: any) => {
    try {
      const ws = block.workspace.targetWorkspace || block.workspace;
      if (!ws) return;

      Blockly.Procedures.mutateCallers(block);
      
      const toolbox = ws.getToolbox ? ws.getToolbox() : ws.toolbox_;
      if (toolbox && typeof toolbox.refreshSelection === 'function') {
        toolbox.refreshSelection();
      }
    } catch(e) {
      console.warn("툴박스 갱신 에러 방어:", e);
    }
  };

  // 블록 구조가 변했음을 블록리 코어에 신고하는 핵심 함수 (이게 있어야 메뉴가 바뀝니다)
  const fireMutationEvent = (block: any, oldMutationDom: any, newMutationDom: any) => {
    if (Blockly.Events.isEnabled()) {
      const oldStr = Blockly.Xml && oldMutationDom ? Blockly.Xml.domToText(oldMutationDom) : oldMutationDom.outerHTML;
      const newStr = Blockly.Xml && newMutationDom ? Blockly.Xml.domToText(newMutationDom) : newMutationDom.outerHTML;
      Blockly.Events.fire(new (Blockly.Events as any).BlockChange(block, 'mutation', null, oldStr, newStr));
    }
  };

  // =========================================================
  // 🚀 파라미터 행 추가 로직 (블록 내부 인라인 편집)
  // =========================================================
  const updateParamsFn = function(this: any) {
    let i = 0;
    while (this.getInput('PARAM_ROW_' + i)) {
      this.removeInput('PARAM_ROW_' + i);
      i++;
    }
    
    if (this.arguments_ && this.arguments_.length > 0) {
      for (let j = 0; j < this.arguments_.length; j++) {
        const argName = this.arguments_[j];
        const type = this.argumentTypes_ ? (this.argumentTypes_[j] || 'INT') : 'INT';
        
        const paramInput = this.appendDummyInput('PARAM_ROW_' + j);
        
        // ✏️ 이름 입력 필드
        const nameField = new Blockly.FieldTextInput(argName, (newName: string) => {
           if (newName && newName !== this.arguments_[j]) {
               const ws = this.workspace.targetWorkspace || this.workspace;
               if (ws && !ws.getVariable(newName)) ws.createVariable(newName);
               
               const oldMut = this.mutationToDom();
               this.arguments_[j] = newName;
               const newMut = this.mutationToDom();
               fireMutationEvent(this, oldMut, newMut);
               syncToolbox(this); 
           }
           return newName;
        });

        // 🗂️ 종류 선택 필드
        const typeDropdown = new Blockly.FieldDropdown([
          ["정수값", "INT"],
          ["실수값", "FLOAT"],
          ["문자열", "STRING"],
          ["논리값", "BOOLEAN"]
        ], (newType: string) => {
           if (newType !== this.argumentTypes_[j]) {
               const oldMut = this.mutationToDom();
               this.argumentTypes_[j] = newType;
               const newMut = this.mutationToDom();
               fireMutationEvent(this, oldMut, newMut);
               syncToolbox(this); 
           }
           return newType;
        });
        typeDropdown.setValue(type);

        // ⛔ 삭제 버튼
        const minusBtn = new Blockly.FieldLabel('⛔ 삭제');
        (minusBtn as any).EDITABLE = true;
        (minusBtn as any).SERIALIZABLE = true; // 🚨 [경고 완전 해결!] 저장 데이터로 인식되게 함
        (minusBtn as any).showEditor_ = () => {
           setTimeout(() => {
               const oldMut = this.mutationToDom();
               this.arguments_.splice(j, 1);
               this.argumentTypes_.splice(j, 1);
               this.paramIds_.splice(j, 1);
               this.updateParams_();
               const newMut = this.mutationToDom();
               fireMutationEvent(this, oldMut, newMut);
               syncToolbox(this);
           }, 50);
        };
        
        const origDelInit = (minusBtn as any).initView;
        (minusBtn as any).initView = function() {
           if (origDelInit) origDelInit.call(this);
           if (this.textElement_) {
               this.textElement_.style.fill = '#ffb3b3'; 
               this.textElement_.style.fontWeight = 'bold';
               this.textElement_.style.cursor = 'pointer';
           }
        };
        
        paramInput.appendField('    ↳ 입력: ')
                  .appendField(nameField, 'ARG_NAME_' + j)
                  .appendField('  종류: ')
                  .appendField(typeDropdown, 'ARG_TYPE_' + j)
                  .appendField('   ')
                  .appendField(minusBtn, 'DEL_BTN_' + j);
                  
        this.moveInputBefore('PARAM_ROW_' + j, 'STACK');
      }
    }
  };

  const nameValidator = function(this: any, newName: string) {
     const result = Blockly.Procedures.rename ? Blockly.Procedures.rename.call(this, newName) : newName;
     setTimeout(() => syncToolbox(this.getSourceBlock()), 100);
     return result;
  };

  // =========================================================
  // 🎨 1. 결과값 없는 함수 
  // =========================================================
  Blockly.Blocks['procedures_defnoreturn'] = {
    init: function() {
      const block = this;
      const nameField = new Blockly.FieldTextInput('함수이름', nameValidator);
      nameField.setSpellcheck(false);
      
      const paramDropdown = new Blockly.FieldDropdown([
        ["입력 추가 ➕", "NONE"],
        ["정수값", "INT"],
        ["실수값", "FLOAT"],
        ["문자열", "STRING"],
        ["논리값", "BOOLEAN"]
      ], function(option: string) {
        if (option !== "NONE") {
          setTimeout(() => {
            const oldMut = block.mutationToDom(); // 🚨 추가 전 상태 캡처
            
            const defaultName = "정보명" + ((block.arguments_?.length || 0) + 1);
            block.arguments_ = block.arguments_ || [];
            block.argumentTypes_ = block.argumentTypes_ || [];
            block.paramIds_ = block.paramIds_ || [];
            
            const ws = block.workspace.targetWorkspace || block.workspace;
            if (ws && !ws.getVariable(defaultName)) ws.createVariable(defaultName);

            block.arguments_.push(defaultName);
            block.argumentTypes_.push(option);
            block.paramIds_.push(genUid());

            block.updateParams_();
            
            const newMut = block.mutationToDom(); // 🚨 추가 후 상태 캡처
            fireMutationEvent(block, oldMut, newMut); // 블록리 엔진에 정식 신고!
            syncToolbox(block); // 툴박스 새로고침
          }, 50);
        }
        return "NONE"; 
      });

      this.appendDummyInput('TOPROW')
          .appendField('⚙️ 결과값 없는 함수 ')
          .appendField(nameField, 'NAME')
          .appendField('   ')
          .appendField(paramDropdown, 'PARAM_ADDER');

      this.appendStatementInput('STACK').appendField('실행할 내용');

      this.setColour(290);
      this.arguments_ = [];
      this.argumentTypes_ = [];
      this.paramIds_ = [];
    },
    updateParams_: updateParamsFn,
    mutationToDom: function() {
      const container = document.createElement('mutation');
      for (let i = 0; i < (this.arguments_ || []).length; i++) {
        const parameter = document.createElement('arg');
        parameter.setAttribute('name', this.arguments_[i]);
        parameter.setAttribute('paramId', this.paramIds_[i] || genUid());
        container.appendChild(parameter);
      }
      container.setAttribute('argtypes', (this.argumentTypes_ || []).join(','));
      return container;
    },
    domToMutation: function(xml: any) {
      this.arguments_ = [];
      this.paramIds_ = [];
      for (let i = 0; i < xml.childNodes.length; i++) {
        const node = xml.childNodes[i];
        if (node.nodeName.toLowerCase() === 'arg') {
          this.arguments_.push(node.getAttribute('name'));
          this.paramIds_.push(node.getAttribute('paramId') || genUid());
        }
      }
      const typeStr = xml.getAttribute('argtypes');
      this.argumentTypes_ = typeStr ? typeStr.split(',') : this.arguments_.map(() => 'INT');
      this.updateParams_();
      Blockly.Procedures.mutateCallers(this);
    },
    getProcedureDef: function() { return [this.getFieldValue('NAME'), this.arguments_ || [], false]; },
    getVars: function() { return this.arguments_ || []; },
    getVarModels: function() {
      if (!this.workspace) return [];
      return (this.arguments_ || []).map((v: string) => this.workspace.getVariable(v)).filter((v: any) => !!v);
    },
    renameVarById: function(oldId: string, newId: string) {
      const oldVar = this.workspace.getVariableById(oldId);
      const newVar = this.workspace.getVariableById(newId);
      if (oldVar && newVar && this.arguments_) {
        let changed = false;
        const oldMut = this.mutationToDom();
        for (let i = 0; i < this.arguments_.length; i++) {
          if (this.arguments_[i] === oldVar.name) {
            this.arguments_[i] = newVar.name;
            changed = true;
          }
        }
        if (changed) {
          this.updateParams_();
          const newMut = this.mutationToDom();
          fireMutationEvent(this, oldMut, newMut);
          syncToolbox(this);
        }
      }
    },
    updateVarName: function() {},
    customContextMenu: function() {},
    callType_: 'procedures_callnoreturn'
  };


  // =========================================================
  // 🎨 2. 결과값 있는 함수 
  // =========================================================
  Blockly.Blocks['procedures_defreturn'] = {
    init: function() {
      const block = this;
      const nameField = new Blockly.FieldTextInput('함수이름', nameValidator);
      nameField.setSpellcheck(false);
      
      const paramDropdown = new Blockly.FieldDropdown([
        ["입력 추가 ➕", "NONE"],
        ["정수값", "INT"],
        ["실수값", "FLOAT"],
        ["문자열", "STRING"],
        ["논리값", "BOOLEAN"]
      ], function(option: string) {
        if (option !== "NONE") {
          setTimeout(() => {
            const oldMut = block.mutationToDom(); // 🚨 추가 전 상태 캡처
            
            const defaultName = "정보명" + ((block.arguments_?.length || 0) + 1);
            block.arguments_ = block.arguments_ || [];
            block.argumentTypes_ = block.argumentTypes_ || [];
            block.paramIds_ = block.paramIds_ || [];
            
            const ws = block.workspace.targetWorkspace || block.workspace;
            if (ws && !ws.getVariable(defaultName)) ws.createVariable(defaultName);

            block.arguments_.push(defaultName);
            block.argumentTypes_.push(option);
            block.paramIds_.push(genUid());

            block.updateParams_();
            
            const newMut = block.mutationToDom(); // 🚨 추가 후 상태 캡처
            fireMutationEvent(block, oldMut, newMut); // 블록리 엔진에 정식 신고!
            syncToolbox(block);
          }, 50);
        }
        return "NONE"; 
      });

      const retDropdown = new Blockly.FieldDropdown([
        ["결과: 정수", "INT"],
        ["결과: 실수", "FLOAT"],
        ["결과: 문자열", "STRING"],
        ["결과: 논리값", "BOOLEAN"]
      ], function(option: string) {
        const oldMut = block.mutationToDom();
        setTimeout(() => {
            const newMut = block.mutationToDom();
            fireMutationEvent(block, oldMut, newMut);
            syncToolbox(block);
        }, 50); 
        return option;
      });

      this.appendDummyInput('TOPROW')
          .appendField('⚙️ 결과값 있는 함수 ')
          .appendField(nameField, 'NAME')
          .appendField('   ')
          .appendField(paramDropdown, 'PARAM_ADDER')
          .appendField('   ')
          .appendField(retDropdown, 'RETURN_TYPE');

      this.appendStatementInput('STACK').appendField('실행할 내용');
      this.appendValueInput('RETURN')
          .setAlign((Blockly as any).ALIGN_RIGHT || 1)
          .appendField('➔ 결과 반환');

      this.setColour(290);
      this.arguments_ = [];
      this.argumentTypes_ = [];
      this.paramIds_ = [];
    },
    updateParams_: updateParamsFn,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    getProcedureDef: function() { return [this.getFieldValue('NAME'), this.arguments_ || [], true]; },
    getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
    getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
    renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
    updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
    customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
    callType_: 'procedures_callreturn'
  };


  // =========================================================
  // ⚙️ 3. 호출 블록(Caller)
  // =========================================================
  const patchCaller = (blockName: string, hasReturn: boolean) => {
    const blockDef = Blockly.Blocks[blockName];
    if (!blockDef) return;

    const origSetParams = blockDef.setProcedureParameters_;
    blockDef.setProcedureParameters_ = function(paramNames: any, paramIds: any) {
      if (origSetParams) origSetParams.call(this, paramNames, paramIds);

      this.setInputsInline(true);

      try {
        const ws = this.workspace.targetWorkspace || this.workspace;
        const def = Blockly.Procedures.getDefinition(this.getFieldValue('NAME'), ws);

        if (def) {
          const types = def.argumentTypes_ || [];
          for (let i = 0; i < (this.arguments_ || []).length; i++) {
            const input = this.getInput('ARG' + i);
            if (input) {
              const t = types[i] || 'INT';
              if (t === 'BOOLEAN') input.setCheck(['Boolean']);
              else if (t === 'STRING') input.setCheck(['String']);
              else input.setCheck(['Number']);
            }
          }

          if (hasReturn) {
            const rType = def.getField('RETURN_TYPE') ? def.getFieldValue('RETURN_TYPE') : 'INT';
            if (rType === 'BOOLEAN') this.setOutput(true, ['Boolean']);
            else if (rType === 'STRING') this.setOutput(true, ['String']);
            else this.setOutput(true, ['Number']);
          }
        }
      } catch(e) { }
    };
  };

  patchCaller('procedures_callnoreturn', false);
  patchCaller('procedures_callreturn', true);

  // =========================================================
  // 🚀 4. C++ 코드 제너레이터 (아두이노)
  // =========================================================
  arduinoGenerator.forBlock['procedures_defnoreturn'] = function(b: any) { 
    const funcName = b.getFieldValue('NAME'); 
    const branch = arduinoGenerator.statementToCode(b, 'STACK'); 
    const argTypes = b.argumentTypes_ || [];
    const args = (b.arguments_ || []).map((arg: string, i: number) => {
      const type = argTypes[i] || 'INT';
      let cppType = 'long';
      if (type === 'FLOAT') cppType = 'double';
      else if (type === 'STRING') cppType = 'String';
      else if (type === 'BOOLEAN') cppType = 'bool';
      return `${cppType} ${arg}`;
    }).join(', '); 
    const code = `void ${funcName}(${args}) {\n${branch}}\n`; 
    arduinoGenerator.definitions_[`func_${funcName}`] = code;
    return null; 
  };

  arduinoGenerator.forBlock['procedures_defreturn'] = function(b: any) { 
    const funcName = b.getFieldValue('NAME'); 
    const branch = arduinoGenerator.statementToCode(b, 'STACK'); 
    const returnVal = arduinoGenerator.valueToCode(b, 'RETURN', 0) || '0'; 
    const argTypes = b.argumentTypes_ || [];
    const args = (b.arguments_ || []).map((arg: string, i: number) => {
      const type = argTypes[i] || 'INT';
      let cppType = 'long';
      if (type === 'FLOAT') cppType = 'double';
      else if (type === 'STRING') cppType = 'String';
      else if (type === 'BOOLEAN') cppType = 'bool';
      return `${cppType} ${arg}`;
    }).join(', '); 
    const returnType = b.getFieldValue('RETURN_TYPE');
    let cppType = 'long';
    if (returnType === 'FLOAT') cppType = 'double';
    else if (returnType === 'STRING') cppType = 'String';
    else if (returnType === 'BOOLEAN') cppType = 'bool';
    const code = `${cppType} ${funcName}(${args}) {\n${branch}  return ${returnVal};\n}\n`; 
    arduinoGenerator.definitions_[`func_${funcName}`] = code;
    return null; 
  };

  arduinoGenerator.forBlock['procedures_callnoreturn'] = function(b: any) { 
    const funcName = b.getFieldValue('NAME'); 
    const args = (b.arguments_ || []).map((_: any, i: number) => arduinoGenerator.valueToCode(b, 'ARG' + i, 0) || '0'); 
    return `  ${funcName}(${args.join(', ')});\n`; 
  };

  arduinoGenerator.forBlock['procedures_callreturn'] = function(b: any) { 
    const funcName = b.getFieldValue('NAME'); 
    const args = (b.arguments_ || []).map((_: any, i: number) => arduinoGenerator.valueToCode(b, 'ARG' + i, 0) || '0'); 
    return [`${funcName}(${args.join(', ')})`, 0]; 
  };
}