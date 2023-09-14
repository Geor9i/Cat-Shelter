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