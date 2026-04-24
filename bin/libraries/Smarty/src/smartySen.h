#ifndef __XEDERS_SMARTY_SEN_H_
#define __XEDERS_SMARTY_SEN_H_

#include "smartyBase.h"

//Smarty ColorSensor
#define DEV_ADDR_COLORSEN 0x1E
#define CMD_COLORSEN 0x03
#define GET_COLOR_NUM_COLORSEN 0x04
#define GET_RED_INDEX_COLORSEN 0x0A
#define GET_BLUE_INDEX_COLORSEN 0x0C
#define GET_GREEN_INDEX_COLORSEN 0x0B
#define	MODE_ACTIVE_COLORSEN 0x00
#define MODE_PASSIVE_COLORSEN 0x01
#define MODE_60RATE_COLORSEN 0x35
#define MODE_50RATE_COLORSEN 0x36

void beginColorSensor(unsigned char addr = DEV_ADDR_COLORSEN , unsigned char mode = MODE_ACTIVE_COLORSEN);
int getColorNumber(unsigned char addr = DEV_ADDR_COLORSEN);
void _setupColorSensorRate(unsigned char addr,unsigned char rate);
void _setupColorSensorMode(unsigned char addr,unsigned char mode);
int getColorRed(unsigned char addr = DEV_ADDR_COLORSEN);
int getColorBlue(unsigned char addr = DEV_ADDR_COLORSEN);
int getColorGreen(unsigned char addr = DEV_ADDR_COLORSEN);

//Smarty RangeSensor
#define DEV_ADDR_RANGE	0x14
#define GET_RANGE_ULTRA_SONIC		0x04
#define GET_RANGE_OPTICAL_DISTANCE	0x05

void beginRangeSensor(void);
unsigned char getRangeUltrasonic(unsigned char addr = DEV_ADDR_RANGE);
unsigned char getRangeOptical(unsigned char addr = DEV_ADDR_RANGE);

//Smarty Integrating Gyro
#define DEV_ADDR_INTGYRO 0x10
#define CMD_GYRO 0x03
#define MODE_RESET_AND_SAVE_Z_AXIS_GYRO 0x4E
#define MODE_RESET_Z_AXIS_GYRO 0x52
#define GET_HEADING_DATA_GYRO 0x04
#define GET_INTEGRATED_Z_DATA_GYRO 0x06
#define GET_RAW_X_DATA_GYRO 0x08
#define GET_RAW_Y_DATA_GYRO 0x0A
#define GET_RAW_Z_DATA_GYRO 0x0C
#define MODE_SCALING_Z_AXIS_GYRO 0x10

void beginGyroSensor(void);
void saveGyroInit(unsigned char addr = DEV_ADDR_INTGYRO);
void setGyroInit(unsigned char addr = DEV_ADDR_INTGYRO);
unsigned int getGyroDgree(unsigned char addr = DEV_ADDR_INTGYRO);
int getGyroAbsolute(unsigned char addr = DEV_ADDR_INTGYRO);
int getGyroAxisX(unsigned char addr = DEV_ADDR_INTGYRO);
int getGyroAxisY(unsigned char addr = DEV_ADDR_INTGYRO);
int getGyroAxisZ(unsigned char addr = DEV_ADDR_INTGYRO);
void setGyroScale(unsigned char addr, float scale_value);

//Smarty Optical Distance Sensor
unsigned short getOptical(char ch);

//Smarty Bumper
#define DEV_ADDR_SMARTY_SEN_BUMPER 					0x30
#define DEV_ADDR_SMARTY_SEN_BUMPER2					0x31

#define REG_BUMPER_SET_YELLOW_BLINK_SPEED			0x01
#define REG_BUMPER_SET_RED_BLINK_SPEED				0x02
#define REG_BUMPER_SET_WHITE_BLINK_SPEED			0x03
#define REG_BUMPER_SET_THRESHOLD_PROXIMITY			0x04
#define REG_BUMPER_SET_THRESHOLD_LINE				0x05

#define REG_BUMPER_TURN_LEFT_YELLOW					0x10
#define REG_BUMPER_TURN_RIGHT_YELLOW				0x11
#define REG_BUMPER_TURN_RED							0x12
#define REG_BUMPER_TURN_WHITE						0x13
#define REG_BUMPER_TURN_BLINK_LEFT_YELLOW			0x14
#define REG_BUMPER_TURN_BLINK_RIGHT_YELLOW			0x15
#define REG_BUMPER_TURN_BLINK_RED					0x16
#define REG_BUMPER_TURN_BLINK_WHITE					0x17
#define REG_BUMPER_TURN_ALL_OFF						0x18

