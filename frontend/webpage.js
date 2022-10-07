//Make fetch requests, parse json object from data, append to DOM
//url localhost:8000/
//fetch(url, {optional flags like method: 'POST'}) .then(resp => resp.json) .then(actualJSdata)



let lootType = document.getElementById('lootType');
let lootList = document.getElementById('Loot')
let searchButton = document.getElementById('search')
let results = document.getElementById('results')
let itemCreate = document.getElementById('create')

  lootType.addEventListener("change", () => {
    console.log(lootType.value)
    while(lootList.hasChildNodes()){
      lootList.removeChild(lootList.firstChild);
    };
    fetch(`http://127.0.0.1:8000/api/${lootType.value}`, {method: "GET", mode: 'cors'})
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      updateList(data);
    //append all items to next box
  })
})
  lootList.addEventListener("change", () => {
    console.log(lootList.value)
  })
  searchButton.addEventListener("click", () => {
    while(results.hasChildNodes()){
              results.removeChild(results.firstChild);
          };
    if(lootList.value !== 'all'){
      fetch(`http://127.0.0.1:8000/api/${lootType.value}/${lootList.value}`, {method: "GET", mode: 'cors'})
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        updatePage(data);
      })
    } else {
      fetch(`http://127.0.0.1:8000/api/${lootType.value}`, {method: "GET", mode: 'cors'})
        .then(resp => resp.json())
        .then(data => {
        console.log(data)
        updatePage(data)
      })
    }
  })
  let nameBox = document.getElementById('name-it')
  let typeBox = document.getElementById('what-type')
  let damageBox = document.getElementById('what-damage')
  let speedBox = document.getElementById('what-speed')
  
  
  //(wepType, wepDmg, wepSpd, name) VALUES 
itemCreate.addEventListener('click', () => {
  let newItem = {
    'type': `${typeBox.value}`,
    'damage': `${damageBox.value}`,
    'speed': `${speedBox.value}`,
    'name': `${nameBox.value}`}
  fetch(`http://127.0.0.1:8000/api/weapons`, {
  method : 'POST', 
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify(newItem)
})
.then(console.log(res))
})

  //send GET based of amory type and return data
  // async function fetchData(type){
  //   fetch(`http://127.0.0.1:8000/api/${type}`, {method: "GET", mode: 'cors'})
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log(data);
  //     updateList(data);
  //     return data;
  //   })
  // }
  // //send GET based off amory type and weapon name, then return data  
  // async function fetchDataName(type, name){
  //     fetch(`http://127.0.0.1:8000/api/${type}/${name}`, {method: "GET", mode: 'cors'})
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(data);
  //       return data;
  //     })   
  // }
  
  async function updateList(lootArray){ //pushes list of loot type to second dropdown selector
    //First, fetch based of value of drop down and populate options of loot
    //await lootArray;
    lootArray.forEach(lootObject =>{
      let lootItem = document.createElement('option');
      lootItem.innerText = lootObject.name;
      lootItem.value = lootObject.name;
      lootList.appendChild(lootItem);
    })
    let allOption = document.createElement('option')
    allOption.innerText = 'All Items';
    allOption.value = 'all';
    lootList.appendChild(allOption);
  }

  async function updatePage(data){ //pushes search objects onto page
    await data.forEach(dataObject =>{
      console.log(dataObject)
      let lootDataName = document.createElement('div');
      let lootStatList = document.createElement('ul');
      lootDataName.id = dataObject.name;
      lootDataName.className = 'itemName'; 
      results.appendChild(lootDataName);
      lootDataName.innerText = dataObject.name;
      lootDataName.appendChild(lootStatList)
      for(let key in dataObject){
        if (key != 'name' && key != 'armor_id'  && key != 'spell_id' && key != 'weapon_id'){
          let lootDataStats = document.createElement('li');
          lootDataStats.innerText = key + ': ' + dataObject[key];
          lootStatList.appendChild(lootDataStats);
         }
         
       }
     })
   };

