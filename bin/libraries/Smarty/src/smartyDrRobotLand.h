#ifndef __XEDERS_SMARTY_DRROBOTLAND_H_
#define __XEDERS_SMARTY_DRROBOTLAND_H_

#include "smartyBase.h"
#include "smartySen.h"
#include "smartyLib.h"

#define MOTOR_DIRECTION true //로봇이 반대로 이동할 경우 true -> false로 변경해주세요.

void waitWhite(unsigned int threshold);
void waitSW(unsigned int no);
void openHand(int val);
void closeHand(int val);
void getBall(int val);
void putBall(int val);
SmartyBumperPairValue initLineSensor();

#endif