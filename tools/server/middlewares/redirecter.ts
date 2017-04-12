module.exports = function (options: any) {
    if (!options) {
        options = {};
    }

    return function (req: any, res: any, next: any) {
        if (req.path && req.path.match(/\/login$/)) {
            console.log('%s to %s', req.path, req.headers.referer);
            return res.redirect(req.headers.referer);
        }
        return next();
    };
};
