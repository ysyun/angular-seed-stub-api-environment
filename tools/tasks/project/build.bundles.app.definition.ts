import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import Config from '../../config';
import { makeTsProject, TemplateLocalsBuilder } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files for the production environment.
 */

export = () => {
  let src = [
    // Config.TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(Config.TMP_DIR, '/app/**/*.d.ts')
  ];

  return gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(Config.JS_PROD_APP_DEFINITION_BUNDLE))
    .pipe(gulp.dest(`${Config.APP_DEST}/js`))
    .on('error', (e: any) => {
      console.log(e);
    });
};
