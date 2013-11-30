module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-express-server');

  // Project configuration.
  grunt.initConfig({

    // Global grunt vars
    _meta :{
      config: require('./config'),
      dirs: {
        public: 'public',
        css: 'public/css',
        images: 'public/images',
        js: 'public/js',
        sass: './sass',
      }
    },

    // Runs multiple grunt tasks in parallel
    concurrent: {
      dev: {
        tasks: ['connect', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Grunticon
    grunticon: {
      svg: {
        options: {
          src: '<%= _meta.dirs.images %>/svg',
          dest: '<%= _meta.dirs.css %>/icons'
        }
      }
    },

    // Express
    express: {
      options: {
        script: './index.js'
      },
      dev: {
        options: {
          port: '<%= _meta.config %>'
        }
      },
      prod: {
        options: {
          node_env: 'production'
        }
      }
    },

    // Compass
    compass: {
      dist: {
        options: {
          config: '<%= _meta.dirs.public %>/config.rb'
        }
      }
    },

    // shell: {
    //   jekyll: {
    //       command: 'rm -rf _site/*; jekyll build',
    //       stdout: true
    //   }
    // },

    // Watch
    watch: {
      options: {
        livereload: true
      },
      express: {
        files: ['/*.js'],
        tasks: ['express:dev'],
        options: {
          nospawn: true
        }
      },
      sass: {
        files: ['<%= _meta.dirs.sass %>/**/*.scss'],
        tasks: ['compass']
      },
      // grunticon: {
      //   files: ['<%= _meta.dirs.images %>/svg/**'],
      //   tasks: ['grunticon:svg']
      // }
    }
  });

  grunt.registerTask('default', ['express:dev', 'watch']);
  grunt.registerTask('dev', ['express:dev', 'watch']);
  // grunt.registerTask('release', 'jekyll:prod');
};