#include "smartyBase.h"

//Smarty ADC
void _setupAdc(void)
{
	DDRF = 0; 
	PORTF = 0;
}

unsigned short readAdc(char ch)
{
	return analogRead(8 - ch);
}

void waitUntilAdc(char ch, const char* com, int val)
{
 	while(1)
 	{
	 	if(strcmp(com, "=="))
	 	{
	 		if(readAdc(ch)==val) 
	 			break;
	 	}
	 	else if(strcmp(com, ">"))
	 	{
	 		if(readAdc(ch)>val) 
	 			break;
 		}
	 	else if(strcmp(com, ">="))
	 	{
	 		if(readAdc(ch)>=val) 
	 			break;
	 	}
	 	else if(strcmp(com, "<"))
	 	{
	 		if(readAdc(ch)<val) 
	 			break;
	 	}
	 	else if(strcmp(com, "<="))
	 	{
	 		if(readAdc(ch)<=val) 
	 			break;
	 	}
 	}
}

//Smarty DIO /*


void _setupDIO(void)
{
	PORTB &= ~(1 << PB0);
	DDRB &= ~(1 << DDB0);
	PINB &= ~(1 << PINB0);
	PINJ = 0;
	PORTJ = 0;
	DDRJ =0;
}




void writeDIO(unsigned char ch, boolean data)
{
	switch (ch)
	{
		case D1 :
		 	DDRB |= (1 << PB0);
		 	if(data)
		 		PORTB |= (1 << PB0);
		 	else
		 		PORTB &= ~(1 << PB0);
			break;
		case D2 :
			DDRJ |= (1 << PJ0);
			if(data)
				PORTJ |= (1 << PJ0);
			else
				PORTJ &= ~(1 << PJ0);
			break;
		case D3 :
			DDRJ |= (1 << PJ1);
			if(data)
				PORTJ |= (1 << PJ1);
			else
				PORTJ &= ~(1 << PJ1);

			break;
		case D4 :
			DDRJ |= (1 << PJ2);
			if(data)
				PORTJ |= (1 << PJ2);
			else
				PORTJ &= ~(1 << PJ2);
			break;
		case D5 :
			DDRJ |= (1 << PJ3);
			if(data)
				PORTJ |= (1 << PJ3);
			else
				PORTJ &= ~(1 << PJ3);
			break;
		case D6 :
			DDRJ |= (1 << PJ4);
			if(data)
				PORTJ |= (1 << PJ4);
			else
				PORTJ &= ~(1 << PJ4);
			break;
		case D7 :
			DDRJ |= (1 << PJ5);
			if(data)
				PORTJ |= (1 << PJ5);
			else
				PORTJ &= ~(1 << PJ5);
			break;
		case D8 :
			DDRJ |= (1 << PJ6);
			if(data)
				PORTJ |= (1 << PJ6);
			else
				PORTJ &= ~(1 << PJ6);
			break;
	}

}

unsigned char readDIO(unsigned char ch, boolean pu)
{
	switch (ch)
	{
		case D1 :
		 	DDRB &= ~(1 << PB0);
		 	if(pu)
		 		PORTB |= (1 << PB0);
		 	else
		 		PORTB &= ~(1 << PB0);

		 	return ((PINB & (1 << PB0)) >> PB0);

			break;
		case D2 :
			DDRJ &= ~(1 << PJ0);
			if(pu)
				PORTJ |= (1 << PJ0);
			else
				PORTJ &= ~(1 << PJ0);

			return ((PINJ & (1 << PJ0)) >> PJ0);

			break;
		case D3 :
			DDRJ &= ~(1 << PJ1);
			if(pu)
				PORTJ |= (1 << PJ1);
			else
				PORTJ &= ~(1 << PJ1);

			return ((PINJ & (1 << PJ1)) >> PJ1);

			break;
		case D4 :
			DDRJ &= ~(1 << PJ2);
			if(pu)
				PORTJ |= (1 << PJ2);
			else
				PORTJ &= ~(1 << PJ2);

			return ((PINJ & (1 << PJ2)) >> PJ2);

			break;
		case D5 :
			DDRJ &= ~(1 << PJ3);
			if(pu)
				PORTJ |= (1 << PJ3);
			else
				PORTJ &= ~(1 << PJ3);

			return ((PINJ & (1 << PJ3)) >> PJ3);

			break;
		case D6 :
			DDRJ &= ~(1 << PJ4);
			if(pu)
				PORTJ |= (1 << PJ4);
			else
				PORTJ &= ~(1 << PJ4);

			return ((PINJ & (1 << PJ4)) >> PJ4);

			break;
		case D7 :
			DDRJ &= ~(1 << PJ5);
			if(pu)
				PORTJ |= (1 << PJ5);
			else
				PORTJ &= ~(1 << PJ5);

			return ((PINJ & (1 << PJ5)) >> PJ5);

			break;
		case D8 :
			DDRJ &= ~(1 << PJ6);
			if(pu)
				PORTJ |= (1 << PJ6);
			else
				PORTJ &= ~(1 << PJ6);

			return ((PINJ & (1 << PJ6)) >> PJ6);

			break;
	}	
}

//Smarty EEPROM
void writeByteMem(unsigned short addr, unsigned char byte)
{
	EEPROM.write(addr, byte);
}

unsigned char readByteMem(unsigned short addr)
{
	if(addr > MAX_EEPROM_SIZE) return 0;

	return EEPROM.read(addr);
}

void write2ByteMem(unsigned short addr, short data)
{
	writeByteMem(addr, (U8)((data >> 8) & 0xFF));
	writeByteMem(addr + 1, (U8)(data & 0xFF));	
}

