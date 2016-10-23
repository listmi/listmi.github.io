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
  //expireDate.setFullYear(expireDate.getFullYear() + 1);
  document.cookie = "listmiCookie=accepted;"; // expires=" + expireDate.getUTCDate();
  $( "#cookieDisclaimer" ).fadeOut(600, 'linear', function() {
    $("#cookieDisclaimerConfirmation").fadeIn(600, 'linear');
    $('#cookieDisclaimerConfirmation').delay(2000).fadeOut(600, 'linear');
  });

});
