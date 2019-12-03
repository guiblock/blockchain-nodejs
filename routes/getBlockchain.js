module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let payload = BlockChainInstance;
    return {status, payload}
};