const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');
const catTemplates = makeCatTemplates(cats);
module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === "/" && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));
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
            const updatedHTML = data.toString().replace('{{cats}}', catTemplates)
            res.write(updatedHTML);
            res.end();
        })
    } else {
        return true;
    }
}


function makeCatTemplates(cats) {
    let result = [];
    for (let cat of cats) {
        let template = `
            <li>
            <img src="${cat.imageUrl ? cat.imageUrl : cat.imagePath}" alt="Black Cat">
            <h3${cat.title}></h3>
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="">Change Info</a></li>
                <li class="btn delete"><a href="">New Home</a></li>
            </ul>
        </li>`;
        result.push(template)
    }
    return result;
}