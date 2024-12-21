from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "<p>Flask Server Up and Running</p>"

@app.route("/api/python")
def hello_world():
    return jsonify({"message": "Flask Server Up and Running"})
