const websocketApp = require("./websocketApp");
const handleMethodExpress = require("./handleMethodExpress");
const getBlockchain = require("../routes/getBlockchain");
const newTransaction = require("../routes/newTransaction");
const mine = require("../routes/mine");

module.exports = (app, wsServer, BlockChainInstance) => {

 /** Get Blockchain **/
 app.get("/blockchain", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, getBlockchain));
 websocketApp(wsServer, "/blockchain", getBlockchain);

 
 /** New Transaction **/
 app.post("/newTransaction", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, newTransaction));
 websocketApp(wsServer, "/newTransaction", newTransaction);

 
 /** Mine **/
 app.get("/mine", (req, res, next) => handleMethodExpress(req, res, next, BlockChainInstance, mine));
 websocketApp(wsServer, "/mine", mine); 

};