module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-run');

  grunt.initConfig({
    run: {
      devcover: {
        exec: 'istanbul cover ./node_modules/mocha/bin/_mocha --report html -- -R spec'
      },
      lint: {
        exec: 'eslint .'
      },
      lintfix: {
        exec: 'eslint . --fix'
      },
      tsc: {
        exec: 'tsc ./ts/maindefs --outDir ./'
      }
    }
  });

  grunt.registerTask('default', [ 'run:tsc', 'run:lint', 'run:lintfix', 'run:devcover' ]);
  grunt.registerTask('test', [ 'run:devcover' ]);
  grunt.registerTask('lint', [ 'run:lint' ]);
  grunt.registerTask('tsc', [ 'run:tsc' ]);
  grunt.registerTask('lintfix', [ 'run:lintfix' ]);

};