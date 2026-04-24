/*==================================================================
  src/renderer/blockly/FUNCTIONSbLOCKS.TS
 *==================================================================*/
import * as Blockly from 'blockly';

export function initFunctionBlocks(arduinoGenerator: any) {
  
  // 1. 반환값이 없는 함수 만들기 (수정됨 🚨)
  arduinoGenerator.forBlock['procedures_defnoreturn'] = function(b: any) { 
    const funcName = b.getFieldValue('NAME'); 
    const branch = arduinoGenerator.statementToCode(b, 'STACK'); 
    const args = (b.arguments_ || []).map((arg: string) => `double ${arg}`).join(', '); 
    
    // 코드를 바로 return 하지 않고, 맨 위 전역 공간(definitions)으로 올립니다!
    const code = `void ${funcName}(${args}) {\n${branch}}\n`; 
    arduinoGenerator.definitions_[`func_${funcName}`] = code;
    
    return null; // 원래 자리에는 코드를 남기지 않음
  };

  // 2. 반환값이 있는 함수 만들기 (수정됨 🚨)
  arduinoGenerator.forBlock['procedures_defreturn'] = function(b: any) { 
    const funcName = b.getFieldValue('NAME'); 
    const branch = arduinoGenerator.statementToCode(b, 'STACK'); 
    const returnVal = arduinoGenerator.valueToCode(b, 'RETURN', 0) || '0'; 
    const args = (b.arguments_ || []).map((arg: string) => `double ${arg}`).join(', '); 
    
    // 마찬가지로 맨 위로 올립니다!
    const code = `double ${funcName}(${args}) {\n${branch}  return ${returnVal};\n}\n`; 
    arduinoGenerator.definitions_[`func_${funcName}`] = code;
    
    return null; 
  };

  // 3. 반환값이 없는 함수 호출 (정상)
  arduinoGenerator.forBlock['procedures_callnoreturn'] = function(b: any) { 
    const funcName = b.getFieldValue('NAME'); 
    const args = (b.arguments_ || []).map((_: any, i: number) => arduinoGenerator.valueToCode(b, 'ARG' + i, 0) || '0'); 
    return `  ${funcName}(${args.join(', ')});\n`; 
  };

  // 4. 반환값이 있는 함수 호출 (정상)
  arduinoGenerator.forBlock['procedures_callreturn'] = function(b: any) { 
    const funcName = b.getFieldValue('NAME'); 
    const args = (b.arguments_ || []).map((_: any, i: number) => arduinoGenerator.valueToCode(b, 'ARG' + i, 0) || '0'); 
    return [`${funcName}(${args.join(', ')})`, 0]; 
  };

  // 5. 조건부 반환 (if return) (정상)
  arduinoGenerator.forBlock['procedures_ifreturn'] = function(b: any) { 
    const cond = arduinoGenerator.valueToCode(b, 'CONDITION', 0) || 'false'; 
    if (b.hasReturnValue_) return `  if (${cond}) return ${arduinoGenerator.valueToCode(b, 'VALUE', 0) || '0'};\n`; 
    return `  if (${cond}) return;\n`; 
  };
}