module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine_node: {
      all: ['test/backend/'],
      options: {
        isVerbose: true,
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        captureExceptions: true,
        junitreport: {
          report: true,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      }
    },
    karma: {
      unit: {
        configFile: 'configs/karma.conf.js',
        reporters: ['progress'],
        singleRun: true
      },
      ci: {
        configFile: 'configs/karma.conf.js',
        reporters: ['junit'],
        junitReporter: {
          outputFile: 'build/reports/e2e/test-results.xml'
        },
        singleRun: true
      }
    },
    protractor: {
      options: {
        configFile: "configs/protractor.conf.js",
        keepAlive: false,
        noColor: false,
        args: {
        }
      },
      e2e: {

      },
      ci: {
        options: {
          args: {
            "browser": "PhantomJS"
          }
        }
      }
    },
    express: {
      options: {
      },
      dev: {
        options: {
          script: 'app.js'
        }
      },
      ci: {
        options: {
          script: 'app.js'
        }
      }
    },
    watch: {
      express: {
        files:  [ 'src/**/*.*' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.task.registerTask("dev", ["express:dev", "watch"]);
  grunt.task.registerTask("test-frontend", ["karma:unit"]);
  grunt.task.registerTask("test-backend", ["jasmine_node:all"]);
  grunt.task.registerTask("e2e", ["express:ci", "protractor:e2e"]);

  grunt.task.registerTask("ci-e2e", ["express:ci", "protractor:ci"]);
  grunt.task.registerTask("ci-test-frontend", ["karma:ci"]);
  grunt.task.registerTask("ci-test-backend", ["jasmine_node:all"]);
};
