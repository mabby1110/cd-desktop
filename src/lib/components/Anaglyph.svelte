<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import Stats from 'stats.js';
    import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'; // Import FontLoader
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'; // Import TextGeometry

    let container;
    export let mode: boolean;
    export let release: number = 0; // New prop for rotation
    
    let camera, scene, renderer, windowHalfX, windowHalfY, light;
    
    let targetPosition0 = new THREE.Vector3(.5, .5, 0);
    let targetPosition1 = new THREE.Vector3(0, 0, 0);
    let targetPosition2 = new THREE.Vector3(0, 0, 5);
    let targetPosition3 = new THREE.Vector3(0, 2, 5);
    
    const spheres = [];
    onMount(() => {
        let effect, stats;
        
        let mouseX = 0, mouseY = 0;

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', onDocumentMouseMove);
        window.addEventListener('resize', onWindowResize);

        init();
        animate();

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.x = .5;
            camera.position.y = .5;
            camera.position.z = 0;

            // light
            light = new THREE.PointLight(0x500fbf, 10, 100);
            light.position.set(1, 1, -3);
            scene.add(light);

            // Cubo de esferas
            const geometry = new THREE.SphereGeometry(0.1, 32, 16);
            const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff});

            const sphereCountPerAxis = Math.cbrt(500);
            const offset = 3.5

            for (let x = 0; x < sphereCountPerAxis; x++) {
                for (let y = 0; y < sphereCountPerAxis; y++) {
                    for (let z = 0; z < sphereCountPerAxis; z++) {
                        const mesh = new THREE.Mesh(geometry, material);

                        // Calcular la posición de cada esfera con el espacio deseado entre ellas
                        mesh.position.x = x-offset;
                        mesh.position.y = y-offset;
                        mesh.position.z = z-offset;

                        // mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
                        mesh.scale.x = mesh.scale.y = mesh.scale.z = 3 + 1;

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
            
            // // skybox
            // let format;
            // let path;
            // if(mode){
            //     format = '.jpg';
            //     path = '/src/lib/textures/skyboxsun25deg/';
            // }else {
            //     format = '.png';
            //     path = '/src/lib/textures/nasaNightSky180deg/';
            // }
            // const urls = [
            //     path + 'px' + format, path + 'nx' + format,
            //     path + 'py' + format, path + 'ny' + format,
            //     path + 'pz' + format, path + 'nz' + format
            // ];
            // const textureCube = new THREE.CubeTextureLoader().load(urls);
    
            // scene.background = textureCube;
            
            // const light = new THREE.HemisphereLight(0xffffff, 0x888888, 3);
            // light.position.set(0, 0, 0);
            // scene.add(light);

            // effect = new AnaglyphEffect(renderer);
            // effect.setSize(width, height);
            
            stats = new Stats();
            container.appendChild(stats.dom);
            
            // Asumiendo que ya tienes una instancia de cámara y escena configuradas
            // const controls = new OrbitControls(camera, renderer.domElement);
            // controls.enableDamping = true; // Habilita el amortiguamiento
            // controls.dampingFactor = 0.25; // Factor de amortiguamiento
            // controls.enableZoom = true;   // Permite hacer zoom
            // controls.enablePan = true;    // Permite mover la vista lateralmente
            // controls.enableRotate = true; // Permite rotar la vista
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

        function updateLightPosition() {
            const radius = 1; // distance from the camera
            const angle = performance.now() / 2000; // adjust speed of rotation

                light.position.set(
                    camera.position.x + radius * Math.cos(angle),
                    camera.position.y + radius * Math.sin(angle),
                    camera.position.z
                );
            };

        function animate() {
            requestAnimationFrame(animate);
            updateLightPosition();
            render();
            stats.update();
        }

        function render() {
            const timer = 0.0001 * Date.now();
            if (release == 1){
                camera.position.lerp(targetPosition1, 0.05);
            } else if (release == 2) {
                camera.position.lerp(targetPosition2, 0.02);
            } else if (release == 3) {
                camera.position.lerp(targetPosition3, 0.01);
                for (let i = 0; i < spheres.length; i++) {
                    const sphere = spheres[i];
                    const targetX = 5 * Math.cos(timer + i);
                    const targetY = 5 * Math.sin(timer + i * 1.1);

                    // Interpolación hacia la posición deseada
                    sphere.position.x += (targetX - sphere.position.x) * 0.01; // Ajusta el factor de interpolación según sea necesario
                    sphere.position.y += (targetY - sphere.position.y) * 0.01;
                }
            }
            
            renderer.render(scene, camera);
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
