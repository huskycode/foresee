require('shelljs/global');
 
console.log('\033[2J\033[0f'); //Clear Screen
console.log('Restarting autotest...');

exec('mocha --reporter min --compilers coffee:coffee-script --colors test/*_test.coffee');
  