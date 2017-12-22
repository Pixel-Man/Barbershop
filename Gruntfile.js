module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    clean: {
      build: ['build']
    },
    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            'css/**',
            'fonts/**/*.{woff,woff2,eot,ttf,svg}',
            'img/**',
            'js/**',
            '*.html'
          ],
          dest: 'build'
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ['*.html'],
          dest: 'build'
        }]
      },
      css: {
        files: [{
          expand: true,
          src: ['css/style.css'],
          dest: 'build'
        }]
      },
      js: {
        files: [{
          expand: true,
          src: ['js/*.js'],
          dest: 'build'
        }]
      },
      img: {
        files: [{
          expand: true,
          src: ['img/**'],
          dest: 'build'
        }]
      }
    },
    less: {
      style: {
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },
    postcss: {
      style: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: [
                'last 1 version',
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 2 Opera versions',
                'last 2 Edge versions'
              ]
            }),
            require('css-mqpacker')({
              sort: true
            })
          ]
        },
        src: 'build/css/style.css'
      }
    },
    csso: {
      style: {
        options: {
          report: 'gzip'
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css'],
          'build/css/Normalize.min.css': ['build/css/Normalize.css']
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      main: [
        'build/js/script.js'
      ]
    },
    uglify: {
      my_target: {
        files: {
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    },
    svgstore: {
      options: {
        svg: {
          style: 'display: none'
        }
      },
      symbols: {
        files: {
          'build/img/symbols.svg': ['img/icons/*.svg']
        }
      }
    },
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ['build/img/**/*.svg']
        }]
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['build/img/**/*.{png,jpg,gif}']
        }]
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ['build/*.html', 'build/css/*.css']
        },
        options: {
          server: 'build',
          watchTask: true
        }
      }
    },
    watch: {
      html: {
        files: ['*.html'],
        tasks: ['copy:html']
      },
      img: {
        files: ['img/**'],
        tasks: ['copy:img']
      },
      style: {
        files: ['less/**/*.less'],
        tasks: ['less', 'copy:css', 'postcss', 'csso']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint', 'copy:js', 'uglify'],
        options: {
          interrupt: true,
        }
      },
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      }
    }
  });

  grunt.registerTask('serve', ['browserSync', 'watch']);
  grunt.registerTask('symbols', ['svgmin', 'svgstore']);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    'postcss',
    'csso',
    'jshint',
    'uglify',
    'symbols',
    'imagemin'
  ]);
};
