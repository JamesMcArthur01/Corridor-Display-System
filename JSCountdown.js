"use strict";
 var JSONDataSTART;
 var JSONDataBREAKS;
 var responseComplete = false;
 var weekDATA = [];

 $(document).ready(function(){

    // calling method getdata
  getData('http://api.computing-moodle.co.uk/api.php/display/breaks/');
  getData('http://api.computing-moodle.co.uk/api.php/display/start/');
    // interval set to screen.

    var refreshId = setInterval(function(){
        if(responseComplete){
            startCollege(JSONDataSTART, JSONDataBREAKS, weekDATA);
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
     //console.log(JSONDataSTART);
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

function startCollege(startdata, breakdata, weekdata){
 var today = currentDate();
 var academicYear = checkDate(today, startdata, weekdata);
 if((academicYear[0] <= academicYear[1]) && (academicYear[2]))
 {
   //add breaks here
   var updatedData = update(today, academicYear);
    for (var i = 0; i < updatedData.length; i++)
    {
      weekDATA[i] = updatedData[i];
    }
    //if (todaysdate == nextmonday) weekDATA[0] = academicYear[0] + 1
 }

 else
 {
   for (var i = 0; i < academicYear.length; i++)
   {
     weekDATA[i] = academicYear[i];
   }
 }

}

function checkDate(todaysDate, sData, wData){

    var academArr = [];
    var collegeStarts = false;
    var academYr1 = new Date(sData.start[0].firstweek);
    var academYr2 = new Date(sData.start[1].firstweek);

    if(todaysDate.getDate() == todaysDate.getDate())
    {

        collegeStarts = true;
        academArr[0] = Number(sData.start[0].startweek);
        academArr[1] = Number(sData.start[0].endweek);
        academArr[2] = collegeStarts;
        //put nextmonday in here?
    }

    else if(todaysDate.getDate() == academYr2.getDate())
    {
        collegeStarts = true;
        academArr[0] = Number(sData.start[1].startweek);
        academArr[1] = Number(sData.start[1].endweek);
        academArr[2] = collegeStarts;
    }

    else
    {
        if (wData[2])
        {
          for (var i = 0; i < wData.length; i++)
            academArr[i] = wData[i]; //weeknumber
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

function update(todaysDate, academInfo){
    var updated;
    var nextMonday = getNextWeekDay(new Date(), 1);
    var newData = [];
    console.log(nextMonday + " is next monday date");
    //== nextMonday.getDate())
    if ((todaysDate.getDate() == nextMonday.getDate()) && (!academInfo[3]))
    {
        updated = true;
        newData[0] = addWeek(academInfo[0]); //+ 1 instead?
        newData[1] = academInfo[1];
        newData[2] = academInfo[2];
        newData[3] = updated;
        //bar code here
    }

    else
    {
        updated = false;
        nextMonday = getNextWeekDay(new Date(), 1);
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

function addWeek(weekToAdd){
    var newWeek = weekToAdd++;
    return newWeek;
}
