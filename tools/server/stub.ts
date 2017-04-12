import { log } from '../utils';
import * as serveStatic from 'serve-static';
import * as express from 'express';
import * as glob from 'glob';
import * as path from 'path';
import { startServer } from './utils';
import Config from '../config';

const body = require('body-parser');
const debug = require('debug')('upstream:stub');

exports.serve = function(options: any) {

    const cookie = require('cookie-parser');
    const origin = require('./middlewares/origin');

    const app = express();
    app.use(cookie())
        .use(body.json())
        .use(origin());

    // set the special stub logics
    glob.sync(path.join(__dirname, 'stubs', '**/*.ts'))
        .filter((file: any) => {
            return path.basename(file)[0] !== '_';
        })
        .map(require).reduce(((app: any, stub: any) => {
            return stub(app) || app;
        }), app)
        .use('/stubs', (req: any, res: any, next: any) => {
            req.method = 'GET';
            return next();
        })
        .use(`${Config.APP_BASE}stubs`, express.static(path.resolve(process.cwd(), 'tools/stubs')));

    return startServer(app, options, 'stub')
        .tap((server: any) => {
            // TODO: socket.io handshake
        });
};
