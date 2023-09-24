import psutil
from cryptography.fernet import Fernet
import os

def find_usb_drive():
    for partition in psutil.disk_partitions():
        if 'removable' in partition.opts:
            try:
                usage = psutil.disk_usage(partition.mountpoint)
                if usage.total == 3218079744:  # Koko tavuissa
                    return partition.mountpoint
            except:
                pass

def generate_key():
    return Fernet.generate_key()

def encrypt_file(file_path, key):
    f = Fernet(key)
    with open(file_path, 'rb') as file:
        file_data = file.read()
    encrypted_data = f.encrypt(file_data)
    with open(file_path, 'wb') as file:
        file.write(encrypted_data)

def decrypt_file(file_path, key):
    f = Fernet(key)
    with open(file_path, 'rb') as file:
        encrypted_data = file.read()
    decrypted_data = f.decrypt(encrypted_data)
    with open(file_path, 'wb') as file:
        file.write(decrypted_data)

if __name__ == "__main__":
    folder_path = find_usb_drive() + "/Confidential"  # Dynaaminen polku
    key = b'Moi'  # Korvaa omalla avaimellasi
    
    password = input("Enter the password: ")
    if password == "Cerveku":  # Korvaa omalla salasanallasi
        print("Decrypting files...")
        for filename in os.listdir(folder_path):
            decrypt_file(os.path.join(folder_path, filename), key)
        print("Files decrypted.")
    else:
        print("Encrypting files...")
        for filename in os.listdir(folder_path):
            encrypt_file(os.path.join(folder_path, filename), key)
        print("Files encrypted.")
