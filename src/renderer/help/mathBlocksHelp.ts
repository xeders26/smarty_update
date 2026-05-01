/*========================================================================
  src/renderer/help/mathBlocksHelp.ts
  - 숫자, 사칙연산, 랜덤, 절댓값, 범위 변환(map), 최댓값/최솟값 등 수학 연산 블록 도움말 데이터
========================================================================*/

export const MathBlocksHelp: Record<string, string> = {

  'math_number': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔢 숫자</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">원하는 숫자(정수 또는 실수)를 직접 입력하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>마우스로 블록 안의 숫자를 클릭하여 원하는 값으로 바꿀 수 있습니다.</li>
      <li>핀 번호, 기다리는 시간(딜레이), 모터 속도, 밝기 값 등을 설정할 때 다양한 블록과 결합하여 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음 : </span><span style="color:#e67e22;">블록 빈칸에 직접 원하는 숫자를 타자로 입력함</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 숫자 데이터 : </span><span style="color:#e67e22;">입력한 숫자 (정수형 또는 실수형) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">입력한 숫자</span>
    </div>
  `,

  'math_arithmetic': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">➕➖✖️➗ 사칙연산</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">두 개의 숫자를 가지고 더하기, 빼기, 곱하기, 나누기, 제곱을 계산해 주는 연산 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>가운데 있는 드롭다운 메뉴(▼)를 눌러 원하는 계산 기호를 선택할 수 있습니다.</li>
      <li>센서 값에 특정 숫자를 더하거나 곱해서 값을 보정할 때 자주 사용됩니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 계산 대상 숫자 : </span><span style="color:#e67e22;">계산에 사용할 두 개의 숫자 데이터</span><br>
        <span style="color:#f5b041;">• 연산 기호 : </span><span style="color:#e67e22;">더하기, 빼기, 곱하기, 나누기, 제곱 중 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 연산 결과 (숫자형) : </span><span style="color:#e67e22;">선택한 기호로 계산이 완료된 결과값(정수 또는 실수) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">(A + B)</span> <span style="color:#9aa5a6;">// 더하기</span><br>
      <span style="color:#9aa5a6;">(A - B)</span> <span style="color:#9aa5a6;">// 빼기</span><br>
      <span style="color:#9aa5a6;">(A * B)</span> <span style="color:#9aa5a6;">// 곱하기</span><br>
      <span style="color:#9aa5a6;">(A / B)</span> <span style="color:#9aa5a6;">// 나누기</span><br>
      <span style="color:#9aa5a6;">pow(A, B)</span> <span style="color:#9aa5a6;">// A의 B제곱</span>
    </div>
  `,

  'math_random_int': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🎲 무작위 정수(랜덤 값) 뽑기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">지정한 최솟값과 최댓값 사이에서 무작위(랜덤)로 정수 하나를 뽑아주는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>사용 예시: 1부터 6까지를 지정하면 진짜 주사위를 던지는 것처럼 매번 다른 숫자가 나옵니다.</li>
      <li>불빛을 무작위로 깜빡이게 하거나, 게임에서 장애물이 나타나는 위치를 무작위로 바꿀 때 아주 유용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 최소/최대 범위 : </span><span style="color:#e67e22;">무작위 값을 뽑을 범위의 최솟값과 최댓값 (정수)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 랜덤 수치 (정수형) : </span><span style="color:#e67e22;">지정한 범위 안에서 무작위로 뽑힌 정수 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">random(최솟값, 최댓값 + 1)</span>
    </div>
  `,

  'arduino_math_abs': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">➖➕ 절댓값 구하기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">숫자의 부호(+, -)를 떼어버리고 무조건 0보다 큰 양수(양의 정수/실수)로 만들어주는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>예: -5를 넣으면 5가 나옵니다. 5를 넣어도 5가 나옵니다.</li>
      <li>모터가 거꾸로 돌 때 발생할 수 있는 마이너스(-) 값을 방지하거나, 두 센서 값의 단순한 '차이(거리)'를 계산할 때 매우 유용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 대상 숫자 : </span><span style="color:#e67e22;">부호(+, -)를 제거할 대상 숫자 데이터 (정수 또는 실수)</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 절댓값 (숫자형) : </span><span style="color:#e67e22;">음수 기호가 제거된 무조건 0보다 큰 양수 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">abs(숫자)</span>
    </div>
  `,

  'arduino_math_map': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🗺️ 값 범위 변환하기 (map)</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">어떤 정보의 범위를 내가 원하는 새로운 범위의 비율로 쫙 늘리거나 압축해서 변환해 주는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>사용 예시: 빛 센서에서 읽은 값의 범위가 0 ~ 1023인데, 이 값을 LED의 밝기 값인 0 ~ 255에 맞춰서 줄이고 싶을 때 사용합니다.</li>
      <li>비례식을 컴퓨터가 알아서 계산해 주므로, 아날로그 센서 값을 모터 속도나 불빛 밝기로 바꿀 때 가장 많이 쓰이는 필수 블록입니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 원본 데이터 : </span><span style="color:#e67e22;">변환할 대상(예: 센서값)</span><br>
        <span style="color:#f5b041;">• 현재 범위 : </span><span style="color:#e67e22;">원본 값의 최솟값과 최댓값 지정</span><br>
        <span style="color:#f5b041;">• 바꿀 범위 : </span><span style="color:#e67e22;">새롭게 적용할 비율의 최솟값과 최댓값 지정</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 변환된 수치 (정수형) : </span><span style="color:#e67e22;">새로운 비율 범위에 맞게 계산된 정수 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">map(값, 현재_최솟값, 현재_최댓값, 바꿀_최솟값, 바꿀_최댓값)</span>
    </div>
  `,

  'smarty_math_in_range': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">📏 값이 특정 범위 안에 있는가?</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">검사할 숫자가 지정한 최솟값과 최댓값 사이에 안전하게 들어있는지 확인하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>사이에 있다면 참(True), 범위를 벗어났다면 거짓(False)을 반환합니다.</li>
      <li>"만약 ~라면" 블록과 짝꿍으로 사용하여, "센서 값이 10~50 사이일 때만 모터를 멈춰라" 같은 명령을 쉽게 만들 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 검사 대상 숫자 : </span><span style="color:#e67e22;">범위에 포함되는지 확인할 수치 데이터</span><br>
        <span style="color:#f5b041;">• 판단 범위 : </span><span style="color:#e67e22;">기준이 되는 하한값(최솟값)과 상한값(최댓값) 입력</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 범위 포함 여부 (논리형) : </span><span style="color:#e67e22;">지정한 범위 안에 있으면 참(true), 벗어나면 거짓(false) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">(값 >= 최솟값 && 값 <= 최댓값)</span>
    </div>
  `,

  'arduino_math_minmax': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚖️ 두 숫자 중 최댓값/최솟값 고르기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">입력한 두 개의 숫자 중에서 더 큰 값(최댓값)이나 더 작은 값(최솟값)을 알아서 골라주는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>최댓값 (max): 두 숫자 중 큰 숫자를 내보냅니다. (예: 모터 속도가 0 밑으로 떨어지지 않게 막을 때)</li>
      <li>최솟값 (min): 두 숫자 중 작은 숫자를 내보냅니다. (예: 센서 값이 255를 넘어가지 않게 천장을 만들 때)</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 비교 대상 숫자 : </span><span style="color:#e67e22;">비교할 두 개의 숫자 데이터</span><br>
        <span style="color:#f5b041;">• 옵션 선택 : </span><span style="color:#e67e22;">두 수 중 최댓값 또는 최솟값 선택</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 선택된 수치 (숫자형) : </span><span style="color:#e67e22;">옵션에 따라 두 숫자 중 더 크거나 더 작은 값 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">max(A, B)</span> <span style="color:#9aa5a6;">// 더 큰 값</span><br>
      <span style="color:#9aa5a6;">min(A, B)</span> <span style="color:#9aa5a6;">// 더 작은 값</span>
    </div>
  `
};