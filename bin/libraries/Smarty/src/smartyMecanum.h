#ifndef __XEDERS_SMARTY_MECANUM_H_
#define __XEDERS_SMARTY_MECANUM_H_

#include "smartyMecanum.h"
#include "smartyBase.h"
#include "smartyLib.h"

enum direction
{
  dirN = 0,
  dirNE,
  dirE,
  dirSE,
  dirS,
  dirSO,
  dirO,
  dirNO,
  rotR,
  rotL,
  dStop
};

#define MOTOR_DIRECTION true //로봇이 반대로 이동할 경우 true -> false로 변경해주세요.

void driveMecanum(int dir, int spd);

#endif