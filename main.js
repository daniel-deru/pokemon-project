const img = document.getElementById('img');
const display = document.createElement('img')
const pokemon = document.getElementById('name')
const height = document.getElementById('height')
const weight = document.getElementById('weight')
const pokeType = document.getElementById('types')
const ability = document.getElementById('ability')
const health = document.getElementById('health')
const attack = document.getElementById('attack')
const defence = document.getElementById('defence')
const speed = document.getElementById('speed')
const movesList = document.getElementById('moves')
let counter = 1

async function next(){  
    counter++
    await getImage()
    await getData()
}

async function previous(){
    if(counter > 1){
        counter--
        await getImage()
        await getData()
    }
}

async function getImage(){
    const image = await fetch(`https://pokeres.bastionbot.org/images/pokemon/${counter}.png`)
    const imageRes = await image.blob()
    display.src = URL.createObjectURL(imageRes)
}

async function getData(){
    const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${counter}/`)
    const poke = await pokeData.json()
    pokemon.innerHTML = poke.name
    height.textContent = poke.height
    weight.textContent = poke.weight
    ability.textContent = poke.abilities[0].ability.name
    health.textContent =poke.stats[0].base_stat
    attack.textContent =poke.stats[1].base_stat
    defence.textContent =poke.stats[2].base_stat
    speed.textContent =poke.stats[5].base_stat

    let typesData = []
    for(type of poke.types){
        typesData.push(type.type.name)
        pokeType.textContent = typesData.join(' ')
    }

    let typeArray = []
  for(move of poke.moves){
     typeArray.push(`<li>${move.move.name}</li>`)
      movesList.innerHTML = typeArray.join('')
  }

    
    console.log(poke)

   
    
}

next()
previous()
img.append(display)


 
