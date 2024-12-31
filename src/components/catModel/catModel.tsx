'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import {
  animate,
  clearThree,
  handleVisibilityChange,
  initThree,
  loadModel,
  SceneRef,
  setModelSize,
  setRendererSize,
} from './threeSetting';

const CatModel = ({ className }: { className?: string }) => {
  const darkMeshColor = 0xff60c2;
  const lightMeshColor = 0x3b79ec;
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isInitializedRef = useRef(false);
  const sceneRef = useRef<SceneRef>({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    mixer: null, // 动画混合器
    clock: new THREE.Clock(),
    catMesh: null, // 模型引用，用于动态更新颜色
    animationLoopRunning: false, // 动画循环状态
    model: null,
  });
  // 更新模型颜色
  const updateModelColor = () => {
    if (sceneRef.current.catMesh) {
      const material = sceneRef.current.catMesh
        .material as THREE.MeshStandardMaterial;
      material.color.set(theme === 'dark' ? darkMeshColor : lightMeshColor);
    }
  };
  useEffect(() => {
    updateModelColor();
  }, [theme]);
  // 初始化three函數

  useEffect(() => {
    // 初始化three
    //避免重複初始化
    if (!isInitializedRef.current) {
      initThree(sceneRef, mountRef);
      isInitializedRef.current = true;
    }

    // 加载模型
    loadModel(sceneRef, mountRef, updateModelColor);
    // 动画循环
    sceneRef.current.animationLoopRunning = true;

    // 动画函数
    //animationLoopRunning為true時，會不斷調用animate函數
    animate(sceneRef);

    // 页面可见性处理
    //脫離可視區會把animationLoopRunning設為false
    const handleVisibility = () => handleVisibilityChange(sceneRef);
    document.addEventListener('visibilitychange', handleVisibility);

    // 監聽視窗大小變化
    const handleResize = () => {
      if (sceneRef.current.camera && sceneRef.current.renderer) {
        setRendererSize(sceneRef);
        setModelSize(sceneRef);
      }
    };
    window.addEventListener('resize', handleResize);
    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      // window.removeEventListener('resize', handleResize);
      clearThree(sceneRef, mountRef);
      // 重置场景状态，确保重新挂载时可以正常加载

      isInitializedRef.current = false;
    };
  }, []);

  return <div ref={mountRef} className={className}></div>;
};

export default CatModel;
