module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    const { amount, sender, recipient, message } = reqBody;
    if (!amount && !sender && !recipient) {
        return {
            status: 403,
            payload: { message: "Error missing the params required" }
        }
    }
    const blockIndex = BlockChainInstance.createNewTransaction(amount, sender, recipient, message);
    let status = 200;
    let payload = { message: "Transaction add successfuly", blockIndex };
    return { status, payload }
};