import secrets
import sqlite3
import os

# Generate a new random password
def generate_password():
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?"
    password = ''.join(secrets.choice(alphabet) for i in range(16))
    return password

# Save the password to the database with a custom name
def save_password_to_database(name, username, password, database_name):
    # Connect to the database
    conn = sqlite3.connect(database_name)

    # Create a new table if it does not exist
    conn.execute("CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT, password TEXT)")

    # Insert the new password into the table
    conn.execute("INSERT INTO passwords (name, username, password) VALUES (?, ?, ?)", (name, username, password))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

# Get the name for the new database
database_name = input("Enter a name for the new database: ")

# Create the new database
conn = sqlite3.connect(database_name)
conn.close()

# Ask the user if they want to view a saved password or create a new one
while True:
    action = input("Do you want to view a saved password or create a new one? (view/create/exit): ")

    if action.lower() == "view":
        # Connect to the database
        conn = sqlite3.connect(database_name)

        # Query the database for all saved passwords
        cursor = conn.execute("SELECT * FROM passwords")

        # Print all saved passwords
        for row in cursor:
            print("Name:", row[1])
            print("Username:", row[2])
            print("Password:", row[3])

        # Close the connection to the database
        conn.close()
    elif action.lower() == "create":
        while True:
            # Generate a new password
            password = generate_password()
            print("New password:", password)

            # Ask the user for a name and username for the new password
            name = input("Enter a name for the password: ")
            username = input("Enter a username for the password: ")

            # Ask the user if they want to save the password
            save_password = input("Do you want to save the password to the database? (y/n)")

            # If the user wants to save the password, save it to the database
            if save_password.lower() == "y":
                save_password_to_database(name, username, password, database_name)
                print("Password saved to the database.")
            else:
                print("Password not saved to the database.")
            
            # Clear the screen
            os.system('cls' if os.name == 'nt' else 'clear')

            break
    elif action.lower() == "exit":
        break
    else:
        print("Invalid action. Please enter either 'view', 'create', or 'exit'.")
