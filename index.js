const http = require('http');
const port = 5000;
const handlers = require('./handlers')

const server = http.createServer((req, res) => {
   
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
});

server.listen(port, () => console.log(`Server is running on port ${port}\nhttp://localhost:5000`));