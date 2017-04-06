import Config from '../../config';
import * as util from 'gulp-util';

export const log = function (msg: string) {
    console.log(`[${util.colors.blue(Config.DEBUG_PREFIX)}] ${util.colors.green(msg)}`);
}