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
            }
        },
    });

    grunt.loadNpmTasks('grunt-karma');

};