import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//hdri lighting
const rgbeloader = new RGBELoader();
rgbeloader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/christmas_photo_studio_06_2k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});

//texture loader
let loader = new THREE.TextureLoader();
let color = loader.load("./texture/color.jpg");
let roughness = loader.load("./texture/roughness.jpg");
let normal = loader.load("./texture/normal.png");
let ao = loader.load("./texture/ao.jpg");

let covercolor = loader.load("./covertexture/covercolor.jpg");
let coverroughness = loader.load("./covertexture/coverroughness.jpg");
let covernormal = loader.load("./covertexture/covernormal.png");  
let cover_ao = loader.load("./covertexture/cover_ao.jpg");

// cover1
const geometry = new THREE.BoxGeometry(3, 0.1, 2);
const material = new THREE.MeshStandardMaterial({ map:covercolor,roughnessMap:coverroughness,normalMap:covernormal,aoMap:cover_ao, wireframe: false });
const cube = new THREE.Mesh(geometry, material);

// cover2
const geometry2 = new THREE.BoxGeometry(3, 0.1, 2);
const material2 = new THREE.MeshStandardMaterial({ map:covercolor,roughnessMap:coverroughness,normalMap:covernormal,aoMap:cover_ao, wireframe: false });
const cube2 = new THREE.Mesh(geometry2, material2);

// pages
const pageGeometry = new THREE.PlaneGeometry(2.93, 1.83);
const pageMaterial = new THREE.MeshStandardMaterial({ map:color, roughnessMap:roughness,normalMap:normal,aoMap:ao,side: THREE.DoubleSide, wireframe: false});
const page1 = new THREE.Mesh(pageGeometry, pageMaterial);
const page2 = new THREE.Mesh(pageGeometry, pageMaterial); 
const page3 = new THREE.Mesh(pageGeometry, pageMaterial);
const page4 = new THREE.Mesh(pageGeometry, pageMaterial);

//grouping

const group = new THREE.Group();
group.add(cube);
group.add(cube2);
group.add(page1);
group.add(page2);
group.add(page3);
group.add(page4);

scene.add(group);
// joint
const jointGeometry = new THREE.BoxGeometry(3, 0.2, 0.2 );
const jointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const joint = new THREE.Mesh(jointGeometry, jointMaterial);

const joint2Geometry = new THREE.BoxGeometry(3, 0.2, 0.2 );
const joint2Material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const joint2 = new THREE.Mesh(joint2Geometry, joint2Material);

/*
//hinge

//const hingeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32);
const hingeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const hinge = new THREE.Mesh(hingeGeometry, hingeMaterial);



//


joint2.add(cube2);
joint2.add(page1);
joint2.add(page3);



joint.add(cube);
joint.add(page2);
joint.add(page4);

//hinge.add(cube);
//hinge.add(page2);



scene.add(joint);
//scene.add(hinge);
scene.add(joint2);   */

/*
scene.add(cube);
scene.add(cube2);
scene.add(page1);
scene.add(page2);


scene.add(page3);
scene.add(page4);
*/

//camera position
camera.position.y = 10;
camera.position.z = -4;
camera.position.x = 1;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const gui = new GUI();

const materialSettings = {
  roughness: 1,
  aoIntensity: 1,
  normalScale: 1,
  color: "#ffffff",
};

pageMaterial.roughness = materialSettings.roughness;
pageMaterial.aoMapIntensity = materialSettings.aoIntensity;
pageMaterial.normalScale = new THREE.Vector2(materialSettings.normalScale, materialSettings.normalScale);
pageMaterial.color = new THREE.Color(materialSettings.color);

// GUI Controls
const matFolder = gui.addFolder("Page Material Controls");
matFolder.add(materialSettings, "roughness", 0, 1, 0.01).onChange((val) => {
  pageMaterial.roughness = val;
});

matFolder.add(materialSettings, "aoIntensity", 0, 5, 0.01).onChange((val) => {
  pageMaterial.aoMapIntensity = val;
});

matFolder.add(materialSettings, "normalScale", 0, 5, 0.01).onChange((val) => {
  pageMaterial.normalScale.set(val, val);
});

matFolder.addColor(materialSettings, "color").onChange((val) => {
  pageMaterial.color.set(val);
});

matFolder.open();


const cubeControls = {
  roughness: material.roughness,
  aoIntensity: material.aoMapIntensity,
  normalScale: 1,
  color: '#ffffff'
};
const mat2Folder = gui.addFolder('Cover Material Controls');

// Roughness
mat2Folder.add(cubeControls, 'roughness', 0, 1).onChange(val => {
  material.roughness = val;
  material2.roughness = val;
});

// AO Intensity
mat2Folder.add(cubeControls, 'aoIntensity', 0, 5).onChange(val => {
  material.aoMapIntensity = val;
  material2.aoMapIntensity = val;
});

// Normal Map Scale
mat2Folder.add(cubeControls, 'normalScale', 0, 5).onChange(val => {
  material.normalScale.set(val, val);
  material2.normalScale.set(val, val);
});

// Base Color (tint)
mat2Folder.addColor(cubeControls, 'color').onChange(val => {
  material.color.set(val);
  material2.color.set(val);
});

mat2Folder.open();

