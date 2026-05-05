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

const ICON_HAND_BLUE = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjg4IDMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjI1NmMwIDEuNy0uMSAzLjQtLjMgNUwyMDggMjQ1LjNjLTcuMi0xMS4yLTE5LjgtMTcuMy0zMi0xNy4zYy0yMi4xIDAtNDAgMTcuOS00MCA0MGMwIDUgLjkgOS44IDIuNSAxNC4ybC0zMi01MGMtMTEuNi0xOC4xLTM2LjItMjMuNC01NC4zLTExLjhzLTIzLjQgMzYuMi0xMS44IDU0LjNsOTYgMTUwYzI2LjkgNDIuMSA3Mi44IDY4LjMgMTIzIDY4LjNoNjRjNTMgMCA5Ni00MyA5Ni05NlYxMjhjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJWMjQwYzAgOC44LTcuMiAxNi0xNiAxNnMtMTYtNy4yLTE2LTE2VjY0YzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjI0MGMwIDguOC03LjIgMTYtMTYgMTZzLTE2LTcuMi0xNi0xNlYzMnoiLz48L3N2Zz4=";
const ICON_HAND_RED = ICON_HAND_BLUE;
const ICON_SLIDE_BLUE = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTMgMTl2LTJoMnYtNEgzdi0yaDR2LTRINVY1aDZ2MTRoMTB2Mkgzem04LTEyaDNMMTkgMTZoLTNsLTUtOXoiLz48L3N2Zz4=";
const ICON_SLIDE_RED = ICON_SLIDE_BLUE;
const WARNING_ICON_RIGHT = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGQzEwNyIgc3Ryb2tlPSIjRTY1MTAwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTEyIDJMMSAyMWgyMkwxMiAyem0xIDE2aC0ydi0yaDJ2MnptMC00aC0ydi00aDJ2NHoiLz48L3N2Zz4=";

// =========================================================
// 🧱 4. 로봇 블록 초기화 함수 (타이핑 끊김 완벽 해결!)
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
            // 🌟 드롭다운을 완전히 삭제하고 이름표만 남김
            .appendField(labelTarget); 
            
        const angleInput = this.appendValueInput('ANGLE')
            .setCheck('Number')
            .appendField('각도 ')
            .appendField(new Blockly.FieldLabel(String(defaultMin)), 'MIN_LABEL')
            .appendField(' ≤');

        // 기존 WARN_DUMMY 코드
        this.appendDummyInput('WARN_DUMMY')
            .appendField('≤ ')
            .appendField(new Blockly.FieldLabel(String(defaultMax)), 'MAX_LABEL')
            .appendField(new Blockly.FieldImage("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+", 22, 22, ""), 'WARN_IMG'); 

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

        const angleBlock = this.getInputTargetBlock('ANGLE');
        
        if (angleBlock && angleBlock.type === 'math_number') {
          let val = Number(angleBlock.getFieldValue('NUM'));
          if (isNaN(val)) val = 0;
          
          let hasError = (val < currentMin || val > currentMax);

          // SVG 테두리 색상 변경 (렌더링을 덮어쓰지 않으므로 입력창이 닫히지 않음!)
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

          // 오른쪽 경고 아이콘 토글
          const warnImgField = this.getField('WARN_IMG');
          if (warnImgField) {
            if (hasError) {
              warnImgField.setValue(`data:image/svg+xml;base64,${WARNING_ICON_RIGHT}`);
              warnImgField.setTooltip(`⚠️ 제한 범위를 벗어났습니다!\n(허용 범위: ${currentMin}° ~ ${currentMax}°)`);
            } else {
              warnImgField.setValue("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+");
              warnImgField.setTooltip("");
            }
          }

        } else {
          // 값이 아예 비어있을 땐 아이콘 지우기
          const warnImgField = this.getField('WARN_IMG');
          if (warnImgField) {
             warnImgField.setValue("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+");
             warnImgField.setTooltip("");
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
  // 💻 5. C++ 코드 제너레이터 
  // =========================================================
  const generateProtectedServoCode = function(block: any) {
    // 🌟 블록 타입(이름)에 'Hand'가 포함되어 있으면 S2, 아니면(Slide) S1으로 내부에서 자동 고정!
    const port = block.type.includes('Hand') ? 'S2' : 'S1';
    
    // 🌟 ORDER_ATOMIC 안전 보장: 코드가 누락되지 않도록 확실하게 파싱합니다.
    const ORDER = arduinoGenerator.ORDER_ATOMIC !== undefined ? arduinoGenerator.ORDER_ATOMIC : 0;
    const angleCode = arduinoGenerator.valueToCode(block, 'ANGLE', ORDER) || '0';
    
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