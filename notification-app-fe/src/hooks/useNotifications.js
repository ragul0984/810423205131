import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import Log from "../../logging-middleware";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);

 const load = async () => {
  try {

    Log("frontend", "info", "api", "Fetching notifications");

    const data = await fetchNotifications();

    Log("frontend", "info", "api", "Notifications fetched successfully");

    const weight = {
      Placement: 3,
      Result: 2,
      Event: 1
    };

    const topNotifications = (data.notifications ?? [])
      .sort((a, b) => {
        if (weight[a.Type] !== weight[b.Type]) {
          return weight[b.Type] - weight[a.Type];
        }

        return new Date(b.Timestamp) - new Date(a.Timestamp);
      })
      .slice(0, 10);

    setNotifications(topNotifications);
    setTotal(topNotifications.length);

  } catch (error) {

    Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

  }
};

  const totalPages = 0;

  return {
  notifications,
  total,
  totalPages,
  loading: false,
  error: false
  };
}
