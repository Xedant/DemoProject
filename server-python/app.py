from flask import Flask, jsonify
from datetime import datetime, timezone

app = Flask(__name__)

@app.route('/api/hello')
def hello():
    return jsonify({
        'message': 'Hello World',
        'server': 'Python Flask',
        'timestamp': datetime.now(timezone.utc).isoformat()
    })

@app.route('/')
def index():
    return 'Python Flask Server running. Visit /api/hello for the API.'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
