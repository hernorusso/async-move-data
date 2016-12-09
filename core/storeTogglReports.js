'use stric';

/* Use togglInterface to get users reports
** Store gotten reports from Toggl in Mongo for later use
*/
const async = require('async');
const _ = require('lodash');
const togglInterface = require('../interfaces/togglInterface.js');

var reportsToStore = [];

function storeReports(usersToReport) {
    console.log(usersToReport);
    async.forEachOf(usersToReport, getSingleReport, function(err) {
      console.log(reportsToStore, 'async results');
      // insertMany reports in mongo
    });
}

// private methods *******************************************
function getSingleReport(user, index, cb) {
  var delay = 2000 * index;
  // time out guarantees that toggl Api will be hit at most once each 1,25 seconds in order to not be locked down by toggl servers.
  setTimeout(function(){
    togglInterface.getReport(user.togglApiToken).
      then(function(report){
        user.report
        console.log('success call', report);
        //reportsToStore.push(_.omit(_.merge(user, report), 'togglApiToken'));
        cb();
      }, function(reject){
        console.log('reject reason', reject);
        cb(reject);
      }).
      catch(function(err){
        console.log(err);
      })
    }
  , delay);
}

// exports ***************************************************
module.exports = {storeReports}
