'use stric';

const fs = require('fs');
const path = require('path');

function getData(){
  return new Promise(function(resolve, reject){
    fs.readFile(path.join(__dirname, 'interfaces/qBaseFakeData.data'), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
};

module.exports = {get: getData};
