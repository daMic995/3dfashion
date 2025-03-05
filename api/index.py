from flask import Flask, jsonify, request
from flask_cors import CORS

from random import randint

from api.db import get_user, insert_user, get_all_users
from api.measurements import get_measurements

from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app)


def generate_user_id():
    """
    Generates a random 4-digit user ID.

    Returns:
        int: A random 4-digit user ID.
    """
    # Generate a random number between 1000 and 9999
    id = randint(1000, 9999)
    return id

@app.before_request
def before_request():
    """
    This function is executed before every request.
    """
    pass


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
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    # Check if the user already exists
    response = get_user(email)

    if response is None:
        return jsonify({"message": "Error connecting to database", "status": 500})

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
    response = insert_user(user)
    if response is None:
        return jsonify({"message": "Error connecting to database", "status": 500})

    if response != 200:
        return jsonify({"message": "Error creating user", "status": response})
    
    # Return the response
    return jsonify({"message": "User Created", 
                    "user_id": user_id, "status": response})


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
        users = get_all_users()

        if users is None:
            return jsonify({"message": "Error connecting to database", "status": 500})

        # Loop through the users and check if the user_id matches
        for user in users['Items']:
            if user['ID']['N'] == user_id:
                # Get the user information
                user = {'first_name': user['First_Name']['S'], 
                        'last_name': user['Last_Name']['S'], 
                        'email': user['Email']['S']}

                # Return the user information
                return jsonify({"message": "User Authenticated", 
                                "user_info": user, "status": 200})
        
        # If the user_id does not match, return a 404 error
        return jsonify({"message": "User Not Found", "status": 404})
    
    elif request.method == "POST":
        # Get the data from the request body
        data = request.json

        # Get the email and password from the data
        email = data.get('email')
        password = data.get('password')

        # Get the user by email from the database
        response = get_user(email)

        if not (response or response.get('Items')):
            print(response)
            return jsonify({"message": "User Not Found", "status": 404})
        
        print(response['Items'])
        user = response['Items'][0]
        hashed_password = user['Password']['S']

        # Check if the password is correct
        if not check_password_hash(hashed_password, password):
            return jsonify({"message": "Invalid Password", "status": 401})

        # Return the user_id
        return jsonify({"message": "User Authenticated", 
                        "user_id": user['ID']['N'], "status": 200})
    

@app.route("/api/python/upload", methods=["POST"])
def upload():

    # Get the image files from the request
    frontview = request.files['frontView']
    sideview = request.files['sideView']
    
    # Process the images and get the measurements
    measurements_data = get_measurements(frontview, sideview)

    return jsonify({"message": "Body Measurements Processed",
                    "measurements": measurements_data,
                    "status": 200})
