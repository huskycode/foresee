module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'configs/karma.conf.js'
            },
            ci: {
                configFile: 'configs/karma.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: 'configs/karma-e2e.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

};