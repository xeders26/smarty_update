#include "SmartySen.h"

static Trans tBuf;

void beginColorSensor(unsigned char addr, unsigned char mode)
{	
	beginI2C();
	_setupColorSensorMode(addr,mode);
	delay(10);
	_setupColorSensorRate(addr,60);
}

void _setupColorSensorMode(unsigned char addr, unsigned char mode)
{
	startI2C(addr);
	writeI2C(CMD_COLORSEN);
	writeI2C(mode);
	stopI2C();
}

void _setupColorSensorRate(unsigned char addr, unsigned char rate)
{
	if(rate == 50) 
	rate = MODE_60RATE_COLORSEN;
	else if(rate == 60)
	rate = MODE_50RATE_COLORSEN;
	startI2C(addr);
	writeI2C(CMD_COLORSEN);
	writeI2C(rate);
	stopI2C();
}

int getColorNumber(unsigned char addr)
{
	startI2C(addr);
	writeI2C(GET_COLOR_NUM_COLORSEN);
	stopI2C();
	requestFromI2C(addr, 1);
	return(readI2C());
}

int getColorRed(unsigned char addr)
{
	startI2C(addr);
	writeI2C(GET_RED_INDEX_COLORSEN);
	stopI2C();
	requestFromI2C(addr,1);
	return(readI2C());
	/*startI2C(addr);
	writeI2C(0x0A);
	stopI2C();
	requestFromI2C(addr, 1);
	return(readI2C());*/
}

int getColorBlue(unsigned char addr)
{
	startI2C(addr);
	writeI2C(GET_BLUE_INDEX_COLORSEN);
	stopI2C();
	requestFromI2C(addr, 1);
	return(readI2C());
}

int getColorGreen(unsigned char addr)
{
	startI2C(addr);
	writeI2C(GET_GREEN_INDEX_COLORSEN);
	stopI2C();
	requestFromI2C(addr, 1);
	return(readI2C());
}

//Smarty UltraSonic
void beginRangeSensor(void)
{
	beginI2C();
}

unsigned char getRangeUltrasonic(unsigned char addr)
{
	unsigned char distance;
	startI2C(addr);
	writeI2C(GET_RANGE_ULTRA_SONIC);
	stopI2C();
	requestFromI2C(addr, 1);
	distance = readI2C();
	return distance;
}

unsigned char getRangeOptical(unsigned char addr)
{
	unsigned char distance;
	startI2C(addr);
	writeI2C(GET_RANGE_OPTICAL_DISTANCE);
	stopI2C();
	requestFromI2C(addr, 1);
	distance = readI2C();
	return distance;
}

//Smarty Gyro
void beginGyroSensor()
{
	beginI2C();
}

void saveGyroInit(unsigned char addr)
{
	startI2C(addr);
	writeI2C(CMD_GYRO);
	writeI2C(MODE_RESET_AND_SAVE_Z_AXIS_GYRO);
	stopI2C();
	do{
		startI2C(addr);
		writeI2C(CMD_GYRO);
		stopI2C();
		requestFromI2C(addr, 1);
	}while(readI2C() != 0);
}

void setGyroInit(unsigned char addr)
{
	startI2C(addr);
	writeI2C(CMD_GYRO);
	writeI2C(MODE_RESET_Z_AXIS_GYRO);
	stopI2C();
	do{
		startI2C(addr);
		writeI2C(CMD_GYRO);
		stopI2C();
		requestFromI2C(addr, 1);
	}while(readI2C() != 0);
}

unsigned int getGyroDgree(unsigned char addr)
{
	unsigned int lsb, msb;
	startI2C(addr);
	writeI2C(GET_HEADING_DATA_GYRO);
	stopI2C();
	requestFromI2C(addr,2);
	lsb = readI2C();
	msb = readI2C();
	return((msb << 8 ) | lsb);
}

