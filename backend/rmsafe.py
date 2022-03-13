# Imports
import os
from flask import Flask
from camera_model import CameraModel

# Initializations
app = Flask(__name__)
curr_dir = os.path.dirname(__file__)
param_file = os.path.join(curr_dir, 'params', 'model_07_epochs.params')
camera_model = CameraModel(param_file)

# Define API resources
@app.route("/")
def home():
    return "<h1>RMSafe Successfully Loaded</h1>"

@app.route("/video", methods=['POST'])
def video():
    return "Video post method"

@app.route("/video/label", methods=['GET'])
def video_label():
    return "Video label get method"

@app.route("/test", methods=['GET'])
def test():
    video_file = 'C:/My-Projects/gluon-tuning/test_videos/test_2_orig.mp4'
    result, confidence = camera_model.evaluate(video_file)

    return f"The model is  {confidence * 100:.1f}% sure the label is: {result}"