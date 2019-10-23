//newContainer pokemonInfo is defined in index.js
const pokemonInfo = document.getElementById('pokemonInfo');

newContainer.addEventListener('click', () => {
    let target = event.target;
    if (target.classList.contains('pokeCard')){
        let cardId = target.getAttribute('data-id');
        getPokemonInfo(cardId);
    }
});

function getPokemonInfo(cardId){
    fetch(`http://localhost:3000/pokemons/${cardId}`)
    .then(resp => resp.json())
    .then(data => {
        printInfo(data);
    })
}

function printInfo(data){
    pokemonInfo.innerHTML = `
        <h3>Name: ${data.name}</h3>
        <h5>Type: ${data.poke_type}</h5>
        <h5>Move: ${data.move}</h5>
        <p>Likes: ${data.likes} </p>
        <button class="btn">like</button> 
    ` 
    pokemonInfo.setAttribute('data-id', data.id);

    //attach model rendering to this function
    loadAsset(`${data.model_key}`);

    

}

pokemonInfo.addEventListener('click', ()=>{
    let target = event.target.className;
    if(target === 'btn'){
       let likeString = event.target.parentNode.querySelector('p').innerText;
       let likeArray = likeString.split(' ');
       let number = parseInt(likeArray[1]);
       number += 1;
       event.target.parentNode.querySelector('p').innerText = `Likes: ${number}`;
       let tempId = event.target.parentNode.getAttribute('data-id');
       incrementLike(tempId, number);
    }
});

function incrementLike(tempId, number){
    fetch(`http://localhost:3000/pokemons/${tempId}`, {
        method: 'PATCH',
        header: {
            'content-type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            likes: number
        })
    }).then(resp => {
        return resp.json()
    })
}
