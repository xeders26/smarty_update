#include "smartyDrRobotLand.h"


void waitWhite(unsigned int threshold)
{
  SmartyBumperPairValue val;
  val = getBumperLineAnalog(0x30);
  while( val.l<threshold && val.r<threshold )
    val = getBumperLineAnalog(0x30);
}


void waitSW(unsigned int no) 
{
  while (!readSw(no))
  	delay(10);
  delay(300);
}

void openHand(int val)
{
    runServo(S2, val);
    delay(400);
}

void closeHand(int val)
{
    runServo(S2, val);
    delay(400);
}

void getBall(int val)
{
    runServo(S1, val);
    delay(400);
}

void putBall(int val)
{
    runServo(S1, val);
   delay(400);
}

SmartyBumperPairValue initLineSensor()
{
  int  i, sumL, sumR, whiteL, whiteR, blackL, blackR;
  SmartyBumperPairValue thresh, val;

  turnBumperBlinkLeftY(0x30, 1);
  turnBumperBlinkRightY(0x30, 1);
  waitSW(2);   
  turnBumperBlinkLeftY(0x30, 0);       //SW1이 눌릴 때까지 기다립니다.
  turnBumperBlinkRightY(0x30, 0); 
  turnBumperW(0x30, 1);
  sumL = sumR = 0;
  for(i=0;i<100;i++)
  {
     val = getBumperLineAnalog(0x30);
     sumL = sumL +  val.l;
     sumR = sumR +  val.r; 
     delay(30); 
  }
  whiteL = sumL / 100;
  whiteR = sumR / 100;
  turnBumperW(0x30, 0);
  turnBumperR(0x30, 1);
  waitSW(2); 
  turnBumperR(0x30, 1);
  turnBumperBlinkR(0x30, 1);
  sumL = sumR = 0;
  for(i=0;i<100;i++)
  {
     val = getBumperLineAnalog(0x30);
     sumL = sumL +  val.l;
     sumR = sumR +  val.r; 
     delay(30); 
  }
  blackL = sumL / 100;
  blackR = sumR / 100;
  turnBumperBlinkR(0x30, 0);
  thresh.l = (whiteL + blackL)/2;
  thresh.r = (whiteR + blackR)/2;
  return(thresh);
}
