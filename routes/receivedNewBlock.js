module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let { newBlock } = reqBody;
    const lastBlock = BlockChainInstance.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

    if (correctHash && correctIndex) {
        BlockChainInstance.chain.push(newBlock);
        BlockChainInstance.pendingTransactions = [];
        let payload = {
            message: "new block Received and accepted",
            newBlock
        }
        return { status, payload }
    } else {
        let payload = {
            message: "new block rejected",
            newBlock
        }
        return { status:403, payload }
    }



};