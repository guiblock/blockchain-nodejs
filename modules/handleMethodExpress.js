module.exports = (req = {}, res = {}, next = {}, BlockChainInstance, callback) => {
    callback(req.body, req.headers, BlockChainInstance).then(result => {
        return res.status(result.status).json(result.payload);
    }).catch(e => {
        console.log(e)
        return res.status(500).json(e);
    })
};