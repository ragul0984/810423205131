import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await fetchNotifications();
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
    };

    load();
  }, []);

  const totalPages = 0;

  return {
  notifications,
  total,
  totalPages,
  loading: false,
  error: false
  };
}
