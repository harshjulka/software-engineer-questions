import { store } from './store.js';
import { render } from './render.js';
import { readFile } from './filereader.js';
import { findDuplicateData } from './util.js';

const inputReader = document.getElementById('formFileMultiple');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

const getData = async (e) => {
    let data;
    try {
        data = await readFile(e)
    } catch (err) {
        alert('Invalid file');
    }
    const duplicateList = findDuplicateData(data);
    store.set(duplicateList);
    render(duplicateList, 0, 9);
}

const showData = (() => {
    let from = 0;
    let to = 9;
    return (e) => {
        if (e.target.name === 'next') {
            from = from + 10;
            to = to + 10;
        } else if (from > 0) {
            from = from - 10;
            to = to - 10;
        } else {
            alert('No more items to go back');
            return;
        }
        const duplicateList = store.get();
        render(duplicateList, from, to);
    }
})()

inputReader.addEventListener('change', getData);
nextButton.addEventListener('click', showData)
prevButton.addEventListener('click', showData)
