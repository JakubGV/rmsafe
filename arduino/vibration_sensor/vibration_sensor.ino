#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

Adafruit_MPU6050 mpu;
const int buttonPin = 3;
const int alarmPin = 10;
const bool alarmFlag = false;

void setup() {
  Serial.begin(115200);
  pinMode(buttonPin, INPUT);
  // Try to initialize!
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }

  // set accelerometer range to +-8G
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);

  // set gyro range to +- 500 deg/s
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);

  // set filter bandwidth to 21 Hz
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  delay(100);
}

void loop() {
  /* Get new sensor events with the readings */
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  bool alarmFlag = false;
  /* Print all values */
  /*
  Serial.print(a.acceleration.x);
  Serial.print(",");
  Serial.print(a.acceleration.y);
  Serial.print(",");
  Serial.print(a.acceleration.z);
  Serial.print(", ");
  Serial.print(g.gyro.x);
  Serial.print(",");
  Serial.print(g.gyro.y);
  Serial.print(",");
  Serial.print(g.gyro.z);
  Serial.println(""); */

  /* Print production values */
  Serial.print(a.acceleration.x);
  Serial.print(",");
  Serial.print(a.acceleration.y);
  Serial.print(",");
  Serial.println(a.acceleration.z);
  
  if(abs(a.acceleration.z) > 70 || abs(a.acceleration.y) > 70 || abs(a.acceleration.x) > 70){
    alarmFlag = true;
    delay(100);
  }
  delay(125);
  while(alarmFlag == true){
    Serial.print(a.acceleration.x);
    Serial.print(",");
    Serial.print(a.acceleration.y);
    Serial.print(",");
    Serial.println(a.acceleration.z);
    
    int buttonState;
    buttonState = digitalRead(buttonPin);
    if(buttonState == LOW){
      //alarmPin = 10;
      tone(alarmPin,500);
      delay(10);
    }else{
      noTone(alarmPin);
      delay(10);
      alarmFlag = false;
      delay(10);
    }
  }
}
