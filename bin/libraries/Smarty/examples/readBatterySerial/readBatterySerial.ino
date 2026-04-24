//스마티에 연결 된 배터리의 전압을 측정하는 예제입니다.

#include "smartyLib.h"

void setup()
{
  beginSmarty(); // 스마티 보드를 사용하기위해 반드시 호출해야 합니다.
}

void loop() 
{
  
  float voltage;

  voltage = getBattery();  // 현재 배터리 값을 알아내 voltage 변수에 저장합니다.
  Serial.println(voltage); // 배터리 상태를 시리얼 모니터에 출력합니다.
  delay(1000);  // 1초 동안 대기합니다.

}
