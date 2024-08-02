<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import Stats from 'stats.js';
    import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';
    
    let container;
    export let mode: boolean;
    export let release: boolean = false; // New prop for rotation
    
    let camera, scene, renderer, windowHalfX, windowHalfY;
    const spheres = [];
    onMount(() => {
        let effect, stats;
        
        let mouseX = 0, mouseY = 0;

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', onDocumentMouseMove);

        init();
        animate();

        function init() {
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.z = 3;

            let format;
            let path;
            if(mode){
                format = '.jpg';
                path = '/src/lib/textures/skyboxsun25deg/';
            }else {
                format = '.png';
                path = '/src/lib/textures/nasaNightSky180deg/';
            }
            const urls = [
                path + 'px' + format, path + 'nx' + format,
                path + 'py' + format, path + 'ny' + format,
                path + 'pz' + format, path + 'nz' + format
            ];
            const textureCube = new THREE.CubeTextureLoader().load(urls);
    
            scene = new THREE.Scene();
            scene.background = textureCube;
            
            const light = new THREE.HemisphereLight(0xffffff, 0x888888, 3);
            light.position.set(0, 1, 0);
            scene.add(light);

            // Cubo de esferas
            const geometry = new THREE.SphereGeometry(0.1, 32, 16);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube });

            const cubeSize = 10; // Tamaño del cubo
            const sphereCountPerAxis = Math.cbrt(500); // Número de esferas en cada eje
            const spacing = 0.5; // Espacio deseado entre esferas
            
            // Calcular el tamaño total necesario considerando el espacio entre esferas
            const offset = cubeSize / 4

            for (let x = 0; x < sphereCountPerAxis; x++) {
                for (let y = 0; y < sphereCountPerAxis; y++) {
                    for (let z = 0; z < sphereCountPerAxis; z++) {
                        const mesh = new THREE.Mesh(geometry, material);

                        // Calcular la posición de cada esfera con el espacio deseado entre ellas
                        mesh.position.x = x * (geometry.parameters.radius * 2 + spacing) - cubeSize / 2 + offset;
                        mesh.position.y = y * (geometry.parameters.radius * 2 + spacing) - cubeSize / 2 + offset;
                        mesh.position.z = z * (geometry.parameters.radius * 2 + spacing) - cubeSize / 2 - offset/2;

                        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

                        scene.add(mesh);
                        spheres.push(mesh);
                    }
                }
            }
            // render & helpers
            const gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
				gridHelper.position.y = 0;
				gridHelper.position.x = 0;
				scene.add( gridHelper );
            
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            const width = window.innerWidth || 2;
            const height = window.innerHeight || 2;

            effect = new AnaglyphEffect(renderer);
            effect.setSize(width, height);

            stats = new Stats();
            container.appendChild(stats.dom);

            window.addEventListener('resize', onWindowResize);
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            
            effect.setSize(window.innerWidth, window.innerHeight);
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 100;
            mouseY = (event.clientY - windowHalfY) / 100;
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
            stats.update();
        }

        function render() {
            
            camera.position.x += (mouseX*0.02 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY*0.02 - camera.position.y) * 0.05;
            
            const timer = 0.0001 * Date.now();
            if (release) {
                for (let i = 0; i < spheres.length; i++) {
                    const sphere = spheres[i];
                    const targetX = 5 * Math.cos(timer + i);
                    const targetY = 5 * Math.sin(timer + i * 1.1);

                    // Interpolación hacia la posición deseada
                    sphere.position.x += (targetX - sphere.position.x) * 0.1; // Ajusta el factor de interpolación según sea necesario
                    sphere.position.y += (targetY - sphere.position.y) * 0.1;
                }
            }
            
            effect.render(scene, camera);
        }
    });
</script>

<style>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<div bind:this={container} class="container"></div>
