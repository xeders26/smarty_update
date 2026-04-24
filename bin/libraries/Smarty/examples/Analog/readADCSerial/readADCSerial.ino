// 스마티 보드에 연결된 아날로그 장치의 아날로그값을 1초마다 측정하는 예제입니다.
// 해당 아날로그 장치는 A1에 연결 되어 있어야 합니다.
// 아날로그 장치의 측정범위는 0 ~ 1023까지 측정됩니다.

#include "smartyLib.h"

void setup()
{
  beginSmarty(); // 스마티 보드를 사용하기위해 반드시 호출해야 합니다.
}

void loop()
{
  int ADC;

  ADC = readAdc(A1); // A1에 연결된 아날로그 장치의 측정값을 알아내 ADC 변수에 저장합니다.
  Serial.println(ADC);  // ADC 측정값을 시리얼 모니터에 출력합니다.
  delay(1000);  // 1초 동안 대기합니다.
  
}
