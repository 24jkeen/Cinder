from flask import Flask, jsonify, request, send_file
from pymongo import MongoClient
import gridfs
from bson import ObjectId
from flask_cors import CORS
from io import BytesIO
import logging
from utils import getConnectionUrl


logging.basicConfig(level=logging.DEBUG,  # Set log level
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


connectionUrl = getConnectionUrl()

app = Flask(__name__)
CORS(app)

client = MongoClient(connectionUrl)
db = client["house_profiles"]

# Initialize GridFS
fs = gridfs.GridFS(db)

# Sample house data (replace with your actual data)
house_data = [
    {"id": 1, "image": ["house1.jpg", "house4.jpg"], "likes": 0, "dislikes": 0},
    {"id": 2, "image": ["house2.jpg"], "likes": 0, "dislikes": 0},
    {"id": 3, "image": ["house3.jpg"], "likes": 0, "dislikes": 0}
]

@app.route('/houses', methods=['GET'])
def get_houses():
    # Implement logic to retrieve and return house profiles
    return jsonify(house_data)

@app.route('/vote', methods=['POST'])
def handle_vote():
    data = request.json
    house_id = data.get('house_id')
    vote_type = data.get('vote_type')

    if not house_id or not vote_type:
        return jsonify({'message': 'Invalid request parameters'}), 400

    house = next((h for h in house_data if h['id'] == house_id), None)
    if not house:
        return jsonify({'message': 'House not found'}), 404

    if vote_type == 'like':
        house['likes'] += 1
    elif vote_type == 'dislike':
        house['dislikes'] += 1
    else:
        return jsonify({'message': 'Invalid vote type'}), 400

    return jsonify({'message': 'Vote recorded successfully'}), 200

@app.route('/image/<image_name>', methods=['GET'])
def get_image(image_name):
    grid_out = fs.find_one({"filename": image_name})
    if grid_out:
        logging.info("Received request for filename: " + image_name)
        return send_file(BytesIO(grid_out.read()), mimetype="image/jpeg")
    else:
        return jsonify({"message": "Image not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
