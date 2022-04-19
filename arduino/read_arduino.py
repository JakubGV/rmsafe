import time
import serial 

with serial.Serial(port="COM3", baudrate=115200, timeout=10) as ser:
    """
    for i in range(3):
        line = ser.readline()
        if line:
            string = line.decode().strip()  # convert the byte string to a unicode string
            num = float(string) # convert the unicode string to an int
            print(num)
    
    line = ser.readline()
    if line:
        string = line.decode().strip()  # convert the byte string to a unicode string
        print(f"The boolean string is: '{string}'")
        num = int(string) # convert the unicode string to an int
        print(num)
    """

    while True:
        print('-' * 10)
        line = ser.readline()
        line = line.decode().strip()
        # while line == '':
        #     line = ser.readline()
        #     line = line.decode().strip()
        
        print(f"The line is: '{line}'")
        time.sleep(.25)

    #print(f"X:{accel_x}\nY:{accel_y}\nZ:{accel_z}\nAlarm:{alarmFlag}")