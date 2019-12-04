const request = require("request")

module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    const { amount, sender, recipient, message } = reqBody;
    if (!amount && !sender && !recipient) {
        return {
            status: 403,
            payload: { message: "Error missing the params required" }
        }
    }
    const newTransaction = BlockChainInstance.createNewTransaction(amount, sender, recipient, message);
    const blockIndex = BlockChainInstance.addTransactionToPendingTransaction(newTransaction)
    let requestPromisse = []
    if (BlockChainInstance.networkNodes.length > 0) {
        BlockChainInstance.networkNodes.forEach(networkNodeUrl => {
            const requestOptions = {
                uri: networkNodeUrl + "newTransaction",
                method: "POST",
                body: newTransaction,
                json: true
            }
            requestPromisse.push(request(requestOptions));
        });
    }

    if (requestPromisse.length > 0) {
        await Promise.all(requestPromisse).then(res => {
            
        })
    }

    let status = 200;
    let payload = { message: "Transaction created and broadcast successfuly", blockIndex };
    return { status, payload }
};