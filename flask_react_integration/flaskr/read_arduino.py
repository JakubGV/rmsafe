from multiprocessing.sharedctypes import Value
from flaskr.arduino_data import ArduinoData

def get_accelerations(ser):
    data = []
    line = ser.readline()
    while not line or len(line.decode().strip().split(',')) != 3:
        line = ser.readline()
    line = line.decode().strip()
    data_points = line.split(',')
    for val in data_points:
        data.append(float(val))

    arduino_data = ArduinoData(data[0], data[1], data[2])

    return arduino_data