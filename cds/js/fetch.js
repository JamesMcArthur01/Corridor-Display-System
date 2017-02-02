$(document).ready(function(){
    
    /*$.getJSON("http://api.computing-moodle.co.uk/api.php/display/breaks/", function(breaks){
    });*/

    $.ajax({
        url: 'http://api.computing-moodle.co.uk/api.php/display/urls/',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data) {
            $(data.urls).each(function(index, value) {
                //if (value.startweek < 1) {
                    $("div").each(function() {
                        $(this).append("<li>" + value.startweek + "&nbsp&nbsp&nbsp&nbsp&nbsp" + value.endweek + "&nbsp&nbsp&nbsp&nbsp&nbsp" + value.url + "&nbsp&nbsp&nbsp&nbsp&nbsp" + value.toptext + + "&nbsp&nbsp&nbsp&nbsp&nbsp" + value.bottomtext + "&nbsp&nbsp&nbsp&nbsp&nbsp" + "</li>");
                    });
                //}
            });
        }
    });
});




/*

$("div").append('<p>' + result['breaks'][0]['idbreaks'] + "&nbsp&nbsp&nbsp&nbsp&nbsp" + result['breaks'][0]['startweek'] 
            + "&nbsp&nbsp&nbsp&nbsp&nbsp" + result['breaks'][0]['endweek'] + "&nbsp&nbsp&nbsp&nbsp&nbsp" + result['breaks'][0]['startdate'] 
            + "&nbsp&nbsp&nbsp&nbsp&nbsp" + result['breaks'][0]['enddate'] + "&nbsp&nbsp&nbsp&nbsp&nbsp" + result['breaks'][0]['description'] 
            + '</p>' + '<br>');

*/