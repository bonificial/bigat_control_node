let countElementsWithKeyValue = async(array,key,value)=>{
    let qualifying = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].key === value) {
            qualifying.push(array[i]);
        }
    }
}