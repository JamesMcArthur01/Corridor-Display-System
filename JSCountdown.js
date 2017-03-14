"use strict";
 var JSONDataSTART;
 var JSONDataBREAKS;
 var today = currentDate();
 var nextMonday;
 var responseComplete = false;
 var weekDATA = []; //array- [0] = weeknum [1] = remainder [2] = true
 //var weekData = runCountdown(now, JSONDataSTART, JSONDataBREAKS, weekData);

 $(document).ready(function(){

    // calling method getdata
  getData('http://api.computing-moodle.co.uk/api.php/display/breaks/');
  getData('http://api.computing-moodle.co.uk/api.php/display/start/');
    // interval set to screen.

    var refreshId = setInterval(function(){
        if(responseComplete){
            runCountdown(today, JSONDataSTART, JSONDataBREAKS, weekDATA);
            $("#currentWeek").text(weekDATA[0]);
            $("#weeksRemaining").text(weekDATA[1] - weekDATA[0]);
            //remove reaminig weeks in the statement
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

function runCountdown(todaysdate, startdata, breakdata, weekdata){
 var academicYear = checkDate(todaysdate, startdata, weekdata);

 if((academicYear[0] <= academicYear[1]) && (academicYear[2]))
 {
   //add breaks here
    weekDATA = update(academicYear, todaysdate);
 }

 else
 {
   for (var i = 0; i < academicYear.length; i++)
   {
     weekDATA[i] = academicYear[i];
   }
 }

}

function checkDate(currentdate, sdata, weekdata){

    var academArr = [];
    var collegeStarts = false;
    var academYr1 = new Date(sdata.start[0].firstweek);
    var academYr2 = new Date(sdata.start[1].firstweek);

    if(currentdate.getDate() == academYr1.getDate())
    {
        collegeStarts = true;
        academArr[0] = Number(sdata.start[0].startweek);
        academArr[1] = Number(sdata.start[0].endweek);
        academArr[2] = collegeStarts;
    }

    else if(currentdate.getDate() == academYr2.getDate())
    {
        collegeStarts = true;
        academArr[0] = Number(sdata.start[1].startweek);
        academArr[1] = Number(sdata.start[1].endweek);
        academArr[2] = collegeStarts;
    }

    else
    {
        if (weekdata[2])
        {
          for (var i = 0; i < weekdata.length; i++)
            academArr[i] = weekdata[i]; //weeknumber
        }

        else
        {
            academArr[0] = "Unavailable"; //weeknumber
            academArr[1] = "---";
            academArr[2] = collegeStarts;
        }
    }

    return academArr;

}

function update(academInfo, currentdate){
    var updated;
    var newData = [];
    if ((currentdate.getDate() == nextMonday.getDate()) && (!academInfo[3]))
    {
        updated = true;
        newData[0] = addWeek(academInfo[0]);
        newData[1] = academInfo[1];
        newData[2] = academInfo[2];
        newData[3] = updated;
    }

    else
    {
        updated = false;
        nextMonday = getNextWeekDay(currentdate, 1);
        newData[0] = academInfo[0];
        newData[1] = academInfo[1];
        newData[2] = academInfo[2];
        newData[3] = updated;

    }

    return newData;
}

function getNextWeekDay (date, dayOfWeek)
{
	var dayOffset = dayOfWeek > date.getDay()
	? dayOfWeek - date.getDay()
	: dayOfWeek - date.getDay() + 7;

	date.setDate(date.getDate() + dayOffset);

	return date;
}

function addWeek (weekToAdd){
    var newWeek = weekToAdd++;
    return newWeek;
}
