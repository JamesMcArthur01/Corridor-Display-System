// use strict
"use strict";

// global variables
var JSONData;
var now;
var firstWeek;
var responseComplete = false;

// jQuery Api
$(document).ready(function(){

    // calling method getdata
	getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
  getData('http://api.computing-moodle.co.uk/api.php/display/breaks/');
  getData('http://api.computing-moodle.co.uk/api.php/display/messages/');
  getData('http://api.computing-moodle.co.uk/api.php/display/lessons/');
  getData('http://api.computing-moodle.co.uk/api.php/display/start/');
    // interval set to screen.

    var refreshId = setInterval(function(){
        if(responseComplete){
          $('#toptext').html(JSONData.urls[0].toptext);
        }
    },10000);
});

// getData method, will get data from the URL populate page.
function getData(theUrl) {
    responseComplete = false;

    // data collection.
    $.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data) {
    			$(data.urls).each(function(index, value) {
    				storeData(data);
    			});
        },
    });
    $.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(sDate) {
    			$(sDate.start).each(function(index, value) {
    				dateFunc(sDate);
    			});
        },
    });
}
// date information
function dateFunc(sDate) {
  firstWeek = sDate;
  responseComplete = true;
}

function currentDate() {
	now = new Date();
}
// compare date
// function compareDate (firstWeek) {
//   var currentDate = Date();
//   var termDate = firstWeek;
//
//   if(currentDate < termDate) {
//     alert("currentDate is greater than firstWeek");
//   }
//   else {
//     alert("firstWeek is greater than currentDate");
//   }
// }
// storeData method to hold data.
function storeData(data){
     JSONData = data;
     responseComplete = true;
}
