from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from dotenv import load_dotenv
import boto3
from db import *
from id import generate_user_id
import requests
import json

from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()

def create_session():
    """
    Create a Boto3 session object.

    The session object is used to create a DynamoDB client object,
    which is then used to interact with the DynamoDB table.

    :return: A Boto3 session object.
    """
    print('Connecting to AWS DynamoDB...')

    # Create a Boto3 session object
    session = boto3.Session(
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION')
    )

    print('Connection to AWS DynamoDB Established!')

    # Create a DynamoDB client object
    global db
    db = session.client('dynamodb')
    print('AWS DynamoDB Session Created!')


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


@app.route("/api/python/register", methods=["POST"])
def register():

    # Get the data from the request body
    data = request.json
    print(data)
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    # Check if the user already exists
    response = get_user(db, email)
    print(response)

    if response['Count'] > 0:
        return jsonify({"message": "User with this email already exists", "status": 409})

    # Generate a user ID
    user_id = generate_user_id()

    # Create the user object
    user = {
        'id': user_id,
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': generate_password_hash(password)
    }

    # Insert the user into the database
    response = insert_user(db, user)
    print(response)

    if response != 200:
        return jsonify({"message": "Error creating user", "status": response})
    
    # Return the response
    return jsonify({"message": "User Created", "user_id": user_id, "status": response})


@app.route("/api/python/authenticate", methods=["GET", "POST"])
def authenticate():
    """
    This function is to authenticate users

    Args:
        request (Request): The request object

    Returns:
        Response: The response object
    """

    if request.method == "GET":
        # Get the user_id from the query parameter
        user_id = request.args.get('user_id')

        # Get all the users from the database
        users = get_all_users(db)

        # Loop through the users and check if the user_id matches
        for user in users['Items']:
            if user['ID']['N'] == user_id:
                print('User Found!')
                # Get the user information
                user = {'first_name': user['First_Name']['S'], 
                        'last_name': user['Last_Name']['S'], 
                        'email': user['Email']['S']}

                # Return the user information
                return jsonify({"message": "User Authenticated", "user_info": user, "status": 200})
        
        # If the user_id does not match, return a 404 error
        return jsonify({"message": "User Not Found", "status": 404})
    
    elif request.method == "POST":
        # Get the data from the request body
        data = request.json

        # Get the email and password from the data
        email = data.get('email')
        password = data.get('password')

        # Get the user by email from the database
        response = get_user(db, email)
        print(response)

        if not response:
            return jsonify({"message": "User Not Found", "status": 404})

        user = response['Items'][0]

        # Check if the password is correct
        if not (check_password_hash(user['Password']['S']) == password):
            return jsonify({"message": "Invalid Password", "status": 401})

        # Return the user_id
        return jsonify({"message": "User Authenticated", "user_id": user['ID']['N'], "status": 200})