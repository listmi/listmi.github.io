function validateEmail(adress) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        0: function() {
          window.location = tackSida;
        },
        200: function() {
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
});
