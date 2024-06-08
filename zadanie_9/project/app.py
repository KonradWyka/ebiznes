from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

SERVER_URL = "http://localhost:5000/api/chat"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    try:
        logging.debug(f"Sending request to server with input: {user_message}")
        response = requests.post(SERVER_URL, json={'message': user_message}, timeout=600)
        response.raise_for_status()

        response_data = response.json()
        logging.debug(f"Response from server: {response_data}")
    except requests.RequestException as e:
        response_data = {
            'response': 'Error: Failed to communicate with server',
            'details': str(e)
        }
        logging.exception("Error communicating with server")

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(port=5001)
