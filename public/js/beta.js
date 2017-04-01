var validFields = {
  gmail: true,
  operativsystem: true,
  useragreements: true,
};

function validateGmail() {
  var emailAddress = $("#gmail").val();
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@gmail.com$/;
  if(emailAddress && re.test(emailAddress)) {
    validFields.gmail = true;
  } else {
    validFields.gmail = false;
  }
}

function validateOS() {

  if (($("#android:checked").length === 0) && ($("#ios:checked").length === 0) ) {
    validFields.operativsystem = false;
  } else {
    validFields.operativsystem = true;
  }
}

function validateUserAgreements() {

  console.log("UA checked?"+$("#useragreements:checked").length);
  if ($("#useragreements:checked").length > 0) {
    validFields.useragreements = true;
  } else {
    validFields.useragreements = false;
  }
}

function decorateForm(fields) {
  $("#error-summary").hide(); // Clear messages
  for (var key in fields) {
    // skip loop if the property is from prototype
    if (!fields.hasOwnProperty(key)) continue;

    if (fields[key]) {
      $("#error-summary .messages ."+key).hide();
      $("#"+key).closest(".form-group").removeClass('has-error');
    } else {
      $("#error-summary .messages ."+key).show();
      $("#"+key).closest(".form-group").addClass('has-error');
      $("#error-summary").show();
      $("#error-summary").focus();
    }
  }
}

/* Sker onClick */
function validateBetaForm() {
  validateGmail();
  validateOS();
  validateUserAgreements();
  decorateForm(validFields);
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
    if (validFields.gmail &&
      validFields.operativsystem &&
      validFields.useragreements) {
        postBetaForm(serializedFormData);
      }
    });
  });
