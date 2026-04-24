#include "smartyMecanum.h"

void driveMecanum(int dir, int spd) {

  int leftMotorDir, rightMotorDir;
  if (MOTOR_DIRECTION)
  {
    leftMotorDir = 1;
    rightMotorDir = -1;
  }
  else
  {
    leftMotorDir = -1;
    rightMotorDir = 1;
  }
  switch ( dir ) {
    case dStop:
      stopMotor(M1, BRAKE_ON);
      stopMotor(M2, BRAKE_ON);
      stopMotor(M3, BRAKE_ON);
      stopMotor(M4, BRAKE_ON);
      break;

    case dirN :
      runMotor(M1, spd * leftMotorDir);
      runMotor(M2, spd * leftMotorDir) ;
      runMotor(M3, spd * rightMotorDir);
      runMotor(M4, spd * rightMotorDir);
      break;
    case dirS :
      runMotor(M1, -1 * spd * leftMotorDir);
      runMotor(M2, -1 * spd * leftMotorDir) ;
      runMotor(M3, -1 * spd * rightMotorDir);
      runMotor(M4, -1 * spd * rightMotorDir);
      break;
    case dirO :
      runMotor(M1, spd * leftMotorDir);
      runMotor(M2, -1 * spd * leftMotorDir) ;
      runMotor(M3, -1 * spd * rightMotorDir);
      runMotor(M4, spd * rightMotorDir);
      break;
    case dirE :
      runMotor(M1, -1 * spd * leftMotorDir);
      runMotor(M2, spd * leftMotorDir) ;
      runMotor(M3, spd * rightMotorDir);
      runMotor(M4, -1 * spd * rightMotorDir);
      break;
    case dirNE :
      runMotor(M1, 0);
      runMotor(M2, spd * leftMotorDir) ;
      runMotor(M3, spd * rightMotorDir);
      runMotor(M4, 0);
      break;
    case dirSE :
      runMotor(M1, -1 * spd * leftMotorDir);
      runMotor(M2, 0) ;
      runMotor(M3, 0);
      runMotor(M4, -1 * spd * rightMotorDir);
      break;
    case dirSO :
      runMotor(M1, 0);
      runMotor(M2, -1 * spd * leftMotorDir) ;
      runMotor(M3, -1 * spd * rightMotorDir);
      runMotor(M4, 0);
      break;
    case rotR :
      runMotor(M1, spd * leftMotorDir);
      runMotor(M2, spd * leftMotorDir) ;
      runMotor(M3, spd * -1 * rightMotorDir);
      runMotor(M4, spd * -1 * rightMotorDir);
      break;
    case rotL :
      runMotor(M1, spd * -1 * leftMotorDir);
      runMotor(M2, spd * -1 * leftMotorDir) ;
      runMotor(M3, spd * rightMotorDir);
      runMotor(M4, spd * rightMotorDir);
      break;
    case dirNO :
      runMotor(M1, spd * leftMotorDir);
      runMotor(M2, 0) ;
      runMotor(M3, 0);
      runMotor(M4, spd * rightMotorDir);
      break;
  }
}

