document.addEventListener('DOMContentLoaded', (event)=>{ 
    console.log('DOM fully loaded and parsed');
    getPokemon();
})

function getPokemon(){
fetch('http://localhost:3001/pokemons')
        .then(response => response.json())
        .then(data => console.log(data))
}


