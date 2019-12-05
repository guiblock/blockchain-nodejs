const request = require("request");
module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let payload = {};
    let {newNodeUrl} = reqBody;
    if (BlockChainInstance.networkNodes.indexOf(newNodeUrl) === -1) BlockChainInstance.networkNodes.push(newNodeUrl)
    let requestPromisse = [];
    if (BlockChainInstance.networkNodes.length > 0) {
        BlockChainInstance.networkNodes.forEach(networkNodeUrl => {
            const requestOptions = {
                uri: networkNodeUrl + "registerNode",
                method: "POST",
                body: {newNodeUrl},
                json: true
            };
            requestPromisse.push(request(requestOptions));
        });
    }
    if (requestPromisse.length > 0) {
        await Promise.all(requestPromisse).then(res => {
            const allNetworkNodes = [...BlockChainInstance.networkNodes, BlockChainInstance.currentNodeUrl];
            const bulkRegisterOptions = {
                uri: newNodeUrl + "registerNodesBulk",
                method: "POST",
                body: {allNetworkNodes},
                json: true
            };
            return request(bulkRegisterOptions);
        }).then(res => {

        })
    }
    payload = {"message": "node registry success"};
    return {status, payload}
};