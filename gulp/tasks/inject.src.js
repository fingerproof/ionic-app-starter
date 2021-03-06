'use strict';

var reduce = require('lodash').reduce;

/**
 * Inject styles and scripts into the project targets html files.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpInjectSrc(gulp, plugins, config) {
  var task = config.tasks['inject.src'];

  function src(files) { return gulp.src(files, { cwd: task.cwd }); }

  // Add as many injections as we have different sections.
  return reduce(task.sections, function reducer(stream, files, target) {
    var sort = plugins.if(config.PATTERNS.JS, plugins.angularFilesort());
    var opt = { name: target, relative: true };
    return stream.pipe(plugins.inject(src(files).pipe(sort), opt));
  }, src(task.src)).pipe(gulp.dest(config.FOLDERS.SAME));
}

module.exports = [
  ['inject.lib', 'templates', 'constants', 'i18n'],
  gulpInjectSrc
];
