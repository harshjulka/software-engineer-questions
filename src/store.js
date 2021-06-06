export const store = (() => {
    const list = [];
    const setter = (data) => {
        list.push(...data);
    }
    const getter = () => {
        return list;
    }
    return {
        get: getter,
        set: setter
    }
})();
