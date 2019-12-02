module.exports = (req = {}, res = {}, next = {}, callback) => {
    callback(req.body).then(result => {
        return res.status(result.status).json(result.payload);
    }).catch(e => {
        return res.status(500).json(e);
    })
};