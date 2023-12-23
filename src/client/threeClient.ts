import {
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
  Scene,
  ShadowMaterial,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';
import { setupDragDrop } from './drag_target';
import { loadEnvironmentTexture } from './environment';
import { EnvironmentShadow } from './environment-shadow';

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
  const gridHelper = new GridHelper(10, 10);
  scene.add(gridHelper);
  const axesHelper = new AxesHelper(2);
  scene.add(axesHelper);
  scene.background = new Color(0xc0c0c0);
  const directionalLight = new DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 3, 1);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const environmentShadow = new EnvironmentShadow(renderer);
  const roomEnvironment = new RoomEnvironment(renderer);
  environmentShadow.setEnvironmentScene(scene, roomEnvironment, 0.04);

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
  mesh.position.y = 1.5;
  scene.add(mesh);

  const parameters = {
    debugOutput: 'off',
  };
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  const gui = new GUI();
  gui.add<any>(parameters, 'debugOutput', {
    'off ': 'off',
    'light source detection': 'lightsourcedetection',
  });
  gui
    .add<any>(environmentShadow, 'showEnvironment')
    .onChange(() => environmentShadow.setEnvironment(scene));
  gui
    .add<any>(environmentShadow, 'showLightHelper')
    .onChange(() => environmentShadow.setEnvironment(scene));

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
      loadEnvironmentTexture(
        file.name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        event.target.result,
        (texture, textureData) => {
          environmentShadow.setEnvironmentMap(scene, texture, textureData);
        }
      );
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
    switch (parameters.debugOutput) {
      default:
      case 'off':
        renderer.render(scene, camera);
        break;
      case 'lightsourcedetection':
        environmentShadow.renderLightSourceDetectionDebugScene(
          scene,
          camera.aspect
        );
        break;
    }
  };
  requestAnimationFrame(animate);
};

const threeCanvas = document.getElementById('three_canvas');
helloCube(threeCanvas);
