const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const path = require('path');
// const formidable = require('formidable');
const cats = require('../data/cats');
const breeds = require('../data/breeds');
const formidable = require('formidable')
const processDirectory = process.cwd();

 module.exports = async (req, res) => {

    const pathname = url.parse(req.url).pathname;
    const currentDirectory = '/cats';
    const router = {
        '/add-cat': '/views/addCat.html',
        '/add-breed': '/views/addBreed.html',
    }
    let routes = Object.keys(router);
    let routeMatch = `/` + pathname.split('/').filter(x => x.length > 0)[1];
    if (
    pathname.includes(currentDirectory)
    && routes.includes(routeMatch)
    && req.method === 'GET') {
        let filePath = path.normalize(path.join(processDirectory, router[routeMatch]))
        fs.readFile(filePath, (err, data) => {
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
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        })
    } else if (
    pathname.includes(currentDirectory)
    && routes.includes(routeMatch)
    && req.method === 'POST') {
        let formData = formidable({});
        let fields, files;
        [fields, files] = await formData.parse()
    }else {
        return true
    }
}
