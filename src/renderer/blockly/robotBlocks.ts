import * as Blockly from 'blockly';

// =========================================================
// 🌐 1. 전역 설정 변수 (기본값)
// =========================================================
let blockSettings: Record<string, { min: number, max: number }> = {
  moveBlueHand: { min: 0, max: 180 },
  moveRedHand: { min: 0, max: 180 },
  moveBlueSlide: { min: 0, max: 180 },
  moveRedSlide: { min: 0, max: 180 }
};

// 🌟 업데이트된 값을 작업 공간의 블록에 강제로 즉시 반영하는 함수
function updateBlocksInWorkspace() {
  const workspace = Blockly.getMainWorkspace();
  if (workspace) {
    const blocks = workspace.getAllBlocks(false);
    blocks.forEach(block => {
      // 로봇 제어 블록들만 필터링
      if (['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].includes(block.type)) {
        
        let currentMin = Number(blockSettings[block.type]?.min ?? 0);
        let currentMax = Number(blockSettings[block.type]?.max ?? 180);

        // 1. 블록 라벨 값 즉시 교체
        const minLabel = block.getField('MIN_LABEL');
        if (minLabel) minLabel.setValue(String(currentMin));

        const maxLabel = block.getField('MAX_LABEL');
        if (maxLabel) maxLabel.setValue(String(currentMax));

        // 2. 툴팁 업데이트
        block.setTooltip(`현재 설정된 허용 범위: ${currentMin}도 ~ ${currentMax}도`);

        // 3. 내부 상태 및 경고 아이콘 재계산을 위해 onchange 강제 호출
        if (block.onchange) {
          block.onchange(null as any);
        }
      }
    });
  }
}

// 이벤트 리스너: 다른 곳(예: 수동 업데이트 버튼 등)에서 이벤트가 날아올 때 반영
window.addEventListener('smartyConfigUpdated', (e: any) => {
  if (e.detail) {
    blockSettings = { ...blockSettings, ...e.detail };
    updateBlocksInWorkspace(); // 🌟 강제 업데이트 함수 호출
  }
});

// =========================================================
// 🚀 2. Git에서 최신 속성값을 다운로드하는 함수
// =========================================================
export async function fetchSettingsFromGit() {
  try {
    const url = `https://raw.githubusercontent.com/xeders26/smarty_update/main/smarty-config.json?t=${Date.now()}`;
    const response = await fetch(url);
    if (response.ok) {
      const gitData = await response.json();
      
      // 값이 실제로 변했는지 확인 (선택 사항이지만 불필요한 렌더링 방지)
      const isChanged = JSON.stringify(blockSettings) !== JSON.stringify({ ...blockSettings, ...gitData });
      
      if (isChanged) {
        blockSettings = { ...blockSettings, ...gitData };
        console.log("🔄 로봇 블록 설정이 최신화되었습니다:", blockSettings);
        
        // 🌟 Git에서 새로 받아왔으면 화면에 있는 블록도 즉시 업데이트!
        updateBlocksInWorkspace();
      }
    }
  } catch (error) {
    console.warn("⚠️ 오프라인 모드: 기존 설정을 유지합니다.");
  }
}

// (선택 사항) 주기적으로 서버에서 값을 확인하려면 아래 주석을 해제하세요.
// setInterval(fetchSettingsFromGit, 60000); // 1분마다 설정 확인

// =========================================================
// 🎨 3. 커스텀 CSS 및 아이콘 SVG (기존과 동일)
// =========================================================
if (!document.getElementById('smarty-robot-custom-css')) {
  const style = document.createElement('style');
  style.id = 'smarty-robot-custom-css';
  style.innerHTML = `
    text.smarty-text-blue, .smarty-text-blue > tspan { fill: #2196F3 !important; font-weight: bold !important; }
    text.smarty-text-red,  .smarty-text-red > tspan  { fill: #F44336 !important; font-weight: bold !important; }
  `;
  document.head.appendChild(style);
}

const ICON_HAND_BLUE = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjMjE5NkYzIiBkPSJNMjg4IDMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjI1NmMwIDEuNy0uMSAzLjQtLjMgNUwyMDggMjQ1LjNjLTcuMi0xMS4yLTE5LjgtMTcuMy0zMi0xNy4zYy0yMi4xIDAtNDAgMTcuOS00MCA0MGMwIDUgLjkgOS44IDIuNSAxNC4ybC0zMi01MGMtMTEuNi0xOC4xLTM2LjItMjMuNC01NC4zLTExLjhzLTIzLjQgMzYuMi0xMS44IDU0LjNsOTYgMTUwYzI2LjkgNDIuMSA3Mi44IDY4LjMgMTIzIDY4LjNoNjRjNTMgMCA5Ni00MyA5Ni05NlYxMjhjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJWMjQwYzAgOC44LTcuMiAxNi0xNiAxNnMtMTYtNy4yLTE2LTE2VjY0YzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjI0MGMwIDguOC03LjIgMTYtMTYgMTZzLTE2LTcuMi0xNi0xNlYzMnoiLz48L3N2Zz4=";
const ICON_HAND_RED = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjRjQ0MzM2IiBkPSJNMjg4IDMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjI1NmMwIDEuNy0uMSAzLjQtLjMgNUwyMDggMjQ1LjNjLTcuMi0xMS4yLTE5LjgtMTcuMy0zMi0xNy4zYy0yMi4xIDAtNDAgMTcuOS00MCA0MGMwIDUgLjkgOS44IDIuNSAxNC4ybC0zMi01MGMtMTEuNi0xOC4xLTM2LjItMjMuNC01NC4zLTExLjhzLTIzLjQgMzYuMi0xMS44IDU0LjNsOTYgMTUwYzI2LjkgNDIuMSA3Mi44IDY4LjMgMTIzIDY4LjNoNjRjNTMgMCA5Ni00MyA5Ni05NlYxMjhjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJWMjQwYzAgOC44LTcuMiAxNi0xNiAxNnMtMTYtNy4yLTE2LTE2VjY0YzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjI0MGMwIDguOC03LjIgMTYtMTYgMTZzLTE2LTcuMi0xNi0xNlYzMnoiLz48L3N2Zz4=";
const ICON_SLIDE_BLUE = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzIxOTZFMyIgZD0iTTMgMTl2LTJoMnYtNEgzdi0yaDR2LTRINVY1aDZ2MTRoMTB2Mkgzem04LTEyaDNMMTkgMTZoLTNsLTUtOXoiLz48L3N2Zz4=";
const ICON_SLIDE_RED = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0Y0NDMzNiIgZD0iTTMgMTl2LTJoMnYtNEgzdi0yaDR2LTRINVY1aDZ2MTRoMTB2Mkgzem04LTEyaDNMMTkgMTZoLTNsLTUtOXoiLz48L3N2Zz4=";
const WARNING_ICON_RIGHT = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGQzEwNyIgc3Ryb2tlPSIjRTY1MTAwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTEyIDJMMSAyMWgyMkwxMiAyem0xIDE2aC0ydi0yaDJ2MnptMC00aC0ydi00aDJ2NHoiLz48L3N2Zz4=";

// =========================================================
// 🧱 4. 로봇 블록 초기화 함수 (기존과 동일)
// =========================================================
export function initRobotBlocks(arduinoGenerator: any) {
  
  const createBlockDef = (blockType: string, iconB64: string, keyword: string, labelTarget: string, color: string) => {
    return {
      init: function(this: any) {
        
        let defaultMin = blockSettings[blockType]?.min ?? 0;
        let defaultMax = blockSettings[blockType]?.max ?? 180;

        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(`data:image/svg+xml;base64,${iconB64}`, 18, 18, "*"))
            .appendField(new Blockly.FieldLabel(keyword, `smarty-text-${keyword === '블루' ? 'blue' : 'red'}`))
            .appendField(labelTarget + ' ') 
            .appendField(new Blockly.FieldDropdown([
              ['S1', 'S1'], ['S2', 'S2'], ['S3', 'S3'], ['S4', 'S4']
            ]), 'PORT');
            
        const angleInput = this.appendValueInput('ANGLE')
            .setCheck('Number')
            .appendField('각도 ')
            .appendField(new Blockly.FieldLabel(String(defaultMin)), 'MIN_LABEL')
            .appendField(' ≤');

        this.appendDummyInput('WARN_DUMMY')
            .appendField('≤ ')
            .appendField(new Blockly.FieldLabel(String(defaultMax)), 'MAX_LABEL');

        const shadowXml = Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">0</field></shadow>');
        angleInput.connection.setShadowDom(shadowXml);

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(color); 
      },
      
      onchange: function(this: any, event?: any) {
        if (this.isInFlyout) return;

        let currentMin = Number(blockSettings[blockType]?.min);
        let currentMax = Number(blockSettings[blockType]?.max);
        if (isNaN(currentMin)) currentMin = 0;
        if (isNaN(currentMax)) currentMax = 180;
        
        const minLabel = this.getField('MIN_LABEL');
        if (minLabel && minLabel.getValue() !== String(currentMin)) {
          minLabel.setValue(String(currentMin));
        }

        const maxLabel = this.getField('MAX_LABEL');
        if (maxLabel && maxLabel.getValue() !== String(currentMax)) {
          maxLabel.setValue(String(currentMax));
        }

        this.setTooltip(`현재 설정된 허용 범위: ${currentMin}도 ~ ${currentMax}도`);
        this.setWarningText(null); 

        const angleBlock = this.getInputTargetBlock('ANGLE');
        
        if (angleBlock && angleBlock.type === 'math_number') {
          let val = Number(angleBlock.getFieldValue('NUM'));
          if (isNaN(val)) val = 0;
          
          let hasError = (val < currentMin || val > currentMax);

          setTimeout(() => {
            if (angleBlock.svgGroup_) {
              const paths = angleBlock.svgGroup_.querySelectorAll('path.blocklyPath');
              if (hasError) {
                paths.forEach((path: SVGPathElement) => {
                  path.style.fill = '#FFC107'; 
                  path.style.stroke = '#E65100'; 
                });
              } else {
                paths.forEach((path: SVGPathElement) => {
                  path.style.fill = ''; 
                  path.style.stroke = ''; 
                });
              }
            }
          }, 10);

          if (hasError) {
            if (!this.getField('WARN_IMG')) {
              const warnIcon = new Blockly.FieldImage(`data:image/svg+xml;base64,${WARNING_ICON_RIGHT}`, 22, 22, "오류");
              this.getInput('WARN_DUMMY').appendField(warnIcon, 'WARN_IMG');
            }
            const errMsg = `⚠️ 제한 범위를 벗어났습니다!\n(허용 범위: ${currentMin}° ~ ${currentMax}°)`;
            this.getField('WARN_IMG').setTooltip(errMsg);
          } else {
            if (this.getField('WARN_IMG')) {
              this.getInput('WARN_DUMMY').removeField('WARN_IMG');
            }
          }

        } else {
          if (this.getField('WARN_IMG')) {
            this.getInput('WARN_DUMMY').removeField('WARN_IMG');
          }
        }
      }
    };
  };

  Blockly.Blocks['moveBlueHand'] = createBlockDef('moveBlueHand', ICON_HAND_BLUE, '블루', '핸드 제어', '#2196F3');
  Blockly.Blocks['moveRedHand'] = createBlockDef('moveRedHand', ICON_HAND_RED, '레드', '핸드 제어', '#F44336');
  Blockly.Blocks['moveBlueSlide'] = createBlockDef('moveBlueSlide', ICON_SLIDE_BLUE, '블루', '슬라이드 제어', '#2196F3');
  Blockly.Blocks['moveRedSlide'] = createBlockDef('moveRedSlide', ICON_SLIDE_RED, '레드', '슬라이드 제어', '#F44336');

  // =========================================================
  // 💻 5. C++ 코드 제너레이터 (기존과 동일)
  // =========================================================
  const generateProtectedServoCode = function(block: any) {
    const port = block.getFieldValue('PORT');
    const angleCode = arduinoGenerator.valueToCode(block, 'ANGLE', 0) || '0';
    
    let currentMin = Number(blockSettings[block.type]?.min);
    let currentMax = Number(blockSettings[block.type]?.max);
    if (isNaN(currentMin)) currentMin = 0;
    if (isNaN(currentMax)) currentMax = 180;

    const code = `if (${angleCode} >= ${currentMin} && ${angleCode} <= ${currentMax}) {\n  runServo(${port}, ${angleCode});\n}\n`;
    return code; 
  };

  arduinoGenerator.forBlock['moveBlueHand'] = generateProtectedServoCode;
  arduinoGenerator.forBlock['moveRedHand'] = generateProtectedServoCode;
  arduinoGenerator.forBlock['moveBlueSlide'] = generateProtectedServoCode;
  arduinoGenerator.forBlock['moveRedSlide'] = generateProtectedServoCode;
}