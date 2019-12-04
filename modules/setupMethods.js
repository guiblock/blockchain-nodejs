const websocketApp = require("./websocketApp");
const handleMethodExpress = require("./handleMethodExpress");
const getBlockchain = require("../routes/getBlockchain");
const transactionBroadcast = require("../routes/transactionBroadcast");
const newTransaction = require("../routes/newTransaction");
const registerAndBroadcastNode = require("../routes/registerAndBroadcastNode");
const registerNode = require("../routes/registerNode");
const registerNodesBulk = require("../routes/registerNodesBulk");
const mine = require("../routes/mine");
const receivedNewBlock = require("../routes/receivedNewBlock");
const consensus = require("../routes/consensus");

module.exports = (app, wsServer, BlockChainInstance) => {

 /** Get Blockchain **/
 app.get("/blockchain", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, getBlockchain));
 websocketApp(wsServer, "/blockchain", getBlockchain);

 
 /** New Transaction - Private to nodes **/
 app.post("/newTransaction", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, newTransaction));
 websocketApp(wsServer, "/newTransaction", newTransaction);

 /** New Transaction **/
 app.post("/transaction/broadcast", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, transactionBroadcast));
 websocketApp(wsServer, "/transaction/broadcast", transactionBroadcast);

 /** Mine **/
 app.get("/mine", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, mine));
 websocketApp(wsServer, "/mine", mine); 

 /** receivedNewBlock **/
 app.post("/receivedNewBlock", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, receivedNewBlock));
 websocketApp(wsServer, "/receivedNewBlock", mine); 
 
 /** registerAndBroadcastNode - Private to nodes **/
 app.post("/registerAndBroadcastNode", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, registerAndBroadcastNode));
 websocketApp(wsServer, "/registerAndBroadcastNode", registerAndBroadcastNode); 

 /** registerNode - Private to nodes **/
 app.post("/registerNode", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, registerNode));
 websocketApp(wsServer, "/registerNode", registerNode); 

 /** registerNodesBulk - Private to nodes **/
 app.post("/registerNodesBulk", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, registerNodesBulk));
 websocketApp(wsServer, "/registerNodesBulk", registerNodesBulk); 

 
 /** registerNodesBulk - Private to nodes **/
 app.post("/consensus", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, consensus));
 websocketApp(wsServer, "/consensus", consensus); 


};