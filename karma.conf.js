// Karma configuration
// Generated on Wed Jun 12 2013 01:58:20 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = '';

preprocessors = {
  '**/*.coffee': 'coffee'
};

// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  'node_modules/chai/chai.js',
  'browsertest/sinon-1.6.0.js',
  'node_modules/mocha/mocha.js',
  'assets/js/jquery-1.7.2.min.js',
  'assets/js/qrcode.coffee',
  'assets/js/host.coffee',
  'assets/js/index.coffee',
  'browsertest/*_test.coffee'
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['dots'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Firefox'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;
