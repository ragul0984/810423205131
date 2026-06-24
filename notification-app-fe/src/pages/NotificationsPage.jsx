import { useEffect } from "react";
import Log from "../../logging-middleware";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";


import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  useEffect(() => {
  Log(
    "frontend",
    "info",
    "page",
    "Notifications page loaded"
  );
}, []);

  const [filter, setFilter] = useState();
  const [page, setPage] = useState("1");
  const [viewed, setViewed] = useState([]);

  const { notifications, totalPages, loading, error } = useNotifications();
  const filteredNotifications =
  filter && filter !== "All"
    ? notifications.filter((n) => n.Type === filter)
    : notifications;

  const unreadCount = notifications.length;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
      Log(
    "frontend",
    "info",
    "component",
    `Filter changed to ${newFilter}`
  );
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
     Log(
    "frontend",
    "info",
    "page",
    `Page changed to ${newPage}`
  );
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>
        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ marginBottom: 3 }}>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No notifications found</Alert>
      )}

      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={1.5}>
          {filteredNotifications.map((n) => (
            <Alert
  key={n.ID}
  severity={viewed.includes(n.ID) ? "success" : "info"}
  onClick={() => setViewed([...viewed, n.ID])}
>
              <strong>{n.Type}</strong> : {n.Message}
            </Alert>
          ))}
        </Stack>
      )}

      {!loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