unsigned short read2ByteMem(unsigned short addr)
{
	if(addr > MAX_EEPROM_SIZE) return 0;
	
	return (((short)readByteMem(addr) << 8) | ((short)readByteMem(addr + 1) & 0xFF));

}

void write4ByteMem(unsigned short addr, long data)
{
	writeByteMem(addr, (U8)((data >> 24) & 0xFF));
	writeByteMem(addr + 1, (U8)((data >> 16) & 0xFF));
	writeByteMem(addr + 2, (U8)((data >> 8) & 0xFF));
	writeByteMem(addr + 3, (U8)(data & 0xFF));	
}

unsigned long read4ByteMem(unsigned short addr)
{
	if(addr > MAX_EEPROM_SIZE) return 0;

	return (((long)readByteMem(addr) << 24) | ((long)readByteMem(addr + 1) << 16) | ((long)readByteMem(addr + 2) << 8) | ((long)readByteMem(addr + 3) & 0xFF));	
}

void writeFloatMem(unsigned short addr, float data)
{
	Trans t;
	t.f = data;
	write4ByteMem(addr, t.l);
}

float readFloatMem(unsigned short addr)
{
	Trans t;

	if(addr > MAX_EEPROM_SIZE) return 0;

	t.l = read4ByteMem(addr);

	return t.f;
}

//Smarty I2C
void getI2C(void)
{
	unsigned char error , nDev; 
	Serial.println("Scanning...");
	for(unsigned char addr=0; addr < 128; addr++)
	{
		startI2C(addr);
		error =  stopI2C();
		if(error == 0)
		{
			if(nDev == 0)
				Serial.println("찾은 디바이스");
			Serial.print(" 0x");
			if(addr < 16)
				Serial.print("0");
			Serial.print(addr,HEX);
			Serial.println("    ");
			nDev++;
		}
		else if(error == 4)
		{
			Serial.println("알 수 없는 디바이스");
			Serial.print(" 0x");
				if(addr < 16)
					Serial.print("0");
				Serial.print(addr,HEX);
		}
	}
	if (nDev == 0)
		Serial.println("I2C 디바이스가 없습니다.");
	else
		Serial.println("Done");
}

void changeI2C(unsigned char fromAddr, unsigned char toAddr)
{
	if(fromAddr <= 0x77 && toAddr <=0x77)
	{
		startI2C(fromAddr);
		writeI2C(0x70);
		writeI2C(toAddr<<1);
		writeI2C(0x55);
		writeI2C(0xAA);
		stopI2C();
	}
}

void changeI2Cserial(void)
{
	String fromAddr , toAddr;
	getI2C();
	
	Serial.println("변경할 대상의 디바이스 주소를 입력하세요.");
	while(!Serial.available());

	fromAddr = Serial.readString();
	Serial.print("입력한 디바이스 주소  :   ");
	Serial.print(fromAddr);
	int fromAddrx = strtol(&fromAddr[0],NULL, 16);

	Serial.println("새로운 디바이스 주소를 입력하세요.");
	while(!Serial.available());

	toAddr = Serial.readString();
	Serial.print("변경할 디바이스 주소  :   ");
	Serial.println(toAddr);
	int toAddrx = strtol(&toAddr[0], NULL, 16);

	changeI2C(fromAddrx, toAddrx);
	Serial.println("변경되었습니다. ");
}

uint8_t rxBuffer[BUFFER_LENGTH];
uint8_t rxBufferIndex = 0;
uint8_t rxBufferLength = 0;

uint8_t txAddress = 0;
uint8_t txBuffer[BUFFER_LENGTH];
uint8_t txBufferIndex = 0;
uint8_t txBufferLength = 0;

uint8_t transmitting = 0;

void beginI2C(void)
{
	rxBufferIndex = 0;
	rxBufferLength = 0;

	txBufferIndex = 0;
	txBufferLength = 0;

	twi_init();
}

void setI2CSpeed(unsigned int f)
{
  	TWBR = ((F_CPU / f) - 16) / 2;
}

void startI2C(unsigned char addr)
{
	// indicate that we are transmitting
	transmitting = 1;
	//set address of targeted slave
	txAddress = addr;
 	//reset tx buffer iterator vars
 	txBufferIndex = 0;
	txBufferLength = 0;
}

void writeI2C(unsigned char data)
{
	if(transmitting)
	{
		if(txBufferLength >= BUFFER_LENGTH)
		{
			return;
   		}

		txBuffer[txBufferIndex] = data;
		++txBufferIndex;

		txBufferLength = txBufferIndex;
	}
	else
	{
		twi_transmit(&data, 1);
 	}

  	return;
}

uint8_t stopI2C(void)
{
  uint8_t ret = twi_writeTo(txAddress, txBuffer, txBufferLength, 1, TRUE);
  // reset tx buffer iterator vars
  txBufferIndex = 0;
  txBufferLength = 0;
  // indicate that we are done transmitting
  transmitting = 0;
  return ret;
}

uint8_t requestFromI2C(uint8_t addr, uint8_t quantity)
{
  // clamp to buffer length
  if(quantity > BUFFER_LENGTH){
    quantity = BUFFER_LENGTH;
  }
  // perform blocking read into buffer
  uint8_t read = twi_readFrom(addr, rxBuffer, quantity, TRUE);
  // set rx buffer iterator vars
  rxBufferIndex = 0;
  rxBufferLength = read;

  return read;
}

int readI2C(void)
{
	int value = -1;
  // get each successive byte on each call
	if(rxBufferIndex < rxBufferLength)
	{
		value = rxBuffer[rxBufferIndex];
		++rxBufferIndex;
	}
	return value;
}