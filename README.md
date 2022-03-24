#### Objective ####

Create a GUI to manage an AWS Minecraft server

### Target Customer ###

My friends interested in playing on my Minecraft server. The problem they are facing is that it is too expensive to run a server constantly in AWS, and they would like to play on demand without the need for someone to moderate the server. They need a way that they can easily turn on and off the server as well as measure payment metrix without knowing how to log into AWS and start the server manually.

### Features ###

- Authentication: The server cannot be started unless an account with administrator permissions is created
- Safety measures: The server will automatically stop if there are no players on for 15 minutes or if it has been online for more than 8 hours
- One click start: THe server can start by simply clicking a button
- Server metrix: Player count, uptime, IP, and cost are displayed

### Architecture ###

This is the React front end of the project. This will create REST calls to a Django backend which is integrated with celery to create scheduled events.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


