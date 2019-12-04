const NodeCache = require("node-cache");
const cache = new NodeCache({ checkperiod: 0 });

module.exports = (url = false) => {
    if(url){
        cache.set("myAddress", url)
        console.log("Host set: " + cache.get("myAddress"))
        return cache.get("myAddress")
    }else{
        return cache.get("myAddress") ? cache.get("myAddress") : false
    }
}