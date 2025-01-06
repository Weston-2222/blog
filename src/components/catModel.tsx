'use client';
import 'client-only';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import SpinnerLoading from './spinnerLoading';
import { threeRef, useMyThreeRef } from './myThree/threeSetting';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
// 動態載入 MyThree 元件，關閉 SSR，並添加載入中效果
const MyThree = dynamic(
  () => import(/* webpackChunkName:"CatModel" */ '@/components/myThree'),
  {
    ssr: false,
    loading: () => <SpinnerLoading className='h-[360px] w-full' />,
  }
);

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
    width > 768 ? 600 : window.innerWidth * 0.8,
    width > 768 ? 360 : window.innerWidth * 0.8 * 0.6
  );
};

const Cat = () => {
  const { theme } = useTheme(); // 獲取當前主題

  // 初始化設定
  const initSetting = {
    modelPath: '/cat.glb',
    meshColor: theme === 'dark' ? darkMeshColor : lightMeshColor,
    isAnimation: true,
    isWireframe: true,
    modelScale: { x: 0.08, y: 0.133, z: 0.08 },
    modelPosition: { x: 0, y: -2, z: 0 },
    setRendererSize,
    cameraPosition: { x: 0, y: 0, z: 5 },
    isAutoRotate: true,
    autoRotateSpeed: 0.1,
  };

  const catModelRef = useMyThreeRef(); // 建立引用以操作 MyThree

  // 當主題變更時，更新模型顏色
  useEffect(() => {
    if (catModelRef.current && theme) {
      updateModelColor(catModelRef.current, theme);
    }
  }, [theme]);

  return <MyThree ref={catModelRef} initSetting={initSetting} />; // 渲染 MyThree 元件
};

export default Cat;