'use stric';

 const TogglReport = require('../models/togglReport');

 function create(user_id, report){
   TogglReport.create({
     user_id: user_id,
     report: report
   }, function(err, report){
     if (err) {
       console.log(err);
     }
     console.log('saved reports:', report);
   });
 };

 module.exports = {create};
