# Notification Service
- This service is responsible for sending notifications to users.
- Subscribed to multiple topics and listens for messages. (e.g. alert_service; health_service etc.)
- Internal to our infrastructure, it is used by other services to send notifications to users (not exposed as an API)