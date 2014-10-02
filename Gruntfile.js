'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');

  var allJavaScriptFilePaths = [
    'app/js/**/*.js',
    'server.js'
  ];

  grunt.initConfig({
    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: [
          '*.html',
          'css/*.css',
          'views/*.html'
        ],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    jshint: {
      all: allJavaScriptFilePaths,
      options: {
        jshintrc: true
      }
    },

    browserify: {
      dev: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: [
          'app/js/**/*.js',
          'app/app.js'
        ],
        dest: 'build/scripts.js'
      }
    },

    sass: {
      build: {
        files: {
          'app/css/styles.css': 'app/css/scss/styles.scss'
        }
      }
    },

    express: {
      dev: {
        options: {
          script: 'server.js',
          background: true
        }
      }
    },

    watch: {
      express: {
        files: [
          'app/js/**/*.js',
          'app/index.html',
          'app/views/**/*.html',
          'app/css/scss/*.scss',
          'server.js',
          'models/*.js',
          'routes/*.js',
          'images/**.*'
        ],
        tasks: [
          'jshint',
          'sass',
          'clean:dev',
          'browserify:dev',
          'copy:dev',
          'express:dev',
          'watch:express'
        ],
        options: {
          spawn: false
        }
      }
    },
  });

  // register tasks
  grunt.registerTask('default', [
      'jshint',
      'sass',
      'clean:dev',
      'browserify:dev',
      'copy:dev',
      'express:dev',
      'watch:express'
    ]);

  grunt.registerTask('build:dev', [
      'clean:dev',
      'browserify:dev',
      'copy:dev'
    ]);

  grunt.registerTask('watch:dev', [
      'build:dev',
      'express:dev',
      'watch:express'
    ]);

};