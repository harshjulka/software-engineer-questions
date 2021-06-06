import {store} from './store.js';
const inputReader = document.getElementById('formFileMultiple');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

const render = (duplicateList, from ,to) => {
    if (duplicateList.length > 0) {
        const listElement = document.getElementById('unorderedList');
        const card = document.getElementById('cardView');
        if(card.classList.contains('d-none')) {
            card.classList.remove('d-none');
            card.insertAdjacentHTML('afterbegin', `<h1>Total Duplicate Recoreds: ${duplicateList.length}</h1>`)    
        }
        if(listElement.childElementCount > 0) {
            listElement.replaceChildren();
        }
        for (let i = to; i >= from; i--) {
            listElement.insertAdjacentHTML('afterBegin', `<li>${duplicateList[i]}</li>`);
        }
    }
}

const findDuplicateData = (data) => {
    const duplicateList = [];
    const map = new Map();
    data.forEach((item) => {
        if (!item.hasOwnProperty('name') || !item.hasOwnProperty('address') || !item.hasOwnProperty('zip')) {
            duplicateList.push(item.id);
        } else if (item.name === null || item.name === '') {
            duplicateList.push(item.id);
        } else if (item.address === null || item.address === '') {
            duplicateList.push(item.id);
        } else if (item.zip === null || item.zip === '' || !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(item.zip)) {
            duplicateList.push(item.id);
        } else {
            const temp = Object.assign({}, item);
            delete temp['id'];
            const key = JSON.stringify(temp);
            if(!map.has(key)) {
                map.set(key, 1)
            }
        }
    });
    store.set(duplicateList);
    render(duplicateList, 0, 9);
}


function readFile(e) {
    const file = e.target.files[0];
    if (file.type !== 'application/json') {
        return;
    }
    console.log('inputFile', file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = (evt) => {
        if (evt && evt.target && evt.target.result) {
            const parsed_file = JSON.parse(atob(evt.target.result.split(',')[1]));
            console.log('file', parsed_file);
            findDuplicateData(parsed_file)
        }
    }
}

const showData = (() => {
    let from = 0;
    let to = 9;
    return (e) => {
        if(e.target.name === 'next') {
            from = from + 10;
            to = to + 10;
            const duplicateList = store.get();
            render(duplicateList, from, to);
        } else if (from > 0) {
            from = from - 10;
            to = to - 10;
            const duplicateList = store.get();
            render(duplicateList, from, to);
        } else {
            alert('No more items to go back')
        }
    }
})()

inputReader.addEventListener('change', readFile);
nextButton.addEventListener('click', showData)
prevButton.addEventListener('click', showData)
