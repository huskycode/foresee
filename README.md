Foresee
=======
A web-based planning poker tool. Participants votes the story projected on the screen using their mobile browser.
The results, clarifications and assumptions are recorded and can be output from the program. 

FAQs
----
Q: [www.planningpoker.com](http://www.planningpoker.com/) already provide this? why another one?

A: Two major reasons. The implementation on said web is ...

1. Online-only. This means you have to connect to the interet to use, and also needs
to transfer the details of your project outside your company.
2. Not robust enough. It does not handle flaky connection well. The voting result get dropped quite often.

Instructions for Dev
-----------
### OS X
1. Install Homebrew
2. Install node via homebrew
3. Install npm via website
4. npm install
5. add "/usr/local/share/npm/bin" to $PATH variable in ~/.bash_profile

### Ubuntu
1. sudo apt-get install software-properties-common
2. sudo add-apt-repository ppa:chris-lea/node.js
3. sudo apt-get update
4. sudo apt-get install nodejs npm

### All Platforms
(Use "sudo" if on ubuntu)
1. npm install coffee-script -g 
2. npm install mocha -g 
3. npm install docco -g  
4. npm install supervisor -g 

### Running Server in Development Mode
1. go to the directory
2. type "cake dev"
3. browse to: http://localhost:3000
