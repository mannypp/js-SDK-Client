module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        smarttabs: true
      },
      all: ['Gruntfile.js', 'src/DWAPI*.js', 'src/DWShop*.js']
    },

    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['src/DWAPI*.js', 'src/DWShop*.js'],
        dest: 'build/js-SDK-Client.js',
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/js-SDK-Client.js',
        dest: 'build/js-SDK-Client.min.js'
      }
    },

    jsdoc : {
        dist : {
            src: ['src/*.js'], 
            options: {
                destination: 'doc'
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['jshint','concat','uglify','jsdoc']);

};

