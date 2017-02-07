// global variables
var JSONData;
var responseComplete = false;

// jQuery Api 
$(document).ready(function(){


    getData('http://api.computing-moodle.co.uk/api.php/display/urls/');
    var refreshId = setInterval(function(){
        if(responseComplete){
          $('#toptext').html(JSONData.urls[0].toptext);  
        } 
    },10000);
});

function getData(theUrl) {
    responseComplete = false;

    $.ajax({
        url: theUrl,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data) {
            $(data.urls).each(function(index, value) {
                $('#breaks').each(function() {
                    $(this).append("<li>" + value.startweek + "&nbsp&nbsp&nbsp&nbsp&nbsp" + value.endweek + "&nbsp&nbsp&nbsp&nbsp&nbsp" + value.url + "&nbsp&nbsp&nbsp&nbsp&nbsp" + value.toptext  + "&nbsp&nbsp&nbsp&nbsp&nbsp" + value.bottomtext + "&nbsp&nbsp&nbsp&nbsp&nbsp" + "</li>");
                });
                storeData(data);
            });
            
            
        }, 
    });
}

function storeData(data){
     JSONData = data;
     responseComplete = true;
}
