from flask import Flask, jsonify, request
from flask_cors import CORS

from db import *
from id import generate_user_id

from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app)

# Create a session with AWS DynamoDB
create_session()

@app.before_request
def before_request():
    """
    This function is executed before every request.
    It sets up a connection to the AWS DynamoDB by creating a session.
    """
    # Establish a session with AWS DynamoDB
    create_session()


@app.route("/")
def index():
    return jsonify({"message": "Flask Server Up and Running", "status": 200})

@app.route("/api/python")
def hello_world():
    return jsonify({"message": "API Route Active", "status": 200})