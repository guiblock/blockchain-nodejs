module.exports = (wsServer, method, controller) => {
    wsServer.on('request', function (request) {
        if (request.resource === method) {
            const connection = request.accept();
            console.log((new Date()) + " " + method + ' Connection accepted.');
            connection.on('message', function (message) {
                const startTime = new Date();
                if (message.type === 'utf8') {
                    try {
                        const response = controller(JSON.parse(message.utf8Data));
                        const endTime = new Date();
                        let timeDiff = Math.round(endTime - startTime)+ " ms"; //in ms
                        response.then(res => {
                            connection.sendUTF(JSON.stringify(res));
                        }).catch(e => {
                            connection.sendUTF(JSON.stringify(e));
                        })
                    } catch (e) {
                        console.log("Error Payload is invalid for " + method + '"' + message.utf8Data + '"')
                    }
                }
            });
            connection.on('close', function (reasonCode, description) {
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            });
        }
    });
};

