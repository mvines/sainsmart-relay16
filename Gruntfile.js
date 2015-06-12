module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
       files: {
         'dist/relay.js': 'src/relay.js'
       }
      }
    },
    eslint: {
      target: ['src/relay.js']
    }
  });

  grunt.registerTask('default', ['babel', 'eslint']);
}
