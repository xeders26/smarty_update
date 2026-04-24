#include "smartyLib.h"

static volatile SmartyTimer _timer[TIMER_MAX-1];
static volatile SmartyMotor _motor[MOTOR_MAX-1];
static volatile SmartyServo _servo[SERVO_MAX-1];
static volatile SmartySwitch _sw[SW_MAX-1];
static volatile SmartyLed _led[LED_MAX-1];
static volatile char _btConnState;
static volatile unsigned short _btConnTimer;
static volatile char _btInitState;
static volatile unsigned short _btInitTimer;


unsigned char timer = 0;
DioInfo dio[8];
unsigned char pwm = 0;





ISR(TIMER2_COMPA_vect) //Timer Interrupt Service Routine (1ms)
{
	_isrGPIO();

	if(++timer > 10)
	{
		timer = 0;
		_isrMotor();
		_isrServo();
		_isrLed();
		_isrSwitch();
		_isrBt();

		for(int n=0; n<TIMER_MAX - 1; n++)
		{
			if(_timer[n].interval != 0) //Check Run State
			{
				if(++_timer[n].timer >= _timer[n].interval)
				{
					_timer[n].timer = 0;
					_timer[n].pOnTimer();
				}
			}
		}		
	}
	
}

ISR(PCINT2_vect)
{
	_isrBtState();
}


void _isrGPIO(void)
{
   if (pwm++ >= MAX_PWM_CNT)
      pwm = 0;
   
   for (int n = 0; n < 8; n++)
   {
      if (dio[n].mode == MODE_DIO_PWM)
      {
         if (pwm < dio[n].duty)
            dio[n].pWrite(ON);
         else
            dio[n].pWrite(OFF);
      }
   }
}

//------------------------------------------------------------------------
void writePWM(unsigned char id, unsigned char duty)
{
   dio[id - 1].mode = MODE_DIO_PWM;
   dio[id - 1].duty = duty;
}

/*
void digitalWrite(unsigned char id, unsigned char state)
{
   dio[id - 1].mode = MODE_DIO_NORMAL;
   dio[id - 1].pWrite(state);
}

unsigned char digitalRead(unsigned char id)
{
   dio[id - 1].mode = MODE_DIO_NORMAL;
   return dio[id - 1].pRead();
}
*/

void initDio(void)
{
   for (int n = 0; n < 8; n++)
   {
      dio[n].mode = MODE_DIO_NORMAL;
      dio[n].duty = 0;
      dio[n].pWrite = 0;
      dio[n].pRead = 0;
   }

	dio[0].pWrite = write1;
	dio[1].pWrite = write2;
	dio[2].pWrite = write3;
	dio[3].pWrite = write4;
	dio[4].pWrite = write5;
	dio[5].pWrite = write6;
	dio[6].pWrite = write7;
	dio[7].pWrite = write8;
}

void write1(unsigned char state)
{
	if (state)
		DDRB |= (1 << PB0);	
	else	
		DDRB &= ~(1 << PB0);
}

void write2(unsigned char state)
{
	if (state)
		DDRJ |= (1 << PJ0);
	else	
		DDRJ &= ~(1 << PJ0);
}

void write3(unsigned char state)
{
	if (state)
		DDRJ |= (1 << PJ1);
	else	
		DDRJ &= ~(1 << PJ1);
}

void write4(unsigned char state)
{
	if (state)
		DDRJ |= (1 << PJ2);
	else	
		DDRJ &= ~(1 << PJ2);
}

void write5(unsigned char state)
{
	if (state)
		DDRJ |= (1 << PJ3);
	else	
		DDRJ &= ~(1 << PJ3);
}

void write6(unsigned char state)
{
	if (state)
		DDRJ |= (1 << PJ4);
	else	
		DDRJ &= ~(1 << PJ4);
}

void write7(unsigned char state)
{
	if (state)
		DDRJ |= (1 << PJ5);
	else	
		DDRJ &= ~(1 << PJ5);
}

void write8(unsigned char state)
{
	if (state)
		DDRJ |= (1 << PJ6);
	else	
		DDRJ &= ~(1 << PJ6);
}

