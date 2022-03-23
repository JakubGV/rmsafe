# Imports
import os
from flask import Flask, redirect, url_for,flash, request, redirect,url_for, render_template
from camera_model import CameraModel
from werkzeug.utils import secure_filename

curr_dir = os.path.dirname(__file__)
param_file = os.path.join(curr_dir, 'params', 'model_07_epochs.params')
camera_model = CameraModel(param_file)
UPLOAD_FOLDER = os.path.join(curr_dir, 'uploads')
ALLOWED_EXTENSIONS = {'mp4', 'mov','wmv', 'flv'}

# Initializations
app = Flask(__name__)
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           
# Define API resources
@app.route("/")
def home():
    return render_template('index.html')

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
            
            return redirect(url_for('get_video_label', video=filename.split('.')[0],extension=filename.split('.')[1]))
        return "Video post method" 

@app.route("/getlabel/<video>/<extension>", methods=['GET'])
def get_video_label(video,extension):
    video_file = os.path.join(curr_dir, 'uploads', f'{video}.{extension}')
    result, confidence = camera_model.evaluate(video_file)
    print(result)
    confidence = f'{confidence * 100:.1f}'
    return render_template('result.html', result=str(result).split('<')[0], confidence=confidence )
    # return f"The model is  {confidence * 100:.1f}% sure the label is: {result}"


@app.route("/test", methods=['GET'])
def test():
    video_file = os.path.join(curr_dir, 'test_videos', 'test_2_orig.mp4')
    print(video_file)
    result, confidence = camera_model.evaluate(video_file)

    return f"The model is  {confidence * 100:.1f}% sure the label is: {result}"

if __name__ == "__main__":
    app.config["DEBUG"] = True
    app.run()