const express = require('express');
const path = require('path');
const net = require('net');

const app = express();
let port = process.env.PORT || 3000;

// Function to check if a port is in use
function isPortTaken(port) {
    return new Promise((resolve) => {
        const server = net.createServer()
            .once('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .once('listening', () => {
                server.close();
                resolve(false);
            })
            .listen(port);
    });
}

// Find an available port
async function findAvailablePort(startPort) {
    let currentPort = startPort;
    while (await isPortTaken(currentPort)) {
        currentPort++;
    }
    return currentPort;
}

// Start the server on an available port
async function startServer() {
    port = await findAvailablePort(port);
    app.use(express.static(path.join(__dirname, 'public')));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();
