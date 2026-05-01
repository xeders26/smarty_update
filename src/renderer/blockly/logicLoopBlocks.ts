/*======================
  src/renderer/blockly/LogicLoopBlocks.ts
==========================*/

import * as Blockly from 'blockly';

export function initLogicLoopBlocks(arduinoGenerator: any) {

  const PLUS_BTN = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSIjNGRiZDY1IiBkPSJNMTIgMmMyLjY3IDAgNS4zMyAxLjMzIDcuMDcgMy4wN0MxOS4zMyA2LjY3IDE5LjMzIDkuMzMgMTkuMzMgMTJjMCAyLjY3LTEuMzMgNS4zMy0zLjA3IDcuMDdDMTcuMzMgMjAuNjcgMTQuNjcgMjIgMTIgMjJjLTIuNjcgMC01LjMzLTEuMzMtNy4wNy0zLjA3QzMuMzMgMTcuMzMgMiAxNC42NyAyIDEyYzAtMi42NyAxLjMzLTUuMzMgMy4wNy03LjA3QzYuNjcgMy4zMyA5LjMzIDIgMTIgMnptMSA1aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00Vjd6Ii8+PC9zdmc+";
  const MINUS_BTN = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSIjZTU3MzczIiBkPSJNMTIgMmMyLjY3IDAgNS4zMyAxLjMzIDcuMDcgMy4wN0MxOS4zMyA2LjY3IDE5LjMzIDkuMzMgMTkuMzMgMTJjMCAyLjY3LTEuMzMgNS4zMy0zLjA3IDcuMDdDMTcuMzMgMjAuNjcgMTQuNjcgMjIgMTIgMjJjLTIuNjcgMC01LjMzLTEuMzMtNy4wNy0zLjA3QzMuMzMgMTcuMzMgMiAxNC42NyAyIDEyYzAtMi42NyAxLjMzLTUuMzMgMy4wNy03LjA3QzYuNjcgMy4zMyA5LjMzIDIgMTIgMnptNSAxMEg3djJoMTB2LTJ6Ii8+PC9zdmc+";

  if (Blockly.Blocks['controls_if']) {
    delete Blockly.Blocks['controls_if'];
  }

  Blockly.Blocks['controls_if'] = {
    // 🌟 [수정] 모든 함수에 this: any를 명시하여 TS 불평 차단
    init: function(this: any) {
      this.setColour('#FFAB19'); 
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      this.elseIfCount_ = 0; 
      this.hasElse_ = false; 

      this.appendValueInput('IF0').setCheck('Boolean').appendField('? 만약');
      this.appendStatementInput('DO0').appendField('라면');

      this.updateShape_(); 
    },

    saveExtraState: function(this: any) {
      return { 'elseIfCount': this.elseIfCount_, 'hasElse': this.hasElse_ };
    },
    loadExtraState: function(this: any, state: any) {
      this.elseIfCount_ = state['elseIfCount'] || 0;
      this.hasElse_ = state['hasElse'] || false;
      this.updateShape_();
    },
    mutationToDom: function(this: any) {
      if (!this.elseIfCount_ && !this.hasElse_) return null;
      const container = Blockly.utils.xml.createElement('mutation');
      if (this.elseIfCount_) container.setAttribute('elseif', this.elseIfCount_.toString());
      if (this.hasElse_) container.setAttribute('else', '1');
      return container;
    },
    domToMutation: function(this: any, xmlElement: any) {
      this.elseIfCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
      this.hasElse_ = parseInt(xmlElement.getAttribute('else'), 10) !== 0;
      this.updateShape_();
    },

    fireChangeEvent_: function(this: any, oldMut: string) {
      if (this.workspace && !this.isInFlyout) {
        const dom = this.mutationToDom();
        const newMut = dom ? Blockly.utils.xml.domToText(dom) : '';
        if (oldMut !== newMut) {
          const ChangeEvent = Blockly.Events.get('change') || Blockly.Events.BlockChange;
          if (ChangeEvent) {
            Blockly.Events.fire(new ChangeEvent(this, 'mutation', null, oldMut, newMut));
          }
        }
      }
    },

    createPlusBtn_: function(this: any, action: string) {
      return new Blockly.FieldImage(PLUS_BTN, 18, 18, '+', () => {
        Blockly.Events.setGroup(true); 
        const dom = this.mutationToDom();
        const oldMut = dom ? Blockly.utils.xml.domToText(dom) : '';
        
        if (action === 'ELSEIF') this.elseIfCount_++;
        else if (action === 'ELSE') this.hasElse_ = true;
        this.updateShape_();
        
        this.fireChangeEvent_(oldMut); 
        Blockly.Events.setGroup(false);
      });
    },

    createMinusBtn_: function(this: any, action: string, index: number | null = null) {
      return new Blockly.FieldImage(MINUS_BTN, 18, 18, '-', () => {
        Blockly.Events.setGroup(true);
        const dom = this.mutationToDom();
        const oldMut = dom ? Blockly.utils.xml.domToText(dom) : '';

        if (action === 'ELSEIF' && index !== null) {
          this.removeElseIf_(index);
        } else if (action === 'ELSE') {
          const elseTarget = this.getInputTargetBlock('ELSE');
          if (elseTarget) elseTarget.dispose(false); 
          this.hasElse_ = false;
          this.updateShape_();
        }

        this.fireChangeEvent_(oldMut); 
        Blockly.Events.setGroup(false);
      });
    },

    removeElseIf_: function(this: any, index: number) {
      let ifTarget = this.getInputTargetBlock('IF' + index);
      let doTarget = this.getInputTargetBlock('DO' + index);
      if (ifTarget) ifTarget.dispose(false);
      if (doTarget) doTarget.dispose(false);

      let ifBlocks: any[] = [];
      let doBlocks: any[] =[];
      for (let i = 1; i <= this.elseIfCount_; i++) {
        if (i === index) continue;
        let tIf = this.getInputTargetBlock('IF' + i);
        let tDo = this.getInputTargetBlock('DO' + i);
        if (tIf) { tIf.unplug(); ifBlocks.push(tIf); } else { ifBlocks.push(null); }
        if (tDo) { tDo.unplug(); doBlocks.push(tDo); } else { doBlocks.push(null); }
      }
      
      let elseBlock: any = null; 
      if (this.getInput('ELSE')) {
        let eT = this.getInputTargetBlock('ELSE');
        if (eT) { eT.unplug(); elseBlock = eT; }
      }

      this.elseIfCount_--;
      this.updateShape_(); 

      for (let j = 1; j <= this.elseIfCount_; j++) {
        if (ifBlocks[j-1]) this.getInput('IF' + j).connection.connect(ifBlocks[j-1].previousConnection || ifBlocks[j-1].outputConnection);
        if (doBlocks[j-1]) this.getInput('DO' + j).connection.connect(doBlocks[j-1].previousConnection || doBlocks[j-1].outputConnection);
      }
      if (elseBlock && this.hasElse_) {
        this.getInput('ELSE').connection.connect(elseBlock.previousConnection || elseBlock.outputConnection);
      }
    },

    updateShape_: function(this: any) {
      let ifBlocks: any[] =[];
      let doBlocks: any[] =[];
      let i = 1;
      while (this.getInput('IF' + i)) {
        let tIf = this.getInputTargetBlock('IF' + i);
        let tDo = this.getInputTargetBlock('DO' + i);
        if (tIf) { tIf.unplug(); ifBlocks[i] = tIf; }
        if (tDo) { tDo.unplug(); doBlocks[i] = tDo; }
        this.removeInput('IF' + i);
        this.removeInput('DO' + i);
        i++;
      }
      
      let elseBlock: any = null;
      if (this.getInput('ELSE')) {
        let eT = this.getInputTargetBlock('ELSE');
        if (eT) { eT.unplug(); elseBlock = eT; }
        this.removeInput('ELSE');
      }
      
      if (this.getInput('ADD_ELSEIF')) this.removeInput('ADD_ELSEIF');
      if (this.getInput('ADD_ELSE')) this.removeInput('ADD_ELSE');

      for (let j = 1; j <= this.elseIfCount_; j++) {
        this.appendValueInput('IF' + j)
            .setCheck('Boolean')
            .appendField(this.createMinusBtn_('ELSEIF', j))
            .appendField('아니면 만약');
        this.appendStatementInput('DO' + j).appendField('라면');
      }

      this.appendDummyInput('ADD_ELSEIF')
          .appendField(this.createPlusBtn_('ELSEIF'))
          .appendField('아니면 만약');

      if (this.hasElse_) {
        this.appendStatementInput('ELSE')
            .appendField(this.createMinusBtn_('ELSE'))
            .appendField('아니면');
      } else {
        this.appendDummyInput('ADD_ELSE')
            .appendField(this.createPlusBtn_('ELSE'))
            .appendField('아니면');
      }

      for (let j = 1; j < i; j++) {
        if (ifBlocks[j] && this.getInput('IF' + j)) this.getInput('IF' + j).connection.connect(ifBlocks[j].previousConnection || ifBlocks[j].outputConnection);
        if (doBlocks[j] && this.getInput('DO' + j)) this.getInput('DO' + j).connection.connect(doBlocks[j].previousConnection || doBlocks[j].outputConnection);
      }
      if (elseBlock && this.hasElse_) {
        this.getInput('ELSE').connection.connect(elseBlock.previousConnection || elseBlock.outputConnection);
      }
    }
  };

  // ==========================================
  // 🌟 [추가] "횟수만큼 반복하기" 블록에 기본값 10 강제 주입!
  // ==========================================
  if (Blockly.Blocks['controls_repeat_ext']) {
    const originalRepeatInit = Blockly.Blocks['controls_repeat_ext'].init;
    Blockly.Blocks['controls_repeat_ext'].init = function(this: any) {
      if (originalRepeatInit) {
        originalRepeatInit.call(this); // 기존 Blockly 로직 100% 실행 (번역/색상 유지)
      }
      // 블록 생성 직후에 TIMES 입력칸을 찾아서 숫자 10을 꽂아 넣습니다.
      const timesInput = this.getInput('TIMES');
      if (timesInput && !timesInput.connection.getShadowDom()) {
        const shadowXml = Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">10</field></shadow>');
        timesInput.connection.setShadowDom(shadowXml);
      }
    };
  }

  // ==========================================
  // ⚙️ 블록리 기본 논리/제어 블록 (C++ 제너레이터)
  // ==========================================
  arduinoGenerator.forBlock['logic_compare'] = function(b: any) { const op = { 'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>=' }[b.getFieldValue('OP') as string]; return[`${arduinoGenerator.valueToCode(b, 'A', 0) || '0'} ${op} ${arduinoGenerator.valueToCode(b, 'B', 0) || '0'}`, 0]; };
  arduinoGenerator.forBlock['logic_operation'] = function(b: any) { const op = b.getFieldValue('OP') === 'AND' ? '&&' : '||'; return[`${arduinoGenerator.valueToCode(b, 'A', 0) || 'false'} ${op} ${arduinoGenerator.valueToCode(b, 'B', 0) || 'false'}`, 0]; };
  
  arduinoGenerator.forBlock['controls_if'] = function(b: any) { let n = 0; let code = ''; while (b.getInput('IF' + n)) { let cond = arduinoGenerator.valueToCode(b, 'IF' + n, 0) || 'false'; let branch = arduinoGenerator.statementToCode(b, 'DO' + n) || ''; if (n === 0) { code += `  if (${cond}) {\n${branch}  }\n`; } else { code += `  else if (${cond}) {\n${branch}  }\n`; } n++; } if (b.getInput('ELSE')) { let branch = arduinoGenerator.statementToCode(b, 'ELSE') || ''; code += `  else {\n${branch}  }\n`; } return code; };
  
  arduinoGenerator.forBlock['controls_repeat_ext'] = function(b: any) { return `  for (int i = 0; i < ${arduinoGenerator.valueToCode(b, 'TIMES', 0) || '0'}; i++) {\n${arduinoGenerator.statementToCode(b, 'DO')}  }\n`; };
  arduinoGenerator.forBlock['controls_whileUntil'] = function(b: any) { const until = b.getFieldValue('MODE') === 'UNTIL'; let cond = arduinoGenerator.valueToCode(b, 'BOOL', 0) || 'false'; if (until) cond = `!(${cond})`; return `  while (${cond}) {\n${arduinoGenerator.statementToCode(b, 'DO')}  }\n`; };
}