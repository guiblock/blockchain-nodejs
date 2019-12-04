'use strict';
const sha256 = require("sha256");
const uuid = require("uuid/v1");

module.exports = class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.currentNodeUrl = ""
        this.networkNodes = []
        //GenesisBlock
        this.createNewBlock(100, "0", "0")
    }

    createNewBlock(nonce, previousBlockHash, hash) {
        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce,
            hash,
            previousBlockHash
        };

        this.pendingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }

    createNewTransaction(amount, sender, recipient, message) {
        return {
            amount,
            sender,
            recipient,
            message,
            transactionId: uuid().split("-").join(""),
            timestamp: Date.now()
        };
    }

    addTransactionToPendingTransaction(transactionObj) {
        this.pendingTransactions.push(transactionObj);
        return this.getLastBlock()['index'] + 1
    }


    hashBlock(previousBlockHash, currentBlockData, nonce) {
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        return sha256(dataAsString);
    }

    proofOfWork(previousBlockHash, currentBlockData) {
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
        while (hash.substring(0, 4) !== "0000") {
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
        }
        return nonce;
    }

    chainIsValid(Blockchain) {
        let validChain = true
        
        for (let i = 1; i < Blockchain.length; i++) {
            const currentBlock = Blockchain[i];
            const previousBlock = Blockchain[i];
            const currentBlockData = {
                index: currentBlock.index,
                transactions: currentBlock.transactions,
            }
            const blockHash = this.hashBlock(previousBlock.hash, currentBlockData, currentBlock.nonce);
            if (blockHash.substring(0, 4) !== "0000") validChain = false;
            if (currentBlock["previusBlockHash"] !== previousBlock['hash']) validChain = false;
        }
        
        const GenesisBlock = Blockchain[0]
        const correctNonce = GenesisBlock['nonce'] === 100;
        const correctPreviusBlockHash = GenesisBlock['previusBlockHash'] === '0';
        const correctHash = GenesisBlock['hash'] === '0'
        const correctTransactions = GenesisBlock['transactions'].length === 0;
        
        if(!correctNonce || !correctPreviusBlockHash || !correctHash || !correctTransactions) validChain = false;

        return validChain
    }
}