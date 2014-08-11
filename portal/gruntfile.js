module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            sitecss: {
                options: {
                    banner: '/* My minified css file */'
                },
                files: {
                    'css/site.min.css': [
                    'css/zero.css',
                    'css/mediaXS.css',
                    'css/mediaSM.css',
                    'css/mediaMD.css',
                    'css/mediaLG.css',
                    'css/mediaOTHER.css',
                    'css/sidemenu.css',
                    'css/style.css'
                        ]
                }
            }
        },
        uglify: {
            options: {
                compress: true
            },
            applib: {
                src: [
                    'js/addCrashLayers.js',
                    'js/addLayers.js',
                    'js/categoryBtnFuncs.js',
                    'js/js/classie.js',
                    'js/crashFunctions.js',
                    'js/geocoder.js',
                    'js/identifyTask.js',
                    'js/resize.js',
                    'js/sliderSetup.js',
                    'js/statFunctions.js',
                    'js/statJSON.js',
                    'js/zero.js',
                    'js/offCanvas.js'
                ],
                dest: 'js/applib.js'
            }
        }
    });
    // Default task.
    grunt.registerTask('default', ['uglify', 'cssmin']);
};
