const pjson = require('../package.json');
const os = require('os');
module.exports = (req, res, ms) => {
    const log = [
        req.remoteAddress,
        "websocket",
        req.resource,
        res.status,
        res.payload.length, 'bytes -',
        ms
    ].join(' ');
    const shortLog = [
        new Date(),
        "websocket",
        req.resource,
        res.status,
    ].join(' ');
    const message = {
        "version": pjson.version,
        "host": os.hostname(),
        "short_message": shortLog,
        "full_message": log,
        "timestamp": Date.now() / 1000,
        "level": 1,
        "userHost": req.remoteAddress,
        "facility": pjson.name,
        "headers": JSON.stringify(req.headers),
        "body": JSON.stringify(req.body),
        "query": JSON.stringify(req.query),
        "method": "websocket",
        "targetHost": req.host,
        "endpoint": req.resource,
        "status": res.status,
        "length": res.payload.length,
        "response-time": ms,
    };
    return log
};