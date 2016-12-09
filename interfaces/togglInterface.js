'use stric';

const Promise = require('bluebird');
const timePeriod = require('../utils/timePeriod');
const TogglClient = require('toggl-api');
const togglReportController = require('../controllers/togglReportController.js');

function getReport(apiToken){
  var toggl = new TogglClient({apiToken: apiToken});
  var opts = timePeriod.period();
  opts.user_agent = 'toggl reports';

  return new Promise(function(resolve, reject){
    toggl.getWorkspaces( function(err, workspaces) {
      if (err) {
        return console.log('workspaces error:',err);
      }
      workspaces.some( function(element) {
        if (element.name === 'myWorkSpace') {
          opts.workspace_id = element.id;
          return true;
        }
        return false;
      });
      toggl.detailedReport(opts, function(err, report) {
        if (err) {
          reject(err);
        }
        resolve(report);
      });
    });
  });
};

// private methods **************************************

// exports **********************************************

module.exports = {getReport};
