// 스마티 보드 / 디지털 포트에 터치센서를 연결해 
// 시리얼 모니터에서 입력을 확인하는 예제입니다.
// 해당 터치센서는 D1에 연결되어 있어야 합니다.

#include "smartyLib.h"

void setup()
{
  beginSmarty(); // 스마티 보드를 사용하기위해 반드시 호출해야 합니다.
}

void loop()
{
  boolean touch;
  touch = readDIO(D1);  //D1포트에 연결된 터치센서의 상태를 touch에 저장합니다. 
  
  Serial.println(touch); // 저장된 센서값을 시리얼 모니터에서 출력합니다.


}
