			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
            var light = new THREE.PointLight( 0x303030, 10, 100);

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			var geometry = new THREE.OctahedronGeometry( 1, 1, 1 );
			var material = new THREE.MeshPhongMaterial( { color: 0x057075, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
			var polygon = new THREE.Mesh( geometry, material );
			scene.add( polygon );
            light.position.set(10,10,10);
            scene.add( light);
            

			camera.position.z = 5;

			var render = function () {
				requestAnimationFrame( render );

				polygon.rotation.x += 0.01;
				polygon.rotation.y += 0.01;

				renderer.render(scene, camera);
			};

			render();