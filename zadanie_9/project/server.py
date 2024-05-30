from flask import Flask, request, jsonify
import ollama
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    logging.debug(f"Received message from main application: {user_message}")

    try:
        logging.debug(f"Sending request to Ollama server with input: {user_message}")
        # Using Ollama Python library to send the message to the Ollama server
        response = ollama.chat(model='llama3', messages=[{'role': 'user', 'content': user_message}])
        response_message = response['message']['content']
        logging.debug(f"Response from Ollama server: {response_message}")
        response_data = {'response': response_message}
    except ollama.ResponseError as e:
        logging.error(f"Error response from Ollama server: {e.error}")
        response_data = {
            'response': 'Error: Failed to communicate with Ollama server',
            'details': str(e)
        }
        logging.exception("Error communicating with Ollama server")

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(port=5000)
