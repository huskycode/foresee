module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            dev: {
                configFile: 'configs/karma.conf.js',
                browsers: ['PhantomJS']
            },
            unit: {
                configFile: 'configs/karma.conf.js',
                browsers: ['PhantomJS'],
                singleRun: true
            },
            ci: {
                configFile: 'configs/karma.conf.js',
                singleRun: true
            }
        },
    });

    grunt.loadNpmTasks('grunt-karma');

};
