


$(document).ready(function(){
jQuery('#qrcodeoutput').qrcode({
text : "http://www.lincolncollege.ac.uk/"
      });
});


setInterval(function(){
  $("#welcome_text").toggle();
  $("#welcome_text2").toggle();
},3000);
