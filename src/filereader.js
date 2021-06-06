export const readFile = async (e) => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];
        if (file.type !== 'application/json') {
            reject('Invalid Data');
        }
        console.log('inputFile', file);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = (evt) => {
            if (evt && evt.target && evt.target.result) {
                const parsed_file = JSON.parse(atob(evt.target.result.split(',')[1]));
                console.log('file', parsed_file);
                resolve(parsed_file);
            }
        }

        fileReader.onerror = (err) => {
            reject(err);
        }
    })
}
