exports.config = {
    seleniumServerJar: null,
    seleniumPort: null,
    chromeOnly: false,

    // seleniumArgs: ['-browserTimeout=60'],
    seleniumArgs: [],

    // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
    // The tests will be run remotely using SauceLabs.
    sauceUser: null,
    sauceKey: null,

    // The address of a running selenium server. If specified, Protractor will
    // connect to an already running instance of selenium. This usually looks like
    // seleniumAddress: 'http://localhost:4444/wd/hub'
    seleniumAddress: null,

    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.
    allScriptsTimeout: 11000,

    specs: [
        '../test/e2e/*_test.js',
    ],
    exclude: [],

    // ----- Capabilities to be passed to the webdriver instance ----
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
    capabilities: {
        'browserName': 'chrome'
    },
    multiCapabilities: [],

    // A base URL for your application under test.
    baseUrl: 'http://localhost:3000',

    // Selector for the element housing the angular app - this defaults to
    // body, but is necessary if ng-app is on a descendant of <body>
    rootElement: 'body',

    // A callback function called once protractor is ready and available, and
    // before the specs are executed
    // You can specify a file containing code to run by setting onPrepare to
    // the filename string.
    onPrepare: function() {
        // At this point, global 'protractor' object will be set up, and jasmine
        // will be available. For example, you can add a Jasmine reporter with:
        //     jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
        //         'outputdir/', true, true));
    },

    // The params object will be passed directly to the protractor instance,
    // and can be accessed from your test. It is an arbitrary object and can
    // contain anything you may need in your test.
    // This can be changed via the command line as:
    //   --params.login.user 'Joe'
    params: {
        login: {
            user: 'Jane',
            password: '1234'
        }
    },

    // ----- The test framework -----
    framework: 'jasmine',

    // ----- Options to be passed to minijasminenode -----
    // See the full list at https://github.com/juliemr/minijasminenode
    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        // If true, display spec names.
        isVerbose: false,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000
    },

    // ----- Options to be passed to mocha -----
    //
    // See the full list at http://visionmedia.github.io/mocha/
    mochaOpts: {
        ui: 'bdd',
        reporter: 'list'
    },

    // ----- Options to be passed to cucumber -----
    cucumberOpts: {
        // Require files before executing the features.
        require: 'cucumber/stepDefinitions.js',
        // Only execute the features or scenarios with tags matching @dev.
        // This may be an array of strings to specify multiple tags to include.
        tags: '@dev',
        // How to format features (default: progress)
        format: 'summary'
    },

    // ----- The cleanup step -----
    //
    // A callback function called once the tests have finished running and
    // the webdriver instance has been shut down. It is passed the exit code
    // (0 if the tests passed or 1 if not).
    onCleanUp: function() {}
};
