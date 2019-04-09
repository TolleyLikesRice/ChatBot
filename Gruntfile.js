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
            },
            testWinPrep: {
                exec: 'ren config\\config.toml config_.toml && copy test\\testconfig.toml config\\config.toml'
            },
            test: {
                exec: 'mocha --reporter spec'
            },
            testWinCleanup: {
                exec: 'del config\\config.toml && ren config\\config_.toml config.toml'
            }
        }
    });

    grunt.registerTask('default', ['run:tsc', 'run:lintFix']);
    grunt.registerTask('devCover', ['run:tsc', 'run:testWinPrep','run:devCover', 'run:testWinCleanup']);
    grunt.registerTask('lint', ['run:lint']);
    grunt.registerTask('tsc', ['run:tsc']);
    grunt.registerTask('lintfix', ['run:lintFix']);
    grunt.registerTask('travis', ['run:tsc', 'run:lint', 'run:cover']);
    grunt.registerTask('test', ['run:tsc', 'run:testWinPrep', 'run:test','run:testWinCleanup']);

};