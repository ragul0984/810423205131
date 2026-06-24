import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { Log } from "../../../logging-middleware/index.js";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        await Log(
          "frontend",
          "info",
          "api",
          "Fetching notifications from server"
        );

        const data = await fetchNotifications();

        await Log(
          "frontend",
          "info",
          "api",
          "Notifications fetched successfully"
        );

        const weight = {
          Placement: 3,
          Result: 2,
          Event: 1,
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
        await Log(
          "frontend",
          "error",
          "api",
          "Failed to fetch notifications from server"
        );
      }
    };

    load();
  }, []);

  return {
    notifications,
    total,
    totalPages: 0,
    loading: false,
    error: false,
  };
}