from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return """
    <h1>Financial Hackathon</h1>
    <h2>Welcome to AI Financial Assistant</h2>

    <ul>
        <li>Loan Prediction</li>
        <li>Expense Analysis</li>
        <li>Fraud Detection</li>
        <li>AI Chatbot</li>
    </ul>
    """

if __name__ == "__main__":
    app.run(debug=True)