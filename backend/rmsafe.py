# Flask imports and initialization
from flask import Flask
app = Flask(__name__)

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