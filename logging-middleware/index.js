import axios from "axios";

export async function Log(stack, level, packageName, message) {
    try {
        await axios.post(
            "http://localhost:5000/logs",
            {
                stack,
                level,
                package: packageName,
                message
            }
        );
    }
    catch (error) {
        console.log("Log failed");
    }
}