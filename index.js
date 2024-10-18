const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);
    if (req.method === 'GET') {
        let fileUrl;
        if (req.url === '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = req.url;
        }
        let filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        fs.exists(filePath, (exists) => {
            if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<h1>404 Not Found</h1>');
                return;
            }
            let contentType;
            switch (fileExt) {
                case '.html':
                    contentType = 'text/html';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.js':
                    contentType = 'application/javascript';
                    break;
                case '.png':
                case '.jpg':
                    contentType = `image/${fileExt.substring(1)}`;
                    break;
                default:
                    contentType = 'text/plain';
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            fs.createReadStream(filePath).pipe(res);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>404 Not Found</h1>');
    }
});
server.listen(port, hostname, () => {console.log(`Server running at http://${hostname}:${port}/`);});