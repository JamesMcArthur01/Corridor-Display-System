// global variables
var JSONDataURL;
var JSONDataMESS;
var JSONDataLESS;
var JSONDataVID;
var JSONDataSTART;
var JSONDataBREAKS;
var weekDATA = [];
var dayOfWeek = []; //0 = sunday, 1 = Monday etc
var barWidth;
var messageCounterLess = 0;
var messageCounterMess = 0;
var messageCounterURLS = 0;
var messageCounterVID = 0;
var numMessages = 0;
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
  getData('http://api.computing-moodle.co.uk/api.php/display/breaks/');
  getData('http://api.computing-moodle.co.uk/api.php/display/start/');

  var refreshId = setInterval(function() {
    if(responseComplete){

      $('#header').remove();
      switch (count) {
        case 0 : displayCD();
          count++;
          break;
        case 1 : displayLessons(JSONDataLESS);
          count++;
          break;
        case 2 : displayMessages(JSONDataMESS);
          count++;
          break;
        case 3 : displayURL(JSONDataURL);
          count++;
          break;
        case 4 : displayVid(JSONDataVID);
          count++;
          break;
        default: count = 0;
          break;
      }
    }
  }, 3000 );

});


// splash screen creation method.
function splashScreen() {
  var $header = $("<div id='header'></div>");
  $('.container').append($header);
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
      success: function(dataVID) {
        $(dataVID.videos).each(function(index, value) {
          storeDataVID(dataVID);
        });
      },
    });

    $.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(dataBREAKS){
    			$(dataBREAKS.breaks).each(function(index, value) {
    				storeDataBREAKS(dataBREAKS);
    			});
        },
    });

  	$.ajax({
          url: theUrl,
          dataType: 'json',
          type: 'get',
          cache: false,
          success: function(dataSTART) {
      			$(dataSTART.start).each(function(index, value) {
      				storeDataSTART(dataSTART);
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

function storeDataSTART(dataSTART){
     JSONDataSTART = dataSTART;
     responseComplete = true;
}

function storeDataBREAKS(dataBREAKS){
     JSONDataBREAKS = dataBREAKS;
     responseComplete = true;
}

function currentDate() {
    var now = new Date();
    return now;
}

// DisplayLessons()
function displayLessons(JSONDataLESS) {
  numMessages = JSONDataLESS.lessons.length;

  if(responseComplete){

    $('#splashScreen').remove();
    $('.count-container').remove();

    // create div tag to place in container
    var $lessons = $("<div class='lessons'><div class='row'><div class='column center_align fs_5em margin_top' id='groupname'></div></div><div class='row'><div class='column'></div><div class='column center_align fs_3em margin_top'><div id='subject'></div><div id='room'></div><div id='start'></div><div id='end'></div></div><div class='column'></div></div></div>");

    // append lessons div to container
    $('.container').append($lessons);

    // if messageCounter > numMessages, populate div information.
    if (numMessages > messageCounterLess) {
      var less = JSONDataLESS.lessons;

      //var d = startTime();

      var d = "14:30:00";
      var dHrs = d.substring(0,2);
      var dMins = d.substring(3,5);

      var hrsFromD = (dHrs) + ":" + parseInt(dMins);


      var sTime = "14:00:00";
      var sTimeHrs = sTime.substring(0,2);
      var sTimeMins = sTime.substring(3,5);

      var hrsFromSTime = (sTimeHrs) + ":" + parseInt(sTimeMins);

      var eTime = "15:30:00";
      var eTimeHrs = eTime.substring(0,2);
      var eTimeMins = eTime.substring(3,5);

      var hrsFromETime = (eTimeHrs) + ":" + parseInt(eTimeMins);

      console.log(hrsFromSTime);
      console.log(hrsFromETime);
      console.log(hrsFromD);


      if(hrsFromD > hrsFromString && hrsFromD < hrsFromETime) {
        $('#groupname').html(less[messageCounterLess].groupname);
        $('#subject').html(less[messageCounterLess].subject);
        $('#room').html(less[messageCounterLess].room);
        $('#start').html(less[messageCounterLess].starttime);        $('#end').html(less[messageCounterLess].endtime);
        messageCounterLess++;
      }
      //inc messageCounter with 1.


    } else {
      splashScreen();
      getData('http://api.computing-moodle.co.uk/api.php/display/lessons/');
      numMessages = 0;
      messageCounterLess = 0;
    }




  }
}

// DisplayLessons()
function displayMessages(JSONDataMESS) {
  numMessages = JSONDataMESS.messages.length;
  if(responseComplete){

    $('.lessons').remove();

    if(numMessages > messageCounterMess) {
      var mess = JSONDataMESS.messages;

      if (mess[messageCounterMess].type === 'WARN') {

        var $warn = $("<div class='warn'><div class='row'><div class='column fs_5em center_align'><div id='heading-warn'></div></div></div><div class='row fs_5em center_align margin_top'><div class='column'><div id='message-warn'></div></div></div><div class='row'><div class='column'></div><div class='column'></div><div class='column'><div id='warn-logo'></div></div></div></div>");

        $('.container').append($warn);

        $('#heading-warn').html(mess[messageCounterMess].heading);
        $('#message-warn').html(mess[messageCounterMess].message);

        if(mess[messageCounterMess].logo != "")
          $('#logo-warn').css('background-image', 'url("' + mess[messageCounterMess].logo + '")');

        $('#heading-warn').css('color', "#" + mess[messageCounterMess].headingcolour);
        $('#message-warn').css('color', "#" + mess[messageCounterMess].textcolour);
        $('.warn').css('background-color', "#" + mess[messageCounterMess].backgroundcolour);


        if (mess[messageCounterMess].background != "")
          $('.warn').css('background-image', 'url("' + mess[messageCounterMess].background + '")');

      } else if (mess[messageCounterMess].type === 'ADVI') {

        var $advi = $("<div class='advi'><div class='row'><div class='column fs_5em center_align'><div id='heading-advi'></div></div></div><div class='row fs_5em center_align margin_top'><div class='column'><div id='message-advi'></div></div></div><div class='row'><div class='column'></div><div class='column'></div><div class='column'><div id='advi-logo'></div></div></div></div>");

        $('.container').append($advi);

        $('#heading-advi').html(mess[messageCounterMess].heading);
        $('#message-advi').html(mess[messageCounterMess].message);
        $('#logo-advi').html(mess[messageCounterMess].logo);

        $('#heading-advi').css('color', "#" + mess[messageCounterMess].headingcolour);
        $('#message-advi').css('color', "#" + mess[messageCounterMess].textcolour);
        $('.advi').css('background-color', "#" + mess[messageCounterMess].backgroundcolour);

        if (mess[messageCounterMess].background != "")
          $('.advi').css('background-image', 'url("' + mess[messageCounterMess].background + '")');

      } else if (mess[messageCounterMess].type == 'JOB') {

        var $job = $("<div class='job'><div class='row'><div class='column' id='heading-job'></div></div><div class='row'><div class='column'></div><div class='column' id='message-job'></div><div class='column'></div></div><div class='row'><div class='column'></div><div class='column'></div><div class='column' id='logo-job'></div></div></div>");

        $('.container').append($job);

        $('#heading-job').html(mess[messageCounterMess].heading);
        $('#message-job').html(mess[messageCounterMess].message);
        $('#logo-job').css('background', "url(" + mess[messageCounterMess].logo + ")");

        $('#heading-job').css('color', "#" + mess[messageCounterMess].headingcolour);
        $('#message-job').css('color', "#" + mess[messageCounterMess].textcolour);
        $('.job').css('background-color', "#" + mess[messageCounterMess].backgroundcolour);

        if (mess[messageCounterMess].background != "")
          $('.job').css('background-image', 'url("' + mess[messageCounterMess].background + '")');

      } else if (mess[messageCounterMess].type == 'FACT') {

        var $fact = $("<div class='fact'><div class='row'><div class='column fs_5em center_align'><div id='heading-fact'></div></div></div><div class='row'><div class='column _10'></div><div class='column _8'><div id='message-fact'></div></div><div class='column _10'></div></div><div class='row'><div class='column'></div><div class='column'></div><div class='column'><div id='logo-fact'></div></div></div></div>");

        $('.container').append($fact);

        $('#heading-fact').html(mess[messageCounterMess].heading);
        $('#message-fact').html(mess[messageCounterMess].message);
        $('#logo-fact').html(mess[messageCounterMess].logo);

        $('#heading-fact').css('color', "#" + mess[messageCounterMess].headingcolour);
        $('#message-fact').css('color', "#" + mess[messageCounterMess].textcolour);
        $('.fact').css('background-color', "#" + mess[messageCounterMess].backgroundcolour);

        if (mess[messageCounterMess].background != "")
          $('.fact').css('background-image', 'url("' + mess[messageCounterMess].background + '")');

      } else if (mess[messageCounterMess].type == 'IMAG') {

        var $imag = $("<div class='imag'><div class='row'><div class='column fs_5em center_align'><div id='heading-imag'></div></div></div><div class='row'><div class='column'></div></div></div>");

        $('.container').append($imag);

        $('#heading-imag').html(mess[messageCounterMess].heading);
        $('#message-imag').html(mess[messageCounterMess].message);
        $('#logo-imag').html(mess[messageCounterMess].logo);

        $('#heading-imag').css('color', "#" + mess[messageCounterMess].headingcolour);
        $('#message-imag').css('color', "#" + mess[messageCounterMess].textcolour);
        $('.imag').css('background-color', "#" + mess[messageCounterMess].backgroundcolour);

        if (mess[messageCounterMess].background != "")
          $('.imag').css('background-image', 'url("' + mess[messageCounterMess].background + '")');

      } else if (mess[messageCounterMess].type === 'CONG') {

        var $cong = $("<div class='cong'><div class='row'><div class='column fs_5em center_align'><div id='heading-cong'></div></div></div><div class='row'><div class='column center_align'><div id='message-cong'></div></div></div></div>");

        $('.container').append($cong);

        $('#heading-cong').html(mess[messageCounterMess].heading);
        $('#message-cong').html(mess[messageCounterMess].message);
        $('#logo-cong').html(mess[messageCounterMess].logo);

        $('#heading-cong').css('color', "#" + mess[messageCounterMess].headingcolour);
        $('#message-cong').css('color', "#" + mess[messageCounterMess].textcolour);
        $('.cong').css('background-color', "#" + mess[messageCounterMess].backgroundcolour);

        if (mess[messageCounterMess].background != "")
          $('.cong').css('background-image', 'url("' + mess[messageCounterMess].background + '")');

      } else if (mess[messageCounterMess].type == 'SPLIT') {

        var $split = ("<div class='split'><div class='row'><div id='heading-split center_align fs_5em'></div><div class='column'><div id='message-split'></div></div><div class='column'><div id='logo-split'></div></div></div></div>");

        $('.container').append($split);

        $('#heading-split').html(mess[messageCounterMess].heading);
        $('#message-split').html(mess[messageCounterMess].message);
        $('#logo-split').html(mess[messageCounterMess].logo);

        $('#heading-split').css('color', "#" + mess[messageCounterMess].headingcolour);
        $('#message-split').css('color', "#" + mess[messageCounterMess].textcolour);
        $('.split').css('background-color', "#" + mess[messageCounterMess].backgroundcolour);

        if (mess[messageCounterMess].background != "")
          $('.warn').css('background-image', 'url("' + mess[messageCounterMess].background + '")');

      }
      messageCounterMess++;
    } else {
      splashScreen();
      getData('http://api.computing-moodle.co.uk/api.php/display/messages/');
      numMessages = 0;
      messageCounterMess = 0;
    }
  }
}

// Display URL's()
function displayURL(JSONDataURL) {
  numMessages = JSONDataURL.urls.length;
  if(responseComplete){

    $('.warn').remove();
    $('.advi').remove();
    $('.job').remove();
    $('.fact').remove();
    $('.imag').remove();
    $('.cong').remove();
    $('.split').remove();

    var $urls = $("<div class='url-container'><div class='row margin_top'><div class='column fs_5em center_align' id='top'></div></div><div class='row margin_top'><div class='column'></div><div class='column center_align' id='url-info'></div><div class='column'></div></div><div class='row margin_top'><div class='column center_align fs_5em' id='bottom'></div></div></div>");
    $('.container').append($urls);
    if(numMessages > messageCounterURLS) {

      var add = JSONDataURL.urls;
     // urls page
      $('#top').html(add[messageCounterURLS].toptext);
      $('#url-info').append(qrMaker(JSONDataURL));
      $('#bottom').html(add[messageCounterURLS].bottomtext);
      $('#url-container').css('background-color', "#" + add[messageCounterURLS].backgroundcolour);
      messageCounterURLS++;
    } else {
      splashScreen();
      getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
      numMessages = 0;
      messageCounterURLS = 0;
    }
  }
}

// Display Videos()
function displayVid(JSONDataVID) {
  numMessages = JSONDataVID.videos.length;

  if(responseComplete){

    $('.url-container').remove();

    var $vid = $("<div class='vid-container'><div class='row'><div class='column center_align holder'></div></div></div>");

    $('.container').append($vid);

    if(numMessages > messageCounterVID) {
      var vid = JSONDataVID.videos;

      var $video = vid[messageCounterVID].url.replace("watch?v=", "embed/");
      var $sTime = vid[messageCounterVID].starttime;

      var $line = $("<iframe width='100%' height='100%' src=" + $video + "?autoplay=1&start=" + $sTime  +" frameborder='0' allowfullscreen></iframe>");
      $('.holder').append($line);
      messageCounterVID++;
    } else {

      splashScreen();
      getData('http://api.computing-moodle.co.uk/api.php/display/videos/');
      numMessages = 0
      messageCounterVID = 0;

    }
  }
}

function displayCD(){
  if(responseComplete) {
    $('.vid-container').remove();

    var $counting = $("<div class='count-container'><div id='countWrapper'><div id='countdownBlock'><h1>WEEK<br><span id='startWeek'></span><br><span id='endWeek'></span> WEEKS TO GO!</h1></div><div id='progressBlock'><div id='progressBar'><div    id='progress'></div></div></div></div></div>");

    $('.container').append($counting);

    startCollege(JSONDataSTART, JSONDataBREAKS, weekDATA);
    $("#startWeek").text(weekDATA[0]);
    $("#endWeek").text(weekDATA[1] - weekDATA[0]);
  }
}

function qrMaker(JSONDataURL){
  $('#url-info').qrcode({
		render	: "table",
		text	: JSONDataURL.urls[messageCounterURLS].url
	});
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    //console.log(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);
    return(h + ":" + m + ":" + s);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function startCollege(startdata, breakdata, weekdata){
 var today = currentDate();
 var academicYear = checkDate(today, startdata, weekdata);
 var startBreaks = [];
 var endBreaks = [];

 for (var i = 0; i < breakdata.breaks.length; i++)
 {
   startBreaks[i] = new Date(breakdata.breaks[i].startdate);
   endBreaks[i] = new Date(breakdata.breaks[i].enddate);
 }

 if((academicYear[0] <= academicYear[1]) && (academicYear[2]))
 {
   var index = 0;
   var breakTime = false;
   while (index < breakdata.breaks.length)
   {
     if((today.getDate >= startBreaks[index].getDate) && (today.getDate < endBreaks[index].getDate))
     {
       breakTime = true;
       for(var j = 0; j <weekdata.length; j++)
       {
         weekDATA[j] = weekdata[j];
       }
       break;
     }
     else
     {
       index++
     }
   }
  if(!breakTime)
  {
    var updatedData = update(today, academicYear);
    for (var k = 0; k < updatedData.length; k++)
    {
      weekDATA[k] = updatedData[k];
    }
  }
 }

 else
 {
   for (var l = 0; l < academicYear.length; l++)
   {
     weekDATA[l] = academicYear[l];
   }
 }
}

function checkDate(todaysDate, sData, wData){

    var academArr = [];
    var nextMonday;
    var collegeStarts = false;
    var academYr1 = new Date(sData.start[0].firstweek);
    var academYr2 = new Date(sData.start[1].firstweek);

    if(todaysDate.getDate() == todaysDate.getDate())
    {
        collegeStarts = true;
        nextMonday = getNextWeekday(new Date(), 1);
        barWidth = 10;
        academArr[0] = Number(sData.start[0].startweek);
        academArr[1] = Number(sData.start[0].endweek);
        academArr[2] = collegeStarts;
        academArr[3] = nextMonday;
        progress.style.width = barWidth + "px";

        dayOfWeek[0] = getNextWeekday(new Date(), 0);
        dayOfWeek[1] = nextMonday;
        dayOfWeek[2] = getNextWeekday(new Date(), 2);
        dayOfWeek[3] = getNextWeekday(new Date(), 3);
        dayOfWeek[4] = getNextWeekday(new Date(), 4);
        dayOfWeek[5] = getNextWeekday(new Date(), 5);
        dayOfWeek[6] = getNextWeekday(new Date(), 6);

    }

    else if(todaysDate.getDate() == academYr2.getDate())
    {
        collegeStarts = true;
        nextMonday = getNextWeekday(new Date(), 1);
        barWidth = 10;
        academArr[0] = Number(sData.start[1].startweek);
        academArr[1] = Number(sData.start[1].endweek);
        academArr[2] = collegeStarts;
        academArr[3] = nextMonday;
        progress.style.width = barWidth + "px";

        dayOfWeek[0] = getNextWeekday(new Date(), 0);
        dayOfWeek[1] = nextMonday;
        dayOfWeek[2] = getNextWeekday(new Date(), 2);
        dayOfWeek[3] = getNextWeekday(new Date(), 3);
        dayOfWeek[4] = getNextWeekday(new Date(), 4);
        dayOfWeek[5] = getNextWeekday(new Date(), 5);
        dayOfWeek[6] = getNextWeekday(new Date(), 6);
    }

    else
    {
        if (wData[2])
        {
          for (var i = 0; i < wData.length; i++)
            academArr[i] = wData[i];
        }

        else
        {
            academArr[0] = 0;
            academArr[1] = 0;
            academArr[2] = collegeStarts;
        }
    }
    return academArr;
}

function update(todaysDate, academInfo){
    var updated;
    var newData = [];

    if ((todaysDate.getDate() == academInfo[3].getDate()) && (!academInfo[4]))
    {
        updated = true;
        var nextMon = getNextWeekday(new Date(), 1);
        barWidth += 10;
        newData[0] = addWeek(academInfo[0]);
        newData[1] = academInfo[1];
        newData[2] = academInfo[2];
        newData[3] = nextMon;
        newData[4] = updated;
        progress.style.width = barWidth + "px";

        dayOfWeek[0] = getNextWeekday(new Date(), 0);
        dayOfWeek[1] = nextMon;
        dayOfWeek[2] = getNextWeekday(new Date(), 2);
        dayOfWeek[3] = getNextWeekday(new Date(), 3);
        dayOfWeek[4] = getNextWeekday(new Date(), 4);
        dayOfWeek[5] = getNextWeekday(new Date(), 5);
        dayOfWeek[6] = getNextWeekday(new Date(), 6);
    }

    else
    {
        updated = false;
        newData[0] = academInfo[0];
        newData[1] = academInfo[1];
        newData[2] = academInfo[2];
        newData[3] = academInfo[3];
        newData[4] = updated;
    }

    return newData;
}

function getNextWeekday (date, dayofweek){
	var dayOffset = dayofweek > date.getDay()
	? dayofweek - date.getDay()
	: dayofweek - date.getDay() + 7;

	date.setDate(date.getDate() + dayOffset);

	return date;
}

function addWeek(weekToAdd){
    var newWeek;
    weekToAdd++;
    newWeek = weekToAdd;
    return newWeek;
}
