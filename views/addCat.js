const util = new Util();
const hostInfo = util.getHostInfo();
const form = document.querySelector('form');
form.addEventListener("submit", submitForm);

async function submitForm(e) {
    e.preventDefault();
    let form = e.target;
    let formData = util.getFormData(form);

    if (util.formValidator(formData)) {
        let data = new FormData(form);
        let url = `${hostInfo.hostUrl}/cats/add-cat`;
        console.log(formData);
        await fetch(url, {
            method: 'POST',
            body: data
        })
    }
}