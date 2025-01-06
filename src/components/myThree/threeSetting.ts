import { RefObject, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

export type threeRef = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  controls: OrbitControls | null;
  mixer: THREE.AnimationMixer | null;
  clock: THREE.Clock | null;
  meshArray: THREE.Mesh[];
  animationLoopRunning: boolean;
  model: THREE.Group<THREE.Object3DEventMap> | null;
  gltf: GLTF | null;
  initSetting?: initSetting;
};
export type initSetting = {
  modelPath: string;
  meshColor?: number;
  isWireframe?: boolean;
  modelScale?: { x: number; y: number; z: number };
  modelPosition?: { x: number; y: number; z: number };
  isAnimation?: boolean;
  setRendererSize?: (width: number, renderer: THREE.WebGLRenderer) => void;
  cameraPosition?: { x: number; y: number; z: number };
  isAutoRotate?: boolean;
  autoRotateSpeed?: number;
};
export const useMyThreeRef = () => {
  return useRef<threeRef>(null);
};

// 初始化three函數
export const initThree = (
  sceneRef: RefObject<threeRef>,
  mountRef: RefObject<HTMLDivElement | null>
) => {
  if (!sceneRef.current) return; // 若 sceneRef 不存在則退出

  // 初始化場景、相機與渲染器
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = sceneRef.current?.initSetting?.cameraPosition?.z || 0; // 設置相機的初始位置
  camera.position.y = sceneRef.current?.initSetting?.cameraPosition?.y || 0; // 設置相機的初始位置
  camera.position.x = sceneRef.current?.initSetting?.cameraPosition?.x || 0; // 設置相機的初始位置
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1); // 設置像素比以優化畫質

  // 設置軌道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  Object.assign(controls, {
    enableDamping: true, // 啟用阻尼效果，使操作更平滑
    dampingFactor: 0.05, // 設定阻尼系數
    enableZoom: true, // 禁用縮放功能
    maxPolarAngle: Math.PI / 2, // 限制垂直視角的最大角度
    minPolarAngle: Math.PI / 2, // 限制垂直視角的最小角度
    autoRotate: sceneRef.current?.initSetting?.isAutoRotate || false, // 啟用自動旋轉
    autoRotateSpeed: sceneRef.current?.initSetting?.autoRotateSpeed || 0, // 設定自動旋轉速度
  });

  // 將渲染器的 DOM 元素添加到指定的掛載容器中
  mountRef.current?.appendChild(renderer.domElement);

  // 將初始化的對象存入 sceneRef 供外部使用
  Object.assign(sceneRef.current, {
    scene,
    camera,
    renderer,
    controls,
    clock: new THREE.Clock(), // 添加一個時鐘對象，用於動畫計時
  });

  // 設置渲染器的尺寸以適配容器大小
  setRendererSize(sceneRef);
};

// 加載模型
export const loadModel = (sceneRef: RefObject<threeRef>) => {
  const getFileExtension = (filename: string) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop() : '';
  };

  const loadGlbAndGltf = () => {
    const loader = new GLTFLoader();
    const modelPath = sceneRef.current?.initSetting?.modelPath;

    if (!modelPath) return; // 若未設置模型路徑則退出

    loader.load(
      modelPath, // 模型文件路徑
      (gltf) => {
        // 遍歷模型的所有子節點

        sceneRef.current.gltf = gltf;
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshStandardMaterial;
            child.material = material; // 設置材質
            child.material.side = THREE.DoubleSide; // 啟用雙面渲染
            //child.material.emissive = child.material.color; // 添加自發光顏色
            //child.material.emissiveMap = child.material.map; // 添加自發光貼圖
            child.material.color.set(
              sceneRef.current?.initSetting?.meshColor || 0xffffff
            ); // 設置網格顏色
            child.material.wireframe =
              sceneRef.current?.initSetting?.isWireframe || false; // 啟用線框模式
            sceneRef.current?.meshArray.push(child); // 添加到網格陣列
            // 設置最大各向異性過濾
          }
        });

        //光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        sceneRef.current?.scene?.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
        directionalLight.position.set(10, 10, 10);
        sceneRef.current?.scene?.add(directionalLight);

        const model = gltf.scene;
        model.scale.set(
          sceneRef.current?.initSetting?.modelScale?.x || 1,
          sceneRef.current?.initSetting?.modelScale?.y || 1,
          sceneRef.current?.initSetting?.modelScale?.z || 1
        ); // 設置模型縮放比例
        model.position.set(
          sceneRef.current?.initSetting?.modelPosition?.x || 0,
          sceneRef.current?.initSetting?.modelPosition?.y || 0,
          sceneRef.current?.initSetting?.modelPosition?.z || 0
        ); // 設置模型位置
        sceneRef.current!.model = model; // 儲存模型到 sceneRef
        sceneRef.current!.scene?.add(model); // 添加模型到場景

        // 若模型包含動畫，初始化動畫混合器並播放
        if (
          sceneRef.current?.initSetting?.isAnimation &&
          gltf.animations.length > 0
        ) {
          const mixer = new THREE.AnimationMixer(model);
          sceneRef.current!.mixer = mixer;
          gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
        }
      },
      undefined,
      (error) => console.error('模型加載錯誤:', error) // 處理加載失敗
    );
  };

  if (
    getFileExtension(sceneRef.current?.initSetting?.modelPath || '') ===
      'glb' ||
    getFileExtension(sceneRef.current?.initSetting?.modelPath || '') === 'gltf'
  ) {
    loadGlbAndGltf();
  } else if (
    getFileExtension(sceneRef.current?.initSetting?.modelPath || '') === 'svg'
  ) {
  }
};

export const animate = (sceneRef: RefObject<threeRef>) => {
  // 若 sceneRef 不存在或動畫迴圈未啟用則退出
  if (!sceneRef.current || !sceneRef.current.animationLoopRunning) return;

  const render = () => {
    if (!sceneRef.current?.animationLoopRunning) return; // 確保動畫迴圈仍在運行

    const { scene, camera, renderer, controls, mixer, clock } =
      sceneRef.current;

    // 更新動畫與控制器
    const delta = clock?.getDelta() || 0; // 計算自上一幀的時間差
    mixer?.update(delta); // 更新動畫混合器
    controls?.update(); // 更新軌道控制器

    // 渲染場景
    if (scene && camera) renderer?.render(scene, camera);

    // 遞迴調用下一幀
    requestAnimationFrame(render);
  };

  render(); // 啟動渲染
};

// 頁面可見性處理
export const handleVisibilityChange = (sceneRef: RefObject<threeRef>) => {
  if (document.visibilityState === 'visible') {
    sceneRef.current.animationLoopRunning = true; // 恢復動畫
    animate(sceneRef); // 重新啟動動畫
  } else {
    sceneRef.current.renderer?.setAnimationLoop(null); // 暫停渲染
  }
};

// 清理three
export const clearThree = (
  sceneRef: RefObject<threeRef>,
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
  Object.assign(sceneRef.current, {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    mixer: null,
    meshArray: [],
    animationLoopRunning: false,
  });
};

//模型大小對照表
export const setRendererSize = (sceneRef: RefObject<threeRef>) => {
  const { renderer } = sceneRef.current || {};
  if (!renderer) return;
  if (sceneRef.current?.initSetting?.setRendererSize) {
    sceneRef.current?.initSetting?.setRendererSize(window.innerWidth, renderer);
  }
};

// export const setModelSize = (sceneRef: RefObject<threeRef>) => {
//   const { model } = sceneRef.current || {};
//   if (!model) return;
//   model.scale.set(0.08, 0.133, 0.08);
// };
