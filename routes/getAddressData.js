module.exports = async (reqBody, reqHeaders, BlockChainInstance) => {
    let status = 200;
    let {address} = reqHeaders;
    const addressData = BlockChainInstance.getAddressData(address);
    let payload = {addressData};
    return {status, payload}
};