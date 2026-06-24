import axios from "axios";

const URL = "http://4.224.186.213/evaluation-service/logs";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyYWd1bDY1Mjc3MEBnbWFpbC5jb20iLCJleHAiOjE3ODIyODYzOTAsImlhdCI6MTc4MjI4NTQ5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImYxOTcxYjU5LTQyMWQtNGU0MS1hYmZkLWNiZGFmNDI0MDhjOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhZ3VsIiwic3ViIjoiMDhiYWExYmUtYTYxOS00OWIyLWFjYzktMDYwZTdiZjZjYzk1In0sImVtYWlsIjoicmFndWw2NTI3NzBAZ21haWwuY29tIiwibmFtZSI6InJhZ3VsIiwicm9sbE5vIjoiODEwNDIzMjA1MTMxIiwiYWNjZXNzQ29kZSI6IlFXSnVGZiIsImNsaWVudElEIjoiMDhiYWExYmUtYTYxOS00OWIyLWFjYzktMDYwZTdiZjZjYzk1IiwiY2xpZW50U2VjcmV0IjoiRlhHd250a2FWbVJZaGJhciJ9.gb8JOueyMN6_LZs66maOLaDDD6I76imO8O4XyDJx7GU";

export async function Log(stack, level, packageName, message) {
    try {
        await axios.post(
            URL,
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );
    }
    catch (error) {
        console.log("Log failed");
    }
}