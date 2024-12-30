import { RefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export type SceneRef = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  controls: OrbitControls | null;
  mixer: THREE.AnimationMixer | null;
  clock: THREE.Clock;
  catMesh: THREE.Mesh | null;
  animationLoopRunning: boolean;
};
// 初始化three函數
export const initThree = (
  sceneRef: RefObject<SceneRef>,
  mountRef: RefObject<HTMLDivElement | null>
) => {
  if (!sceneRef.current) return;
  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(500, 500);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 2;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  if (mountRef.current) {
    mountRef.current.appendChild(renderer.domElement);
  }

  sceneRef.current.scene = scene;
  sceneRef.current.camera = camera;
  sceneRef.current.renderer = renderer;
  sceneRef.current.controls = controls;
};

// 動畫函數
export const animate = (sceneRef: RefObject<SceneRef>) => {
  if (!sceneRef.current || !sceneRef.current.animationLoopRunning) return;
  const render = () => {
    if (!sceneRef.current.animationLoopRunning) return;

    const { scene, camera, renderer, controls, mixer, clock } =
      sceneRef.current;

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    controls?.update();
    if (scene && camera) renderer?.render(scene, camera);

    requestAnimationFrame(render);
  };

  render();
};

// 加载模型
export const loadModel = (
  sceneRef: RefObject<SceneRef>,
  updateModelColor: () => void
) => {
  const loader = new GLTFLoader();
  loader.load(
    '/cat.glb', // 确保文件路径正确
    (gltf) => {
      gltf.scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          const material = child.material;
          child.material = material;
          child.material.emissive = child.material.color;
          child.material.emissiveMap = child.material.map;
          sceneRef.current.catMesh = child;
          child.material.wireframe = true;
          updateModelColor();
        }
      });
      const model = gltf.scene;
      model.position.set(0, -1, 0);
      model.scale.set(0.08, 0.08, 0.08); // 调整模型比例
      sceneRef.current.scene?.add(model);
      // 动画处理
      if (gltf.animations.length > 0) {
        sceneRef.current.mixer = new THREE.AnimationMixer(model); // 初始化动画混合器
        gltf.animations.forEach((clip) => {
          sceneRef.current.mixer?.clipAction(clip).play();
        });
      }
    },
    undefined,
    (error) => {
      console.error('Error loading model:', error);
    }
  );
};

// 页面可见性处理
export const handleVisibilityChange = (sceneRef: RefObject<SceneRef>) => {
  if (document.visibilityState === 'visible') {
    sceneRef.current.animationLoopRunning = true; // 恢复动画
    animate(sceneRef); // 重新启动动画
  } else {
    sceneRef.current.renderer?.setAnimationLoop(null); // 暂停渲染
  }
};

// 清理three
export const clearThree = (
  sceneRef: RefObject<SceneRef>,
  mountRef: RefObject<HTMLDivElement | null>
) => {
  if (!sceneRef.current) return;
  const { renderer, controls, scene } = sceneRef.current;

  if (renderer && renderer.domElement) {
    mountRef.current?.removeChild(renderer.domElement); // 移除渲染器
    renderer.dispose(); // 销毁渲染器
  }

  controls?.dispose(); // 销毁 OrbitControls

  scene?.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      if (object.material instanceof THREE.Material) {
        object.material.dispose();
      }
    }
  });
  // 清空引用
  sceneRef.current.scene = null;
  sceneRef.current.camera = null;
  sceneRef.current.renderer = null;
  sceneRef.current.controls = null;
  sceneRef.current.mixer = null;
  sceneRef.current.catMesh = null;
  sceneRef.current.animationLoopRunning = false;
};
