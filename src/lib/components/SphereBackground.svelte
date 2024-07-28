<script>
import { onMount } from 'svelte';
import * as THREE from 'three';
import Stats from 'stats.js';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let container;

onMount(() => {
    let camera, scene, renderer, controls, stats;
    let mesh;
    const amount = 10;
    const count = Math.pow(amount, 3);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(1, 1);

    const color = new THREE.Color();
    const white = new THREE.Color().setHex(0xffffff);

    init();

    function init() {
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(15, 8, 15);
        // camera.rotation.z = Math.PI / 5; 
        camera.rotation.y = Math.PI / 4; 

        scene = new THREE.Scene();

        const light = new THREE.HemisphereLight(0xffffff, 0x888888, 3);
        light.position.set(0, 1, 0);
        scene.add(light);

        const geometry = new THREE.IcosahedronGeometry(0.5, 3);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

        mesh = new THREE.InstancedMesh(geometry, material, count);

        let i = 0;
        const matrix = new THREE.Matrix4();

        for (let x = 0; x < amount; x++) {
            for (let y = 0; y < amount; y++) {
                for (let z = 0; z < amount; z++) {
                    if (z === 9 || x === 9) {
                        matrix.setPosition(x, y, z);
                        mesh.setMatrixAt(i, matrix);
                        mesh.setColorAt(i, color);
                        i++;
                    }
                }
            }
        }

        scene.add(mesh);

        // const gui = new GUI();
        // gui.add(mesh, 'count', 0, count);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animate);
        container.appendChild(renderer.domElement);

        // controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;
        // controls.enableZoom = false;
        // controls.enablePan = false;

        // stats = new Stats();
        // container.appendChild(stats.dom);

        window.addEventListener('resize', onWindowResize);
        document.addEventListener('mousemove', onMouseMove);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    
function animate() {
    // controls.update();
    raycaster.setFromCamera(mouse, camera);

    const intersection = raycaster.intersectObject(mesh);

    if (intersection.length > 0) {
        const instanceId = intersection[0].instanceId;
        const matrix = new THREE.Matrix4();
        mesh.getMatrixAt(instanceId, matrix);

        // Extraer las coordenadas x, y, z de la matriz
        const position = new THREE.Vector3();
        position.setFromMatrixPosition(matrix);

        // Redondear las coordenadas a los valores enteros más cercanos
        const roundedx = Math.round(position.x);
        const roundedy = Math.round(position.y);
        const roundedz = Math.round(position.z);

        // // Aquí puedes usar las coordenadas (position.x, position.y, position.z)
        // console.log(`Instance ID: ${instanceId}, Position: x=${roundedx}, y=${roundedy}, z=${roundedz}`);

        // Determina si debe cambiar el color a negro
        mesh.getColorAt(instanceId, color);
        if (color.equals(white)) {
            if (shouldBeBlack(roundedx, roundedy, roundedz, amount)) {
                mesh.setColorAt(instanceId, color.setHex(0x000000));
            } else {
                mesh.setColorAt(instanceId, color.setHex(Math.random() * 0xffffff));
            }
            mesh.instanceColor.needsUpdate = true;
        }
    }

    renderer.render(scene, camera);
    // stats.update();
}

function shouldBeBlack(x, y, z, amount) {
    // Formar una "C" en la cara lateral frontal donde z = 0
    if (z === 9) {
        // Línea vertical de la "C"
        if ((y >= 5 && y <= 8 && x == 5)) {
            return true;
        }
        if ((x >= 5 && x <= 8) && (y == 8 || y==4)) {
            return true
        }
    }
    
    if (x === 9) {
        // Línea vertical de la "D"
        if ((y >= 4 && y <= 8 && z == 8)) {
            return true;
        }
        // Curva superior e inferior de la "D"
        if ((z >= 5 && z <= 7) && (y == 8 || y == 4)) {
            return true;
        }
        // Curva derecha de la "D"
        if ((z == 4) && (y == 5 || y == 6 || y == 7)) {
            return true;
        }

    }
    return false;
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
