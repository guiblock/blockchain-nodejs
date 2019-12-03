const uuid = require("uuid/v1");
const nodeAddres = uuid().split("-").join("")

module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let payload = {}
    const pendingTransactions = BlockChainInstance.pendingTransactions

    if (pendingTransactions.length > 0) {
        let lastBlock = BlockChainInstance.getLastBlock();
        let previousBlockHash = lastBlock["hash"];
        let currentBlockData = {
            transaction: pendingTransactions,
            index: lastBlock["index"] + 1
        };
       
        //Reward of Network
        const reward = 0.001;

        for (let i = 0; i < pendingTransactions.length; i++) {
            if (pendingTransactions[i].recipient !== nodeAddres) {
                const oldValue = pendingTransactions[i].amount
                const rewardTotal = oldValue * reward;
                BlockChainInstance.createNewTransaction(rewardTotal, pendingTransactions[i].recipient, nodeAddres);
            }
        }

        console.log("mining start", pendingTransactions.length + " - Transactions")
        const nonce = BlockChainInstance.proofOfWork(previousBlockHash, currentBlockData);
        console.log("mining Finish")
        const blockHash = BlockChainInstance.hashBlock(previousBlockHash, currentBlockData, nonce);

        let newBlock = BlockChainInstance.createNewBlock(nonce, previousBlockHash, blockHash);
        payload = { "message": "New block mined Succesfully", newBlock };
    } else {
        payload = { "message": "not exist transactions to mine" };
    }

    return { status, payload }
};