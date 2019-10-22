let scene, camera, renderer;
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/innerHeight, 0.1, 1000);
    scene.background = new THREE.Color(0xdddddd);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true } );
    renderer.setClearColor(0xff0000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', () =>{
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    camera.aspect = window.innerWidth/innerHeight;
        camera.updateProjectionMatrix();
        })
    light = new THREE.PointLight(0xFFFFFF, 1, 20);
    light.position.set(1,1,1);
    scene.add(light);
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    console.log('hey man')

    // var raycaster = new THREE.Raycaster();
    // var mouse= new THREE.Vector2();
}

window.addEventListener('click', (event)=>{
    if(event.target.className === 'card-img-top'){
        let id = event.target.getAttribute('data-id')
       console.log('id: ' + id); 
    }
    
})

const container = document.getElementById('container');

document.addEventListener('DOMContentLoaded', ()=>{

    function getPokemon(){
        // while(container.firstChild){
        //     container.removeChild(container.firstChild)
        // }
    
        fetch('http://localhost:3000/pokemons')
        .then(resp => resp.json())
        .then(data => {
            for(const pokemon of data){
                renderPokemon(pokemon);
            }
        })
    }

    function renderPokemon({name, id, image, likes, move, poke_type}){
        let div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute('data-id', id);
        div.innerHTML = `
            <img src=${image} class='card-img-top' data-id=${id}>
            <div class='card-body'>
                <h3 class='card-title'>${name}</h3>
                <h5>Type: ${poke_type}</h5>
                <h5>Move: ${move}</h5>
                <p class='card-text'>Likes: ${likes} </p>
                <button class="btn">like</button>
            </div>
        `;
        container.appendChild(div);
    }


    container.addEventListener('click', (event)=>{
        let target = event.target.className
        if(target === 'btn'){
           let likeString = event.target.parentNode.querySelector('p').innerText;
           let likeArray = likeString.split(' ');
           let number = parseInt(likeArray[1]);
           number += 1;
           event.target.parentNode.querySelector('p').innerText = `Likes: ${number}`;
           let tempId = event.target.parentNode.parentNode.getAttribute('data-id');
           //console.log(tempId);
           incrementLike(tempId, number);
        }
    })

    function incrementLike(tempId, number){
        console.log(tempId)
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

    init();
    getPokemon();
})





