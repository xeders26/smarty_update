#ifndef __XEDERS_SMARTY_BASE_H_
#define __XEDERS_SMARTY_BASE_H_

#include "arduino.h"

#include <string.h>
#include <stdlib.h>
#include <inttypes.h>
#include <EEPROM.h>
#include <Wire.h>

extern "C"
{
	#include "utility/twi.h"
}

#define ON					1
#define OFF 				0

#define TRUE				1
#define FALSE				0

#define DISCONNECT			0
#define CONNECT				1

typedef unsigned char 		U8;
typedef char          		I8;
typedef char          		S8;
typedef unsigned int  		U16;
typedef int           		I16;
typedef const char    		CI8;
typedef const int     		CI16;
typedef unsigned long int 	U32;
typedef long int 			I32;

typedef union
{
	char c[4];
	short i[2];
	float f;
	long l;
}Trans;



//Smarty ADC
#define A1 1
#define A2 2
#define A3 3
#define A4 4
#define A5 5
#define A6 6
#define A7 7
#define A8 8
#define A_MAX A8+1

void _setupAdc(void);
unsigned short readAdc(char ch);
void waitUntilAdc(char ch, const char* com, int val);

//Smarty DIO


#define D1 1
#define D2 2
#define D3 3
#define D4 4
#define D5 5
#define D6 6
#define D7 7
#define D8 8
#define D_MAX D8+1

void _setupDIO(void);
void writeDIO(unsigned char ch, boolean data);
unsigned char readDIO(unsigned char ch, boolean pu = ON);

//Smarty EEPROM
#define MAX_EEPROM_SIZE				4095

void writeByteMem(unsigned short addr, unsigned char byte);
unsigned char readByteMem(unsigned short addr);
void write2ByteMem(unsigned short addr,  short data);
unsigned short read2ByteMem(unsigned short addr);
void write4ByteMem(unsigned short addr, long data);
unsigned long read4ByteMem(unsigned short addr);
void writeFloatMem(unsigned short addr, float data);
float readFloatMem(unsigned short addr);

//Smarty I2C
#define BUFFER_LENGTH 32

void getI2C(void);
void changeI2C(unsigned char fromAddr, unsigned char toAddr);
void changeI2Cserial(void);
void beginI2C(void);
void setI2CSpeed(unsigned int f);
void startI2C(unsigned char addr);
void writeI2C(unsigned char data);
uint8_t stopI2C(void);
uint8_t requestFromI2C(uint8_t addr, uint8_t quantity);
int readI2C(void);



//Smarty (Serial, Timer, sei)
#define VOLTAGE_ACTUATOR			(float)4.9


enum SmartyTimerDef
{
	T1 = 1,
	T2,

	TIMER_MAX
};

typedef struct SmartyTimer
{ 
	unsigned int timer;
	unsigned int interval;
	void (*pOnTimer)(void);
};



//Smarty Motor
#define MAX_SPEED					1023
#define MIN_SPEED					-1023

#define BRAKE_OFF					0
#define BRAKE_ON					1

#define MOTOR_MODE_NORMAL			0
#define MOTOR_MODE_ACCDEC			1

enum SmartyMotorDef
{
	M1 = 1,
	M2,
	M3,
	M4,

	MOTOR_MAX
};

typedef struct SmartyMotor
{
	char step;
	char mode;
	char brakeType;
	signed short timer;
	signed short startSpd;
	signed short finalSpd;
	signed short curSpd;
	signed short stepSpd;
	signed short interval;
};



//Smarty Servo
#define SERVO_MODE_NORMAL			0
#define SERVO_MODE_SLOW				1

enum SmartyServoDef
{
	S1 = 1,
	S2,
	S3,
	S4,

	SERVO_MAX
};

typedef struct SmartyServo
{
	char step;	
	char mode;
	int timer;
	short deg0Width;
	short deg180Width;
	float slope;
	short curDeg;
	short prevDeg;
	short startDeg;
	short finalDeg;
	short stepDeg;
	short interval;
};


//Smarty Led
#define LED_MODE_NORMAL				0	
#define LED_MODE_BLINK				1
#define LED_MODE_BLINK_CNT			2
#define LED_MODE_BRIGHT				3
#define LED_MODE_BRIGHT_BLINK		4
#define LED_MODE_BRIGHT_BLINK_CNT 	5

enum SmartyLEDDef
{
	LED1 = 1,
	LED2,

	LED_MAX
};

typedef struct SmartyLed
{
	char curState;
	char mode;
	char step;
	unsigned short timer;
	unsigned short onTime;
	unsigned short offTime;
	unsigned short cntTarget;
	unsigned short cnt;	
};

//Smarty Sw
#define IDX_NONE					0
#define IDX_SW1						0x01
#define IDX_SW2						0x02

enum SmartySwitchDef
{
	SW1 = 1,
	SW2,

	SW_MAX
};

typedef struct SmartySwitch
{
	int timerPress;
	char used;
};

//Smarty Bluetooth
#define RX_ERROR					256
#define BT_CONN_INTERVAL			500 //500ms


#endif