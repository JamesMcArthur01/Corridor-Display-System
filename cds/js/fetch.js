// use strict
"use strict";


var sum;
var counter = 0;
var timer;
var responseComplete = false;

// jQuery Api
$(document).ready(function(){

    // calling method getdata
	getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
  getData('http://api.computing-moodle.co.uk/api.php/display/messages/');
  getData('http://api.computing-moodle.co.uk/api.php/display/lessons/');

	// Temporary splash screen
	$(function() {
		var $header = $("<div id='header'></div>");
		$('#container').append($header);
		$('#header').append('<h1>Welcome Screen</h1>');
	});


	// interval set to screen.
	  var refreshId = setInterval(function(){
	      if(responseComplete){

					$('#header').remove();
          var $video = $("<div id='videos'></div>");
          $('#container').append($video);
          $('#videos').html(JSONDataVID.vids[messageCounter].url);

					// var $lessons = $("<div id='groupname'></div><div id='subject'></div><div id='room'></div>");
					// $('#container').append($lessons);
					// $('#groupname').html(JSONDataLESS.lessons[0].groupname);
					// $('#subject').html(JSONDataLESS.lessons[0].subject);
					// $('#room').html(JSONDataLESS.lessons[0].room);

					// refreshId = setInterval(function(){
					// 	$($lessons).remove();
          //
          //
					// }, 5000);


					// // messages page
					// $('#heading').html(JSONDataMESS.messages[0].heading);
					// $('#message').html(JSONDataMESS.messages[0].message);
					// $('#logo').html(JSONDataMESS.messages[0].logo);
					// $('#heading').css('color', "#" + JSONDataMESS.messages[0].headingcolour);
					// $('#message').css('color', "#" + JSONDataMESS.messages[0].textcolour);
					// $('#messages-section').css('background-color', "#" + JSONDataMESS.messages[0].backgroundcolor);
					//
					// // // urls page
					// $('#toptext').html(JSONDataURL.urls[0].toptext);
					// $('#url1').html(JSONDataURL.urls[0].url);
					// $('#url2').html(JSONDataURL.urls[1].url);
					// $('#bottomtext').html(JSONDataURL.urls[0].bottomtext);

	      }
	  }, 5000);

});


// getData method, will get data from the URL populate page.
function getData(theUrl) {
    responseComplete = false;
    // url data collection.
    // $.ajax({
    //     url: theUrl,
    //     dataType: 'json',
    //     type: 'get',
    //     cache: false,
    //     success: function(dataURL) {
    // 			$(dataURL.urls).each(function(index, value) {
    // 				storeDataURL(dataURL);
    // 			});
    //     },
    // });
		// // Messages data collection.
		// $.ajax({
    //     url: theUrl,
    //     dataType: 'json',
    //     type: 'get',
    //     cache: false,
    //     success: function(dataMESS) {
    // 			$(dataMESS.messages).each(function(index, value) {
    // 				storeDataMESS(dataMESS);
    // 			});
    //     },
    // });
    //
		// // Lessons data collection.
		// $.ajax({
    //     url: theUrl,
    //     dataType: 'json',
    //     type: 'get',
    //     cache: false,
    //     success: function(dataLESS) {
    // 			$(dataLESS.lessons).each(function(index, value) {
    // 				storeDataLESS(dataLESS);
    // 			});
    //     },
    // });

    // Lessons data collection.
		$.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(dataVID) {
    			$(dataVID.vids).each(function(index, value) {
    				storeDataLESS(dataVID);
    			});
        },
    });
}

// // function for storing data for URL
// function storeDataURL(dataURL){
//   JSONDataURL = dataURL;
//   responseComplete = true;
// }
//
// //function for storing messages data
// function storeDataMESS(dataMESS){
// 	JSONDataMESS = dataMESS;
// 	responseComplete = true;
// }
//
// // function for storing lesson information
// function storeDataLESS(dataLESS){
// 	JSONDataLESS = dataLESS;
// 	responseComplete = true;
// }

function storeDataVID(dataVID){
  JSONDataVID = dataVID;
  responseComplete = true;
}
