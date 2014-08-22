'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['app/scripts/*.js','app/scripts/views/*.js','app/scripts/views/mne/*.js','app/scripts/views/passphrase/*.js']
      },
    },
    csslint: {
      options: {
          csslintrc: '.csslintrc'
      },
      cloudly: {
        src: ['app/styles/cloudly.css']
      }
    },
    autoprefixer: {
      cloudly: {
        src: 'app/styles/cloudly.css',
        dest: 'app/styles/cloudly-fixed.css',
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      templates: {
        files: ['app/scripts/templates/*.mustache'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['app/styles/*.css'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ['app/scripts/*.js','app/scripts/views/*.js'],
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task.
  grunt.registerTask('launch', ['nodemon','watch']);

};
