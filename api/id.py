from random import randint

def generate_user_id():
    """
    Generates a random 4-digit user ID.

    Returns:
        int: A random 4-digit user ID.
    """
    # Generate a random number between 1000 and 9999
    id = randint(1000, 9999)
    return id
