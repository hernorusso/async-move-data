'use stric';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TogglReportSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  report: {
    type: Schema.Types.Mixed
  }
});

module.exports = mongoose.model('TogglReport', TogglReportSchema);
