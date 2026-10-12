from flask import Flask, render_template, request, jsonify
from calculator import calculate

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate_result():
    try:
        data = request.get_json()
        num1 = data["num1"]
        operator = data["operator"]
        num2 = data["num2"]
        answer = calculate(num1, operator, num2)
        return jsonify({"answer": answer})
    except (ValueError, ZeroDivisionError) as error:
        return jsonify({"error": str(error)}), 400


if __name__ == "__main__":
    app.run(debug=True)