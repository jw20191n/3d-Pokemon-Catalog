const container = document.getElementById('container');
const newContainer = document.querySelector('.glider');
let requestId;

document.addEventListener('DOMContentLoaded', ()=>{

    function getPokemon(){
 
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

        let div = document.createElement('div');
        div.classList.add('pokeCard');
        div.setAttribute('data-id', id);
        div.innerHTML = `
            <img src=${image} class="pokemonImg">`;
        newContainer.appendChild(div);  
    }

    function glider(){
        new Glider(document.querySelector('.glider'), {
            slidesToScroll: 1,
            slidesToShow: 7,
            draggable: true,
            dots: '.dots',
            arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            }
          })
    }

    renderScene();
    getPokemon();
})

    // POLY REST API
    const API_KEY = 'AIzaSyBBucFwpS56u9Os49tydauh3bgUaQtkLdg';
    let scene, camera, renderer;
    const WIDTH = viewer.offsetWidth;
    const HEIGHT = viewer.offsetHeight;
    camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.01, 100 );
    camera.position.set( 5, 3, 5 );
    camera.lookAt( 0, 1.5, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff0000);
    renderer = new THREE.WebGLRenderer();


function renderScene(){

    var ambient = new THREE.HemisphereLight( 0xbbbbff, 0x886666, 0.75 );
    ambient.position.set( -0.5, 0.75, -1 );
    scene.add( ambient );

    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( 1, 0.75, 0.5 );
    scene.add( light );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    viewer.appendChild( renderer.domElement );
    renderer.render( scene, camera );

}
function loadAsset( id, size ) {
    if(scene.getObjectByName('3d-model') !== undefined){
        let selectedObject = scene.getObjectByName('3d-model');
        scene.remove(selectedObject);
    }
    var url = `https://poly.googleapis.com/v1/assets/${id}/?key=${API_KEY}`;

    var request = new XMLHttpRequest();
    request.open( 'GET', url, true ); 
    request.addEventListener( 'load', function ( event ) {

        var asset = JSON.parse( event.target.response );
        var format = asset.formats.find( format => { return format.formatType === 'OBJ'; } );

        if ( format !== undefined ) {

            var obj = format.root;
            var mtl = format.resources.find( resource => { return resource.url.endsWith( 'mtl' ) } );

            var loader = new THREE.MTLLoader();
            loader.setCrossOrigin( true );
            loader.setMaterialOptions( { ignoreZeroRGBs: true } );
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
                    scaler.position.set( -5, 1, 0 )
                    if ( id === 'cfX_C2D69i9'){
                        scaler.position.set( -5, -1, 0 )  
                    }
                    if (size === 'small'){
                        scaler.scale.set(2,2.4,2);
                    }else if (size === 'medium'){
                        scaler.scale.set(3,3.6,3);
                    }else if(size === 'large'){
                        scaler.scale.set(5,6,5);
                    }else if(size === 'ex-large'){
                        scaler.scale.set(7,7.8,7);
                    }
                    scaler.name = "3d-model";
                    scene.add( scaler );

                    renderer.render( scene, camera );
                    // let model = scene.getObjectByName('3d-model')
                    
                    // function animate( ) {

                    //     var time = performance.now() / 5000;
                    
                    //     model.rotation.y = Math.sin( time ) * 5; 
                    //     camera.lookAt( 0, 1.5, 0 );

                 
//                     let model = scene.getObjectByName('3d-model')

//                     function animate( ) {

                        // var time = performance.now() / 5000;
                    
                        // model.rotation.y = Math.sin( time ) * 5; 
                        // camera.lookAt( 0, 1.5, 0 );

                    
                    //     renderer.render( scene, camera );
                    //     requestAnimationFrame( animate );
                    
                    // }
                    // requestId = requestAnimationFrame( animate ); 
                    // // console.log(requestId);

                } );

            } );

        }

    } );
    request.send( null );

}

let raycaster = new THREE.Raycaster();
let mouse= new THREE.Vector2();
function onMouseMove(event){
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) *2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) *2 + 1;

    raycaster.setFromCamera(mouse, camera);
    alert("Cursor at: " + mouse.x + ", " + mouse.y);
  }

//window.addEventListener('click', onMouseMove);  ----- just checking mouse coordinates for positioning models

// resizing event
window.addEventListener('resize', () =>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/innerHeight;
    camera.updateProjectionMatrix();
  })

if ( API_KEY.startsWith( '**' ) ) {

    alert( 'Sample incorrectly set up. Please enter your API Key for the Poly API in the API_KEY variable.' );

}


//================================Claire's experiment with 3d stuff====================


viewer.addEventListener('click', function(){
    // cancelAnimationFrame(requestId);
    let model = scene.getObjectByName('3d-model')
    // console.log(requestId);
    if (requestId){
        function animate( ) {

            var time = performance.now() / 5000;
        
            model.rotation.y = -1.5; 
            camera.lookAt( 0, 1.5, 0 );
        
            renderer.render( scene, camera );
            requestAnimationFrame( animate );
        }
        requestAnimationFrame( animate ); 
        requestId = undefined;
        // window.cancelAnimationFrame(requestId);
        // window.cancelAnimationFrame(requestId);
        // console.log('in else statement and the requestId is: '+ requestId);
    }else{
        function animate( ) {

            var time = performance.now() / 5000;
        
            model.rotation.y = Math.sin( time ) * 5; 
            camera.lookAt( 0, 1.5, 0 );
        
            renderer.render( scene, camera );
            requestAnimationFrame( animate );
        }
        requestId = requestAnimationFrame( animate ); 
        console.log('first started animation because requestId is undefined')
    }
})




