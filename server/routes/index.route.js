const express = require('express');

const userRoutes = require('./user.route');
const eventRoutes = require('./event.route');

//===== generator hook - require route =====//
const router = express.Router(); 

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/users', userRoutes);

router.use('/events', eventRoutes);


//===== generator hook - route =====//

module.exports = router;
