let countElementsWithKeyValue = async(array,key,value)=>{
    let qualifying = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].key === value) {
            qualifying.push(array[i]);
        }
    }
}

  createKeyValueBasedArray = async (object) => {

   await  (async function run(){
        let output = [];
        let entries =  Object.entries(object);
     //   console.log(entries)
         entries.map(value => {
              output[value[0]] = value[1];
          })
        return output
      })()


}
module.exports={
    createKeyValueBasedArray
}