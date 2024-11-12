# Notification Service
- This service is responsible for sending notifications to users.
- Subscribed to multiple topics and listens for messages. (e.g. alert_service; health_service etc.)
- Internal to our infrastructure, it is used by other services to send notifications to users (not exposed as an API)

# Input Message for alert:

{
  "datetype": "temperature",
  "value": "40.0",
  "timestamp": "2024-11-11T10:00:00"
}

# Output behavior: 
Once an alert is triggered for a patient, we send an email to its assigned doctor and nurse to inform them about the emergency. 
