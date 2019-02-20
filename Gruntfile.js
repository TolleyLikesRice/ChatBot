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
      },
      cover: {
        exec: 'istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | coveralls && rm -rf ./coverage'
      }
    }
  });

  grunt.registerTask('default', [ 'run:tsc', 'run:lint', 'run:lintFix', 'run:devCover' ]);
  grunt.registerTask('test', [ 'run:devCover' ]);
  grunt.registerTask('lint', [ 'run:lint' ]);
  grunt.registerTask('tsc', [ 'run:tsc' ]);
  grunt.registerTask('lintFix', [ 'run:lint', 'run:lintFix' ]);
  grunt.registerTask('travis', [ 'run:tsc', 'run:lint', 'run:cover' ]);

};