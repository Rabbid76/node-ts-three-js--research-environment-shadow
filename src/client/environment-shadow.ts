import type { LightSource } from './light-source-detection';
import {
  EnvironmentMapDecodeMaterial,
  LightSourceDetector,
} from './light-source-detection';
import { LightSourceDetectorDebug } from './light-source-detection-debug';
import type { Object3D, Texture, WebGLRenderer } from 'three';
import {
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  OrthographicCamera,
  PMREMGenerator,
  Scene,
  Vector3,
} from 'three';

export class EnvironmentShadow {
  public showEnvironment = true;
  private _renderer: WebGLRenderer;
  private _pmremGenerator: PMREMGenerator;
  private _lightSourceDetector: LightSourceDetector;
  private _lightSourceDebugScene: Scene | null = null;
  private _pmremEnvironmentTexture: Texture | null = null;
  private _backgroundColor = new Color(0xffffff);
  private _detectorWidth: number = 1024;
  private _detectorHeight: number = 512;
  private _sampleThreshold: number = 0.9;
  private _noOfSamples: number = 1500;
  private _lightIntensityThreshold: number = 0.2;
  private _lightDistanceScale: number = 5.0;

  constructor(renderer: WebGLRenderer) {
    this._renderer = renderer;
    this._pmremGenerator = new PMREMGenerator(renderer);
    this._lightSourceDetector = new LightSourceDetector({
      numberOfSamples: this._noOfSamples,
      width: this._detectorWidth,
      height: this._detectorHeight,
      sampleThreshold: this._sampleThreshold,
    });
  }

  public setEnvironmentScene(
    scene: Scene,
    environmentScene: Scene,
    sigma: number
  ) {
    this._lightSourceDebugScene = null;
    this._pmremEnvironmentTexture = this._pmremGenerator.fromScene(
      environmentScene,
      sigma
    ).texture;
    this._updateEnvironment(scene);
  }

  public setEnvironmentMap(
    scene: Scene,
    equirectangularTexture: Texture,
    _textureData: any
  ) {
    this._lightSourceDebugScene = null;
    this._pmremEnvironmentTexture = this._pmremGenerator.fromEquirectangular(
      equirectangularTexture
    ).texture;
    this._updateEnvironment(scene);
  }

  private _updateEnvironment(scene: Scene) {
    this.setEnvironment(scene);
    this._lightSourceDetector.detectLightSources(
      this._renderer,
      this._pmremEnvironmentTexture as Texture
    );
    this._removeLightSourcesFromScene(scene);
    this._createLightSources(scene, this._lightSourceDetector.lightSources);
  }

  public setEnvironment(scene: Scene) {
    scene.environment = this._pmremEnvironmentTexture;
    scene.background = this.showEnvironment
      ? this._pmremEnvironmentTexture
      : this._backgroundColor;
  }

  private _removeLightSourcesFromScene(scene: Scene) {
    const lightObject: Object3D[] = [];
    scene.traverse((object: Object3D) => {
      // @ts-ignore
      if (object.isLight || ['lightHelper', 'skybox'].includes(object.name)) {
        lightObject.push(object);
      }
    });
    lightObject.forEach((item: Object3D) => item.removeFromParent());
  }

  private _createLightSources(scene: Scene, lightSources: LightSource[]) {
    const mapCenter = new Vector3(0, 0, 0);
    const maxIntensity =
      lightSources.length > 0
        ? Math.max(
            ...lightSources.map(
              (lightSource: LightSource) => lightSource.maxIntensity
            )
          )
        : 1;
    const lightIntensityScale = 1 / maxIntensity;
    for (const lightSource of lightSources) {
      console.log(lightSource.size);
      const lightIntensity = lightSource.maxIntensity * lightIntensityScale;
      if (
        lightIntensity < this._lightIntensityThreshold ||
        lightSource.position.z < 0
      ) {
        continue;
      }
      const lightPosition = new Vector3(
        lightSource.position.x,
        lightSource.position.z,
        lightSource.position.y
      )
        .multiplyScalar(this._lightDistanceScale)
        .add(mapCenter);
      const directionalLight = new DirectionalLight(0xffffff, lightIntensity);
      directionalLight.position.copy(lightPosition);
      directionalLight.lookAt(mapCenter.clone());
      directionalLight.updateMatrix();
      directionalLight.castShadow = true;
      scene.add(directionalLight);
      const lightHelper = new DirectionalLightHelper(
        directionalLight,
        lightIntensity
      );
      lightHelper.name = 'lightHelper';
      scene.add(lightHelper);
    }
  }

  renderLightSourceDetectionDebugScene(scene: Scene, aspect: number) {
    const environmentCamera = new OrthographicCamera(
      -1,
      1,
      1 / aspect,
      -1 / aspect,
      -1,
      1
    );
    const environmentScene = this._createLightSourceDebugScene(scene, -1);
    if (environmentScene === null) {
      return;
    }
    environmentScene.background = new Color(0xffffff);
    this._renderer.render(environmentScene, environmentCamera);
  }

  private _createLightSourceDebugScene = (
    scene: Scene,
    maxNoOfLightSources?: number
  ): Scene | null => {
    const maxLightSources = maxNoOfLightSources ?? -1;
    if (
      this._lightSourceDebugScene !== null &&
      maxLightSources ===
        this._lightSourceDebugScene.userData.maximumNumberOfLightSources
    ) {
      return this._lightSourceDebugScene;
    }
    this._lightSourceDebugScene = new Scene();
    const planeMaterial = new EnvironmentMapDecodeMaterial(true, false);
    planeMaterial.setSourceTexture(scene.environment as Texture);
    LightSourceDetectorDebug.createPlane(
      this._lightSourceDebugScene,
      planeMaterial
    );
    const lightSourceDetectorDebug = new LightSourceDetectorDebug(
      this._lightSourceDetector
    );
    lightSourceDetectorDebug.createDebugScene(
      this._lightSourceDebugScene,
      maxLightSources
    );
    this._lightSourceDebugScene.userData.maximumNumberOfLightSources =
      maxLightSources;
    return this._lightSourceDebugScene;
  };
}