/*
// --- lil-gui setup for positioning ---
const gui = new GUI();
const cubeFolder = gui.addFolder('Green Cube');
cubeFolder.add(cube.position, 'x', -10, 10, 0.01).name('Position X');
cubeFolder.add(cube.position, 'y', -10, 10, 0.01).name('Position Y');
cubeFolder.add(cube.position, 'z', -10, 10, 0.01).name('Position Z');
cubeFolder.open();

const cube2Folder = gui.addFolder('Blue Cube');
cube2Folder.add(cube2.position, 'x', -10, 10, 0.01).name('Position X');
cube2Folder.add(cube2.position, 'y', -10, 10, 0.01).name('Position Y');
cube2Folder.add(cube2.position, 'z', -10, 10, 0.01).name('Position Z');
cube2Folder.open();

const page1Folder = gui.addFolder('Page 1');
page1Folder.add(page1.position, 'x', -10, 10, 0.01).name('Position X');
page1Folder.add(page1.position, 'y', -10, 10, 0.01).name('Position Y');
page1Folder.add(page1.position, 'z', -10, 10, 0.01).name('Position  Z');
page1Folder.open(); 

const page2Folder = gui.addFolder('Page 2');
page2Folder.add(page2.position, 'x', -10, 10, 0.01).name('Position X');
page2Folder.add(page2.position, 'y', -10, 10, 0.01).name('Position Y');
page2Folder.add(page2.position, 'z', -10, 10, 0.01).name('Position Z');
page2Folder.open();

const page3Folder = gui.addFolder('Page 3');
page3Folder.add(page3.position, 'x', -10, 10, 0.01).name('Position X');
page3Folder.add(page3.position, 'y', -10, 10, 0.01).name('Position Y');
page3Folder.add(page3.position, 'z', -10, 10, 0.01).name('Position Z');
page3Folder.open(); 

const page4Folder = gui.addFolder('Page 4');
page4Folder.add(page4.position, 'x', -10, 10, 0.01).name('Position X');
page4Folder.add(page4.position, 'y', -10, 10, 0.01).name('Position Y');
page4Folder.add(page4.position, 'z', -10, 10, 0.01).name('Position Z');
page4Folder.open();


*/



/*

const jointFolder = gui.addFolder('Joint');
jointFolder.add(joint.position, 'x', -10, 10, 0.01).name('Position X');
jointFolder.add(joint.position, 'y', -10, 10, 0.01).name('Position Y');
jointFolder.add(joint.position, 'z', -10, 10, 0.01).name('Position Z');
jointFolder.open();

const joint2Folder = gui.addFolder('Joint 2');
joint2Folder.add(joint2.position, 'x', -10, 10, 0.01).name('Position X');
joint2Folder.add(joint2.position, 'y', -10, 10, 0.01).name('Position Y');
joint2Folder.add(joint2.position, 'z', -10, 10, 0.01).name('Position Z');
joint2Folder.open();

const hingeFolder = gui.addFolder('Hinge');
hingeFolder.add(hinge.position, 'x', -10, 10, 0.01).name('Position X');
hingeFolder.add(hinge.position, 'y', -10, 10, 0.01).name('Position Y');
hingeFolder.add(hinge.position, 'z', -10, 10, 0.01).name('Position Z');
hingeFolder.open();  

*/

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//postioning and rotation
//cube and cube2
cube.position.set(0, 0, 0);
cube2.position.set(0, 1.35, 0);

cube.rotation.x = -Math.PI / 4; // Tilt 30 degrees along X axis
cube2.rotation.x = Math.PI / 4; // Tilt 30 degrees along X axis
//controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


// Position and rotation of the pages
page1.position.set(0, 1.234, -0.1); 
page2.position.set(0, 0.115, -0.1); 
page3.position.set(0, 0.95, -0.2);
page4.position.set(0, 0.42, -0.2); 

page1.rotation.x = -Math.PI / 3.5; // Tilt 30 degrees along X axis
page2.rotation.x = Math.PI / 3.5; // Tilt 30 degrees along X
page3.rotation.x = -Math.PI / 2.5; // Tilt 30 degrees along X axis
page4.rotation.x = Math.PI / 2.5; // Tilt 30 degrees along X axis


/*
//joint position 
joint.position.set(0, -1, 0);

joint2.position.set(0, 0, 0);

//hinge position
hinge.position.set(-0.69, 1.4, 1.2);
*/

// === Studio Lighting Setup ===
/*
// Key light (strong, from front right)
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 10, 7);
scene.add(keyLight);

// Fill light (softer, from front left)
const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
fillLight.position.set(-5, 5, 7);
scene.add(fillLight);

// Back light (rim light, from behind)
const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
backLight.position.set(0, 8, -10);
scene.add(backLight);

// Ambient light for soft shadows
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// === Helpers for lights ===
const keyHelper = new THREE.DirectionalLightHelper(keyLight, 1, 0xffaa00);
scene.add(keyHelper);

const fillHelper = new THREE.DirectionalLightHelper(fillLight, 1, 0x00aaff);
scene.add(fillHelper);

const backHelper = new THREE.DirectionalLightHelper(backLight, 1, 0xffffff);
scene.add(backHelper);

// Optional: Add a grid and axes helper for studio feel
const gridHelper = new THREE.GridHelper(10, 20);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
*/
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  group.rotation.x += 0.001;
  group.rotation.y += 0.001;
  group.rotation.z += 0.001; // Rotate the entire group for a dynamic effect
 // Rotate the mesh for a dynamic effect
  //animation
//  const time = Date.now() * 0.001;
//const angle = THREE.MathUtils.degToRad(15); // 15 degrees max
//const bend = Math.sin(time) * angle; // Oscillates between -15 and +15 degrees

//joint.rotation.x = -bend; // screen bends down
//joint2.rotation.x = bend; 
  renderer.render(scene, camera);
}

animate();



