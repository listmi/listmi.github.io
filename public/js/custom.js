function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}

if (getCookie('listmiCookie').length > 0) {
  $( "#cookieDisclaimer" ).hide();
}

$( "#closeDisclaimerBtn" ).click(function() {
  var expireDate = new Date();
  expireDate.setFullYear(expireDate.getFullYear() + 1);
  document.cookie = "listmiCookie=accepted;expires=" + expireDate.getUTCDate();
  $( "#cookieDisclaimer" ).fadeOut(600, 'linear', function() {
    $("#cookieDisclaimerConfirmation").fadeIn(600, 'linear');
    $('#cookieDisclaimerConfirmation').delay(8000).fadeOut(600, 'linear');
  });

});

function validateEmail(adress) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(adress);
}

// Testar enbart början på adressen
function validateGmail(adress) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))$/; // @gmail.([a-zA-Z]{2,})
  return re.test(adress);
}

function postForm() {
  var email = $('#email').val();
  var accepted = $('#acceptConditions').prop('checked');
  var tackSida = location.protocol + '//'+ location.host + "/tack/";
  if ((accepted) && ((email !== "") && (validateEmail(email)))) {
    $.ajax({
      url: "https://docs.google.com/a/matkvitton.se/forms/d/e/1FAIpQLSchMng-DVpm1WCxrOa_i73fzCqj_P9BxJ1MW6DhYxoqQbxQug/formResponse",
      data: {"emailAddress" : email},
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function (){
          window.location = tackSida;
        },
        200: function (){
          window.location = tackSida;
        }
      }
    });
  } else {
    $('#errorMessage').show(); // visar felmeddelande
  }
}

function postBetaForm() {
  var email = $('#email').val();
  var os = $("input[type='radio'][name='operativsystem']:checked").val();
  var accepted = $('#acceptConditions').prop('checked');
  var tackSida = location.protocol + '//'+ location.host + "/tack/";
  if ((accepted) && ((email !== "") && (validateGmail(email)))) {
    $.ajax({
      url: "https://docs.google.com/a/matkvitton.se/forms/d/e/1FAIpQLSewbUqJUguTseUaQvJeAyzxEt1evb60zGzVbjMuPXnEmQLuEA/formResponse",
        data: {
          "emailAddress" : email+'@gmail.com',
          "entry.1102873716": os
      },
      type: "POST",
      dataType: "xml",
      crossDomain: true,
      statusCode: {
        200: function() {
          window.location = tackSida;
        },
        0: function (){
          window.location = tackSida;
        }
      }
    });
  } else {
    $('#errorMessage').show(); // visar felmeddelande
  }
}

$(document).ready(function(){
  $('#intresseanmalan').submit(function() {
    postForm();
    return false;
  });
  $('#intresseanmalan-beta').submit(function() {
    postBetaForm();
    return false;
  });
});
