/**
 * Created by vicky on 21/1/17.
 */
const express = require('express');
const eventCtrl = require('../controllers/event.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of users */
    .get(eventCtrl.list)

    /** POST /api/users - Create new user */
    .post(eventCtrl.create);

router.route('/:eventId')
/** GET /api/users/:userId - Get user */
    .get(eventCtrl.get)


/** Load user when API with userId route parameter is hit */
router.param('eventId', function(req,res,next,value) {
    req.event = value;
    next();
});

module.exports = router;