//------------------------------------------------------------------------
//Smarty 
void beginSmarty(void)
{
	delay(100);

	Serial.begin(9600);
	Serial.write("Start Xeders Smarty V20200417\n");
	beginI2C();
	_setupTimer();
	_setupMotor();
	_setupServo();
	_setupLed();
	_setupSwitch();
	_setupBt();
	_setupAdc();
	_setupDIO();
	initDio();
	sei();
}



void _setupTimer(void)
{
	TCCR2A = 0; 
	TCCR2B = 0; 
	TCNT2 = 0;  
	OCR2A = 25; //Period: 1000us
	TCCR2A |= (1 << WGM01); //CTC OCR Compare Match
	TCCR2B |= (1 << CS22); // CLK (16Mhz) / 64
	TIMSK2 |= (1 << OCIE0A);

	for(int n=0; n<TIMER_MAX - 1; n++)
	{
		_timer[n].timer = 0;
		_timer[n].interval = 0;
	}
}

void runTimer(char id, unsigned int interval)
{
	if(id < T1 || id > T2)
		return;

	_timer[id - 1].timer = 0;
	_timer[id - 1].interval = interval;

	switch(id)
	{
		case T1:
			_timer[id - 1].pOnTimer = onTimer1;
		break;
		case T2:
			_timer[id - 1].pOnTimer = onTimer2;		
		break;
	}
}

void stopTimer(char id)
{
	if(id < T1 || id > T2)
		return;

	_timer[id - 1].timer = 0;
	_timer[id - 1].interval = 0;
}

__attribute__((weak))
void onTimer1(void)
{
	//For User Override	
}
__attribute__((weak))
void onTimer2(void)
{
	//For User Override	
}

float getBattery(void)
{
	/*
	const float R1 = 4.7F;
	const float R2 = 10.0F;
	*/
	const float R1 = 10.0F;
	const float R2 = 4.7F;

	return (analogRead(A8) * 0.004888) * ((R1 + R2) / R2);	
}

//Smarty Motor
void _setupMotor(void)
{
	DDRB |= (1 << PB5) | (1 << PB6);
	DDRE |= (1 << PE3) | (1 << PE4);
	DDRA |= (1 << PA4) | (1 << PA5) | (1 << PA6) | (1 << PA7);
	DDRH |= (1 << PH7);
	DDRG |= (1 << PG3) | (1 << PG4);
	DDRL |= (1 << PL0);

	PORTB &= ~((1 << PB5) | (1 << PB6));
	PORTE &= ~((1 << PE3) | (1 << PE4));
	PORTA &= ~((1 << PA4) | (1 << PA5) | (1 << PA6) | (1 << PA7));
	PORTH &= ~(1 << PH7);
	PORTG &= ~((1 << PG3) | (1 << PG4));
	PORTL &= ~(1 << PL0);

	TCCR1A = 0;
	TCCR1B = 0;
	TCCR1C = 0;
	TCCR3A = 0;
	TCCR3B = 0;
	TCCR3C = 0;

	OCR1A = 0;
	OCR1B = 0;
	OCR1C = 0;
	OCR3A = 0;
	OCR3B = 0;
	OCR3C = 0;

	if(getBattery() > VOLTAGE_ACTUATOR)
	{
		TCCR1A |= (1 << COM1A1) | (1 << COM1B1) | (1 << WGM11) | (1 << WGM10);
		TCCR1B |= (1 << CS11);
		TCNT1 = 0;
		TCCR3A |= (1 << COM3A1) | (1 << COM3B1) | (1 << WGM31) | (1 << WGM30);
		TCCR3B |= (1 << CS11);
		TCNT3 = 0;		
	}

	for(int n=0; n<MOTOR_MAX - 1; n++)
	{
		_motor[n].step = 0;
		_motor[n].mode = MOTOR_MODE_NORMAL;
		_motor[n].brakeType = BRAKE_OFF;
		_motor[n].timer = 0;
		_motor[n].finalSpd = 0;
		_motor[n].curSpd = 0;
		_motor[n].stepSpd = 0;
		_motor[n].interval = 0;						
	}
}

