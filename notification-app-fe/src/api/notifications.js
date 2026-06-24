import axios from "axios";

export async function fetchNotifications() {
  const response = await axios.get(
    "http://localhost:5000/notifications"
  );

  return response.data;
}