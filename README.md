# M2-SSE-AL-PADDY

## Description

This repository is a POC for an Health system that uses sensors to monitor the health of elderly people.

This POC implements the following end to end feature : 
- Generate health data from a sensor simulator
- Receive the data from the sensors using a smartphone and send it to the data service
  - Smartphone can also detect emergency and contact the alert-service in case of emergency
- Store the data in a database using a data service
- Apply treatments on the data using a health service
- Send alerts to the users if needed using an alert service
- Send notifications to the users using a notification service
- Manage users using a user service
- Display different views to the different users using a frontend
  - Can display the data of the patients
  - Can display reports and graphs
  - Can link and unlink patients to the doctor, nurse and family accounts

## Documentation

- [How to run the project](./docs/HowToRun.md)
- [Code structure](./docs/CodeStructure.md)
- [How to contribute](./docs/HowToContribute.md)
- [How to use](./docs/HowToUse.md)
- [Architecture (technical, fonctionnal, GDPR, Risks analysis...)](./docs/Architecture.pdf)
- [Architecture diagram](./docs/Architecture.png)
- [Presentation](./docs/Presentation.pdf)

## Team

- Adrian NEGRUTA
- Dorian FORNALI
- Dorian GIRARD
- Pierre-Adrien VASSEUR
- Yannick ASCARI
