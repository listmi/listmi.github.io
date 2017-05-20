var fields = {
  gmail: {
    valid: true,
    message: "<li><label for='gmail'>E-postadress</label></li>"
  },
  operativsystem: {
    valid: true,
    message: "<li>Operativsystem</li>"
  },
  useragreements: {
    valid: true,
    message: "<li>Användarvillkor</li>"
  }
};

function validateGmail() {
  var emailAddress = $("#gmail").val();
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@gmail.com$/;
  if(emailAddress && re.test(emailAddress)) {
    fields.gmail.valid = true;
  } else {
    fields.gmail.valid = false;
  }
}

function validateOS() {

  if (($("#android:checked").length === 0) && ($("#ios:checked").length === 0) ) {
    fields.operativsystem.valid = false;
  } else {
    fields.operativsystem.valid = true;
  }
}

function validateUserAgreements() {

  console.log("UA checked?"+$("#useragreements:checked").length);
  if ($("#useragreements:checked").length > 0) {
    fields.useragreements.valid = true;
  } else {
    fields.useragreements.valid = false;
  }
}

function decorateForm(fields) {
  $("#error-summary").html(""); // Clear messages
  var errors = [];
  for (var key in fields) {
    // skip loop if the property is from prototype
    if (!fields.hasOwnProperty(key)) continue;
    if (fields[key].valid) {
      $("#"+key).closest(".form-group").removeClass('has-error');
    } else {
      errors.push(fields[key].message);
      $("#"+key).closest(".form-group").addClass('has-error');
    }
  }
  if (errors.length > 0) {
    $("#error-summary").append("<h1><span class='fa fa-exclamation-triangle' aria-hidden='true'></span> Vänligen korrigera följande</h1>");
    $("#error-summary").append("<ul>");
    $("#error-summary ul").append(errors.join(''));
    $("#error-summary").show();
    $("#error-summary").focus();
  }
}

/* Sker onClick */
function validateBetaForm() {
  validateGmail();
  validateOS();
  validateUserAgreements();
  decorateForm(fields);
}

function postBetaForm(serializedData) {
  var tackSida = location.protocol + '//'+ location.host + "/tack/";
  $.ajax({
    url: "https://docs.google.com/a/matkvitton.se/forms/d/e/1FAIpQLSewbUqJUguTseUaQvJeAyzxEt1evb60zGzVbjMuPXnEmQLuEA/formResponse",
    data: serializedData,
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
}

$(document).ready(function(){

  $('#beta').submit(function(event) {
    event.preventDefault();

    var serializedFormData = $("#beta").serialize();
    if (fields.gmail.valid &&
      fields.operativsystem.valid &&
      fields.useragreements.valid) {
        postBetaForm(serializedFormData);
      }
    });
  });
