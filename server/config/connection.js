const mongoose = require('mongoose');

mongoose.connect(
  // TODO: change end of URI to db name
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/caits',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
