
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

init();