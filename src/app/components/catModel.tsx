'use client';
import 'client-only';
import * as THREE from 'three';
import MyThree from '@/components/myThree';
import { threeRef, useMyThreeRef } from '@/components/myThree/threeSetting';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

// 定義暗色與亮色主題的網格顏色
const darkMeshColor = 0xff60c2;
const lightMeshColor = 0x3b79ec;

// 更新模型的顏色根據當前主題
const updateModelColor = (sceneRef: threeRef, theme: string) => {
  if (sceneRef?.meshArray) {
    sceneRef.meshArray.forEach(({ material }) => {
      (material as THREE.MeshBasicMaterial).color.set(
        theme === 'dark' ? darkMeshColor : lightMeshColor
      );
    });
  }
};

// 設定渲染器尺寸，根據螢幕寬度調整
const setRendererSize = (width: number, renderer: THREE.WebGLRenderer) => {
  renderer.setSize(
    width > 768 ? 600 : window.innerWidth,
    width > 768 ? 300 : window.innerWidth * 0.5
  );
};

const Cat = () => {
  const { theme } = useTheme(); // 獲取當前主題
  const catModelRef = useMyThreeRef(); // 建立引用以操作 MyThree

  useEffect(() => {
    const handleResize = () => {
      if (catModelRef.current?.renderer) {
        setRendererSize(window.innerWidth, catModelRef.current?.renderer);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [catModelRef]);
  // 初始化設定
  const initSetting = {
    modelPath: '/models/cat.glb',
    meshColor: theme === 'dark' ? darkMeshColor : lightMeshColor,
    isAnimation: true,
    isWireframe: true,
    modelScale: { x: 0.06, y: 0.12, z: 0.1 },
    modelPosition: { x: 0, y: -2, z: 0 },
    canvasSize: {
      width: window.innerWidth > 768 ? 600 : window.innerWidth,
      height: window.innerWidth > 768 ? 300 : window.innerWidth * 0.5,
    },
    cameraPosition: { x: 0, y: 0, z: 5 },
    isAutoRotate: true,
    autoRotateSpeed: 0.1,
    maxPolarAngle: Math.PI / 2,
    minPolarAngle: Math.PI / 2,
  };

  // 當主題變更時，更新模型顏色
  useEffect(() => {
    if (catModelRef.current && theme) {
      updateModelColor(catModelRef.current, theme);
    }
  }, [theme, catModelRef]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className='flex justify-center items-center'
    >
      <MyThree ref={catModelRef} initSetting={initSetting} />
    </motion.div>
  );
};

export default Cat;
