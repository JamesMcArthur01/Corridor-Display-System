"use strict";
 var JSONDataSTART;
 var JSONDataBREAKS;
 var responseComplete = false;
 var weekDATA = [];
 var barWidth;

 $(document).ready(function(){

    // calling method getdata
  getData('http://api.computing-moodle.co.uk/api.php/display/breaks/');
  getData('http://api.computing-moodle.co.uk/api.php/display/start/');
    // interval set to screen.

    var refreshId = setInterval(function(){
        if(responseComplete){
            startCollege(JSONDataSTART, JSONDataBREAKS, weekDATA); //calls start of countdown functions
            $("#startWeek").text(weekDATA[0]); //displays current value of element [0] in weekDATA array
            $("#endWeek").text(weekDATA[1] - weekDATA[0]); //displays value of element [1] - element [0] eg 36 - 1
        }
    },10000);
});

function getData(theUrl) {
    responseComplete = false;
    // data collection.
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
    })

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

function storeDataSTART(dataSTART){
     JSONDataSTART = dataSTART;
     responseComplete = true;
}

function storeDataBREAKS(dataBREAKS){
     JSONDataBREAKS = dataBREAKS;
     responseComplete = true;
}


function currentDate()
{
    var now = new Date();
    return now;
}

function startCollege(startdata, breakdata, weekdata) //(JSONStartDATA, JSONbreakDATA, weekDATA)
{
 var today = currentDate();
 var academicYear = checkDate(today, startdata, weekdata); //returns array of data from checkdate depending on the date
 var startBreaks = []; //array containing startdate breaks data
 var endBreaks = []; //array contaning enddate breaks data

 for (var i = 0; i < breakdata.breaks.length; i++) //populates breaks arrays
 {
   startBreaks[i] = new Date(breakdata.breaks[i].startdate);
   endBreaks[i] = new Date(breakdata.breaks[i].enddate);
 }

 if((academicYear[0] <= academicYear[1]) && (academicYear[2])) // if e.g 1 < 36 and collegestarts = true
 {
   var i = 0;
   var breakTime = false;
   while (i < breakdata.breaks.length)
   {
     if((today.getDate >= startBreaks[i].getDate) && (today.getDate < endBreaks[i].getDate)) //checks each break date
     {
       breakTime = true;
       for(var j = 0; j <weekdata.length; j++)
       {
         weekDATA[j] = weekdata[j]; //if break date, weekDATA array remains the same
       }
       break;
     }
     else
     {
       i++
     }
   }
  if(!breakTime) //if breaktime is false
  {
    var updatedData = update(today, academicYear); //update returns updated array based on nextMonday
    for (var k = 0; k < updatedData.length; k++)
    {
      weekDATA[k] = updatedData[k]; //populates weekDATA with updatedData array if not break time
    }
  }
 }

 else
 {
   for (var i = 0; i < academicYear.length; i++)
   {
     weekDATA[i] = academicYear[i]; //this only populates if the countdown hasn't started
   }
 }
}

function checkDate(todaysDate, sData, wData){ //(today, JSONStartDATA, weekDATA)

    var academArr = [];
    var nextMonday;
    var collegeStarts = false; 
    var academYr1 = new Date(sData.start[0].firstweek); //populates both variables with the values located at firstweek 
    var academYr2 = new Date(sData.start[1].firstweek);

    if(todaysDate.getDate() == academYr1.getDate()) //compares current date against start of current academic year
    {

        collegeStarts = true; //as long as collegeStarts is true, code will continue counting down 
        nextMonday = getNextMonday(new Date(), 1); //variable becomes the date for next monday
        barWidth = 10; 
        academArr[0] = Number(sData.start[0].startweek); //returning academic array [0] becomes in this case 1 
        academArr[1] = Number(sData.start[0].endweek); //returning academic array [1] becomes in this case 36
        academArr[2] = collegeStarts; //returning academic array [2] becomes in this case 'true'
        academArr[3] = nextMonday; //returning academic array [3] becomes in this case the date for next monday
        progress.style.width = barWidth + "px";
    }

    else if(todaysDate.getDate() == academYr2.getDate()) //same as above but next academic year starting date
    {
        collegeStarts = true;
        nextMonday = getNextMonday(new Date(), 1);
        barWidth = 10;
        academArr[0] = Number(sData.start[1].startweek);
        academArr[1] = Number(sData.start[1].endweek);
        academArr[2] = collegeStarts;
        academArr[3] = nextMonday;
        progress.style.width = barWidth + "px";
    }

    else //this will run on every other day
    {
        if (wData[2]) //checks that collegestarts is still true
        {
          for (var i = 0; i < wData.length; i++)
            academArr[i] = wData[i]; //populates return array with values in weekDATA array
        }

        else //only runs if countdown hasn't started i.e. collegestarts = false
        {
            academArr[0] = 0;
            academArr[1] = 0;
            academArr[2] = collegeStarts;
        }
    }
    return academArr;
}

function update(todaysDate, academInfo){ //(today, academicYear)
    var updated;
    var newData = []; //this array updates the weekDATA array if current date == nextmonday

    if ((todaysDate.getDate() == academInfo[3].getDate()) && (!academInfo[4])) //if current date is equal to currently stored date for next monday and updated = false
    {
        updated = true;
        var nextMon = getNextMonday(new Date(), 1); //updates stored date for next monday with new next monday
        barWidth += 10;
        newData[0] = addWeek(academInfo[0]); //increments current week
        newData[1] = academInfo[1]; //returns 36
        newData[2] = academInfo[2]; //returns true
        newData[3] = nextMon; //adds new next monday
        newData[4] = updated;
        progress.style.width = barWidth + "px";
    }

    else //this will run as long as current date does not equal next monday
    {
        updated = false;
        newData[0] = academInfo[0]; //returns same data
        newData[1] = academInfo[1];
        newData[2] = academInfo[2];
        newData[3] = academInfo[3];
        newData[4] = updated;
    }

    return newData;
}

function getNextMonday (date, monday) //retrieves next monday date
{
	var dayOffset = monday > date.getDay()
	? monday - date.getDay()
	: monday - date.getDay() + 7;

	date.setDate(date.getDate() + dayOffset);

	return date;
}

function addWeek(weekToAdd){
    var newWeek;
    weekToAdd++;
    newWeek = weekToAdd;
    return newWeek;
}
