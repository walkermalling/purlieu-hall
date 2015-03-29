'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-simple-mocha');

  var allJavaScriptFilePaths = [
    'app/js/**/*.js',
    'models/**/*.js',
    'routes/**/*.js',
    'lib/**/*.js',
    'server.js'
  ];

  grunt.initConfig({
    clean: {
      dev: {
        src: ['build/']
      },
      style: {
        src: ['build/css']
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: [
          '*.html',
          'css/*.css',
          'views/*.html',
          'js/**/*.html',
          'images/**/*',
          'fonts/**/*'
        ],
        dest: 'build/',
        filter: 'isFile'
      },
      style:{
        expand:true,
        cwd: 'app/',
        src: [
          'css/*.css'
        ],
        dest: 'build/',
        filter:'isFile'
      }
    },

    // jshint: {
    //   all: allJavaScriptFilePaths,
    //   options: {
    //     jshintrc: true
    //   }
    // },

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

    simplemocha: {
      all: {
        src: ['test/mocha/**/*.js']
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
          'app/css/*.css',
          'app/views/**/*.html',
          'server.js',
          'models/*.js',
          'routes/*.js',
          'images/**.*',
          '.jshintrc'
        ],
        tasks: [
          'clean:dev',
          'browserify:dev',
          'sass:build',
          'copy:dev',
          'express:dev',
          'watch:express'
        ],
        options: {
          spawn: false
        }
      },
      style: {
        files: [
          'app/css/scss/*.scss',
          '!app/css/scss/styles.scss'
        ],
        tasks: [
          'clean:style',
          'sass:build',
          'copy:style',
          'express:dev',
          'watch:style'
        ],
        options: {
          spawn: false
        }
      }
    },
  });

  // register tasks
  grunt.registerTask('default', [
      'clean:dev',
      'browserify:dev',
      'sass:build',
      'copy:dev',
      'express:dev'
    ]);

  grunt.registerTask('build', [
      'clean:dev',
      'browserify:dev',
      'sass:build',
      'copy:dev'
    ]);

  grunt.registerTask('test', [
      'clean:dev',
      'browserify:dev',
      'sass:build',
      'copy:dev',
      'simplemocha'
    ]);

  grunt.registerTask('watch:dev', [
      'build:dev',
      'express:dev',
      'watch:express'
    ]);

  grunt.registerTask('serve:style', [
      'express:dev',
      'watch:style'
    ]);

  grunt.registerTask('serve',[
      'express:dev',
      'watch:express'
    ]);

};