// i: parameter name
// o: parameter value
var getParameterByName = function (name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  // returns empty string if parameter is not present
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// default tracking uses 'i' parameter to set user_tracker
// set var i_tracker to value of 'i' parameter
var i_tracker = getParameterByName('i');

// display messages on cached pages via URL 'msg' parameter
var url_msg = getParameterByName('msg');

// remove URL from parameter
// ref: http://stackoverflow.com/a/1634841/1885896
var removeUrlParameter = function (url, parameter) {
  var urlparts= url.split('?');   
  if (urlparts.length>=2) {
    var prefix= encodeURIComponent(parameter)+'=';
    var pars= urlparts[1].split(/[&;]/g);
    for (var i= pars.length; i-- > 0;) { 
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
        pars.splice(i, 1);
      }
    }
    url= urlparts[0]+'?'+pars.join('&');
    return url;
  } else {
    return url;
  }
}

$(function(){
  // update hidden input if tracker value present
  if ((i_tracker.length > 0) && (i_tracker.length < 200)){
    $('#user_tracker').val(i_tracker);
  }

  // if URL param 'msg' is present...
  if (url_msg.length > 0){
    // inject text(param value) into alert box on primary panel
    $('.panel-primary .panel-body .alert').text(url_msg).show();

    // remove 'msg' parameter for cleaner presentation
    var clean_url = removeUrlParameter(location.href, 'msg');
    history.replaceState({}, '', clean_url);
  }

})
