module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'public/javascripts/vendor/all.js': ['public/javascripts/vendor/all.js'],
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'public/javascripts/vendor/all.js',
        dependencies: {
          'underscore': 'jquery',
          'backbone': 'underscore',
        }
      }
    },
    handlebars: {
      all: {
        files: {
          'public/javascripts/handlebars_templates.js': ['templates/**/*.hbs'],
        },
        options: {
          processContent: removeWhitespace,
          processName: extractFileName,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['bower_concat', 'uglify', 'handlebars']);
};

function removeWhitespace(template) {
  return template.replace(/ {2,}/mg, '').replace(/\r|\n/mg, '');
}

function extractFileName(file) {
  return file.match(/\/(.+)\.hbs$/).pop();
}