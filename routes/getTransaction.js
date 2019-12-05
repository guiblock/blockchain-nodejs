module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let {transactionId} = reqHeaders;
    const block = BlockChainInstance.getTransaction(transactionId);
    let payload = {block};
    return {status, payload}
};