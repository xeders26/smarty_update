//스마티 보드의 LED1, LED2를 1초마다 점멸하는 예제입니다.

#include "smartyLib.h"

void setup() {

  beginSmarty();  // 스마티 보드를 사용하기위해 반드시 호출해야 합니다.
}

void loop() {

  turnLed(LED1,ON);  //smarty보드의 LED1를 킵니다.
  turnLed(LED1,ON);  //smarty보드의 LED2를 킵니다.
  delay(1000);       //1초간 대기합니다.
  
  turnLed(LED1,OFF); //smarty보드의 LED1를 끕니다.
  turnLed(LED2,OFF); //smarty보드의 LED2를 끕니다.
  delay(1000);       //1초간 대기합니다.
}
