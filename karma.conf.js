module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/chai/chai.js',
      "src/test/browsertest/lib/jasmine/jasmine-html.js",
      "src/test/browsertest/lib/jasmine/jasmine-ajax.js",

      "assets/js/lib/angular/angular.min.js",
      "assets/js/lib/underscore/underscore-min.js",
      "assets/js/jquery-1.7.2.min.js",

      "src/test/browsertest/lib/angular/angular-mocks.js",
      'assets/js/jquery-1.7.2.min.js',
      'assets/js/foresee.js',
      'assets/js/index.js',
      'assets/js/host2.js',
      'assets/js/services.js',
      'assets/js/participant.js',
      'src/test/browsertest/*_test.js'
    ],
    browsers: ['Firefox'],
    singleRun: true,
  });
};