void _isrMotor(void)
{
	for(int n=0; n<MOTOR_MAX - 1; n++)
	{
		if(_motor[n].mode == MOTOR_MODE_ACCDEC)
		{
			switch(_motor[n].step)
			{
				case 0: //Start
					_driveMotor(n + 1, _motor[n].curSpd);

					_motor[n].step = 1;				
				break;
				case 1: //Wait Step Time
					if (_motor[n].timer++ > _motor[n].interval)
						_motor[n].step = 2;						
				break;
				case 2: //Acc Dec
					if (_motor[n].curSpd > 0)
					{
						if (_motor[n].curSpd < _motor[n].finalSpd) //Acc
							_motor[n].curSpd += _motor[n].stepSpd;
						else if (_motor[n].curSpd > _motor[n].finalSpd) //Dec
							_motor[n].curSpd -= _motor[n].stepSpd;			
					}
					else
					{
						if (_motor[n].curSpd >_motor[n].finalSpd) //Acc
							_motor[n].curSpd -= _motor[n].stepSpd;
						else if (_motor[n].curSpd < _motor[n].finalSpd) //Dec
							_motor[n].curSpd += _motor[n].stepSpd;						
					}

					if (abs(_motor[n].finalSpd - _motor[n].curSpd) < _motor[n].stepSpd)
					{
						if (_motor[n].curSpd > _motor[n].finalSpd)
							_motor[n].curSpd = _motor[n].finalSpd;
						else if (_motor[n].curSpd < _motor[n].finalSpd)
							_motor[n].curSpd = _motor[n].finalSpd;			
					}
			
					_driveMotor(n + 1, _motor[n].curSpd);

					_motor[n].timer = 0;

					if (_motor[n].curSpd != _motor[n].finalSpd)
						_motor[n].step = 1;
					else
						_motor[n].step = 3;				
				break;
				case 3: //Complete

				break;
			}
		}
	}
}

void _driveMotor(char id, signed short spd)
{
	spd *= -1;
	if (spd > MAX_SPEED)
		spd = MAX_SPEED;
	else if (spd < MIN_SPEED)
		spd = MIN_SPEED;

	_motor[id - 1].curSpd = spd;

	switch (id)
	{
		case  M1:
			if (spd > 0)
			{
				PORTG |= (1 << PG4);
				PORTL &= ~(1 << PL0);
				OCR1B = spd;
			}
			else if (spd < 0)
			{
				PORTG &= ~(1 << PG4);
				PORTL |= (1 << PL0);
				OCR1B = (spd * -1);
			}
			else
			{
				if (_motor[id - 1].brakeType == BRAKE_OFF)
				{
					PORTG &= ~(1 << PG4);
					PORTL &= ~(1 << PL0);
				}
				else //BRAKE_FAST
				{
					PORTG |= (1 << PG4);
					PORTL |= (1 << PL0);
				}

				OCR1B = 0;
			}		
		break;
		case  M2:
			if (spd > 0)
			{
				PORTH |= (1 << PH7);
				PORTG &= ~(1 << PG3);
				OCR1A = spd;
			}
			else if (spd < 0)
			{
				PORTH &= ~(1 << PH7);
				PORTG |= (1 << PG3);
				OCR1A = (spd * -1);
			}
			else
			{
				if (_motor[id - 1].brakeType == BRAKE_OFF)
				{
					PORTH &= ~(1 << PH7);
					PORTG &= ~(1 << PG3);
				}
				else //BRAKE_FAST
				{
					PORTH |= (1 << PH7);
					PORTG |= (1 << PG3);
				}

				OCR1A = 0;
			}		
		break;
		case  M3:
			if (spd > 0)
			{
				PORTA |= (1 << PA6);
				PORTA &= ~(1 << PA7);
				OCR3B = spd;
			}
			else if (spd < 0)
			{
				PORTA &= ~(1 << PA6);
				PORTA |= (1 << PA7);
				OCR3B = (spd * -1);
			}
			else
			{
				if (_motor[id - 1].brakeType == BRAKE_OFF)
				{
					PORTA &= ~(1 << PA6);
					PORTA &= ~(1 << PA7);
				}
				else //BRAKE_FAST
				{
					PORTA |= (1 << PA6);
					PORTA |= (1 << PA7);
				}

				OCR3B = 0;
			}		
		break;
		case  M4:
			if (spd > 0)
			{
				PORTA |= (1 << PA4);
				PORTA &= ~(1 << PA5);
				OCR3A = spd;
			}
			else if (spd < 0)
			{
				PORTA &= ~(1 << PA4);
				PORTA |= (1 << PA5);
				OCR3A = (spd * -1);
			}
			else
			{
				if (_motor[id - 1].brakeType == BRAKE_OFF)
				{
					PORTA &= ~(1 << PA4);
					PORTA &= ~(1 << PA5);
				}
				else //BRAKE_FAST
				{
					PORTA |= (1 << PA4);
					PORTA |= (1 << PA5);
				}

				OCR3A = 0;
			}
		break;
	}		
}

