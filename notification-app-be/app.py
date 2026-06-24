from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWd1bDY1Mjc3MEBnbWFpbC5jb20iLCJleHAiOjE3ODIyODYzOTAsImlhdCI6MTc4MjI4NTQ5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImYxOTcxYjU5LTQyMWQtNGU0MS1hYmZkLWNiZGFmNDI0MDhjOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhZ3VsIiwic3ViIjoiMDhiYWExYmUtYTYxOS00OWIyLWFjYzktMDYwZTdiZjZjYzk1In0sImVtYWlsIjoicmFndWw2NTI3NzBAZ21haWwuY29tIiwibmFtZSI6InJhZ3VsIiwicm9sbE5vIjoiODEwNDIzMjA1MTMxIiwiYWNjZXNzQ29kZSI6IlFXSnVGZiIsImNsaWVudElEIjoiMDhiYWExYmUtYTYxOS00OWIyLWFjYzktMDYwZTdiZjZjYzk1IiwiY2xpZW50U2VjcmV0IjoiRlhHd250a2FWbVJZaGJhciJ9.gb8JOueyMN6_LZs66maOLaDDD6I76imO8O4XyDJx7GU"

@app.route("/notifications")
def notifications():
    response = requests.get(
        "http://4.224.186.213/evaluation-service/notifications",
        headers={
            "Authorization": TOKEN
        }
    )

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)