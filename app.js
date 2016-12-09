'use stric';

const mongoose = require('mongoose');
const store = require('./core/store');
const userController = require('./controllers/userController');
const storeTogglReports = require('./core/storeTogglReports');

var usersToReport = [];

// log app activities ******************************************
  // TODO

//**************************************************************

// connect to mongo DB *****************************************
mongoose.connect('mongodb://localhost/togglReport');
var db = mongoose.connection;
db.on('error', function(err) {
  throw err;
});
db.once('open', function() {
  console.log("we're connected!");
});

//****************************************************************

/* Store Data from quickBase in mongo ****************************
* TODO
** return the method as a promise (maybe)
** add description
*/
store.storeQuickBaseData();
//****************************************************************

/* get user and toggl tokens from Mongo DB ***********************
*  This information could be use later with any other third party tool, like toggl
*TODO
** Add description
*/
userController.getTokens().
  then(function(usersToReport){
    // Store Reports **********************************************
    storeTogglReports.storeReports(usersToReport);
  }, function(reject){
    console.log('rejected promise', reject);
  }).
  catch(function(err){
    console.log(err);
  });
//****************************************************************

// ShutDown DB connection ****************************************
  // TODO

//****************************************************************
