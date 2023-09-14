const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const cats = require('../data/cats');
const breeds = require('../data/breeds');
const formidable = require('formidable')
const processDirectory = process.cwd();
const Util = require('../util.js');
const util = new Util();
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
            if (routeMatch === "/add-cat") {
                let options = "";
                breeds.forEach(el => {
                    options += `<option value="${el}">${el}</option>\n`;
                })
                data = data.toString().replace('{{breeds}}', options);
            }

            res.write(data);
            res.end();
        })
    } else if (
    pathname.includes(currentDirectory)
    && routes.includes(routeMatch)
    && req.method === 'POST') {
        let form = new formidable.IncomingForm({
            maxFileSize: 5 * 1024 * 1024,
            keepExtensions: true,
            multiples:true,
            uploadDir: path.normalize(path.join(processDirectory,'/content/images'))
        })
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
              }

            if (routeMatch === '/add-breed') {
                let breed = fields.breed[0];
                util.addBreed(breed);
                //Redirect to home page
                res.writeHead(302, {
                    'Location': '/',
                    });
                    res.end();
                    return;
            } else {
                let upload = files.upload[0];
                
                if (!util.checkFile(upload)) {
                    fs.unlink(upload.filepath, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('File Deleted!');
                    })
                    res.writeHead(415 , { 'Content-Type': 'text/plain' });
                    res.end('Forbidden File Type!');
                    return;
                }
                util.addCat(fields, upload.newFilename);
                res.writeHead(302, {
                    'Location': '/',
                    });
                    res.end();
                    return;
            }

        })
    }else {
        return true
    }
}
