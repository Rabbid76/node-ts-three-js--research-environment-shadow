import type { Texture } from 'three';
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Color,
  DirectionalLight,
  GridHelper,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PCFSoftShadowMap,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  ShadowMaterial,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';
import { setupDragDrop } from './drag_target';
import { loadEnvironmentTexture } from './environment';

export const helloCube = (canvas: any) => {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  //renderer.toneMapping = NoToneMapping;
  //renderer.outputEncoding = sRGBEncoding;
  //renderer.toneMapping = ACESFilmicToneMapping;

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 4;
  camera.position.z = 8;
  const controls = new OrbitControls(camera, renderer.domElement);

  const scene = new Scene();
  scene.background = new Color(0xc0c0c0);
  const pmremGenerator = new PMREMGenerator(renderer);
  const roomEnvironment = new RoomEnvironment();
  const roomEnvironmentAmbientLight = new AmbientLight(0xffffff, 1);
  roomEnvironment.add(roomEnvironmentAmbientLight);
  const environmentTexture = pmremGenerator.fromScene(
    roomEnvironment,
    0.04
  ).texture;
  scene.environment = environmentTexture;
  //scene.background = environmentTexture;
  scene.background = new Color(0xffffff);

  const gridHelper = new GridHelper(10, 10);
  scene.add(gridHelper);
  const axesHelper = new AxesHelper(2);
  scene.add(axesHelper);

  const directionalLight = new DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 3, 1);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  const lightTransformControl = new TransformControls(
    camera,
    renderer.domElement
  );
  lightTransformControl.addEventListener('dragging-changed', (event: any) => {
    controls.enabled = !event.value;
  });
  lightTransformControl.attach(directionalLight);
  lightTransformControl.visible = false;
  scene.add(lightTransformControl);

  const groundGeometry = new PlaneGeometry(10, 10);
  groundGeometry.rotateX(-Math.PI / 2);
  const groundMaterial = new ShadowMaterial();
  const groundMesh = new Mesh(groundGeometry, groundMaterial);
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhysicalMaterial({ color: 0xe02020 });
  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.position.y = 0.5;
  scene.add(mesh);
  const meshTransformControl = new TransformControls(
    camera,
    renderer.domElement
  );
  meshTransformControl.addEventListener('dragging-changed', (event: any) => {
    controls.enabled = !event.value;
  });
  meshTransformControl.attach(mesh);
  meshTransformControl.visible = false;
  scene.add(meshTransformControl);

  const stats = new Stats();
  document.body.appendChild(stats.dom);
  const gui = new GUI();
  const uiProperties = {
    'mesh transform control': meshTransformControl.visible,
    'light transform control': lightTransformControl.visible,
  };
  gui
    .add(uiProperties, 'mesh transform control')
    .onChange((value: any) => (meshTransformControl.visible = value));
  gui
    .add(uiProperties, 'light transform control')
    .onChange((value: any) => (lightTransformControl.visible = value));

  const setEnvironmentMap = (texture: Texture, _textureData: any) => {
    const pmremEnvironmentTexture =
      pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = pmremEnvironmentTexture;
    scene.background = pmremEnvironmentTexture;
  };

  window.addEventListener(
    'resize',
    () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    },
    false
  );
  setupDragDrop(
    'holder',
    'hover',
    (file: File, event: ProgressEvent<FileReader>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      loadEnvironmentTexture(file.name, event.target.result, setEnvironmentMap);
    }
  );

  let previousTimeStamp: number | undefined;
  const animate = (timestamp: number) => {
    const deltaTimeMs = timestamp - (previousTimeStamp ?? timestamp);
    previousTimeStamp = timestamp;
    requestAnimationFrame(animate);
    mesh.rotation.y += (((45 * Math.PI) / 180) * deltaTimeMs) / 1000;
    controls.update();
    render();
    stats.update();
  };

  const render = () => {
    renderer.render(scene, camera);
  };
  requestAnimationFrame(animate);
};

const threeCanvas = document.getElementById('three_canvas');
helloCube(threeCanvas);
