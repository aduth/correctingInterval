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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', [ 'jshint', 'mocha' ]);
  grunt.registerTask('compile', [ 'test', 'concat', 'uglify' ]);
  grunt.registerTask('default', [ 'compile' ]);
};