void runMotor(char id, signed short spd)
{
	if(id < M1 || id > M4)
		return;

	_motor[id - 1].mode = MOTOR_MODE_NORMAL;
	_driveMotor(id, spd);	
}

void accDecMotor(char id, signed short startSpd, signed short finalSpd, signed short stepSpd, unsigned short interval)
{
	startSpd *= -1;
	finalSpd *= -1;
	stepSpd *= -1;
	if(id < M1 || id > M4)
		return;

	if (startSpd > MAX_SPEED)
		startSpd = MAX_SPEED;
	else if (startSpd < MIN_SPEED)
		startSpd = MIN_SPEED;

	if (finalSpd > MAX_SPEED)
		finalSpd = MAX_SPEED;
	else if (finalSpd < MIN_SPEED)
		finalSpd = MIN_SPEED;

	if (_motor[id - 1].finalSpd != finalSpd)
	{
		_motor[id - 1].mode = MOTOR_MODE_ACCDEC;
		_motor[id - 1].step = 0;
		_motor[id - 1].timer = 0;
		_motor[id - 1].finalSpd = finalSpd;
		_motor[id - 1].curSpd = startSpd;
		_motor[id - 1].stepSpd = stepSpd;
		_motor[id - 1].interval = interval;				
	}
}

void stopMotor(char id, char type)
{
	if(id < M1 || id > M4)
		return;

	_motor[id - 1].brakeType = type;	
	runMotor(id, 0);
}

void reverseMotor(char id)
{
	runMotor(id, _motor[id - 1].curSpd * -1);
}

void waitAccDecMotor(char id)
{
	while(!(_motor[id - 1].step == 3)); //3 : Target == Cur
}

volatile SmartyMotor* getMotor(char id)
{
	if(id < M1 || id > M4)
		return 0;

	return &_motor[id - 1];
}

//Smarty Servo
void _setupServo(void)
{
	TCCR4A = 0;
	TCCR4B = 0;
	TCCR4C = 0;
	TCCR5A = 0;
	TCCR5B = 0;
	TCCR5C = 0;

	DDRH |= ((1 << PH3) | (1 << PH4) | (1 << PH5));
	DDRL |= (1 << PL3);

	if(getBattery() > VOLTAGE_ACTUATOR)
	{
		TCCR4A |= 0b10101000;
		TCCR4B |= 0b00010010;
		TCCR4C |= 0b11100000;
		TCNT4 = 0;
		ICR4 = 20000;

		TCCR5A = 0b10101000;
		TCCR5B = 0b00010010;
		TCCR5C = 0b11100000;
		TCNT5 = 0;
		ICR5 = 20000;		
	}

	OCR4A = 0; //OCR 레지스터 
	OCR4B = 0;
	OCR4C = 0;
	OCR5A = 0; 

	for(int n=0; n<SERVO_MAX - 1; n++)
	{
		_servo[n].step = 0;		
		_servo[n].mode = SERVO_MODE_NORMAL;
		_servo[n].timer = 0;
		_servo[n].deg0Width = 0;
		_servo[n].deg180Width = 0;
		_servo[n].slope = 0;
		_servo[n].curDeg = 0;
		_servo[n].prevDeg = 0;
		_servo[n].startDeg = 0;
		_servo[n].finalDeg = 0;
		_servo[n].stepDeg = 0;
		_servo[n].interval = 0;
	}

	setupServo(S1);
	setupServo(S2);
	setupServo(S3);
	setupServo(S4);
}

