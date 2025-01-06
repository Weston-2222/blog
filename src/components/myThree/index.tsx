'use client';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import {
  animate,
  clearThree,
  handleVisibilityChange,
  initSetting,
  initThree,
  loadModel,
  setRendererSize,
  threeRef,
} from './threeSetting';
type MyThreeProps = {
  className?: string;
  initSetting: initSetting;
};
const MyThree = forwardRef<threeRef, MyThreeProps>(
  ({ className, initSetting }, ref) => {
    // 設定元件的 displayName，方便在 DevTools 中識別
    MyThree.displayName = 'MyThree';
    // 用於掛載 Three.js 場景的 DOM 節點
    const mountRef = useRef<HTMLDivElement | null>(null);
    // 用於儲存 Three.js 的核心場景物件
    const sceneRef = useRef<threeRef>({
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      mixer: null,
      clock: null,
      meshArray: [],
      animationLoopRunning: false,
      model: null,
      gltf: null,
      initSetting: {
        modelPath: initSetting.modelPath,
        meshColor: initSetting.meshColor || 0xffffff,
        isWireframe: initSetting.isWireframe || false,
        modelScale: initSetting.modelScale || { x: 1, y: 1, z: 1 },
        modelPosition: initSetting.modelPosition || { x: 0, y: 0, z: 0 },
        isAnimation: initSetting.isAnimation || true,
        setRendererSize: initSetting.setRendererSize || (() => {}),
        cameraPosition: initSetting.cameraPosition || { x: 0, y: 0, z: 0 },
        isAutoRotate: initSetting.isAutoRotate || false,
        autoRotateSpeed: initSetting.autoRotateSpeed || 0,
      },
    });
    // 使用 useImperativeHandle 暴露給父組件的功能 (Ref API)
    useImperativeHandle<threeRef, threeRef>(ref, () => sceneRef.current);

    useEffect(() => {
      // 初始化場景與模型
      initThree(sceneRef, mountRef);
      loadModel(sceneRef);

      // 啟動動畫迴圈
      sceneRef.current.animationLoopRunning = true;
      if (sceneRef.current.initSetting?.isAnimation) animate(sceneRef);

      // 頁面可見性與視窗大小變化處理
      const handleVisibility = () => handleVisibilityChange(sceneRef);
      const handleResize = () => {
        if (sceneRef.current.camera && sceneRef.current.renderer) {
          setRendererSize(sceneRef);
        }
      };

      // 註冊事件監聽器
      document.addEventListener('visibilitychange', handleVisibility);
      window.addEventListener('resize', handleResize);

      // 清理函數
      return () => {
        document.removeEventListener('visibilitychange', handleVisibility);
        window.removeEventListener('resize', handleResize);
        clearThree(sceneRef, mountRef); // 清理資源並重置狀態
      };
    }, []);

    return <div ref={mountRef} className={className}></div>;
  }
);

export default MyThree;
