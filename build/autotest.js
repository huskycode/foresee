require("shelljs/global")

console.log("\033[2J\033[0f");
console.log("Restarting autotest...");

exec("mocha --reporter min --compilers coffee:coffee-script --colors --require should test/*.coffee");
