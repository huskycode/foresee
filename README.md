Foresee
=======
A web-based planning poker tool. Participants votes the stories projected on the screen using their mobile browser.
Voted points and notes collected are kept in the system and can be downloaded or exported to project management 
tools.

### Build Status
* Unit Test ![Unit Test](http://teamcity.huskycode.com/app/rest/builds/buildType:bt3/statusIcon)
* Acceptance Test ![Unit Test](http://teamcity.huskycode.com/app/rest/builds/buildType:bt4/statusIcon)

### Interested in helping?

* Join [foreseedev facebook group](https://www.facebook.com/groups/foreseedev)
* [Project Status on Trello](https://trello.com/b/BMW2lM2n)
* [Code on GitHub](https://github.com/huskycode/foresee)

Instructions for Dev
-----------
### OS X
1. Install [Homebrew](http://mxcl.github.com/homebrew/)
2. Install node via homebrew [ brew install node ]
3. Go to the directory where you cloned the repository
4. npm install
5. add "/usr/local/share/npm/bin" to $PATH variable in ~/.bash_profile. If the line does not exist, put in this: "export PATH=$PATH:/usr/local/share/npm/bin"

### Ubuntu
1. sudo apt-get install software-properties-common
2. sudo add-apt-repository ppa:chris-lea/node.js
3. sudo apt-get update
4. sudo apt-get install nodejs

### Windows
1. Download Install nodejs from http://nodejs.org/download/

### All Platforms

* Install firefox
* Install java
* Install global dependencies (use sudo if on ubuntu)

     npm install -g jasmine-node
     npm install -g nodemon

make sure you can run java from command line. Try this command

    java --version

### Running Server in Development Mode
1. go to the directory
2. type "./run dev" (or "run.bat dev" on Windows)
3. browse to: http://localhost:3000

### Build Targets

Take a look at build.gradle

The "run" script is created as a shortcut to build/make.coffee

    Unit Tests : ./run unittest
    Selenium Tests : ./run webtest


Architectural Drivers
------
### High-Level Requirement
1. A faciliator creates a "room" and import stories to estimate
2. Using the room code, all participants join using browser on their phone or computer.
3. A facilitator controls when the votes ends. They can also record any assumptions agreed upon in the meeting
4. Anybody can use the room code to visit it later and download results.

### Quality Attributes
1. Robustness #1: At any point, the facilitator can force progress the planning even when the connection from participants
are flaky.
2. Usability: Given a blank Linux or Windows machine, the program can be installed to use with less than 3 steps,
in less than 2 minute and require 0 configuration tweak to start.
3. Robustness #2: Given a flaky connection, the status can be sync with the facilitator (forced or automatic) within 0.5
seconds when connection return.

FAQs
----
Q: [www.planningpoker.com](http://www.planningpoker.com/) already provide this? why another one?

A: Two major reasons. The implementation on said web is ...

1. Online-only. This means you have to connect to the interet to use, and also needs
to transfer the details of your project outside your company.
2. Not robust enough. It does not handle flaky connection well. The voting result get dropped quite often.
