# Imports
import os
import threading, queue, time
import serial
from flask import Flask, jsonify, redirect, send_from_directory, url_for,flash, request, redirect,url_for, render_template, make_response
from flask_cors import CORS
from flaskr.camera_model import CameraModel
from flaskr.read_arduino import get_accelerations
from werkzeug.utils import secure_filename

curr_dir = os.path.dirname(__file__)
param_file = os.path.join(curr_dir, 'params', 'model_07_epochs.params')
camera_model = CameraModel(param_file, True)
UPLOAD_FOLDER = os.path.join(curr_dir, 'uploads')
ALLOWED_EXTENSIONS = {'mp4', 'mov','wmv', 'flv'}

# Initializations
READ_RATE = .1
QUEUE_SIZE = 60 / READ_RATE
q = queue.Queue()
app = Flask(__name__)
CORS(app)
# app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           
# Define API resources
@app.route("/")
def home():
    return 'RMSafe server loaded'

@app.route("/upload", methods=['POST'])
def upload():
    if request.method == 'POST':
        print('1')
        # check if the post request has the file part
        if 'file' not in request.files:
            print('3')
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            print('2')
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
           
            filename = secure_filename(file.filename)
            print(filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            app.logger.info('%s was uploaded', filename)
            return '', 204
        return "Video post method" 

@app.route("/getlabel/<video>/<extension>", methods=['GET'])
def get_video_label(video,extension):
    video_file = os.path.join(curr_dir, 'uploads', f'{video}.{extension}')
    result, confidence = camera_model.evaluate(video_file)
    print()
    confidence = f'{confidence * 100:.1f}'
    response = {"result": str(result), "confidence":confidence}
    print(response)
    return jsonify(response)
    # return render_template('result.html', result=str(result).split('<')[0], confidence=confidence )
    # return f"The model is  {confidence * 100:.1f}% sure the label is: {result}"

@app.route("/sensor/data", methods=['GET'])
def get_sensor_data():
    x_accels = []
    y_accels = []
    z_accels = []
    while not q.empty():
        x_accels.append(q.get())
        y_accels.append(q.get())
        z_accels.append(q.get())

    return jsonify({'x_accels': x_accels, 'y_accels': y_accels, 'z_accels': z_accels})

@app.route("/test", methods=['GET'])
def test():
    video_file = os.path.join(curr_dir, 'test_videos', 'test_2_orig.mp4')
    print(video_file)
    result, confidence = camera_model.evaluate(video_file)

    return f"The model is  {confidence * 100:.1f}% sure the label is: {result}"

def continuous_arduino_read():
    with serial.Serial(port="COM3", baudrate=115200, timeout=10) as ser:
        while True:
            data = get_accelerations(ser)
            
            if q.qsize() >= QUEUE_SIZE * 3: # QUEUE_SIZE * 3 because we have 3 datapoints
                q.get()
                q.get()
                q.get()
            q.put(data.accel_x)
            q.put(data.accel_y)
            q.put(data.accel_z)

            time.sleep(READ_RATE)

if __name__ == "__main__":
    arduino_reader = threading.Thread(target=continuous_arduino_read, daemon=True)
    arduino_reader.start()
    app.logger.info(f"Thread started with id: {arduino_reader.ident}")
    app.run()