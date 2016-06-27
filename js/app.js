var scene, camera, light, renderer, controls;

init();
animate();

//this function initializes the 3D world it creatres the scene, objects, lights and render engine
function init() {

	//Le scene AKA the world, objects, and environment stuffs
	scene = new THREE.Scene();
	var geometry = new THREE.OctahedronGeometry(1, 1, 1);
	var material = new THREE.MeshPhongMaterial({ color: 0x057075, specular: 0x009900, shininess: 30, shading: THREE.FlatShading });
	var polygon = new THREE.Mesh(geometry, material);
	scene.add(polygon);

	//Camera and TrackBall camera controls	
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;

	controls = new THREE.TrackballControls(camera); //use TrackBall.js file
	controls.addEventListener('change', render);

	//Let there be lights
	light = new THREE.PointLight(0x303030, 10, 100);
	light.position.set(10, 10, 10);
	scene.add(light);

//the renderer the power!!!!
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}


//The function below will request an animation frame if things change in the scene then update the cam controls 
function animate() {
	requestAnimationFrame(animate);
	controls.update();
}

//re-paints or creates the world upon request and updates the camera view
function render() {
				renderer.render(scene, camera);
}

render();