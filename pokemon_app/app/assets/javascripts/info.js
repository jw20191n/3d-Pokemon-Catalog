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
    let info = document.createElement('div');
    info.setAttribute('id', 'pokeInfoWords');
    info.innerHTML = `
        <h5>${data.name}</h5>
        <h6>Type: ${data.poke_type}</6>
        <h6>Move: ${data.move}</h6>
        <p>Likes: ${data.likes} </p>
        <button class="custom-button"> like</button>
    `; 
    info.setAttribute('data-id', data.id);

    //attach model rendering to this function
    loadAsset(`${data.model_key}`, `${data.size}`);    
    
    let infoImage = document.createElement('img');
    infoImage.setAttribute('id', 'pokeInfoImage');
    infoImage.setAttribute('src', `${data.image}`);

    pokemonInfo.innerHTML = '';
    pokemonInfo.appendChild(info);
    pokemonInfo.appendChild(infoImage);
    pokemonInfo.setAttribute('style', `background-image: url(pokemon_app/app/assets/images/${data.poke_type}.png);`)
}

pokemonInfo.addEventListener('click', ()=>{
    let target = event.target.className;
    if(target === 'custom-button'){
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
