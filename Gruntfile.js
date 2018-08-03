module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-run');

  grunt.initConfig({
    run: {
      devCover: {
        exec: 'istanbul cover ./node_modules/mocha/bin/_mocha --report html -- -R spec'
      },
      lint: {
        exec: 'eslint .'
      },
      lintFix: {
        exec: 'eslint . --fix'
      },
      tsc: {
        exec: 'tsc ./ts/mainDefs --outDir ./'
      }
    }
  });

  grunt.registerTask('default', [ 'run:tsc', 'run:lint', 'run:lintFix', 'run:devCover' ]);
  grunt.registerTask('test', [ 'run:devCover' ]);
  grunt.registerTask('lint', [ 'run:lint' ]);
  grunt.registerTask('tsc', [ 'run:tsc' ]);
  grunt.registerTask('lintFix', [ 'run:lintFix' ]);

};