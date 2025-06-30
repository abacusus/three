import * as THREE from "/node_modules/.vite/deps/three.js?v=4c184407";
import { OrbitControls } from "/node_modules/.vite/deps/three_addons_controls_OrbitControls__js.js?v=4c184407";
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// cover1
const geometry = new THREE.BoxGeometry(3, 0.1, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);

// cover2
const geometry2 = new THREE.BoxGeometry(3, 0.1, 2);
const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
const cube2 = new THREE.Mesh(geometry2, material2);

// pages
const pageGeometry = new THREE.PlaneGeometry(2.93, 1.93);
const pageMaterial = new THREE.MeshBasicMaterial({ color: 0xe3d19b, side: THREE.DoubleSide, wireframe: false});
const page1 = new THREE.Mesh(pageGeometry, pageMaterial);
const page2 = new THREE.Mesh(pageGeometry, pageMaterial); 
const page3 = new THREE.Mesh(pageGeometry, pageMaterial);
const page4 = new THREE.Mesh(pageGeometry, pageMaterial);

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


scene.add(cube);
scene.add(cube2);
scene.add(page1);
scene.add(page2);


scene.add(page3);
scene.add(page4);

//camera position
camera.position.y = -5;
camera.position.z = 5;
camera.position.x = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

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
cube2.position.set(0, 1.5, 0);

cube.rotation.x = -Math.PI / 4; // Tilt 30 degrees along X axis
cube2.rotation.x = Math.PI / 4; // Tilt 30 degrees along X axis

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Position and rotation of the pages
page1.position.set(0, 1.35, 0); 
page2.position.set(0, 0, 0); 
page3.position.set(0, 1, -0.3);
page4.position.set(0, .4, -0.3); 

page1.rotation.x = -Math.PI / 4; // Tilt 30 degrees along X axis
page2.rotation.x = Math.PI / 4; // Tilt 30 degrees along X
page3.rotation.x = -Math.PI / 2.5; // Tilt 30 degrees along X axis
page4.rotation.x = Math.PI / 2.5; // Tilt 30 degrees along X axis


/*
//joint position 
joint.position.set(0, -1, 0);

joint2.position.set(0, 0, 0);

//hinge position
hinge.position.set(-0.69, 1.4, 1.2);
*/



function animate() {
  requestAnimationFrame(animate);
  controls.update();

  //animation
//  const time = Date.now() * 0.001;
//const angle = THREE.MathUtils.degToRad(15); // 15 degrees max
//const bend = Math.sin(time) * angle; // Oscillates between -15 and +15 degrees

//joint.rotation.x = -bend; // screen bends down
//joint2.rotation.x = bend; 
  renderer.render(scene, camera);
}

animate();