int getGyroAbsolute(unsigned char addr)
{
	int lsb, msb;
	startI2C(addr);
	writeI2C(GET_INTEGRATED_Z_DATA_GYRO);
	stopI2C();
	requestFromI2C(addr,2);
	lsb = readI2C();
	msb = readI2C();
	return((msb << 8 ) | lsb);
}

int getGyroAxisX(unsigned char addr)
{
	int lsb, msb;
	startI2C(addr);
	writeI2C(GET_RAW_X_DATA_GYRO);
	stopI2C();
	requestFromI2C(addr, 2);
	lsb = readI2C();
	msb = readI2C();
	return((msb << 8 ) | lsb); 
}

int getGyroAxisY(unsigned char addr)
{
	int lsb, msb;
	startI2C(addr);
	writeI2C(GET_RAW_Y_DATA_GYRO);
	stopI2C();
	requestFromI2C(addr, 2);
	lsb = readI2C();
	msb = readI2C();
	return((msb << 8 ) | lsb); 
}

int getGyroAxisZ(unsigned char addr)
{
	int lsb, msb;
	startI2C(addr);
	writeI2C(GET_RAW_Z_DATA_GYRO);
	stopI2C();
	requestFromI2C(addr, 2);
	lsb = readI2C();
	msb = readI2C();
	return((msb << 8 ) | lsb); 
}

void setGyroScale(unsigned char addr, float scale_value)
{	
	int lsb, fsb;
	if(scale_value >= 1) 
	{
		lsb = 1;
		scale_value -= 1;
	}
	else 
		lsb = 0;
	fsb = byte(scale_value * 256);
    startI2C(addr);
    writeI2C(MODE_SCALING_Z_AXIS_GYRO);   
    writeI2C(fsb);
    writeI2C(lsb);
    stopI2C();
	saveGyroInit(addr);
}

//Smarty Optical Distance Sensor
unsigned short getOptical(char ch)
{
	return readAdc(ch);
}

//Smarty Bumper Sensor
void beginBumperSensor(void)
{
	beginI2C();
	setI2CSpeed(400000);
}

void setBumperBlinkY(unsigned char addr, unsigned short time)
{
	tBuf.l = 0;
	tBuf.i[0] = time;

	startI2C(addr);
	writeI2C(REG_BUMPER_SET_YELLOW_BLINK_SPEED);
	writeI2C(tBuf.c[1]);
	writeI2C(tBuf.c[0]);
	stopI2C();
}

void setBumperBlinkY(unsigned short time)
{
	setBumperBlinkY(DEV_ADDR_SMARTY_SEN_BUMPER, time);
}

void setBumperBlinkR(unsigned char addr, unsigned short time)
{
	tBuf.l = 0;
	tBuf.i[0] = time;

	startI2C(addr);
	writeI2C(REG_BUMPER_SET_RED_BLINK_SPEED);
	writeI2C(tBuf.c[1]);
	writeI2C(tBuf.c[0]);
	stopI2C();
}

void setBumperBlinkR(unsigned short time)
{
	setBumperBlinkR(DEV_ADDR_SMARTY_SEN_BUMPER, time);
}

void setBumperBlinkW(unsigned char addr, unsigned short time)
{
	tBuf.l = 0;
	tBuf.i[0] = time;

	startI2C(addr);
	writeI2C(REG_BUMPER_SET_WHITE_BLINK_SPEED);
	writeI2C(tBuf.c[1]);
	writeI2C(tBuf.c[0]);
	stopI2C();
}

void setBumperBlinkW(unsigned short time)
{
	setBumperBlinkW(DEV_ADDR_SMARTY_SEN_BUMPER, time);
}

void setBumperPrx(unsigned char addr, unsigned short l, unsigned short r)
{
	tBuf.l = 0;
	tBuf.i[0] = l;
	tBuf.i[1] = r;

	startI2C(addr);
	writeI2C(REG_BUMPER_SET_THRESHOLD_PROXIMITY);
	writeI2C(tBuf.c[1]);
	writeI2C(tBuf.c[0]);
	writeI2C(tBuf.c[3]);
	writeI2C(tBuf.c[2]);
	stopI2C();
}

