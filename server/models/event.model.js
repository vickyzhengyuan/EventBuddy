const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');



/**
 * Event Schema
 */
const EventSchema = new mongoose.Schema({
   
			name: {type: String, required:true},
	
			startTimeStamp: {type: Date, required:true , default: Date.now},

            endTimeStamp: {type: Date, required:true , default: Date.now},

            lag: {type: Number, required:true},

            lng: {type: Number, required:true}

});





/**
 * Methods
 */
EventSchema.method({
});

/**
 * Statics
 */
EventSchema.statics = {
    /**
     * Get event
     * @param {ObjectId} id - The objectId of event.
     * @returns {Promise<Event, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((event) => {
                if (event) {
                    return event;
                }
                const err = new APIError('No such event exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List Events in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of Events to be skipped.
     * @param {number} limit - Limit number of Events to be returned.
     * @returns {Promise<Event[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
    }
};

/**
 * @typedef Event
 */
module.exports = mongoose.model('Event', EventSchema);


