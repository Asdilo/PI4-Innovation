//load that data into a global json object SUCKA!!!
$.getJSON('js/AvgReqSize.json', function (response) {
	data = response;
	console.log(data);
	init(data);
	animate();
	render();
	$(window).trigger('JSONready');
});


$(window).on('JSONready', function () {
	alert(data.length);
});

//My true global var homies
var scene, camera, light, renderer, controls;



//this function initializes the 3D world it creatres the scene, objects, lights and render engine
function init(data) {

	//Le scene AKA the world, objects, and environment stuffs
	scene = new THREE.Scene();
	var geometry = new THREE.OctahedronGeometry(2, 1, 1);


	//var textGeom = new THREE.TextGeometry('Century', {font:'century gothic', weight: 'normal'});
	var material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, specular: 0x009900, shininess: 30, shading: THREE.FlatShading });

	for (var i = 0; i < data.length; i++) {

		if (data[i].api_proxy == "oauth") {

			material = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0x009900, shininess: 30, shading: THREE.FlatShading });
		}
		else if (data[i].api_proxy == "Gift_Litle") {
			material = new THREE.MeshPhongMaterial({ color: "red", specular: 0x009900, shininess: 30, shading: THREE.FlatShading });

		}
				else {
			material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, specular: 0x009900, shininess: 30, shading: THREE.FlatShading });

		}



	var polygon = new THREE.Mesh(geometry, material);
	var day = data[i].Day;
	var daySplit = day.split("/");
	polygon.position.x = (data[i].average) * .02;
	polygon.position.y = (daySplit[0]) * 10;
	polygon.position.z = (daySplit[1]) * 10;
	polygon.updateMatrix();
	polygon.matrixAutoUpdate = false;
	scene.add(polygon);
}

//Camera and TrackBall camera controls REMEMBER TO LOOK INTO SMOOTHING OUT PANNING!!!!	
camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 400;

controls = new THREE.TrackballControls(camera); //use TrackBall.js file
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 1;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.1;
controls.keys = [65, 83, 68]; //have to double check keey bindings, shits not working

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

//add some fog to give a better feel for depth/distance of objects. Fog is exponential
scene.fog = new THREE.FogExp2(0x057075, .0050)

//the renderer the power!!!!
renderer = new THREE.WebGLRenderer();
renderer.setClearColor(scene.fog.color);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Below fires off on resize, might add another trigger....
window.addEventListener('resize', onWindowResize, false);

}

//Sets the camera aspect ratio, updates what is looking at then changes the size of the projection to screen size and updates TrackBall mouse controls to reflect that
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	controls.handleResize();
	render();
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

