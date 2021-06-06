export const findDuplicateData = (data) => {
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
    return duplicateList;
}