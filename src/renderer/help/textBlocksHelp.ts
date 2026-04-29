/*========================================================================
  src/renderer/help/textBlocksHelp.ts
  - 문자(텍스트) 입력, 병합, 비교 및 대기 블록 도움말 데이터
=================================================*/

export const TextBlocksHelp: Record<string, string> = {

  'text': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔤 글자(문자열) 입력</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">단어나 문장을 직접 타자로 입력할 수 있는 가장 기본이 되는 글자 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>빈칸에 원하는 글자(예: "Hello", "GO", "STOP")를 입력하여 다른 블록에 끼워 넣습니다.</li>
      <li>PC 모니터에 글자를 출력하거나, 블루투스로 명령을 보낼 때 주로 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 입력값 없음 : </span><span style="color:#e67e22;">블록의 빈칸에 직접 문자를 타이핑함</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 문자 데이터 : </span><span style="color:#e67e22;">입력한 글자 (String 형태) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">"입력한_글자"</span>
    </div>
  `,

  'text_join': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔗 글자 이어 붙이기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">여러 개의 글자나 센서의 숫자 값들을 하나의 긴 문장으로 기차처럼 연결해 주는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>톱니바퀴 아이콘을 눌러 연결할 칸의 개수를 늘리거나 줄일 수 있습니다.</li>
      <li>사용 예시: "거리: " + [초음파 센서 값] + " cm" ➔ "거리: 15 cm"</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 결합 대상 데이터 : </span><span style="color:#e67e22;">연결할 여러 개의 글자(String)나 숫자(int, float) 데이터 블록들</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 병합된 문자 데이터 : </span><span style="color:#e67e22;">순서대로 하나로 합쳐진 긴 문자열 (String) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">String(A) + String(B)</span>
    </div>
  `,

  'wait_until_text_same': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 글자가 같아질 때까지 기다리기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">비교하는 두 글자(또는 변수 값)가 완벽하게 똑같아질 때까지 다음 명령을 실행하지 않고 기다리는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>사용 예시: 스마트폰(블루투스)에서 "START"라는 글자가 날아올 때까지 로봇을 출발시키지 않고 대기시킬 때 유용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 비교할 글자 1 : </span><span style="color:#e67e22;">확인할 대상 데이터 (변수나 센서값 등)</span><br>
        <span style="color:#f5b041;">• 비교할 글자 2 : </span><span style="color:#e67e22;">조건이 되는 기준 문자 데이터</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">두 문자가 완전히 일치할 때까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">while(String(A) != String(B)) { delay(10); }</span>
    </div>
  `,

  'wait_until_text_different': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⏳ 글자가 달라질 때까지 기다리기</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">비교하는 두 글자가 서로 다른 상태가 될 때까지 기다리는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>현재 상태가 변하는 바로 그 순간(예: "정지" 상태에서 다른 상태로 바뀔 때)을 포착하여 다음 코드로 넘어갈 때 사용합니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 비교할 글자 1 : </span><span style="color:#e67e22;">확인할 대상 데이터 (변수나 센서값 등)</span><br>
        <span style="color:#f5b041;">• 비교할 글자 2 : </span><span style="color:#e67e22;">조건이 되는 기준 문자 데이터</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 없음 : </span><span style="color:#e67e22;">두 문자가 달라질 때(변화가 생길 때)까지 코드 진행 일시 정지</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">while(String(A) == String(B)) { delay(10); }</span>
    </div>
  `,

  'smarty_text_contains': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">🔍 글자가 포함되어 있는가?</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">어떤 긴 문장 안에 내가 찾고 싶은 특정 단어나 글자가 쏙 들어있는지 확인하는 블록입니다.</p>
    <ul style="font-weight: normal;">
      <li>포함되어 있으면 참(True), 없으면 거짓(False)을 알려줍니다.</li>
      <li>사용 예시: "HELLO WORLD" 안에 "WORLD"가 포함되어 있는지 검사할 때.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 전체 문장 데이터 : </span><span style="color:#e67e22;">검사할 대상이 되는 원본 문자열</span><br>
        <span style="color:#f5b041;">• 찾고 싶은 글자 : </span><span style="color:#e67e22;">포함 여부를 확인할 특정 단어 또는 문자</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 (논리형) : </span><span style="color:#e67e22;">포함되어 있으면 참(true), 아니면 거짓(false) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">(String(A).indexOf(String(B)) >= 0)</span>
    </div>
  `,

  'smarty_text_equals': `
    <h3 style="color: #3498db; margin-top:0; font-size: 1.0rem; font-weight: normal;">⚖️ 두 글자가 완전히 같은가?</h3>
    <hr style="border-color: rgba(255,255,255,0.1);">
    <p style="font-weight: normal;">두 개의 문장이나 단어가 띄어쓰기와 대소문자까지 토씨 하나 안 틀리고 똑같은지 확인합니다.</p>
    <ul style="font-weight: normal;">
      <li>똑같으면 참(True), 조금이라도 다르면 거짓(False)을 알려줍니다.</li>
      <li>"만약 ~라면" 블록과 짝을 이루어, 특정 명령어("GO", "STOP" 등)가 들어왔을 때만 로봇이 움직이게 만들 수 있습니다.</li>
    </ul>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-left:4px solid #f39c12 !important; padding:8px 12px; border-radius:4px; font-size:0.95em; line-height:1.6;">
      <div style="margin-bottom: 4px;"><span style="color:#2ecc71;">📥</span> <span style="color:#bdc3c7; font-weight:bold;">입력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 비교 대상 글자 1 : </span><span style="color:#e67e22;">검사할 대상 문자 데이터</span><br>
        <span style="color:#f5b041;">• 비교 대상 글자 2 : </span><span style="color:#e67e22;">조건이 되는 기준 문자 데이터</span>
      </div>
      <div style="height: 12px;"></div>
      <div style="margin-bottom: 4px;"><span style="color:#3498db;">📤</span> <span style="color:#bdc3c7; font-weight:bold;">출력 정보</span></div>
      <div style="padding-left: 20px;">
        <span style="color:#f5b041;">• 반환값 (논리형) : </span><span style="color:#e67e22;">완벽히 일치하면 참(true), 다르면 거짓(false) 반환</span>
      </div>
    </div>
    
    <div style="height: 8px;"></div>
    
    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-left:3px solid #9b59b6 !important; font-family: monospace; border-radius: 4px;">
      <span style="color:#bdc3c7; font-size: 0.85em;">C++ 변환 코드:</span><br>
      <span style="color:#9aa5a6;">(String(A) == String(B))</span>
    </div>
  `
};