/*global module:false*/
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    jshint: {
      /* 检查 js 语法 */
      all: ['Gruntfile.js', 'src/assets/scripts/*.js']
    },
    imagemin: {
      /* 压缩优化图片大小 */
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: 'src/assets/images',
            src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
            dest: 'img/' // 优化后的图片保存位置，默认覆盖
          }
        ]
      }
    },
    cssmin: {
      /*压缩 CSS 文件为 .min.css */
      options: {
        keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
      },
      minify: {
        expand: true,
        cwd: 'src/assets/styles/',
        src: ['**/*.scss'],
        dest: 'css/',
        ext: '.min.css'
      }
    },
    uglify: {
      /* 最小化、混淆、合并 JavaScript 文件 */
      target: {
        files: {
          'js/all.min.js': ['js/all.js']
        }
      },
      minjs: { //最小化、混淆所有 js/ 目录下的 JavaScript 文件
        files: [{
          expand: true,
          cwd: 'src/assets/scripts/',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'js/',
          ext: '.min.js'
        }]
      }
    },
    watch: {
      /* 监控文件变化并执行相应任务 */
      img: {
        files: ['img/**/*.{png,jpg,jpeg}'],
        options: {
          livereload: true
        }
      },
      css: {
        options: {
          event: ['changed', 'added'],
          livereload: true
        },
        files: ['css/**/*.css']
      },
      js: {
        options: {
          livereload: true
        },
        files: ['js/**/*.js']
      },
      html: {
        options: {
          livereload: true
        },
        files: ['*.html']
      }
    }
  });
  loadGruntTasks(grunt)
  // 定义默认任务
  grunt.registerTask('default', [ 'jshint', 'imagemin', 'cssmin',  'uglify']);
  grunt.registerTask('css', [ 'cssmin']);
  grunt.registerTask('dev', [ 'jshint']);
  grunt.registerTask('dest', ['imagemin',  'cssmin', 'uglify:minjs']);
};