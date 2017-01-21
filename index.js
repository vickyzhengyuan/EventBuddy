require('dotenv').config({silent: true});
const util = require('util');
const config = require('./config/env');
const app = require('./config/express');
//===== generator hook =====//

const debug = require('debug')('sg-uService-event-buddy-web-server:index');

if (!module.parent) {
   app.listen(process.env.PORT, () => {
    debug(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`);
  });
}

module.exports = app;