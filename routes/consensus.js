const rp = require('request-promise');
module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let payload = BlockChainInstance;
    const requestPromisse = [];
    if (BlockChainInstance.networkNodes.length > 0) {
        BlockChainInstance.networkNodes.forEach(networkNodeUrl => {
            const requestOptions = {
                uri: networkNodeUrl + "blockchain",
                method: "GET",
                json: true
            };
            requestPromisse.push(rp(requestOptions));
        });
    }
    if (requestPromisse.length > 0) {
        return await Promise.all(requestPromisse).then(blockchains => {
            let maxChainLength = BlockChainInstance.chain.length;
            let newLongestChain = null;
            let newPendingTransactions = null;
            if (blockchains.length > 0) {
                blockchains.forEach(blockchain => {
                    if (blockchain.chain.length > maxChainLength) {
                        maxChainLength = blockchain.chain.length;
                        newLongestChain = blockchain.chain;
                        newPendingTransactions = blockchain.pendingTransactions;
                    }
                });
        }
            if (!newLongestChain || (newLongestChain && !BlockChainInstance.chainIsValid(newLongestChain))) {
                payload = {
                    message: "current chain has not replaced",
                    chain: BlockChainInstance.chain
                }
            } else if (newLongestChain && BlockChainInstance.chainIsValid(newLongestChain)) {
                BlockChainInstance.chain = newLongestChain;
                BlockChainInstance.pendingTransactions = newPendingTransactions;
                payload = {
                    message: "current chain has been replaced",
                    chain: BlockChainInstance.chain
                }
            }
            return {status, payload}
        })
    } else {
        return {status, payload}
    }

};