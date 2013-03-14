module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    dir:
      src:  'src/'
      dist: '.'
      
    coffee:
      compile:
        options:
          bare: true
        files:
          '<%= dir.dist %>/interpolate.js': '<%= dir.src %>/interpolate.coffee'
          'test/interpolate_test.js': 'test/interpolate_test.coffee'

    simplemocha:
      all:
        src: 'test/**/*_test.coffee'
      options:
        globals: ['expect']
        timeout: 3000
        ignoreLeaks: false
        ui: 'bdd'
        reporter: 'spec'
        
     uglify:
      all:
        files:
          '<%= dir.dist %>/interpolate.min.js': ['<%= dir.dist %>/interpolate.js']
    watch:
      scripts:
        files: '**/*.coffee'
        tasks: ['simplemocha', 'coffee']
        options:
          interrupt: true
          
  grunt.loadNpmTasks 'grunt-contrib'
  grunt.loadNpmTasks 'grunt-simple-mocha'
  
  # Default task.
  grunt.registerTask 'default', ['simplemocha', 'coffee', 'uglify']
