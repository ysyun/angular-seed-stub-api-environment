import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs-extra';
import * as glob from 'glob';
// import Config from '../../config';

module.exports = function (options: any) {
    if (!options) {
        options = {};
    }

    const watcher = options.watcher;
    const reload = options.reload;

    return function (req: any, res: any, next: any) {
        const parseUrl = url.parse(req.url);
        const pathname = parseUrl.pathname;
        if (pathname === '/'
            || pathname.indexOf('app') >= 0
            || pathname.indexOf('assets') >= 0
            || pathname.indexOf('css') >= 0) {
            let fileName: any;
            if (pathname === '/') {
                // fileName = path.resolve(path.join(process.cwd(), Config.APP_DEST, 'index.html'));
                fileName = path.resolve(path.join(process.cwd(), 'dist/dev/', 'index.html'));
            } else {
                // fileName = path.resolve(path.join(process.cwd(), Config.APP_DEST, pathname));
                fileName = path.resolve(path.join(process.cwd(), 'dist/dev/', pathname));
            }
            // console.log('>>> fileName', fileName);

            fs.readFile(fileName, (err: any, data: any) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('Sorry the page was not found');
                } else {
                    //  res.writeHead(202, { 'Content-type': contentType(file) });
                    res.end(data);
                }
            });
        } else if (pathname !== '/' || pathname === req.url) {
            return next();
        }
    };
};