void setBumperPrx(unsigned short l, unsigned short r)
{
	setBumperPrx(DEV_ADDR_SMARTY_SEN_BUMPER, l, r);
}

void setBumperLine(unsigned char addr, unsigned short l, unsigned short r)
{
	tBuf.l = 0;
	tBuf.i[0] = l;
	tBuf.i[1] = r;

	startI2C(addr);
	writeI2C(REG_BUMPER_SET_THRESHOLD_LINE);
	writeI2C(tBuf.c[1]);
	writeI2C(tBuf.c[0]);
	writeI2C(tBuf.c[3]);
	writeI2C(tBuf.c[2]);
	stopI2C();
}

void setBumperLine(unsigned short l, unsigned short r)
{
	setBumperLine(DEV_ADDR_SMARTY_SEN_BUMPER, l, r);
}

void turnBumperLeftY(unsigned char addr, unsigned char s)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_LEFT_YELLOW);
	writeI2C(s);
	stopI2C();
}

void turnBumperLeftY(unsigned char s)
{
	turnBumperLeftY(DEV_ADDR_SMARTY_SEN_BUMPER, s);
}

void turnBumperRightY(unsigned char addr, unsigned char s)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_RIGHT_YELLOW);
	writeI2C(s);
	stopI2C();
}

void turnBumperRightY(unsigned char s)
{
	turnBumperRightY(DEV_ADDR_SMARTY_SEN_BUMPER, s);
}

void turnBumperR(unsigned char addr, unsigned char s)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_RED);
	writeI2C(s);
	stopI2C();
}

void turnBumperR(unsigned char s)
{
	turnBumperR(DEV_ADDR_SMARTY_SEN_BUMPER, s);
}

void turnBumperW(unsigned char addr, unsigned char s)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_WHITE);
	writeI2C(s);
	stopI2C();
}

void turnBumperW(unsigned char s)
{
	turnBumperW(DEV_ADDR_SMARTY_SEN_BUMPER, s);
}

void turnBumperBlinkLeftY(unsigned char addr, unsigned char s)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_BLINK_LEFT_YELLOW);
	writeI2C(s);
	stopI2C();
}

void turnBumperBlinkLeftY(unsigned char s)
{
	turnBumperBlinkLeftY(DEV_ADDR_SMARTY_SEN_BUMPER, s);
}

void turnBumperBlinkRightY(unsigned char addr, unsigned char s)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_BLINK_RIGHT_YELLOW);
	writeI2C(s);
	stopI2C();
}

void turnBumperBlinkRightY(unsigned char s)
{
	turnBumperBlinkRightY(DEV_ADDR_SMARTY_SEN_BUMPER, s);
}

void turnBumperBlinkR(unsigned char addr, unsigned char s)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_BLINK_RED);
	writeI2C(s);
	stopI2C();
}

void turnBumperBlinkR(unsigned char s)
{
	turnBumperBlinkR(DEV_ADDR_SMARTY_SEN_BUMPER, s);
}

void turnBumperBlinkW(unsigned char addr, unsigned char s)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_BLINK_WHITE);
	writeI2C(s);
	stopI2C();
}

void turnBumperBlinkW(unsigned char s)
{
	turnBumperBlinkW(DEV_ADDR_SMARTY_SEN_BUMPER, s);
}

void turnBumperAllOff(unsigned char addr)
{
	startI2C(addr);
	writeI2C(REG_BUMPER_TURN_ALL_OFF);
	stopI2C();
}

void turnBumperAllOff(void)
{
	turnBumperAllOff(DEV_ADDR_SMARTY_SEN_BUMPER);
}

unsigned int getBumperLeftPrx(unsigned char addr)
{
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_THRESHOLD_LEFT_PROXIMITY);
	stopI2C();
	requestFromI2C(addr, 2);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();	

	return tBuf.i[0];
}

