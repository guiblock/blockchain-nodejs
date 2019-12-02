'use strict';
const sha256 = require("sha256");

module.exports = class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];

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
        const newTransaction = {
            amount, 
            sender, 
            recipient,
            message,
            timestamp: Date.now()
        };

        this.pendingTransactions.push(newTransaction);
        return this.getLastBlock()['index'] + 1
    }


    hashBlock(previousBlockHash, currentBlockData, nonce){
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        return sha256(dataAsString);
    }

    proofOfWork(previousBlockHash, currentBlockData){
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
        while(hash.substring(0, 5) !== "00000"){
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
        }
        return nonce;
    }

}