# Stage 1

Base URL : /api/v1

Headers;
Authorization : Bearer token
Content-Type : application/json

## Get all notifications

Endpoint : GET /notifications
give all notifications of the user.

## Filter notifications

endpoint : GET /notifications?type=message
returns notifications based on filter.

## Mark notification as read

endpoint : PATCH /notifications/{id}/read
tick a particular notification as read.

## Mark all notifications as read

Endpoint : PATCH /notifications/read-all
tick all notifications as read.

## Delete notification

Endpoint : DELETE /notifications/{id}
deletes a notification.

## Notification Object

{
    id,
    title,
    message,
    type,
    isRead,
    createdAt
}

## Real Time Notifications

WebSocket can be used for real time updates.

When a new notification arrives, it is sent to users without refreshing the page.


# Stage 2

## Database

I would use MongoDB because notifications are stored as JSON objects and it is easy.

## Notification Schema

{
    userId,
    title,
    message,
    type,
    isRead,
    createdAt
}

## Problems

- large data can slow down queries.
- too many notifications can affect performance.

## Solution

- use indexing.
- use pagination.
- delete old notifications.

## Sample Queries

get notifications
db.notifications.find({userId:"123"})

mark as read
db.notifications.updateOne({id:"1"},{set:{isRead:true}})

# Stage 3

The query is correct, but it becomes slow because the table contains a large amount of data.
Instead of adding indexes to every column, I would add indexes only on studentID, isRead and createdAt.

This improves searching and sorting.
Query to find placement notifications in the last 7 days:

select * from notifications where notification_type = 'Placement' AND createdAt > 'last 7 days';

# Stage 4

To reduce database load, I would use pagination and caching.
instead of loading all notifications every time, only a limited number of notifications can be fetched.

Caching frequently used notifications can also improve performance.

Tradeoff:
  Caching uses extra memory.
  Pagination requires multiple requests to view all notifications.

# Stage 5

The current approach is slow because emails are sent one by one.If some emails fail, the process stops and some students will not receive notifications.
I will save the notification in the database first and then send emails and app notifications separately.

Pseudo code:

save_to_db(message)

for each student
    send_email()

for each student
    push_to_app()

# Stage 6

Priority is decided based on type.
Placement notifications have highest priority, followed by Result and Event notifications.

Whenever new notifications arrive, the top 10 notifications are updated.