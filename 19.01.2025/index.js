const http = require('http');
const { readFile, writeFile } = require('./fileManager');

const server = http.createServer(async (req, res) => {
    
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to my first Node.js server!');
    }

    
    else if (req.url === '/file' && req.method === 'GET') {
        try {
            const data = await readFile('data.txt');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        } catch (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        }
    }

   
    else if (req.url === '/file' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                await writeFile('data.txt', body);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File updated successfully');
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error writing to file');
            }
        });
    }

  
    else if (req.url === '/time') {
        const currentTime = new Date().toLocaleTimeString();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Current time: ${currentTime}`);
    }

   
    else if (req.url === '/date') {
        const currentDate = new Date().toISOString().split('T')[0];
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Current date: ${currentDate}`);
    }


    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404: Page not found');
    }
});


server.listen(3000, () => {
    console.log('http://localhost:3000');
});