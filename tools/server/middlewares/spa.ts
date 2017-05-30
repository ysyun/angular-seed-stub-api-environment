import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as util from 'gulp-util';

import Config from '../../config';

let staticUrls = require(path.join(process.cwd(), 'tools/config/stub_api/static-uri.json'));
let serviceUrls = require(path.join(process.cwd(), 'tools/config/stub_api/service-uri.json'));
let indexUrls = require(path.join(process.cwd(), 'tools/config/stub_api/index-uri.json'));

module.exports = function (options: any) {
    if (!options) {
        options = {};
    }

    const watcher = options.watcher;
    const reload = options.reload;

    return function (req: any, res: any, next: any) {
        const pathname = url.parse(req.url).pathname;
        let isStatic: boolean = false;
        let isService: boolean = false;
        let isIndex: boolean = false;
        const paths = pathname.split('/');
        let pathFirst: any = '';
        if (paths.length === 1) {
            pathFirst = '/';
        } else if (paths.length > 1) {
            pathFirst = '/' + paths[1];
        }

        /**
         * If it is reload, set index.html because it is SPA.
         * index.html을 불러올지 1차 판단
         */
        indexUrls.forEach((url: any) => {
            if (isIndex) { return; }

            isIndex = pathFirst === url.path;
            if (isIndex) {
                isStatic = true;
                // util.log('>>>> index', pathname);
                return;
            }
        });

        /**
         * service Restful 이면 proxy로 가고, static이면 static server에서 수행 
         */
        if (!isIndex) {
            if (pathname) {
                // For Restful service call
                serviceUrls.forEach((url: any) => {
                    if (isService) { return; }
                    
                    isService = pathname.indexOf(url.path) === 0;
                    if (isService) {
                        isStatic = false;
                        return;
                    }
                });

                if (!isService) {
                    staticUrls.forEach((url: any) => {
                        if (isStatic) { return; }

                        isStatic = pathname.indexOf(url.path) === 0;
                        if (isStatic) {
                            isIndex = url.index;
                            return;
                        }
                    });
                }

            }
        }

        if (isStatic) {
            let fileName: any;
            if (isIndex) {
                fileName = path.resolve(path.join(process.cwd(), Config.APP_DEST, 'index.html'));
            } else {
                fileName = path.resolve(path.join(process.cwd(), Config.APP_DEST, pathname));
            }

            fs.readFile(fileName, (err: any, data: any) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('Sorry the page was not found in static web server');
                } else {
                    if (fileName.indexOf('.js') >= 0) {
                        res.writeHead(200, { 'Content-type': 'application/javascript' });
                    } else if (fileName.indexOf('.css') >= 0) {
                        res.writeHead(200, { 'Content-type': 'text/css' });
                    } else if (fileName.indexOf('.svg') >= 0) {
                        res.writeHead(200, { 'Content-type': 'image/svg+xml' });
                    }
                    res.end(data);
                }
            });
        } else if (pathname !== '/' || pathname === req.url) {
            return next();
        }
    };
};
