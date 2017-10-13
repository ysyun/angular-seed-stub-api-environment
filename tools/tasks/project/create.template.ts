// import { createPlugin } from '../../utils';

// import Config from '../../config';
import * as gulp from 'gulp';
import { join } from 'path';
import { argv } from 'yargs';
import * as util from 'gulp-util';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import Config from '../../config';

const camelCase = require('camelcase');
const capitalize = require('capitalize');
const plugins = <any>gulpLoadPlugins();

/**
 * Not Used
 */
// export = createPlugin();

export = (done: any) => {
    let type = argv['type'] || argv['t'] || 'component';
    let name = argv['name'] || argv['n'] || 'user';
    if (type === 'c') {
        type = 'component';
    } else if (type === 's') {
        type = 'service';
    } else if (type === 'm') {
        type = 'module';
    } else if (type === 'a') {
        type = 'all';
    }

    let path = '';
    if (name.indexOf('/') >= 0) {
        const paths = name.split('/');
        name = paths[paths.length - 1];
        if (paths[0] !== '') {
            path = paths.splice(0, paths.length - 1).join('/');
        } else {
            path = paths.splice(1, paths.length - 2).join('/');
        }
    }
    Promise.resolve()
        .then(() => {
            gulp.src([
                join(process.cwd(), 'tools/templates', type, '**', '*.ts'),
                join(process.cwd(), 'tools/templates', type, '**', '*.scss'),
                join(process.cwd(), 'tools/templates', type, '**', '*.html')
            ])
                .pipe(plugins.replace('#FILE_NAME#', name))
                .pipe(plugins.replace('#NAME#', capitalize(camelCase(name))))
                .pipe(plugins.rename({ prefix: name + '.' }))
                .pipe(gulp.dest(join(Config.APP_SRC, Config.BOOTSTRAP_DIR, path)));

            done();
        });
};