void _isrServo(void)
{
	for(int n=0; n<SERVO_MAX - 1; n++)
	{
		if(_servo[n].mode == SERVO_MODE_SLOW)
		{
			switch(_servo[n].step)
			{
				case 0: //Start
					runServo(n + 1, _servo[n].curDeg);
					_servo[n].step = 1;
				break;
				case 1: //Wait Step Time
					if (_servo[n].timer++ > _servo[n].interval)
						_servo[n].step = 2;					
				break;
				case 2: //Run
					if (_servo[n].startDeg < _servo[n].finalDeg)
						_servo[n].curDeg += _servo[n].stepDeg;
					else if (_servo[n].startDeg > _servo[n].finalDeg)
						_servo[n].curDeg -= _servo[n].stepDeg;

					if (abs(_servo[n].finalDeg - _servo[n].curDeg) < _servo[n].stepDeg)
					{
						if (_servo[n].curDeg > _servo[n].finalDeg)
							_servo[n].curDeg = _servo[n].finalDeg;
						else if (_servo[n].curDeg < _servo[n].finalDeg)
							_servo[n].curDeg = _servo[n].finalDeg;
					}

					runServo(n + 1, _servo[n].curDeg);

					_servo[n].timer = 0;

					if (_servo[n].finalDeg != _servo[n].curDeg)
						_servo[n].step = 1;					
					else
						_servo[n].step = 3;			
				break;
				case 3: //Complete
				break;
			}
		}
	}	
}

void setupServo(char id, unsigned int deg0Width, unsigned int deg180Width) 
{
	//(2400 - 600) / (180 - 0) * deg + 600
	//(2200 - 800) / (180 - 0) * deg + 800

	if(id < S1 || id > S4)
		return;

	_servo[id - 1].deg0Width = deg0Width;
	_servo[id - 1].deg180Width = deg180Width;
	_servo[id - 1].slope = (float)((deg180Width - deg0Width) / 180);
}

void runServo(char id, short deg)
{
	if(id < S1 || id > S4)
		return;

	_servo[id - 1].curDeg = deg;
	_servo[id - 1].prevDeg = _servo[id].curDeg;

	switch(id)
	{
		case S1:
			OCR4A = (deg * _servo[id - 1].slope) + _servo[id - 1].deg0Width;
		break;
		case S2:
			OCR4B = (deg * _servo[id - 1].slope) + _servo[id - 1].deg0Width;
		break;
		case S3:
			OCR4C = (deg * _servo[id - 1].slope) + _servo[id - 1].deg0Width;
		break;
		case S4:
			OCR5A = (deg * _servo[id - 1].slope) + _servo[id - 1].deg0Width;
		break;		
	}
}

void slowServo(char id, short startDeg, short finalDeg, short stepDeg, unsigned short interval)
{
	if(id < S1 || id > S4)
		return;

	if(_servo[id - 1].mode != SERVO_MODE_SLOW || (_servo[id - 1].mode == SERVO_MODE_SLOW && _servo[id - 1].step == 3))  
	{
		_servo[id - 1].mode = SERVO_MODE_SLOW;
		_servo[id - 1].step = 0;
		_servo[id - 1].timer = 0;
		_servo[id - 1].curDeg = startDeg;
		_servo[id - 1].startDeg = startDeg;	
		_servo[id - 1].finalDeg = finalDeg;
		_servo[id - 1].stepDeg = stepDeg;
		_servo[id - 1].interval = interval;		
	}
}

void offServo(char id)
{
	if(id < S1 || id > S4)
		return;

	_servo[id - 1].curDeg = 0;
	_servo[id - 1].prevDeg = 0;

	switch(id)
	{
		case S1:
			OCR4A = -1; 
		break;
		case S2:
			OCR4B = -1;
		break;
		case S3:
			OCR4C = -1;
		break;
		case S4:
			OCR5A = -1;
		break;		
	}
}

//Smarty Led
void _setupLed(void)
{
	DDRG |= (1 << PG5);
	DDRA |= (1 << PA3);

	for(int n=0; n<LED_MAX - 1; n++)
	{
		_driveLed(n + 1, OFF);

		_led[n].mode = 0;
		_led[n].step = 0;
		_led[n].timer = 0;
		_led[n].onTime = 0;
		_led[n].offTime = 0;
		_led[n].cntTarget = 0;
		_led[n].cnt = 0;			
	}
}

