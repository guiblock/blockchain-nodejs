const hostAddress = require("./getHostAddress");

module.exports = (req = {}, res = {}, next = {}, BlockChainInstance, callback) => {
    if (!hostAddress()) {
        const address = req.protocol + "://" + req.headers.host + "/";
        hostAddress(address);
        BlockChainInstance.currentNodeUrl = address
    }
    req.headers = {...req.headers, ...req.params};
    callback(req.body, req.headers, BlockChainInstance).then(result => {
        return res.status(result.status).json(result.payload);
    }).catch(e => {
        console.log(e);
        return res.status(500).json(e);
    })
};