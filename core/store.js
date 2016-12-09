'use stric';

/* We should do here all the store operation */
const async = require('async');
const userController = require('../models/user')
const quickBase = require('../interfaces/quickBaseInterface');
const User = require('../models/user');
const _ = require('lodash');

/*TODO
* when a user is no longer available we should set it to false
* add a check when getting reports to only get active users reports
*/

/* Store Data in MongoDB from quickBase *****************************/
function storeQuickBaseData(){
  async.parallel([function(cb){
    quickBase.get()
    .then(function(result) {
      cb(null, result);
    })
    .catch(function(err){
      cb(err);
    });
  }, function(cb){
    User.find(function(err, users){
      if (err) cb(err);
      cb(null, users);
    });
  }], function(err, results){
    if (err) throw err;

    var fromQB = results[0],
      fromMongoDB = results[1],
      toInsert,
      toUpdate;

    //compare results
    toInsert = _.differenceBy(fromQB, fromMongoDB, 'mail');
    toUpdate = _.differenceWith(fromQB, fromMongoDB, compareUsers);

    // exclude insertions
    toUpdate = _.differenceBy(toUpdate, toInsert, 'mail');
    console.log('toInsert:', toInsert, '\n toUpdate',toUpdate);

    // record changes to DB, use async to do in parallel
    insertInMongo(toInsert, toUpdate);
  });
};

// private methods ******************************************
/*
* Description: compare usere by mail and togglApiToken
*/
function compareUsers(user, otherUser ){
  if (user.mail === otherUser.mail){
      return user.togglApiToken === otherUser.togglApiToken;
  }
  return false;
}

function updateUser(user, cb) {
  User.update({mail: user.mail }, { $set: { togglApiToken: user.togglApiToken }}, function(err, response){
    if (err) cb(err);
    console.log(user, response);
    cb();
  });
}

function insertInMongo(toInsert, toUpdate){
  async.parallel([function(cb){
    if (toInsert.length > 0){
      User.insertMany(toInsert, function(err, users){
        if (err) cb(err);
        cb(null, users);
      });
    } else {
      cb(null, 'No insertions required');
    }
  }, function(cb){
    if (toUpdate.length > 0) {
      async.eachLimit(toUpdate, 4, updateUser, function(err){
        if (err) cb(err);
        cb(null, 'All users updated in MongoDB');
      });
    } else {
      cb(null, 'No user update required');
    }
  }], function(err, results){
    if(err) throw err;
    console.log(results);
  });
}

// exports *******************************************
module.exports = {storeQuickBaseData}
