const request = require("request");

let nodes = [
    "http://localhost/",
    "http://localhost:82/",
    "http://localhost:84/",
    "http://localhost:86/",
];
let nodes2 = [
    "http://localhost:88/",
    "http://localhost:90/",
];
let requestPromiseRegister = [];
const requestPromiseTransactions = [];
const requestPromiseConsensus = [];
let transactions = {
    "amount": 6,
    "sender": "123456789",
    "recipient": "902391027390",
    "message": "Teste de compra"
};

for (let i = 1; i < nodes.length; i++) {
    const requestRegisterNodes = {
        uri: nodes[0] + "registerAndBroadcastNode",
        method: "POST",
        body: {
            "newNodeUrl": nodes[i]
        },
        json: true
    };
    requestPromiseRegister.push(request(requestRegisterNodes))
}
Promise.all(requestPromiseRegister).then(res => {
    console.log("nos registrados");
    for (let i = 0; i < nodes.length; i++) {
        transactions.amount = Math.ceil(Math.random() * 10);
        const transactionsNodes = {
            uri: nodes[0] + "transaction/broadcast",
            method: "POST",
            body: transactions,
            json: true
        };
        requestPromiseTransactions.push(request(transactionsNodes));
    }
    return requestPromiseTransactions
}).then(res => {
    console.log("transactions forward");
    const MineNode = {
        uri: nodes[0] + "mine",
        method: "GET",
        json: true
    };
    return request(MineNode)
}).then(res => {
    setTimeout(async function () {
        console.log("Mining Finish");
        requestPromiseRegister = [];
        for (let i = 0; i < nodes2.length; i++) {
            const requestRegisterNodes = {
                uri: nodes[0] + "registerAndBroadcastNode",
                method: "POST",
                body: {
                    "newNodeUrl": nodes2[i]
                },
                json: true
            };
            requestPromiseRegister.push(request(requestRegisterNodes))
        }
        return requestPromiseRegister;
    }, 5000)

}).then(res => {
    setTimeout(async function () {
        for (let i = 0; i < nodes2.length; i++) {
            const MineNode = {
                uri: nodes2[i] + "consensus",
                method: "GET",
                json: true
            };
            requestPromiseConsensus.push(request(MineNode))
        }
        return requestPromiseConsensus
    }, 10000)
}).then(res =>{
    console.log("MONSTROO")
});


