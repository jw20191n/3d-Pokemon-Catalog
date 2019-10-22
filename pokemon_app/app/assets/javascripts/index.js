// let scene, camera, renderer;
const container = document.getElementById('container');
const newContainer = document.querySelector('.glider');

// function init(){
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth/innerHeight, 0.1, 1000);
//     scene.background = new THREE.Color(0xdddddd);
//     camera.position.z = 5;
//     renderer = new THREE.WebGLRenderer({antialias: true, alpha: true } );
//     renderer.setClearColor(0xff0000);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);
//     window.addEventListener('resize', () =>{
// 	    renderer.setSize(window.innerWidth, window.innerHeight);
// 	    camera.aspect = window.innerWidth/innerHeight;
//         camera.updateProjectionMatrix();
//         })
//     light = new THREE.PointLight(0xFFFFFF, 1, 20);
//     light.position.set(1,1,1);
//     scene.add(light);
//     renderer = new THREE.WebGLRenderer({antialias:true});
//     renderer.setSize(window.innerWidth,window.innerHeight);
//     document.body.appendChild(renderer.domElement);
//     console.log('hey man')

//     // var raycaster = new THREE.Raycaster();
//     // var mouse= new THREE.Vector2();
// }

window.addEventListener('click', (event)=>{
    if(event.target.className === 'card-img-top'){
        let id = event.target.getAttribute('data-id')
       console.log('id: ' + id); 
    }
})

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
            glider();
        })

        
    }

    function renderPokemon({name, id, image, likes, move, poke_type}){
        // const gliderTrack = document.querySelector('.glider-track');
        // gliderTrack.setAttribute('style', "width: 100vw");
        let div = document.createElement('div');
        div.classList.add('pokeCard');
        div.setAttribute('data-id', id);
        div.innerHTML = `
            <img src=${image} class="pokemonImg">`;
            // <div class='card-body'>
            //     <h3 class='card-title'>${name}</h3>
            //     <h5>Type: ${poke_type}</h5>
            //     <h5>Move: ${move}</h5>
            //     <p class='card-text'>Likes: ${likes} </p>
            //     <button class="btn">like</button>
            // </div>
        newContainer.appendChild(div);  
    }

    function glider(){
        new Glider(document.querySelector('.glider'), {
            slidesToScroll: 1,
            slidesToShow: 4.5,
            draggable: true,
            dots: '.dots',
            arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            }
          })
    }


    // newContainer.addEventListener('click', (event)=>{
    //     let target = event.target.className
    //     if(target === 'btn'){
    //         console.log('button clicked');
    //        let likeString = event.target.parentNode.querySelector('p').innerText;
    //        let likeArray = likeString.split(' ');
    //        let number = parseInt(likeArray[1]);
    //        number += 1;
    //        event.target.parentNode.querySelector('p').innerText = `Likes: ${number}`;
    //        let tempId = event.target.parentNode.parentNode.getAttribute('data-id');
    //        //console.log(tempId);
    //        incrementLike(tempId, number);
    //     }
    // })

    // function incrementLike(tempId, number){
    //     console.log(tempId)
    //     fetch(`http://localhost:3000/pokemons/${tempId}`, {
    //         method: 'PATCH',
    //         header: {
    //             'content-type': 'application/json',
    //             Accept: 'application/json'
    //         },
    //         body: JSON.stringify({
    //             likes: number
    //         })
    //     }).then(resp => {
    //         return resp.json()
    //     })
        
    // }

    // init();
    getPokemon();
})

//3d experiment
const WIDTH = viewer.offsetWidth;
const HEIGHT = viewer.offsetHeight;

var camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.01, 100 );
camera.position.set( 5, 3, 5 );
camera.lookAt( 0, 1.5, 0 );

var scene = new THREE.Scene();
scene.background = new THREE.Color( 'white'  );

scene.add( new THREE.GridHelper( 10, 10 ) );

var ambient = new THREE.HemisphereLight( 0xbbbbff, 0x886666, 0.75 );
ambient.position.set( -0.5, 0.75, -1 );
scene.add( ambient );

var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
light.position.set( 1, 0.75, 0.5 );
scene.add( light );

var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( WIDTH, HEIGHT );
viewer.appendChild( renderer.domElement );

function animate() {

    var time = performance.now() / 5000;

    camera.position.x = Math.sin( time ) * 5;
    camera.position.z = Math.cos( time ) * 5;
    camera.lookAt( 0, 1.5, 0 );

    renderer.render( scene, camera );
    requestAnimationFrame( animate );

}

requestAnimationFrame( animate );

// POLY REST API

const API_KEY = 'AIzaSyBBucFwpS56u9Os49tydauh3bgUaQtkLdg';

function loadAsset( id ) {

    var url = `https://poly.googleapis.com/v1/assets/${id}/?key=${API_KEY}`;

    var request = new XMLHttpRequest();
    request.open( 'GET', url, true );
    request.addEventListener( 'load', function ( event ) {

        var asset = JSON.parse( event.target.response );

        asset_name.textContent = asset.displayName;
        asset_author.textContent = asset.authorName;

        var format = asset.formats.find( format => { return format.formatType === 'OBJ'; } );

        if ( format !== undefined ) {

            var obj = format.root;
            var mtl = format.resources.find( resource => { return resource.url.endsWith( 'mtl' ) } );

            var path = obj.url.slice( 0, obj.url.indexOf( obj.relativePath ) );

            var loader = new THREE.MTLLoader();
            loader.setCrossOrigin( true );
            loader.setMaterialOptions( { ignoreZeroRGBs: true } );
            // loader.setTexturePath( path );
            loader.load( mtl.url, function ( materials ) {

                var loader = new THREE.OBJLoader();
                loader.setMaterials( materials );
                loader.load( obj.url, function ( object ) {

                    var box = new THREE.Box3();
                    box.setFromObject( object );

                    // re-center

                    var center = box.getCenter();
                    center.y = box.min.y;
                    object.position.sub( center );

                    // scale

                    var scaler = new THREE.Group();
                    scaler.add( object );
                    scaler.scale.setScalar( 6 / box.getSize().length() );
                    scene.add( scaler );

                } );

            } );

        }

    } );
    request.send( null );

}

if ( API_KEY.startsWith( '**' ) ) {

    alert( 'Sample incorrectly set up. Please enter your API Key for the Poly API in the API_KEY variable.' );

}

loadAsset( '9Apgj-wpfgb' );



