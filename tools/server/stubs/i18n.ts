import * as fs from 'fs-extra';
import * as path from 'path';
import * as RSVP from 'rsvp';
import * as _ from 'underscore';
const Promise = RSVP.Promise;
const properties = require('properties-parser');

const readUIMessages = RSVP.denodeify((callback: any) => {
    const bundle = path.join(process.cwd(), 'tools/config/i18n/ui/messages.properties');
    return properties.read(bundle, (err: any, data: any) => {
        return callback(err, JSON.stringify(data));
    });
});

const readUIToggles = RSVP.denodeify((callback: any) => {
    const bundle = path.join(process.cwd(), 'tools/config/feature-toggles.properties');
    return properties.read(bundle, (err: any, data: any) => {
        const ret = _(data).reduce((memo: any, value: any, key: any) => {
            let e, json;
            if (key.indexOf('toggle.ui') === 0 || key.indexOf('ui') === 0) {
                try {
                    json = JSON.parse(value);
                    memo[key] = json;
                } catch (error) {
                    e = error;
                }
            }
            return memo;
        }, {});
        return callback(err, JSON.stringify(ret));
    });
});

module.exports = function (app: any) {
    return app.get('/stubs/uimessages', (req: any, res: any, next: any) => {
        return Promise.all([readUIMessages(), readUIToggles()])
            .then((arg: any) => {
                let messages: string = arg[0], toggles: string = arg[1];
                res.setHeader('content-type', 'text/javascript');
                messages = 'var __prI18n = ' + messages + ';\n';
                toggles = 'var __prSettings = ' + toggles + ';\n';
                return res.send(messages + toggles);
            })['catch'](next);
    });
};
