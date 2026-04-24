#ifndef __XEDERS_SMARTY_H_
#define __XEDERS_SMARTY_H_

#include "smartyBase.h"
#include "smartySen.h"
#include "smartyAct.h"
#include "smartyApp.h"
#include "smartyMecanum.h"
#include "smartyDrRobotLand.h"

#define MODE_DIO_NORMAL         0
#define MODE_DIO_PWM         1
#define MAX_PWM_CNT            100

typedef struct
{
   unsigned char mode;
   unsigned char duty;
   void (*pWrite)(unsigned char state);
   unsigned char (*pRead)(void);
}DioInfo;

void _isrGPIO(void);
void writePWM(unsigned char id, unsigned char duty);
void initDio(void);
void write1(unsigned char state);
void write2(unsigned char state);
void write3(unsigned char state);
void write4(unsigned char state);
void write5(unsigned char state);
void write6(unsigned char state);
void write7(unsigned char state);
void write8(unsigned char state);


//Smarty 
void beginSmarty(void);
void _setupTimer(void);
void runTimer(char id, unsigned int interval);
void stopTimer(char id);
float getBattery(void);

__attribute__((weak))
void onTimer1(void); 
__attribute__((weak))
void onTimer2(void);


#define DIO_MODE_NORMAL 0
#define DIO_MODE_PWM 1


//Smarty Motor

void _setupMotor(void);
void _isrMotor(void);
void _driveMotor(char id, signed short spd);
void setMotor(char id, signed short spd);
void runMotor(char id, signed short spd);
void accDecMotor(char id, signed short startSpd, signed short finalSpd, signed short stepSpd, unsigned short interval);
void stopMotor(char id, char type);
void reverseMotor(char id);
void waitAccDecMotor(char id);
volatile SmartyMotor* getMotor(char id);

//Smarty Servo
void _setupServo(void); 
void _isrServo(void);
void setupServo(char id, unsigned int deg0Width = 600, unsigned int deg180Width = 2400); //(2400 - 600) / (180 - 0) * deg + 600
void runServo(char id, short deg);
void slowServo(char id, short startDeg, short finalDeg, short stepDeg, unsigned short interval);
void offServo(char id);

//Smarty Led
void _setupLed(void);
void _isrLed(void);
void _driveLed(char id, char state);
void turnLed(char id, char state);
void toggleLed(char id);
void blinkLed(char id, unsigned short onTime, unsigned short offTime);
void blinkCntLed(char id, unsigned short onTime, unsigned short offTime, unsigned short cnt);
void clearLed(char id);

// Smarty Switch


void _setupSwitch(void);
void _isrSwitch(void);
void _resetSw(char id);
volatile SmartySwitch* _getSwInfo(char id);

char readSw(char id);
char getSw(char id, unsigned short interval);
void waitUntilSw(char id, char state);

// Smarty Bluetooth
__attribute__((weak))
void onConnectedBt(void);

__attribute__((weak))
void onDisconnectedBt(void);

void _setupBt(void);
void _isrBtState(void);
void _isrBt(void);
void _cmdBt(void);
void turnBt(char state);
void setMainBt(void);
void setSubBt(void);
void setModeBt(char mode);
void setNameBt(char* pName);
void setPinBt(char* pPin);
char getStateBt(void);
short getByteBt(void);

#endif

/*
if(getSw(SW1) && getSwInfo(SW1)->timerPress > 50 && getSwInfo(SW1)->used = FALSE)
{  
	resetSw(SW1);
	Serial.write("Pressed\n");
}
*/