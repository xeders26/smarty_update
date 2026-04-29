import * as Blockly from 'blockly';

// =========================================================
// 🌐 1. 전역 설정 변수 (기본값 설정)
// =========================================================
let blockSettings: Record<string, { min: number, max: number }> = {
  moveBlueHand: { min: 0, max: 180 },
  moveRedHand: { min: 0, max: 180 },
  moveBlueSlide: { min: 0, max: 180 },
  moveRedSlide: { min: 0, max: 180 }
};

// =========================================================
// 🚀 2. Git에서 최신 속성값을 다운로드하는 함수
// =========================================================
export async function fetchSettingsFromGit() {
  try {
    // 🚨 대장님의 실제 GitHub Raw URL을 여기에 붙여넣으세요!
    // ?t=... 파라미터는 브라우저 캐시를 무시하고 무조건 최신 파일을 가져오게 합니다.
    const url = `https://raw.githubusercontent.com/대장님아이디/저장소/main/smarty-config.json?t=${new Date().getTime()}`;
    
    const response = await fetch(url);
    if (response.ok) {
      const gitData = await response.json();
      blockSettings = { ...blockSettings, ...gitData };
      console.log("✅ Git에서 로봇 속성값 다운로드 성공!", blockSettings);
    } else {
      console.warn("⚠️ Git 파일을 찾을 수 없어 기본 설정을 사용합니다.");
    }
  } catch (error) {
    console.warn("⚠️ 인터넷이 끊겨 오프라인 기본 설정을 사용합니다.", error);
  }
}

// =========================================================
// 🧱 3. 로봇 블록 초기화 함수
// =========================================================
export function initRobotBlocks(arduinoGenerator: any) {
  
  // 블록 공통 생성 로직 (중복 코드 최소화)
  const createBlockDef = (blockType: string, label: string, color: string) => {
    return {
      init: function(this: any) {
        // 🚨 이 블록이 생성되는 순간, 전역 blockSettings 변수에 있는 값을 읽어옵니다!
        this.minAngle_ = blockSettings[blockType]?.min ?? 0;
        this.maxAngle_ = blockSettings[blockType]?.max ?? 180;

        this.appendDummyInput()
            .appendField(label)
            .appendField(new Blockly.FieldDropdown([
              ['S1', 'S1'], ['S2', 'S2'], ['S3', 'S3'], ['S4', 'S4']
            ]), 'PORT');
            
        this.appendValueInput('ANGLE')
            .setCheck('Number')
            .appendField('각도');

        this.setInputsInline(true);
        this.setOutput(true, ['Number', 'Boolean']); 
        this.setColour(color); 
        this.setTooltip(`현재 설정된 허용 범위: ${this.minAngle_}도 ~ ${this.maxAngle_}도`);
      },
      // 프로젝트 저장/불러오기 시 속성값을 유지하기 위한 부분
      mutationToDom: function(this: any) {
        const container = document.createElement('mutation');
        container.setAttribute('min', this.minAngle_.toString());
        container.setAttribute('max', this.maxAngle_.toString());
        return container;
      },
      domToMutation: function(this: any, xmlElement: any) {
        this.minAngle_ = parseInt(xmlElement.getAttribute('min'), 10);
        this.maxAngle_ = parseInt(xmlElement.getAttribute('max'), 10);
        this.setTooltip(`현재 설정된 허용 범위: ${this.minAngle_}도 ~ ${this.maxAngle_}도`);
      }
    };
  };

  // 블록 정의 등록
  Blockly.Blocks['moveBlueHand'] = createBlockDef('moveBlueHand', '✋ 블루 핸드 제어', '#2196F3');
  Blockly.Blocks['moveRedHand'] = createBlockDef('moveRedHand', '✋ 레드 핸드 제어', '#F44336');
  Blockly.Blocks['moveBlueSlide'] = createBlockDef('moveBlueSlide', '🏗️ 블루 슬라이드 제어', '#2196F3');
  Blockly.Blocks['moveRedSlide'] = createBlockDef('moveRedSlide', '🏗️ 레드 슬라이드 제어', '#F44336');

  // =========================================================
  // 💻 4. C++ 코드 제너레이터
  // =========================================================
  const generateProtectedServoCode = function(block: any) {
    const port = block.getFieldValue('PORT');
    const angleCode = arduinoGenerator.valueToCode(block, 'ANGLE', 0) || '90';
    
    const min = block.minAngle_ !== undefined ? block.minAngle_ : 0;
    const max = block.maxAngle_ !== undefined ? block.maxAngle_ : 180;

    // 만약 사용자가 제한 범위를 벗어난 값을 넣어도 모터가 터지지 않게 보호하는 C++ 코드 생성
    const code = `([&]() -> int { int a = ${angleCode}; if(a >= ${min} && a <= ${max}) { runServo(${port}, a); return 1; } return 0; })()`;
    
    return [code, 0]; 
  };

  arduinoGenerator.forBlock['moveBlueHand'] = generateProtectedServoCode;
  arduinoGenerator.forBlock['moveRedHand'] = generateProtectedServoCode;
  arduinoGenerator.forBlock['moveBlueSlide'] = generateProtectedServoCode;
  arduinoGenerator.forBlock['moveRedSlide'] = generateProtectedServoCode;
}