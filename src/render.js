export const render = (duplicateList, from ,to) => {
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
