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
          
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-simple-mocha'
  
  # Default task.
  grunt.registerTask 'default', ['simplemocha', 'coffee', 'uglify']
