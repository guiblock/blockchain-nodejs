const pjson = require('../package.json');
const os = require('os');

module.exports = (tokens, req, res) => {
   
    const log = [
        req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), 'bytes -',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
    const shortLog = [
        new Date(),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res)
    ].join(' ');
    const message = {
        "version": pjson.version,
        "host": os.hostname(),
        "short_message": shortLog,
        "full_message": log,
        "timestamp": Date.now() / 1000,
        "level": 1,
        "userHost": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        "facility": pjson.name,
        "headers": JSON.stringify(req.headers),
        "body": JSON.stringify(req.body),
        "query": JSON.stringify(req.query),
        "method": tokens.method(req, res),
        "targetHost": req.headers.host,
        "endpoint": tokens.url(req, res),
        "status": tokens.status(req, res),
        "length": tokens.res(req, res, 'content-length'),
        "response-time": tokens['response-time'](req, res),
    };
    console.log(message)
    console.log()
    return log
};