myLocalIP = require("my-local-ip");

exports.properHostname = function(hostname){

  if( hostname.match(/(localhost|127(\.0){2}\.1)/) ) {
      return require('my-local-ip')();
  }

  return hostname;

};
