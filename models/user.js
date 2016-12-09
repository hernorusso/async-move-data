'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    mail: {
      type: String,
      required: true
    },
    togglApiToken: {
      type: String,
      required: true
    },
    quickBaseID: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
});

module.exports = mongoose.model('User', UserSchema);
