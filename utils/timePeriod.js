'use strict';

/*
** description: return start and end date base on @parameter period
** this function make the asumption that you every time runs report up to the day before 23:59 hs
** that the THIS script runs.
** @parameter period [Int] days between start and end date
** @return sinde date, and until date
*/
function period(days) {
  // private vars
  var defaultDays = 1,
    //Toggl will make the assumption "since" to be the date at 00:00 and "until" to be the same date at 23:59
    until, since = until = getDateString(defaultDays);

  if(days > 1){
    since = getDateString(days);
  }

  // public properties
  return {
    since: since,
    until: until
  };

// private methods
  function getDateString(days){
    var regex = /^\d{4}-\d{2}-\d{2}(?=T)/;
    var date = new Date();
    date.setDate(date.getDate() - days);
    date = date.toISOString();
    date = regex.exec(date)[0];
    return date;
  };
};

module.exports = {period};
