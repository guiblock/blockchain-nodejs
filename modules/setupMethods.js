const websocketApp = require("./websocketApp");
const handleMethodExpress = require("./handleMethodExpress");
const getBlockchain = require("../routes/getBlockchain");
const getBlockHash = require("../routes/getBlockHash");
const getTransaction = require("../routes/getTransaction");
const getAddressData = require("../routes/getAddressData");
const transactionBroadcast = require("../routes/transactionBroadcast");
const newTransaction = require("../routes/newTransaction");
const registerAndBroadcastNode = require("../routes/registerAndBroadcastNode");
const registerNode = require("../routes/registerNode");
const registerNodesBulk = require("../routes/registerNodesBulk");
const mine = require("../routes/mine");
const receivedNewBlock = require("../routes/receivedNewBlock");
const consensus = require("../routes/consensus");

module.exports = (app, wsServer, BlockChainInstance) => {

 /** Get Blockchain public **/
 app.get("/blockchain", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, getBlockchain));
 //websocketApp(wsServer, "/blockchain", getBlockchain);

 /** Get Block By Hash public **/
 app.get("/block/:blockHash", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, getBlockHash));
 //websocketApp(wsServer, "/block/:blockHash", getBlockHash);

 /** Get transaction By Hash public **/
 app.get("/transaction/:transactionId", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, getTransaction));
 //websocketApp(wsServer, "/transaction/:transactionId", getTransaction);

 /** Get Address Data **/
 app.get("/address/:address", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, getAddressData));
 //websocketApp(wsServer, "/transaction/:transactionId", getAddressData);

 /** New Transaction public **/
 app.post("/transaction/broadcast", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, transactionBroadcast));
 //websocketApp(wsServer, "/transaction/broadcast", transactionBroadcast);

 /** Mine - private to Admins **/
 app.get("/mine", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, mine));
 //websocketApp(wsServer, "/mine", mine);

 /** New Transaction - Private to nodes **/
 app.post("/newTransaction", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, newTransaction));
 //websocketApp(wsServer, "/newTransaction", newTransaction);

 /** receivedNewBlock - Private to nodes **/
 app.post("/receivedNewBlock", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, receivedNewBlock));
 //websocketApp(wsServer, "/receivedNewBlock", mine);
 
 /** registerAndBroadcastNode - Private to nodes **/
 app.post("/registerAndBroadcastNode", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, registerAndBroadcastNode));
 //websocketApp(wsServer, "/registerAndBroadcastNode", registerAndBroadcastNode);

 /** registerNode - Private to nodes **/
 app.post("/registerNode", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, registerNode));
 //websocketApp(wsServer, "/registerNode", registerNode);

 /** registerNodesBulk - Private to nodes **/
 app.post("/registerNodesBulk", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, registerNodesBulk));
 //websocketApp(wsServer, "/registerNodesBulk", registerNodesBulk);
 
 /** consensus - Private to nodes **/
 app.get("/consensus", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, consensus));
 //websocketApp(wsServer, "/consensus", consensus);

};