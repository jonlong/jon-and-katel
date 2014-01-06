module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

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
        views: './views'
      }
    },

    // Express
    express: {
      options: {
        script: './index.js'
      },
      dev: {
        options: {
          node_env: 'development',
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
          config: './config.rb'
        }
      }
    },

    // Watch
    watch: {
      options: {
        livereload: true
      },
      express: {
        files: ['/*.js'],
        tasks: ['express:dev']
      },
      sass: {
        files: ['<%= _meta.dirs.sass %>/**/*.scss'],
        tasks: ['compass']
      },
      public: {
        files: ['public/**/*', 'views/*.jade'],
        tasks: []
      }
    },

    copy: {
      views: {
        expand: true,
        cwd: './<%= _meta.dirs.views %>',
        src: ['scripts.html', 'stylesheets.html'],
        dest: '<%= _meta.dirs.views %>/dist/'
      },
      fonts: {
        expand: true,
        cwd: './<%= _meta.dirs.public %>/components/bootstrap/dist/fonts',
        src: ['**/*'],
        dest: '<%= _meta.dirs.public %>/dist/fonts/'
      }
    },

    useminPrepare: {
      html: ['<%= _meta.dirs.views %>/dist/scripts.html', '<%= _meta.dirs.views %>/dist/stylesheets.html'],
      options: {
        root: 'public',
        dest: 'public'
      }
    },

    usemin: {
      options: {
        assetsDirs: ['public']
      },
      html: ['<%= _meta.dirs.views %>/dist/scripts.html', '<%= _meta.dirs.views %>/dist/stylesheets.html']
    }

  });

  grunt.registerTask('default', ['copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin']);
  grunt.registerTask('dev', ['default', 'express:dev', 'watch']);
  grunt.registerTask('heroku:production', 'default');
};