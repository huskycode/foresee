Foresee
=======
A web-based planning poker tool. Participants votes the stories projected on the screen using their mobile browser.
Voted points and notes collected are kept in the system and can be downloaded or exported to project management 
tools.

### Build Status
* Unit Test ![Unit Test](https://travis-ci.org/huskycode/foresee.svg?branch=master)

### Interested in helping?
* Join [foreseedev facebook group](https://www.facebook.com/groups/foreseedev) - If you are new, make a post and say hello to the team!
* [Project Status on Trello](https://trello.com/b/BMW2lM2n)
* [Code on GitHub](https://github.com/huskycode/foresee)

NodeJS Installation for Dev
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

Other tools installation for Dev
-----------

Do this for all platform

    npm install -g grunt-cli
    npm install -g phantomjs

* Install firefox, chrome
* Install java

Also make sure you can run java from command line. Try this command

    java -version

Scripts
----------
Before starting anything fetch dependencies

    npm install
    npm run-script webdriver-update

See the end of Gruntfile.js for all tasks that can run. ie.

    grunt test

Install on AWS
==============
    sudo yum install nodejs
    sudo yum install npm
    sudo yum install git
    sudo yum install upstart
    git clone https://github.com/huskycode/foresee.git
    
    cd foresee
    npm install
    
    sudo cp configs/foresee.conf /etc/init
    sudo start foresee
    
