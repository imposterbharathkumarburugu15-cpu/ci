from flask import Flask, request, jsonify
from flask_cors import CORS
from src.predict import predict_customer

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def home():
    return jsonify({"status": "CI Engine API Running"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    result = predict_customer(data)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
