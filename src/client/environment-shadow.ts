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
  Group,
  OrthographicCamera,
  PMREMGenerator,
  Scene,
  Vector3,
} from 'three';

export class EnvironmentShadow {
  public showEnvironment = true;
  public showLightHelper = true;
  private _renderer: WebGLRenderer;
  private _pmremGenerator: PMREMGenerator;
  private _lightSourceDetector: LightSourceDetector;
  private _lightSourceDebugScene: Scene | null = null;
  private _pmremEnvironmentTexture: Texture | null = null;
  private _backgroundColor = new Color(0xffffff);
  private _detectorWidth: number = 1024;
  private _detectorHeight: number = 512;
  private _sampleThreshold: number = 0.9;
  private _noOfSamples: number = 3000;
  private _lightIntensityThreshold: number = 0.01;
  private _lightDistanceScale: number = 5.0;
  private _lightHelperGroup: Object3D | null = null;

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
    if (this._lightHelperGroup !== null) {
      this._lightHelperGroup.visible = this.showLightHelper;
    }
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
              (lightSource: LightSource) =>
                lightSource.maxIntensity * lightSource.size
            )
          )
        : 1;
    const lightIntensityScale = 1 / maxIntensity;
    for (const lightSource of lightSources) {
      const lightIntensity =
        lightSource.maxIntensity * lightSource.size * lightIntensityScale;
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
      this._lightHelperGroup ??= new Group();
      scene.add(this._lightHelperGroup);
      this._lightHelperGroup.visible = this.showLightHelper;
      const lightHelper = new DirectionalLightHelper(
        directionalLight,
        lightIntensity,
        0xff0000
      );
      lightHelper.name = 'lightHelper';
      this._lightHelperGroup.add(lightHelper);
    }
  }

  public renderLightSourceDetectionDebugScene(scene: Scene, aspect: number) {
    const environmentCamera = new OrthographicCamera(
      -1,
      1,
      1 / aspect,
      -1 / aspect,
      -1,
      1
    );
    const environmentScene = this._createLightSourceDebugScene(scene);
    if (environmentScene === null) {
      return;
    }
    environmentScene.background = new Color(0xffffff);
    this._renderer.render(environmentScene, environmentCamera);
  }

  private _createLightSourceDebugScene = (scene: Scene): Scene | null => {
    if (this._lightSourceDebugScene !== null) {
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
    lightSourceDetectorDebug.createDebugScene(this._lightSourceDebugScene, -1);
    return this._lightSourceDebugScene;
  };
}
