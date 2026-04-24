// 스마티 보드 / 디지털 포트에 외부 LED를 연결해 1초마다 점멸하는 예제입니다.
// 해당 LED 는 D1에 연결되어 있어야 합니다.

#include "smartyLib.h"

void setup()
{
  beginSmarty(); // 스마티 보드를 사용하기위해 반드시 호출해야 합니다.
}

void loop()
{
  writeDIO(D1, true); // D1 포트에 5v를 출력합니다.
  delay(1000);        // 1초동안 대기합니다.
  writeDIO(D1, false); // D1 포트에서 출력을 정지합니다(0v 출력)
  delay(1000);        // 1초동안 대기합니다.


}
