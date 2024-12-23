import os
from pymongo import MongoClient
from pymongo.server_api import ServerApi

import gridfs

from utils import getConnectionUrl


uri = getConnectionUrl() + "?retryWrites=true&w=majority&appName=Cinder"

client = MongoClient(uri, server_api=ServerApi('1'))


db = client["house_profiles"]

# Initialize GridFS
fs = gridfs.GridFS(db)

# Path to the directory containing images
image_directory = '/Users/jameskeen/Documents/SideProjects/Cinder/js/src/public/houses'

# Function to upload images to GridFS
def upload_images():
    for root, _, files in os.walk(image_directory):
        for file in files:
            if file.endswith(('jpg', 'jpeg', 'png', 'gif')):  # Add more extensions if needed
                file_path = os.path.join(root, file)
                if fs.exists({'filename': file}):
                    print(f"File {file} already existed so skipping")
                    continue
                with open(file_path, 'rb') as f:
                    fs.put(f, filename=file)
                    print(f"Uploaded {file} to GridFS")

if __name__ == "__main__":
    upload_images()
