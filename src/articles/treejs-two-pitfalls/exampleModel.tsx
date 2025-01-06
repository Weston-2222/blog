'use client';
import 'client-only';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import SpinnerLoading from '@/components/spinnerLoading';
import { threeRef, useMyThreeRef } from '@/components/myThree/threeSetting';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import FloatUp from '@/components/framer/floatUp';
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
const updateModelColor = (
  sceneRef: threeRef | null,
  theme: string | undefined,
  color?: number
) => {
  if (sceneRef && sceneRef?.meshArray) {
    sceneRef.meshArray.forEach(({ material }) => {
      (material as THREE.MeshBasicMaterial).color.set(
        color ? color : theme === 'dark' ? darkMeshColor : lightMeshColor
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

const ExampleModel = () => {
  const catModelRef = useMyThreeRef(); // 建立引用以操作 MyThree

  const { theme } = useTheme(); // 獲取當前主題
  const [animationSpeed, setAnimationSpeed] = useState(1);
  useEffect(() => {
    catModelRef.current?.gltf?.animations.forEach((clip) => {
      const action = catModelRef.current?.mixer?.clipAction(clip);
      if (action) {
        action.play();
        action.timeScale = animationSpeed; // 設置動畫速度，1.0為正常速度
      }
    });
  }, [animationSpeed, catModelRef]);
  // 初始化設定
  const initSetting = {
    modelPath: '/models/cat.glb',
    meshColor: theme === 'dark' ? darkMeshColor : lightMeshColor,
    isAnimation: true,
    isWireframe: true,
    modelScale: { x: 0.08, y: 0.133, z: 0.08 },
    modelPosition: { x: 0, y: -2, z: 0 },
    setRendererSize,
    cameraPosition: { x: 0, y: 0, z: 5 },
    isAutoRotate: true,
    autoRotateSpeed: 0.5,
  };

  // 當主題變更時，更新模型顏色
  useEffect(() => {
    if (catModelRef.current && theme) {
      updateModelColor(catModelRef.current, theme);
    }
  }, [theme, catModelRef]);
  const colorList = [
    0xff60c2, // 粉紅色
    0x3b79ec, // 藍色
    0xffd700, // 金色
    0x32cd32, // 萊姆綠
    0xff4500, // 橙紅色
    0x8a2be2, // 藍紫色
    0xff69b4, // 熱粉紅
    0x4682b4, // 鋼藍色
  ];
  return (
    <div className='flex flex-col gap-2 items-center'>
      <MyThree ref={catModelRef} initSetting={initSetting} />

      <div className='flex gap-4 flex-wrap'>
        {colorList.map((color) => (
          <FloatUp key={color} className='p-0 rounded-full'>
            <button
              key={color}
              onClick={() => {
                updateModelColor(catModelRef.current, theme, color);
              }}
              style={{
                backgroundColor: `#${color.toString(16)}`,
              }}
              className='p-4 rounded-full'
            ></button>
          </FloatUp>
        ))}
      </div>

      <Slider
        value={[animationSpeed]}
        onValueChange={(value) => setAnimationSpeed(value[0])}
        max={10}
        step={0.1}
      />
    </div>
  );
};

export default ExampleModel;
