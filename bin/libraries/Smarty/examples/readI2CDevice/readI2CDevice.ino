// I2C 포트에 연결된 모든 I2C 장치들을 확인하는 예제입니다.

#include "smartyLib.h"

void setup() 
{
  beginSmarty();  // 스마티 보드를 사용하기위해 반드시 호출해야 합니다.
  getI2C();  // I2C 포트에 연결된 모든 I2C 장치를 확인해 Serial모니터에 출력합니다.
}

void loop() 
{
  
}
