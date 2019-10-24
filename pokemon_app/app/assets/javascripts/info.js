
//newContainer pokemonInfo is defined in index.js
const pokemonInfo = document.getElementById('pokemonInfo');


newContainer.addEventListener('click', () => {
    let target = event.target;
    console.log(target);
    if (target.classList.contains('pokeCard')){
        let cardId = target.getAttribute('data-id');
        getPokemonInfo(cardId);
    }
    if (target.tagName === 'IMG'){
        let parent = target.parentNode;
        console.log(parent);
        if (parent.classList.contains('pokeCard')){
            let cardId = parent.getAttribute('data-id');
            getPokemonInfo(cardId);
        }
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
        <p style="display:inline">Likes: ${data.likes} </p>
        <button class="custom-button"> <img id="button-img" src="pokemon_app/app/assets/images/love.svg"></button>
        
    `; 
    info.setAttribute('data-id', data.id);
    let color = data.poke_type
        switch (color){
            case 'Electric':
                    scene.background.set(0xffd264);
                    break;
            case 'Fire':
                    scene.background.set(0xF2684a);
                    break;
            case 'Water':
                    scene.background.set(0xa2d7d5);
                    break;
            case 'Grass':
                    scene.background.set(0x89c893);
                    break;
            case 'Ground':
                    scene.background.set(0xe0c068);
                    break;
            case 'Psychic':
                    scene.background.set(0xA13959);
                    break;
            case 'Ghost':
                    scene.background.set(0x7c6ebb);
                    break;
            case 'Bug':
                    scene.background.set(0xA8b820);
                    break;
            case 'Normal':
                    scene.background.set(0x6D6D4E);
                    break;
            case 'Dragon':
                    scene.background.set(0xA27DFA);
                    break;
        }
    

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
    let target = event.target;
    let pTag;
    let tempId;

    if(target.className === 'custom-button' || target.parentNode.className === 'custom-button'){
        if (target.tagName === 'BUTTON'){
            pTag = event.target.parentNode.querySelector('p');
            tempId = event.target.parentNode.getAttribute('data-id');
        }else if (target.tagName === 'IMG'){
            pTag = event.target.parentNode.parentNode.querySelector('p');
            tempId = event.target.parentNode.parentNode.getAttribute('data-id');
            console.log(pTag.innerText);
        }
       let likeString = pTag.innerText;
       let likeArray = likeString.split(' ');
       let number = parseInt(likeArray[1]);
       number += 1;
       pTag.innerText = `Likes: ${number}`;
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


