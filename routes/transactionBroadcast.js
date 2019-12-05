const request = require("request");

module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200, payload = null;
    const {amount, sender, recipient, message, privateKey} = reqBody;
    if (!amount && !sender && !recipient) {
        return {
            status: 403,
            payload: {message: "Error missing the params required"}
        }
    }
    const newTransaction = await BlockChainInstance.createNewTransaction(amount, sender, recipient, message, privateKey);
    if (newTransaction) {
        const blockIndex = BlockChainInstance.addTransactionToPendingTransaction(newTransaction);
        let requestPromisse = [];
        if (BlockChainInstance.networkNodes.length > 0) {
            BlockChainInstance.networkNodes.forEach(networkNodeUrl => {
                const requestOptions = {
                    uri: networkNodeUrl + "newTransaction",
                    method: "POST",
                    body: newTransaction,
                    json: true
                };
                requestPromisse.push(request(requestOptions));
            });
        }

        if (requestPromisse.length > 0) {
            await Promise.all(requestPromisse).then(res => {

            })
        }
        status = 200;
        payload = {message: "Transaction created and broadcast successfuly", blockIndex};
    } else {
        status = 403;
        payload = {message: "Sender do not have found for this transactions"};
    }
    return {status, payload}
};