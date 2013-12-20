module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        smarttabs: true
      },
      all: ['Gruntfile.js', ‘src/DWAPI*.js', ‘src/DWShop*.js']
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: [‘src/DWAPI*.js', ‘src/DWShop*.js'],
        dest: ‘build/dw-ocapi-api.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ‘build/dw-ocapi-api.js',
        dest: ‘build/dw-ocapi-api.min.js'
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint','concat','uglify']);

};

