from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample house data (replace with your actual data)
house_data = [
    {"id": 1, "image": "house1.jpg", "likes": 0, "dislikes": 0},
    {"id": 2, "image": "house2.jpg", "likes": 0, "dislikes": 0},
    {"id": 3, "image": "house3.jpg", "likes": 0, "dislikes": 0}
    # Add more house objects as needed
]

# Route to get house data
@app.route('/houses', methods=['GET'])
def get_houses():
    return jsonify(house_data)

# Route to handle like and dislike signals
@app.route('/vote', methods=['POST'])
def handle_vote():
    data = request.json
    house_id = data.get('house_id')
    vote_type = data.get('vote_type')  # 'like' or 'dislike'

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

if __name__ == '__main__':
    app.run(debug=True)
