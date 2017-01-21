const mongoose = require('mongoose');
const config = require('./env');
const util = require('util');

// make bluebird default Promise
mongoose.Promise = require('bluebird');

let url =process.env.MONGODB_URI || process.env.DB_URL;
// connect to mongo db
mongoose.connect(url, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${url}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
};

module.exports = mongoose;
