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
            'Last_Name': {'S': user['Last_Name']},
            'First_Name': {'S': user['First_Name']},
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
    return response['Items'][0]

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