void _isrLed(void)
{
	for(int n=0; n<LED_MAX - 1; n++)
	{
		switch(_led[n].mode)
		{
			case LED_MODE_BLINK:
			case LED_MODE_BLINK_CNT:

				switch(_led[n].step)
				{
					case 0 : //On		
						_driveLed(n + 1, ON);
					
						if(++_led[n].timer >= _led[n].onTime)
						{
							_led[n].step = 1;
							_led[n].timer = 0;
						}
					break;
					case 1 : //Off
						_driveLed(n + 1, OFF);
						
						if(++_led[n].timer >= _led[n].offTime)
						{
							_led[n].timer = 0;
							
							if(_led[n].cntTarget == 0)
								_led[n].step = 0;							
							else
								_led[n].step = 2;
						}	
					break;
					case 2: //Cnt				
						if(++_led[n].cnt >= _led[n].cntTarget)
						{
							_led[n].cnt = 0;
							_led[n].cntTarget = 0;
							_led[n].step = 3;
							_led[n].mode = LED_MODE_NORMAL;
						}	
						else
							_led[n].step = 0;
					break;
				}
			break;
			default:
			break;
		}
	}
}

void _driveLed(char id, char state)
{
	if (id < LED1 || id > LED2)
		return;	

	_led[id - 1].curState = state;

	switch(id)
	{
		case LED1:
			if (state)
				PORTG |= (1 << PG5);
			else
				PORTG &= ~(1 << PG5);		
		break;
		case LED2:
			if (state)
				PORTA |= (1 << PA3);
			else
				PORTA &= ~(1 << PA3);
		break;
	}	
}

void turnLed(char id, char state)
{
	_led[id - 1].mode = LED_MODE_NORMAL;
	_driveLed(id, state);
}

void toggleLed(char id)
{
	if (id < LED1 || id > LED2)
		return;

	_led[id - 1].curState ^= ON;
	turnLed(id, _led[id - 1].curState);
}

void blinkLed(char id, unsigned short onTime, unsigned short offTime)
{
	if (id < LED1 || id > LED2)
		return;	

	if(_led[id - 1].onTime != onTime || _led[id - 1].offTime != offTime)
	{
		_led[id - 1].mode = LED_MODE_BLINK;
		_led[id - 1].step = 0;
		_led[id - 1].timer = 0;
		_led[id - 1].onTime = onTime;
		_led[id - 1].offTime = offTime;
		_led[id - 1].cntTarget = 0;
		_led[id - 1].cnt = 0;		
	}
}

void blinkCntLed(char id, unsigned short onTime, unsigned short offTime, unsigned short cnt)
{
	if (id < LED1 || id > LED2)
		return;

	if(_led[id - 1].onTime != onTime || _led[id - 1].offTime != offTime || _led[id - 1].cnt != cnt)
	{
		_led[id - 1].mode = LED_MODE_BLINK_CNT;
		_led[id - 1].step = 0;
		_led[id - 1].timer = 0;
		_led[id - 1].onTime = onTime;
		_led[id - 1].offTime = offTime;
		_led[id - 1].cntTarget = cnt;
		_led[id - 1].cnt = 0;	
	}	
}

void clearLed(char id)
{
	if (id < LED1 || id > LED2)
		return;

	_led[id - 1].mode = LED_MODE_NORMAL;
	_led[id - 1].step = 0;
	_led[id - 1].timer = 0;
	_led[id - 1].onTime = 0;
	_led[id - 1].offTime = 0;
	_led[id - 1].cntTarget = 0;
	_led[id - 1].cnt = 0;
}

//Smarty Sw
void _setupSwitch(void)
{
	DDRB &= ~(1 << PB4);
	DDRC &= ~(1 << PC3);

	for(int n=0; n<SW_MAX - 1; n++)
	{
		_sw[n].timerPress = 0;
		_sw[n].used = FALSE;
	}
}

void _isrSwitch(void)
{
	for(int n=0; n<SW_MAX - 1; n++)
	{
		if(readSw(n + 1)) //Pressed		
			_sw[n].timerPress++;
		else 
		{
			_sw[n].timerPress = 0;
			_sw[n].used = FALSE;
		}		
	}
}

