from nanoid import generate

def generate_user_id():
    # Define a custom alphabet with only numeric characters
    alphabet = '0123456789'
    # Specify the length of the ID
    size = 4
    return generate(alphabet, size)