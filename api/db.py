import boto3
import os
from dotenv import load_dotenv

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


def insert_user(db, user):
    """
    Insert a new user into the DynamoDB table.

    Args:
        user (dict): A dictionary containing the user's information.

    Returns:
        int: The HTTP status code from the DynamoDB response.
    """
    response = db.put_item(
        TableName='Users',
        Item={
            'Email': {'S': user['email']},  # Use the 'S' data type for strings
            'Last_Name': {'S': user['last_name']},
            'First_Name': {'S': user['first_name']},
            'ID': {'N': user['id']},  # Use the 'N' data type for numbers
            'Password': {'S': user['password']}
        }
    )
    return response['ResponseMetadata']['HTTPStatusCode']

def get_user(db, email):
    """
    Retrieve a single user from the DynamoDB table.

    Args:
        email (str): The email address of the user to retrieve.

    Returns:
        dict: A dictionary containing the user's information.
    """
    print('Getting user....')
    response = db.query(
        TableName='Users',
        KeyConditionExpression='Email = :email',
        ExpressionAttributeValues={
            ':email': {'S': email}
        })
    
    # The response will contain a single item in the Items list
    return response

def get_all_users(db):
    """
    Retrieve all users from the DynamoDB table.

    Returns:
        dict: A dictionary containing the response from DynamoDB.
    """
    print('Getting all users....')
    # Scan the entire DynamoDB table to retrieve all users
    response = db.scan(
        TableName='Users'
    )
    return response

def delete_user(db, email):
    """
    Delete a user from the DynamoDB table.

    Args:
        email (str): The email address of the user to delete.

    Returns:
        int: The HTTP status code from the DynamoDB response.
    """
    print('Deleting user....')
    response = db.delete_item(
        TableName='Users',
        Key={
            'Email': {'S': email}  # Use the 'S' data type for strings
        }
    )
    return response['ResponseMetadata']['HTTPStatusCode']  # Return the HTTP status code from the response