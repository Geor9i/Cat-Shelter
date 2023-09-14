const url = require('url');
const fs = require('fs');
const path = require('path');
const processDirectory = process.cwd()

function getContentType(path) {
    const extension = path.split('.').pop()
    const fileTypes = {
        html: 'text/html',
        css: 'text/css',
        png: 'image/png',
        js: 'text/javascript',
        jpg: 'image/jpeg',
    };
    return fileTypes[extension] || 'text/plain';
}


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    const fileName = pathname?.split('/').filter(x => x.length > 0)[0];

    const staticFileNames = ['content']

    if (staticFileNames.includes(fileName) && req.method === 'GET') {
        let readPath = path.normalize(path.join(processDirectory, `${pathname}`))
        fs.readFile(readPath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(pathname)
            });
            res.write(data);
            res.end();
        })
    } else {
        return true;
    } 
}