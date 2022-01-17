const newEngine = require("@comunica/actor-init-sparql").newEngine;
const {once} =require('events');


const generateEntityList = function(query,source){
  const entityList = new Array();
  const queryPromise = newEngine().query(query, { sources: source })
  .then(function (result) {
    result.bindingsStream.on('data', function (bindings) {
      let tempMap = new Map();
      for (const [key,value] of bindings.entries()){
        tempMap.set(key, value.value);
        //console.log(value.value)
      }
    
      entityList.push(tempMap);
      //console.log(entityList.length);
    });
    console.log("je suis arrivé ici");
    return(once(result.bindingsStream,'end'));
  });
  return(queryPromise.then(()=>{return entityList}));
}

module.exports = {generateEntityList};


