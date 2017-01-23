/**
 * Created by vicky on 21/1/17.
 * This is used to keep the context of all the available events and its mapping
 */
const Event = require('../models/event.model');

var Sessions = function(io) {
    var currentSession = this;
    this.io = io;
    this.eventList = {};
};

var _sessions;

Sessions.prototype.matchingUsers = function(socket, data) {
    console.log("matching event data: " + data);
    let waitingParticipants = this.eventList[data.eventId].waitingParticipants;
    if(!waitingParticipants[socket.id]) {
        if (Object.keys(waitingParticipants).length > 0) {
            let random = Object.keys(waitingParticipants)[0];

            console.log('incoming matching participant: ' + random);
            delete this.eventList[data.eventId].waitingParticipants[random];

            this.eventList[data.eventId].conversationMap[socket.id] = random;
            this.eventList[data.eventId].conversationMap[random] = socket.id;
        } else {
            this.eventList[data.eventId].waitingParticipants[socket.id] = true;

        }
    } else {
        console.log("no such event");
        //do nothing
    }

}

Sessions.prototype.sendData = function(socket, data) {
    const receiver = this.eventList[data.eventId].conversationMap[socket.id];
    if(receiver) {
        this.eventList[data.eventId].io.to(receiver).emit('message', data);
    } else {
        console.log('error');
    }
};


Sessions.prototype.remove = function(socket) {

};


Sessions.prototype.registerEvent = function(eventId) {
    console.log(eventId + " coming to register an event");
    let currentSession = this;
    if(!currentSession.eventList[eventId]) {

        let eventSocketIO = currentSession.io.of('/events/' + eventId);

        eventSocketIO.on('connection', function(socket) {

            console.log('Event ' + eventId + ' : Detect a socket connection. ' + socket.id);

            socket.on('match', function(data) {
                console.log('matching now for ' + data.socketClientId);
                currentSession.matchingUsers(socket, data);

            });

            socket.on('message', function(data) {

                /**
                 * data {
                 *  senderId:
                 *  receiverId:
                 *  timestamp:
                 *  message content:
                 * }
                 */
                console.log(data);
                console.log('Message here:' + data.message);
                currentSession.sendData(socket, data);

            });


            socket.on('leave', function(data) {
                console.log('Socket ' + data.userId + ' leaves');
            });
            socket.on('error', function(data) {
                console.log('Error error: ' + data.message);
            });
        });

        currentSession.eventList[eventId] = {};
        currentSession.eventList[eventId].io = eventSocketIO;
        currentSession.eventList[eventId].waitingParticipants = {};
        currentSession.eventList[eventId].activePaticipants = {};
        currentSession.eventList[eventId].conversationMap = {};

        console.log(this.eventList);
    } else {
        console.log('Event already exists!');
    }
};


Sessions.prototype.remove = function(socket) {
    console.log('remove...');
};


module.exports = function(io) {
    if(io){
        _sessions = new Sessions(io);
    }
    return _sessions;
};

