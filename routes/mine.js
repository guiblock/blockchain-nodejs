const uuid = require("uuid/v1");
const nodeAddres = uuid().split("-").join("")
const request = require("request")

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
        

        const nonce = BlockChainInstance.proofOfWork(previousBlockHash, currentBlockData);
        const blockHash = BlockChainInstance.hashBlock(previousBlockHash, currentBlockData, nonce);
        let newBlock = BlockChainInstance.createNewBlock(nonce, previousBlockHash, blockHash);

        const requestPromisse = []
        if (BlockChainInstance.networkNodes.length > 0) {
            BlockChainInstance.networkNodes.forEach(networkNodeUrl => {
                const requestOptions = {
                    uri: networkNodeUrl + "receivedNewBlock",
                    method: "POST",
                    body: { newBlock },
                    json: true
                }
                requestPromisse.push(request(requestOptions));
            });
        }
        if (requestPromisse.length > 0) {
            await Promise.all(requestPromisse).then(res => {
                const RewardRequest = []
                for (let i = 0; i < pendingTransactions.length; i++) {
                    if (pendingTransactions[i].recipient !== nodeAddres) {
                        const oldValue = pendingTransactions[i].amount
                        const rewardTotal = oldValue * reward;
                        const rewardTransactions = BlockChainInstance.createNewTransaction(rewardTotal, pendingTransactions[i].recipient, nodeAddres, "Mining reward");
                        const requestOptions = {
                            uri: BlockChainInstance.currentNodeUrl + "transaction/broadcast",
                            method: "POST",
                            body: rewardTransactions ,
                            json: true
                        }
                        RewardRequest.push(request(requestOptions));
                    }
                }
                return Promise.all(RewardRequest);
             }).then(res=>{

             })
        }
        payload = { "message": "New block mined & broadcast Succesfully", newBlock };
    } else {
        payload = { "message": "not exist transactions to mine" };
    }

    return { status, payload }
};