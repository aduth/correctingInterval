module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.name %> <%= pkg.version %> | Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> | <%= pkg.license %> License */\n',

    concat: {
      options: {
        stripBanners: {
          block: true
        },
        banner: '<%= banner %>'
      },
      dist: {
        src: [ 'correctingInterval.js' ],
        dest: 'correctingInterval.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'correctingInterval.min.js': [ 'correctingInterval.js' ]
        }
      }
    },

    jshint: {
      files: [
        'correctingInterval.js'
      ]
    },

    mocha: {
      index: ['test/index.html'],
      options: {
        run: true
      }
    },

    watch: {
      files: [ 'correctingInterval.js', 'test/spec/*.js' ],
      tasks: [ 'compile' ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', [ 'jshint', 'mocha' ]);
  grunt.registerTask('compile', [ 'concat', 'uglify' ]);
  grunt.registerTask('release', [ 'test', 'compile' ]);
  grunt.registerTask('dev', [ 'watch' ]);
  grunt.registerTask('default', [ 'dev' ]);
};
