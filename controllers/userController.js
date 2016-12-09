'use stric';
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const User = mongoose.model('User');

/* TODO
* Method implementation
*/

function create() {};

function update() {};

function findOne() {};

function deleteOne() {};

function getTokens() {
  return new Promise( function(resolve, reject) {
    User.
      find().
      select('togglApiToken').
      execAsync().
      then(function(users){
        resolve(users);
      }, function(reject){
        reject(reject);
      }).
      catch(function(err){
        console.log(err);
      });
  });
};

module.exports = {
  create: create,
  update: update,
  findOne: findOne,
  deleteOne: deleteOne,
  getTokens: getTokens
}
