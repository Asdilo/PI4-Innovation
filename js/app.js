//load that dat into a json object SUCKA!!!
$.getJSON('js/AvgReqSize.json', function (response) {
	   data = response;
	   console.log(data.length)
	$(window).trigger('JSONready');
});


$(window).on('JSONready', function () {
	alert(data.length);
});

var scene, camera, light, renderer, controls;

init();
animate();

//this function initializes the 3D world it creatres the scene, objects, lights and render engine
function init() {

	//Le scene AKA the world, objects, and environment stuffs
	scene = new THREE.Scene();
	var geometry = new THREE.OctahedronGeometry(10, 1, 1);
	var material = new THREE.MeshPhongMaterial({ color: 0x057075, specular: 0x009900, shininess: 30, shading: THREE.FlatShading });

	for (var i = 0; i < data.length; i++) {
		var polygon = new THREE.Mesh(geometry, material);
		polygon.position.x = (Math.random() - 0.5) * 1000;
		polygon.position.y = (Math.random() - 0.5) * 1000;
		polygon.position.z = (Math.random() - 0.5) * 1000;
		polygon.updateMatrix();
		polygon.matrixAutoUpdate = false;
		scene.add(polygon);
				}

	//Camera and TrackBall camera controls	
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;

	controls = new THREE.TrackballControls(camera); //use TrackBall.js file
	controls.keys = [65, 83, 68];

	controls.addEventListener('change', render);

	//Let there be lights
				light = new THREE.DirectionalLight(0xffffff);
				light.position.set(1, 1, 1);
				scene.add(light);
				light = new THREE.DirectionalLight(0x002288);
				light.position.set(-1, -1, -1);
				scene.add(light);
				light = new THREE.AmbientLight(0x222222);
				scene.add(light)

	//the renderer the power!!!!
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
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