unsigned int getBumperRightPrx(unsigned char addr)
{
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_THRESHOLD_RIGHT_PROXIMITY);
	stopI2C();
	requestFromI2C(addr, 2);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();	

	return tBuf.i[0];
}

unsigned int getBumperLeftLine(unsigned char addr)
{
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_THRESHOLD_LEFT_LINE);
	stopI2C();
	requestFromI2C(addr, 2);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();	

	return tBuf.i[0];
}

unsigned int getBumperRightLine(unsigned char addr)
{
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_THRESHOLD_RIGHT_LINE);
	stopI2C();
	requestFromI2C(addr, 2);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();	

	return tBuf.i[0];
}

unsigned int getBumperLeftPrxAnalog(unsigned char addr)
{
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_ANALOG_LEFT_PROXIMITY);
	stopI2C();
	requestFromI2C(addr, 2);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();	

	return tBuf.i[0];
}

unsigned int getBumperRightPrxAnalog(unsigned char addr)
{
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_ANALOG_RIGHT_PROXIMITY);
	stopI2C();
	requestFromI2C(addr, 2);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();	

	return tBuf.i[0];
}

unsigned int getBumperLeftLineAnalog(unsigned char addr)
{
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_ANALOG_LEFT_LINE);
	stopI2C();
	requestFromI2C(addr, 2);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();	

	return tBuf.i[0];
}

unsigned int getBumperRightLineAnalog(unsigned char addr)
{
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_ANALOG_RIGHT_LINE);
	stopI2C();
	requestFromI2C(addr, 2);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();	

	return tBuf.i[0];
}

SmartyBumperSensor getBumperSensor(unsigned char addr)
{
	SmartyBumperSensor v;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_DIGIT_SENSOR);
	stopI2C();
	requestFromI2C(addr, 1);
	v.byte = readI2C();

	return v;
}

SmartyBumperState getBumperState(unsigned char addr)
{
	SmartyBumperState v;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_STATE);
	stopI2C();
	requestFromI2C(addr, 1);
	v.byte = readI2C();

	return v;
}

SmartyBumperPairValue getBumperPrx(unsigned char addr)
{
	SmartyBumperPairValue v;
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_THRESHOLD_PROXIMITY);
	stopI2C();
	requestFromI2C(addr, 4);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();
	tBuf.c[3] = readI2C();
	tBuf.c[2] = readI2C();	
	v.l = tBuf.i[0];
	v.r = tBuf.i[1];

	return v;
}

SmartyBumperPairValue getBumperLine(unsigned char addr)
{
	SmartyBumperPairValue v;
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_THRESHOLD_LINE);
	stopI2C();
	requestFromI2C(addr, 4);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();
	tBuf.c[3] = readI2C();
	tBuf.c[2] = readI2C();	
	v.l = tBuf.i[0];
	v.r = tBuf.i[1];

	return v;
}

SmartyBumperPairValue getBumperPrxAnalog(unsigned char addr)
{
	SmartyBumperPairValue v;
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_ANALOG_PROXIMITY);
	stopI2C();
	requestFromI2C(addr, 4);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();
	tBuf.c[3] = readI2C();
	tBuf.c[2] = readI2C();	
	v.l = tBuf.i[0];
	v.r = tBuf.i[1];

	return v;
}

SmartyBumperPairValue getBumperLineAnalog(unsigned char addr)
{
	SmartyBumperPairValue v;
	tBuf.l = 0;

	startI2C(addr);
	writeI2C(REG_BUMPER_GET_ANALOG_LINE);
	stopI2C();
	requestFromI2C(addr, 4);
	tBuf.c[1] = readI2C();
	tBuf.c[0] = readI2C();
	tBuf.c[3] = readI2C();
	tBuf.c[2] = readI2C();	
	v.l = tBuf.i[0];
	v.r = tBuf.i[1];

	return v;
}