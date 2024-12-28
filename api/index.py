from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS
import requests
import json

from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return jsonify({"message": "Flask Server Up and Running", "status": 200})

@app.route("/api/python")
def hello_world():
    return jsonify({"message": "API Route Active", "status": 200})

@app.route("/api/python/authenticate", methods=["GET", "POST"])
def authenticate():
    """
    This function is to authenticate users

    Args:
        request (Request): The request object

    Returns:
        Response: The response object
    """
    users = [{
            "id": 1,
            "name": "John Snow",
            "email": "iR5tO@example.com",
            "password": "123456"
        },
        {
            "id": 2,
            "name": "Daenerys Targaryen",
            "email": "L5TtW@example.com",
            "password": "654321"
        }]

    if request.method == "GET":
        # Get the user_id from the query parameter
        user_id = request.args.get('user_id')
        print("\nReceived user_id:", user_id, "\n")
        # Loop through the users and check if the user_id matches
        for user in users:
            if user['id'] == int(user_id):
                print("\nUser Authenticated\n")
                # Return the user object
                user = {key: value for key, value in user.items() if key != 'password'}
                return jsonify({"message": "User Authenticated", "user_info": user, "status": 200})
        
        # If the user_id does not match, return a 404 error
        print("\nUser Not Found\n")
        return jsonify({"message": "User Not Found", "status": 404})
    
    elif request.method == "POST":
        # Get the data from the request body
        data = request.json
        print("\nReceived data:", data, "\n")

        # Get the email and password from the data
        email = data.get('email')
        password = data.get('password')

        # Loop through the users and check if the email and password matches
        for user in users:
            if user['email'] == email and user['password'] == password:
                print("\nUser Authenticated\n")
                # Return the user_id
                return jsonify({"message": "User Authenticated", "user_id": user['id'], "status": 200})
        
        # If the email and password does not match, return a 404 error
        print("\nUser Not Found\n")
        return jsonify({"message": "User Not Found", "status": 404})
