module.exports = function(config) {
  config.set({

    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      "frontend/js/lib/angular/angular.min.js",
      "frontend/js/lib/angular/angular-route.min.js",
      "frontend/js/lib/underscore/underscore-min.js",

      "src/test/browsertest/lib/angular/angular-mocks.js",

      'frontend/js/lib/jquery/jquery-1.7.2.min.js',
      'frontend/js/app.js',
      'frontend/js/controllers.js',
      'frontend/js/services.js',
      'src/test/browsertest/*_test.js',
    ],

    reporters: ['progress', 'junit'],
    junitReporter: {
      // will be resolved to basePath (in the same way as files/exclude patterns)
      outputFile: 'test-results.xml'
    },

    colors: true,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-junit-reporter'
    ]
    });
};
