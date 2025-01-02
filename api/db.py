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