void _resetSw(char id)
{
	if (id < SW1 || id > SW2)
		return;

	_sw[id - 1].timerPress = 0;	
	_sw[id - 1].used = TRUE;
}

volatile SmartySwitch* _getSwInfo(char id)
{
	return &_sw[id - 1];
}

char readSw(char id) // 0혹은 값 
{
	if (id < SW1 || id > SW2)
		return OFF;

	switch(id)
	{
		case SW1:
			return !(PINB & (1 << PB4));
		break;
		case SW2:
	  		return !(PINC & (1 << PC3));
		break;
	}

	return OFF;
}


char getSw(char id, unsigned short interval)
{
	char ret = FALSE;

	if (id < SW1 || id > SW2)
		return OFF;

	if(readSw(id) && _getSwInfo(id)->timerPress > interval && _getSwInfo(id)->used == FALSE)
	{
		_resetSw(id);
		ret = TRUE;
	}

	return ret;
}

void waitUntilSw(char id, char state)
{
	while(readSw(id) != state);
} 

//Smarty Bluetooth
__attribute__((weak))
void onConnectedBt(void)
{
	//For User Override	
}

__attribute__((weak))
void onDisconnectedBt(void)
{
	//For User Override	
}

void _setupBt(void)
{
	DDRK |= (1 << PK1) | (1 << PK3);
	DDRK &= ~(1 << PK2);
	DDRD |= (1 << PD7); //LED
	PORTD &= ~(1 << PD7);

	_btConnState = DISCONNECT;
	_btConnTimer = 0;
	_btInitState = FALSE;
	_btInitTimer = 0;

	Serial1.begin(9600);

	turnBt(ON);	
}

void _isrBtState(void)
{
	if ((PINK & (1 << PK2)) == 0)
	{
		PORTD |= (1 << PD7);
	}
	else
	{
		_btConnTimer = 0;
		PORTD &= ~(1 << PD7);
	}
}

void _isrBt(void)
{
	if(_btInitState == FALSE && ++_btInitTimer > 1000)
	{
		_btInitState = TRUE;
		_btInitTimer = 0;

		PCICR |= (1 << PCIE2);
		PCMSK2 |= (1 << PCINT18);	
	}

	if (_btInitState)
	{
		if(_btConnState == DISCONNECT)
		{
			if(++_btConnTimer > BT_CONN_INTERVAL)
			{
				_btConnState = CONNECT;
				//onBtConnected();
			}
		}
		else
		{
			if(_btConnTimer == 0)
			{
				_btConnState = DISCONNECT;
				//onBtDisconnected();
			}
		}		
	}
}

void _cmdBt(void)
{
	if (Serial.available())
		Serial1.write(Serial.read());
	if (Serial1.available())
		Serial.write(Serial1.read());	
}

void turnBt(char state)
{
	if (state) //On
		PORTK &= ~(1 << PK1);
	else //Off
		PORTK |= (1 << PK1);
}

void setModeBt(char mode)
{
	if (mode)
		PORTK &= ~(1 << PK3); 
	else
		PORTK |= (1 << PK3); //Mode
}

void setMainBt(void)
{
	char strBuf[64] = {0};
	delay(900);
	sprintf(strBuf, "AT+ROLE=M");
	Serial1.write(strBuf);
}
void setSubBt(void)
{
	char strBuf[64] = {0};
	delay(900);
	sprintf(strBuf, "AT+ROLE=S");
	Serial1.write(strBuf);
}

void setNameBt(char* pName)
{
	char strBuf[64] = {0};

	// turnBt(OFF);
	// delay(100);
	// turnBt(ON);
	delay(900);

	sprintf(strBuf, "AT+NAME%s", pName);
  	Serial1.write(strBuf);//데이터를 시리얼포트1로 byte로 전송한다.	
}

void setPinBt(char* pPin)
{
	char strBuf[64] = {0};

	// turnBt(OFF);
	// delay(100);
	// turnBt(ON);
	delay(900);

	sprintf(strBuf, "AT+PIN%s", pPin);
  	Serial1.write(strBuf);	
}

char getStateBt(void)
{
	return _btConnState;
}

short getByteBt(void)
{
	short data = RX_ERROR;

	if (Serial1.available())
		data = Serial1.read(); // 수신 데이터가 있으면 데이터를 읽는다
	
	return data;
}