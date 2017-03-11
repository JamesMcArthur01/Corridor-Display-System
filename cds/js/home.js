// global variables
var JSONDataURL;
var JSONDataMESS;
var JSONDataLESS;
//var JSONDataVID;
var messageCounter = 0,
numMessages = 0;
var count = 0;
var responseComplete = false;


// open jQuery
$(document).ready(function(){

  // display splash screen
  splashScreen();

  // retrieve all data.
  getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
  getData('http://api.computing-moodle.co.uk/api.php/display/messages/');
  getData('http://api.computing-moodle.co.uk/api.php/display/lessons/');
  getData('http://api.computing-moodle.co.uk/api.php/display/videos/');

  var refreshId = setInterval(function() {
    if(responseComplete){
      $('#header').remove();
      switch (count) {
        case 0 : displayLessons(JSONDataLESS);
          count++;
          break;
        case 1 : displayMessages(JSONDataMESS);
          count++;
          break;
        case 2 : displayURL(JSONDataURL);
          count++;
          break;
        // case 3 : displayVid(JSONDataVID);
        //   count++;
        //   break;
        default: count = 0;
          break;
      }
    }
  }, 3000);

});


// splash screen creation method.
function splashScreen() {
  var $header = $("<div id='header'></div>");
  $('#container').append($header);
  $('#header').append('<h1>Welcome Screen</h1>');
}

// getData method, will get data from the URL populate page.
function getData(theUrl) {
    responseComplete = false;
    // url data collection.
    $.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(dataURL) {
    			$(dataURL.urls).each(function(index, value) {
    				storeDataURL(dataURL);
    			});
        },
    });
		// Messages data collection.
		$.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(dataMESS) {
    			$(dataMESS.messages).each(function(index, value) {
    				storeDataMESS(dataMESS);
    			});
        },
    });

		// Lessons data collection.
		$.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(dataLESS) {
    			$(dataLESS.lessons).each(function(index, value) {
    				storeDataLESS(dataLESS);
    			});
        },
    });

    // Videos data collection
    $.ajax({
      url: theUrl,
      dataType: 'json',
      type: 'get',
      cache: false,
      sucess: function(dataVID) {
        $(dataVID.videos).each(function(index, value) {
          storeDataVID(dataVID);
        });
      },
    });
}

// function for storing data for URL
function storeDataURL(dataURL){
  JSONDataURL = dataURL;
  responseComplete = true;
}

// function for storing data for Messages
function storeDataMESS(dataMESS){
	JSONDataMESS = dataMESS;
	responseComplete = true;
}

// function for storing data for Lessons
function storeDataLESS(dataLESS){
	JSONDataLESS = dataLESS;
	responseComplete = true;
}

// function for storing data for videos
function storeDataVID(dataVID){
  JSONDataVID = dataVID;
  responseComplete = true;
}

// timer set function
// function timer() {
//   var count = 1;
//   var counter = setInterval(timer, 1000);
//
//   count = count - 1;
//
//   if(count <= 0)
//   {
//     clearInterval(counter);
//     ;
//     return;
//   }
// }

// DisplayLessons()
function displayLessons(JSONDataLESS) {
    if(responseComplete){
      $('#url-container').remove();
      numMessages = JSONDataLESS.lessons.length;
      // create div tag to place in container
      var $lessons = $("<div id='lessons'><div id='groupname'></div><div id='subject'></div><div id='room'></div><div id='start'></div><div id='end'></div></div>");
      // append lessons div to container
      $('#container').append($lessons);
      // if messageCounter > numMessages, populate div information.
      if (numMessages > messageCounter) {
        $('#groupname').html(JSONDataLESS.lessons[messageCounter].groupname);
        $('#subject').html(JSONDataLESS.lessons[messageCounter].subject);
        $('#room').html(JSONDataLESS.lessons[messageCounter].room);
        $('#start').html(JSONDataLESS.lessons[messageCounter].starttime);
        $('#end').html(JSONDataLESS.lessons[messageCounter].endtime);
        //inc messageCounter with 1.
        messageCounter++;
      } else {
        getData('http://api.computing-moodle.co.uk/api.php/display/lessons/');
        numMessages = 0;
        messageCounter = 0;
      }
    }
}

// DisplayLessons()
function displayMessages(JSONDataMESS) {
  var messageCounter = 0,
  numMessages = JSONDataMESS.messages.length;
  if(responseComplete){
    $('#lessons').remove();
    var $messages = $("<div id='mess'><div id='heading'></div><div id='message'></div><div id='room'></div><div id='start'></div><div id='end'></div></div>");
    $('#container').append($messages);
    if(numMessages > messageCounter) {
      // messages page
      $('#heading').html(JSONDataMESS.messages[messageCounter].heading);
      $('#message').html(JSONDataMESS.messages[messageCounter].message);
      $('#logo').html(JSONDataMESS.messages[messageCounter].logo);
      $('#heading').css('color', "#" + JSONDataMESS.messages[messageCounter].headingcolour);
      $('#message').css('color', "#" + JSONDataMESS.messages[messageCounter].textcolour);
      $('#messages-section').css('background-color', "#" + JSONDataMESS.messages[messageCounter].backgroundcolor);
      messageCounter++;
    } else {
      getData('http://api.computing-moodle.co.uk/api.php/display/messages/');
      numMessages = 0;
      messageCounter = 0;
    }
  }
}

// Display URL's()
function displayURL(JSONDataURL) {
  numMessages = JSONDataURL.urls.length;
  if(responseComplete){
    $('#mess').remove();
    var $urls = $("<div id='url-container'><div id='top'></div><div id='url-info'></div><div id='bottom'></div></div>");
    $('#container').append($urls);
    if(numMessages >= messageCounter) {
     // urls page
      $('#url-info').html(JSONDataURL.urls[messageCounter].url);
      $('#top').html(JSONDataURL.urls[messageCounter].toptext);
      $('#bottom').html(JSONDataURL.urls[messageCounter].bottomtext);
      $('#url-container').css('background-color', "#" + JSONDataURL.urls[messageCounter].backgroundcolor);
      messageCounter++;
    } else {
      getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
      numMessages = 0
      messageCounter = 0;
    }
  }
}

// Display Videos()
function displayVid(JSONDataVID) {
  var messageCounter = 0,
  numMessages = JSONDataVID.videos.length;
  if(responseComplete){
    $('#url').remove();
    var $vid = $("<div id='vid-container'><div id='vid-url'></div></div>");
    $('#container').append($vid);
    if(numMessages > messageCounter) {
     // urls page
      $('#url').html(JSONDataVID.videos[messageCounter].url);
      messageCounter++;
    } else {
      getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
      numMessages = 0
      messageCounter = 0;
    }
  }
}
