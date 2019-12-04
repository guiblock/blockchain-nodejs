module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let payload = { message: "Node added successfuly" };
    let { newNodeUrl } = reqBody;
    const notNodeAlreadyPresent = BlockChainInstance.networkNodes.indexOf(newNodeUrl) === -1
    const notThisNode = BlockChainInstance.currentNodeUrl !== newNodeUrl
    if (notNodeAlreadyPresent && notThisNode) BlockChainInstance.networkNodes.push(newNodeUrl)
    return { status, payload }
};