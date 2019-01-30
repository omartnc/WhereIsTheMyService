const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://omer:dogutunc04@ds054118.mlab.com:54118/whereisthemyservice')
    .then(() => winston.info('Connected to MongoDB...'));
}