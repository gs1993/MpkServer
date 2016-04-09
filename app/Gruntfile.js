var modRewrite = require('connect-modrewrite');
module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  grunt.initConfig({
    uglify: {
      dist: {
        src: ['scripts/jquery.min.js', 'scripts/*.js', 'scripts/*/*.js', 'scripts/*/*/*.js', '!scripts/vendor.min.js'],
        dest: "scripts/vendor.min.js"
      }
    },
    sass: {
      dist: {
        options: {
          outputStyle: "compressed",
          lineNumbers: false
        },
        files: [{
          expand: true,
          cwd: 'blocks',
          src: ['*.scss', '*.sass'],
          dest: 'css',
          ext: '.css'
        }]
      },
      dev: {
        options: {
          outputStyle: "expanded",
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: 'blocks',
          src: ['*.scss', '*.sass'],
          dest: 'css',
          ext: '.css'
        }]
      },
      tasks: ['autoprefixer']
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        src: 'css/main.css',
        dest: 'css/main.css'
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: 'jade',
          src: ['*.jade', '!_*.jade'],
          dest: '',
          ext: '.html'
        }]
      },
      dist: {
        options: {
          data: {
            debug: false
          },
          pretty: false
        },
        files: [{
          expand: true,
          cwd: 'jade',
          src: ['*.jade', '!_*.jade'],
          dest: '',
          ext: '.html'
        }]
      }
    },
    wiredep: {
      target: {
        src: '*.html',
        options: {
        },
        exclude: ['bower_components/slick.js/slick/slick.css', 'bower_components/slick.js/slick/slick-theme.css']
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        debug: true,
        report: 'gzip',
        target: 'images/min'
      },
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          svgoPlugins: [{ removeViewBox: false }]
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/min/'
        }]
      }
    },
    connect: {
      server: {
        options:{
          port: 9000,
          base: '',
          logger: 'dev',
          hostname: "*",
          open: true,
          keepalive: true,
          livereload: true
        },
        livereload: {
          options: {
            open: true,
            middleware: function (connect) {
              return [
                modRewrite(['^[^\\.]*$ /index.html [L]']),
                connect.static('.tmp'),
                connect().use(
                    '/bower_components',
                    connect.static('./bower_components')
                ),
                connect.static(appConfig.app)
              ];
            }
          }
        }
      }
    },
    shell: {
      bowerInstall: {
        command: 'bower install'
      }
    },
    copy: {
      js: {
        src: ['blocks/*.js', 'blocks/*/*.js', 'blocks/*/*/*.js'],
        dest: 'scripts/'
      }
    },
    watch: {
      scripts: {
        files: ['scripts/*.js', '!scripts/vendor.min.js', 'blocks/*.js', 'blocks/*/*.js'],
        tasks: ['copy:js', 'uglify'],
        options: {
          spawn: false
        }
      },
      copyBlockScripts: {
        files: ['blocks/*.js', 'blocks/*/*.js', 'blocks/*/*/*.js'],
        tasks: ['copy:js'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['blocks/*.scss', 'blocks/*.sass', 'blocks/*/*.scss', 'blocks/*/*.sass'],
        tasks: ['sass:dev', 'autoprefixer'],
        options: {
          spawn: false
        }
      },
      jade: {
        files: ['jade/*.jade'],
        tasks: ['jade:dev', 'wiredep'],
        options: {
          spawn: false,
          pretty: true
        }
      },
      reload: {
        files: ['blocks/*.png', 'blocks/*/*.png', 'blocks/*/*/*.png', 'blocks/*.jpg', 'blocks/*/*.jpg', 'blocks/*/*/*.jpg', '*.html', 'scripts/', 'css/*'],
        options: {
          livereload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks: ['shell:bowerInstall', 'wiredep']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['watch:scripts', 'watch:copyBlockScripts', 'watch:sass', 'watch:jade', 'watch:bower', 'watch:reload', 'connect']
      },
      dist1: {
        tasks: ['copy:js', 'uglify:dist', 'sass:dist', 'jade:dist', 'imagemin']
      },
      dist2: {
        tasks: ['cssmin']
      }
    }
  });

  grunt.registerTask('default', ['']);
  grunt.registerTask('build', ['concurrent:dist1', 'concurrent:dist2', 'wiredep']);
  grunt.registerTask('server', ['concurrent:dev']);
};