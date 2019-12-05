module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let {blockHash} = reqHeaders;
    const block = BlockChainInstance.getBlock(blockHash);
    let payload = {block};
    return {status, payload}
};