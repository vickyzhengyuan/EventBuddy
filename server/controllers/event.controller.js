/**
 * Created by vicky on 21/1/17.
 */
const Event = require('../models/event.model');
const APIError = require('./../helpers/APIError');
var sessions = require('./sessions.controller.js')();


function list(req, res, next) {
    Event.list()
        .then(events => {
            res.json(events.map(event => event.info))
        })
        .catch(e => next(new APIError(e)));
}

function create(req, res, next) {
    const event = new Event({
        name: req.body.name,
        startTime: new Date(),
        endTimeStamp: req.body.endTime,
        lag: req.body.lag,
        lng: req.body.lng
    });
    event.save()
        .then(savedEvent => {
            console.log(savedEvent);
            sessions.registerEvent(savedEvent._id);
            res.json(savedEvent);
        })
        .catch(e => {
            next(new APIError(e))
        });
}

function get(req, res, next) {

}

module.exports = {
    list,
    create,
    get
}