#define REG_BUMPER_GET_THRESHOLD_LEFT_PROXIMITY		0x20
#define REG_BUMPER_GET_THRESHOLD_RIGHT_PROXIMITY	0x21
#define REG_BUMPER_GET_THRESHOLD_LEFT_LINE			0x22
#define REG_BUMPER_GET_THRESHOLD_RIGHT_LINE			0x23
#define REG_BUMPER_GET_ANALOG_LEFT_PROXIMITY		0x24
#define REG_BUMPER_GET_ANALOG_RIGHT_PROXIMITY		0x25
#define REG_BUMPER_GET_ANALOG_LEFT_LINE				0x26
#define REG_BUMPER_GET_ANALOG_RIGHT_LINE			0x27
#define REG_BUMPER_GET_DIGIT_SENSOR					0x28
#define REG_BUMPER_GET_STATE						0x29
#define REG_BUMPER_GET_THRESHOLD_PROXIMITY			0x30
#define REG_BUMPER_GET_THRESHOLD_LINE				0x31
#define REG_BUMPER_GET_ANALOG_PROXIMITY				0x32
#define REG_BUMPER_GET_ANALOG_LINE					0x33

typedef struct 
{
	unsigned short l; //Left
	unsigned short r; //Right
}SmartyBumperPairValue;

typedef struct 
{
    unsigned int lineLeft :1;
	unsigned int lineRight :1;
	unsigned int prxLeft :1;
	unsigned int prxRight :1;
    unsigned int resv0 :1;
	unsigned int resv1 :1;
	unsigned int resv2 :1;
	unsigned int resv3 :1;
}SmartyBumperSensorDigit;

typedef struct 
{
    unsigned int yellowLeft :1;
	unsigned int yellowRight :1;
	unsigned int red :1;
	unsigned int white :1;
    unsigned int yellowLeftBlink :1;
    unsigned int yellowRightBlink :1;
	unsigned int redBlink :1;
	unsigned int whiteBlink :1;
}SmartyBumperStateDigit;

typedef union
{
    unsigned char byte;
    SmartyBumperSensorDigit d;
}SmartyBumperSensor;

typedef union
{
    unsigned char byte;
    SmartyBumperStateDigit d;
}SmartyBumperState;

void beginBumperSensor(void);
void setBumperBlinkY(unsigned char addr, unsigned short time);
void setBumperBlinkY(unsigned short time);
void setBumperBlinkR(unsigned char addr, unsigned short time);
void setBumperBlinkR(unsigned short time);
void setBumperBlinkW(unsigned char addr, unsigned short time);
void setBumperBlinkW(unsigned short time);
void setBumperPrx(unsigned char addr, unsigned short l, unsigned short r);
void setBumperPrx(unsigned short l, unsigned short r);
void setBumperLine(unsigned char addr, unsigned short l, unsigned short r);
void setBumperLine(unsigned short l, unsigned short r);

void turnBumperLeftY(unsigned char addr, unsigned char s);
void turnBumperLeftY(unsigned char s);
void turnBumperRightY(unsigned char addr, unsigned char s);
void turnBumperRightY(unsigned char s);
void turnBumperR(unsigned char addr, unsigned char s);
void turnBumperR(unsigned char s);
void turnBumperW(unsigned char addr, unsigned char s);
void turnBumperW(unsigned char s);
void turnBumperBlinkLeftY(unsigned char addr, unsigned char s);
void turnBumperBlinkLeftY(unsigned char s);
void turnBumperBlinkRightY(unsigned char addr, unsigned char s);
void turnBumperBlinkRightY(unsigned char s);
void turnBumperBlinkR(unsigned char addr, unsigned char s);
void turnBumperBlinkR(unsigned char s);
void turnBumperBlinkW(unsigned char addr, unsigned char s);
void turnBumperBlinkW(unsigned char s);
void turnBumperAllOff(unsigned char addr);
void turnBumperAllOff(void);

unsigned int getBumperLeftPrx(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
unsigned int getBumperRightPrx(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
unsigned int getBumperLeftLine(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
unsigned int getBumperRightLine(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
unsigned int getBumperLeftPrxAnalog(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
unsigned int getBumperRightPrxAnalog(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
unsigned int getBumperLeftLineAnalog(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
unsigned int getBumperRightLineAnalog(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
SmartyBumperSensor getBumperSensor(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
SmartyBumperState getBumperState(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
SmartyBumperPairValue getBumperPrx(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
SmartyBumperPairValue getBumperLine(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
SmartyBumperPairValue getBumperPrxAnalog(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);
SmartyBumperPairValue getBumperLineAnalog(unsigned char addr = DEV_ADDR_SMARTY_SEN_BUMPER);

#endif