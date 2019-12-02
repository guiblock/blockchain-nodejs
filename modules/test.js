const Blockchain = require("./blockchain");

const xauGold = new Blockchain();

const previousBlockHash = "aspdanspoodas"
const previousBlockData = [
    {
        amount: 10,
        sender: "opsdoajsdoasjddoiasdnioasnda",
        recipient: "sdoainasidoasidnoaspsoasda"
    },
    {
        amount: 312,
        sender: "ioasdiodnoasidoaoisdnioansidoa",
        recipient: "danisodansdoasioindoasndoia"
    },
    {
        amount: 42342,
        sender: "powpoqeuopqwueopqeqweqweq",
        recipient: "piaodhasoduhasidhasihdioas"
    }
]
const nonce = Date.now()


console.log(xauGold.proofOfWork(previousBlockHash, previousBlockData))