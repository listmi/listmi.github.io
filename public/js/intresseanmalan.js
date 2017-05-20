var fields = {
  email: {
    valid: true,
    message: "<li><label for='email'>E-postadress</label></li>"
  },
  useragreements: {
    valid: true,
    message: "<li>Användarvillkor</li>"
  }
};

function validateEmail(adress) {
  var emailAddress = $("#email").val();
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(emailAddress && re.test(emailAddress)) {
    fields.email.valid = true;
  } else {
    fields.email.valid = false;
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
function validateForm() {
  validateEmail();
  validateUserAgreements();
  decorateForm(fields);
}

function postForm(serializedData) {
  var tackSida = location.protocol + '//'+ location.host + "/tack/";
  $.ajax({
    url: "https://docs.google.com/a/matkvitton.se/forms/d/e/1FAIpQLSchMng-DVpm1WCxrOa_i73fzCqj_P9BxJ1MW6DhYxoqQbxQug/formResponse",
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

  $('#intresseanmalan').submit(function(event) {
    event.preventDefault();

    var serializedFormData = $("#intresseanmalan").serialize();
    if (fields.email.valid &&
        fields.useragreements.valid) {
        postForm(serializedFormData);
      }
    });
  });
