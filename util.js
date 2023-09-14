const fs = require('fs');
const path = require('path');
const processDirectory = process.cwd();

 class Util {

    addBreed(breed) {
        let breedArrPath = path.normalize(processDirectory + '/data/breeds.json');
        fs.readFile(breedArrPath, (err, data) => {
            if (err) {
                console.log(err);
                return
            }

            let breedArr = [];
            if (data) {
                breedArr = JSON.parse(data);
            }
            if (!breedArr.includes(breed)) {
                breedArr.push(breed);
                fs.writeFile(breedArrPath, JSON.stringify(breedArr.sort()), (err) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log('Breed added successfully!');
                  });
            } else {
                console.log('Breed already exists!');
              }

        })
    }


    addCat(fields, filename) {
        let result = {};
       for (let field in fields) {
            result[field] = fields[field][0]
        }
        result.imagePath = `/content/images/${filename}`;

        //Write data
        let catDB = path.normalize(processDirectory + '/data/cats.json');

        fs.readFile(catDB, (err, data) => {
            if (err) {
                console.log(err);
                return
            }

            let catsArr = [];
            if (data) {
                catsArr = JSON.parse(data);
            }
            
            if (!this.catInArr(catsArr, result)) {
                catsArr.push(result);
                fs.writeFile(catDB, JSON.stringify(catsArr), (err) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log('Cat added successfully!');
                  });
            } else {
                console.log('Cat already exists!');
              }
        })
    }

        catInArr(objArr, target) {
            let keys = {
                name: true,
                description: true,
                breed: true
            }
            for (let obj of objArr) {
                let tests = 0;
                for (let key in keys) {
                    if (obj[key] === target[key]) {
                       tests++;
                    }
                }
                if (tests >= 3) {
                    return true;
                }
            }
            return false;
        }
     
    

    checkFile(file) {
        const acceptedExtensions = ['jpg', 'jpeg', 'png'];
        const acceptedMimeTypes = ['image/jpeg', 'image/png'];
        
        let extension = file.originalFilename.split('.').pop();
        let mimetype = file.mimetype;
        if (acceptedExtensions.includes(extension) && acceptedMimeTypes.includes(mimetype)) {
            return true;
        }
        return false;
    }

}

module.exports = Util;