/**
 * This Grunt task watches/compiles the PatternLab and Sass files and 
 * automatically refreshes connected browsers when changes are detected.
 * To install dependencies, run the commands:
 *  
 * $ npm install 
 * $ npm install -g grunt-cli
 * $ bundle install
 *  
 * Note: You may need to preface commands with 'sudo' if you encounter 
 * permission errors. 
 * 
 * To run the task to watch PatternLab and Sass files, run the command: 
 *  
 * $ grunt patternlab
 *
 * CTRL-C will stop the tasks.
 * 
 * If you want to move these tasks to a project Gruntfile.js outside the
 * patternlab directory, alter the three relevant paths below to include 
 * 'patternlab/'. Also copy any necessary dependencies from package.json 
 * and the Gemfile.
 */
 
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt
    .initConfig({
      pkg : grunt.file.readJSON('package.json'),
      compass : { // Task
        patternlab: {
          options: {
            basePath: 'source', // if moving tasks outside the patternlab directory, change to 'patternlab/source'
            bundleExec: true,  // use Bundler specified versions
            outputStyle: 'expanded',
          },
        },
      },
      watch : {
        patternlabSass: {
          files: [
            'source/sass/**/*.scss' // if moving tasks outside the patternlab directory, change to patternlab/source/sass/**/*.scss
          ],
          tasks: [
            'compass:patternlab'
          ],
          options: {
            spawn: false
          }
        },
      },
      concurrent: {
        patternlab: {
          tasks: [
            'shell:patternlabWatchReload',
            'watch:patternlabSass'
          ],
          options: {
            logConcurrentOutput: true
          }
        },
      },
      shell: {
        // Generate patterns & use native watch/live reload feature
        patternlabWatchReload: {
          command: [
            'php core/builder.php -wr', // if moving tasks outside the patternlab directory, change to 'php patternlab/core/builder.php -wr'
          ].join('&&')
        },
      }
    });

  grunt.registerTask('default', []);
  grunt.registerTask('patternlab', ['compass:patternlab', 'concurrent:patternlab']);
};
