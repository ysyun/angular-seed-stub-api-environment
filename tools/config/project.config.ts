import { join } from 'path';

import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  STUB_API_LOG_PREFIX = 'JM';

  /**
   * production bundle file for debuggin
   */
  JS_PROD_APP_DEBUG_BUNDLE: string;
  JS_PROD_APP_DEFINITION_BUNDLE: string;

  /**
   * << Exclude Folder & File >> 
   * The excluding base folder is "/src/client/app". When you execute "build.prod" tasker, this option can be ran.
   * 
   * 1) If you want to exclude folder: ** / <folder-name> / **
   *    e.g) If you set "** /test/ **", "src/client/app/test/*.*" all files 
   *                                       and "src/client/app/test/**" all folders will be excluded.
   * 
   * 2) If you want to exclude file: ** / <folder-name> / *.txt (or tip.txt)
   *    e.g) If you set "** /test/ *.txt", "src/client/app/test/*.txt" one file will be excluded.
   * 
   * @reference: tasks/seed/copy.prod.ts, build.assets.prod.ts, build.html_css.ts
   */
  EXCLUDE_COPING_FILES_IN_PROD: [string];

  constructor() {
    super();
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    this.APP_TITLE = 'Stub API Development Environment';

    this.JS_PROD_APP_DEBUG_BUNDLE = 'app-debug.js';
    this.JS_PROD_APP_DEFINITION_BUNDLE = 'app-debug.d.ts';

    // ADD EXCLUDE_COPING_FILES_IN_PROD
    this.EXCLUDE_COPING_FILES_IN_PROD = ['**/test/*.txt', '**/*.test.ts'];

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
