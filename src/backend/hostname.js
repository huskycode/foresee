myLocalIP = require("my-local-ip");

exports.properHostname = function(hostname){
  var regEx = /(localhost|127\.0\.0\.1)(\:[0-9]+)?/;
  var match = regEx.exec(hostname);

  if( match != null ) {
      var port = match[2] != null ? match[2] : "";
      return require('my-local-ip')() + port ;
  }

  return hostname;

};
