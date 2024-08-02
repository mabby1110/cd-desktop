<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import Stats from 'stats.js';
    import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';
    
    let container;
    export let mode: boolean;
    export let rotation: number = 0; // New prop for rotation
    
    onMount(() => {
        let camera, scene, renderer, effect, stats, windowHalfX, windowHalfY;
        
        let mouseX = 0, mouseY = 0;
        const spheres = [];

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

            const geometry = new THREE.SphereGeometry(0.1, 32, 16);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube });

            for (let i = 0; i < 500; i++) {
                const mesh = new THREE.Mesh(geometry, material);

                mesh.position.x = Math.random() * 10 - 5;
                mesh.position.y = Math.random() * 10 - 5;
                mesh.position.z = Math.random() * 10 - 5;

                mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

                scene.add(mesh);
                spheres.push(mesh);
            }

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
            const timer = 0.0001 * Date.now();

            camera.position.x += (rotation*0.02 - camera.position.x) * 0.05;
            camera.position.y += (-rotation*0.02 - camera.position.y) * 0.05;

            // for (let i = 0; i < spheres.length; i++) {
            //     const sphere = spheres[i];
            //     sphere.position.x = 5 * Math.cos(timer + i);
            //     sphere.position.y = 5 * Math.sin(timer + i * 1.1);
            // }

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
