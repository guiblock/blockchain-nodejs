module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let payload = { message: "Node added successfuly" };
    let { allNetworkNodes } = reqBody;
    allNetworkNodes.forEach(nodeURL => {
        const notNodeAlreadyPresent = BlockChainInstance.networkNodes.indexOf(nodeURL) === -1
        const notThisNode = BlockChainInstance.currentNodeUrl !== nodeURL
        if (notNodeAlreadyPresent && notThisNode) BlockChainInstance.networkNodes.push(nodeURL)
    });
    return { status, payload }
};