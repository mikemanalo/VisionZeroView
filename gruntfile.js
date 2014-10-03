module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            sitecss: {
                options: {
                    banner: '/* Vision Zero CSS file*/'
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
                    'js/zero.js',
                    'js/crashFunctions.js',
					'js/addCrashLayers.js',
					'js/identifyTask.js',
					'js/sliderSetup.js',
					'js/categoryBtnFuncs.js',
					'js/resize.js',
                    'js/addLayers.js',
                     'js/geocoder.js',
                     'js/statJSON.js',
                     'js/offCanvas.js',
                    'js/map_config.js',
                    'js/smallScreenButtonFuncs.js'     
                ],
                dest: 'js/applib.js'
            }
        }
    });
    // Default task.
    grunt.registerTask('default', ['uglify', 'cssmin']);
};
