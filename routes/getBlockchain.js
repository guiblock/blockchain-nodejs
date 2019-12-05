module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    return {status, payload: BlockChainInstance}
};