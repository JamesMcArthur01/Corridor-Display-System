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
            startCollege(JSONDataSTART, JSONDataBREAKS, weekDATA);
            $("#startWeek").text(weekDATA[0]);
            $("#endWeek").text(weekDATA[1] - weekDATA[0]);
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

function startCollege(startdata, breakdata, weekdata)
{
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
   var i = 0;
   var breakTime = false;
   while (i < breakdata.breaks.length)
   {
     if((today.getDate >= startBreaks[i].getDate) && (today.getDate < endBreaks[i].getDate))
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
       i++
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
   for (var i = 0; i < academicYear.length; i++)
   {
     weekDATA[i] = academicYear[i];
   }
 }
}

function checkDate(todaysDate, sData, wData){

    var academArr = [];
    var nextMonday;
    var collegeStarts = false;
    var academYr1 = new Date(sData.start[0].firstweek);
    var academYr2 = new Date(sData.start[1].firstweek);

    if(todaysDate.getDate() == academYr1.getDate())
    {

        collegeStarts = true;
        nextMonday = getNextMonday(new Date(), 1);
        barWidth = 10;
        academArr[0] = Number(sData.start[0].startweek);
        academArr[1] = Number(sData.start[0].endweek);
        academArr[2] = collegeStarts;
        academArr[3] = nextMonday;
        progress.style.width = barWidth + "px";
    }

    else if(todaysDate.getDate() == academYr2.getDate())
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
        var nextMon = getNextMonday(new Date(), 1);
        barWidth += 10;
        newData[0] = addWeek(academInfo[0]);
        newData[1] = academInfo[1];
        newData[2] = academInfo[2];
        newData[3] = nextMon;
        newData[4] = updated;
        progress.style.width = barWidth + "px";
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

function getNextMonday (date, monday)
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
