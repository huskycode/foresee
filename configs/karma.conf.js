module.exports = function(config) {
  config.set({

    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      "src/frontend/js/lib/angular/angular.min.js",
      "src/frontend/js/lib/angular/angular-route.min.js",
      "src/frontend/js/lib/underscore/underscore-min.js",

      "test/frontend/lib/angular/angular-mocks.js",

      'src/frontend/js/lib/jquery/jquery-1.7.2.min.js',
      'src/frontend/js/app.js',
      'src/frontend/js/controllers.js',
      'src/frontend/js/services.js',

      'test/frontend/*_test.js',
    ],

    reporters: ['progress', 'junit'],
    junitReporter: {
      outputFile: 'test-results.xml'
    },

    colors: true,
    autoWatch: true,
    browsers: ["PhantomJS"],
    singleRun: false,
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-junit-reporter'
    ]
    });
};
