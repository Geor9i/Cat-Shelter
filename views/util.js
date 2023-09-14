 class Util {
    //FORMS

    getHostInfo() {
        let port = 5000;
        let host = 'localhost';
        let hostUrl = `http://${host}:${port}`
        return {
            port,
            host,
            hostUrl
        }
    }
    
    getFormFieldsObj (form) {
        let fields = this.createElementArray(form, 'input');
        fields = fields.filter(el => el.value !== 'submit')
        fields = this.elementArrayToObject(fields, 'name');
        return fields;
    }

    clearFormFields(formFields) {
        for (let field in formFields) {
            formFields[field].value = "";
        }
    }
    
     createElementArray(parent, ...elements) {
        if (elements.length === 1 && typeof elements[0] === 'string') {
            return Array.from(parent.querySelectorAll(elements));
        } else {
            let arr = [];
            for (let element of elements) {
                arr.push(element);
            }
            return arr;
        }
    }
    
    
     elementArrayToObject(array, keyAttribute, omitELements) {
        let obj = array.reduce((obj, element) => {
            if (keyAttribute === 'text') {
                let pattern = /\s/g;
                let text = (element.textContent).replace(pattern, '-');
                let key = text;
                obj[key] = element;
            } else {
                obj[element.getAttribute(keyAttribute)] = element;
            }
            return obj;
        }, {})
        if (omitELements) {
            for (let element of omitELements) {
                if (obj[element]) {
                    delete obj[element];
                }
            }
        }
        return obj;
    }
    
    
     getFormData(form) {
        let formData = new FormData(form);
        formData = Object.fromEntries(formData.entries());
        return formData;
    }
    
    
     formValidator(formData, minPasswordLength = 1, rePass = undefined) {
        let isFilled = true;
        let emailPattern = /^[-\w]+@[\w\.]+[^\-\.\,\s\t\n\\\=\@\^\&\%\£\"\!\'\#\~\?\>\<\/\¬\`\;\:]$/g;
        for (let key in formData) {
            if (formData[key] === '') {
                isFilled = false;
                throw new Error('All fields must be filled!');
            }
            if (key === 'email') {
                if (!emailPattern.test(formData[key])) {
                    throw new Error('Please enter a valid email')
                }
                emailPattern.lastIndex = 0;
            } else if (key === 'password' && formData[key].length < Math.max(1, minPasswordLength)) {
                throw new Error(`Password must be at least ${minPasswordLength} characters long!`)
            } else if (key === 'upload' && formData[key].size === 0) {
                throw new Error(`No file has been selected`)
            }
        }
        if (rePass && formData[rePass] !== formData.password) {
            isFilled = false;
            throw new Error('Both passwords must match!')
        }
        return isFilled;
    }

}
