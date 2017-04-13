import * as express from 'express';
import * as url from 'url';
import * as path from 'path';
import * as _ from 'underscore';
import { startServer, readProxyAddress } from './utils';
import { log } from '../utils';

const httpProxy = require('http-proxy');
const debug = require('debug')('upstream:proxy');
const forgeNotSupported = 'Proxying to forge is not supported. Please go to the forge on target environment directly';
const proxyNotConfigured = (target: any) => {
    return `Proxy ${target} does not exist. Please make sure the proxy is configured in tools/config/stub_proxy/api-address.json`;
};
const localUseIfDefined = function (proxy: any, target: any) {
    return proxy[target];
};

exports.serve = function(options: any) {

    const upstream = httpProxy.createProxyServer({ timeout: 600000 });
    const cookie = require('cookie-parser');
    let socket2origin: any = {};
    upstream.on('error', debug);

    const app = express();
    app.use(cookie())
        .use(function (req: any, res: any, next: any) {
            const originTmp = require('./middlewares/origin');
            const origin: any = originTmp.parse(req);
            let proxy: any = readProxyAddress(origin.proxy);

            if (!proxy) {
                return next(proxyNotConfigured(origin.proxy));
            } else {
                proxy = localUseIfDefined(proxy, 'web');
            }
            return upstream.web(req, res, {
                target: proxy,
                secure: false
            }, (err: any, req: any, res: any, target: any) => {
                if (typeof target === 'object') {
                    target = url.format(target);
                }
                return res.status(500).send(`Error while proxying from ${origin} to ${target}`);
            });
        });
    return startServer(app, options, 'proxy').tap((server: any) => {
        return server.on('upgrade', (req: any, socket: any, head: any) => {
            const socketId = path.basename(req.url);
            const origin = socket2origin[socketId];
            const proxy = localUseIfDefined(readProxyAddress(origin.proxy), 'websocket');
            return upstream.ws(req, socket, head, {
                target: proxy,
                secure: false
            }, (err: any, req: any, socket: any) => {
                if (!err) {
                    return;
                }
                log('Please verify `tools/config/stub_proxy/api-address.json` is correct:');
                log(` - Duplicate entries of ${origin.proxy} may override correct setting.`);
                return log(`WebSocket proxying error ${err}`);
            });
        });
    });
};
