'use client';

import 'client-only';
import * as THREE from 'three';
import MyThree from '@/components/myThree';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { threeRef, useMyThreeRef } from '@/components/myThree/threeSetting';
import { Slider } from '@/components/ui/slider';
import MotionDiv from '@/components/framer/motionDiv';

// 定義暗色與亮色主題的網格顏色
const darkMeshColor = 0xff60c2;
const lightMeshColor = 0x3b79ec;

// 可選擇的顏色列表
const colorList = [
  0xff60c2, // 粉紅色
  0xffd700, // 金色
  0x32cd32, // 萊姆綠
  0xff4500, // 橙紅色
  0x8a2be2, // 藍紫色
  0xff69b4, // 熱粉紅
  0x4682b4, // 鋼藍色
];

/**
 * 根據當前主題或指定顏色更新模型的顏色
 *
 * @param {threeRef | null} sceneRef - Three.js 場景的引用
 * @param {string | undefined} theme - 當前主題（'dark' 或 'light'）
 * @param {number} [color] - 可選的指定顏色
 */
const updateModelColor = (
  sceneRef: threeRef | null,
  theme: string | undefined,
  color?: number
) => {
  if (sceneRef?.meshArray) {
    const newColor =
      color || (theme === 'dark' ? darkMeshColor : lightMeshColor);

    sceneRef.meshArray.forEach(({ material }) => {
      (material as THREE.MeshBasicMaterial).color.set(newColor);
    });
  }
};

/**
 * 根據視窗寬度設定 Three.js 渲染器的尺寸
 *
 * @param {number} width - 當前視窗寬度
 * @param {THREE.WebGLRenderer} renderer - Three.js 渲染器實例
 */
const setRendererSize = (width: number, renderer: THREE.WebGLRenderer) => {
  if (width > 768) {
    renderer.setSize(600, 300);
  } else {
    const newWidth = window.innerWidth * 0.8;
    const newHeight = newWidth * 0.5;
    renderer.setSize(newWidth, newHeight);
  }
};

const ExampleModel = () => {
  const catModelRef = useMyThreeRef(); // 引用以操作 MyThree 元件
  const { theme } = useTheme(); // 獲取當前主題
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // 更新動畫速度
  useEffect(() => {
    if (catModelRef.current?.gltf?.animations) {
      catModelRef.current.gltf.animations.forEach((clip) => {
        const action = catModelRef.current?.mixer?.clipAction(clip);
        if (action) {
          action.play();
          action.timeScale = animationSpeed; // 1.0 為正常速度
        }
      });
    }
  }, [animationSpeed, catModelRef]);

  // 當主題變更時，更新模型顏色
  useEffect(() => {
    if (catModelRef.current && theme) {
      updateModelColor(catModelRef.current, theme);
    }
  }, [theme, catModelRef]);

  // 處理視窗調整大小
  useEffect(() => {
    const handleResize = () => {
      if (catModelRef.current?.renderer) {
        setRendererSize(window.innerWidth, catModelRef.current.renderer);
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
    cameraPosition: { x: 0, y: 0, z: 5 },
    isAutoRotate: true,
    autoRotateSpeed: 0.1,
    maxPolarAngle: Math.PI / 2,
    minPolarAngle: Math.PI / 2,
    canvasSize: {
      width: window.innerWidth > 768 ? 600 : window.innerWidth * 0.8,
      height: window.innerWidth > 768 ? 300 : window.innerWidth * 0.8 * 0.5,
    },
  };

  return (
    <div className='flex flex-col gap-2 items-center w-full'>
      {/* Three.js 模型展示 */}
      <MyThree ref={catModelRef} initSetting={initSetting} />

      {/* 顏色選擇按鈕 */}
      <div className='flex gap-4 flex-wrap justify-center'>
        {colorList.map((color) => (
          <MotionDiv
            key={color}
            className='p-0 rounded-full'
            whileHover={{
              scale: 1.1,
              y: -5,
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <button
              onClick={() =>
                updateModelColor(catModelRef.current, theme, color)
              }
              style={{
                backgroundColor: `#${color.toString(16).padStart(6, '0')}`,
              }}
              className='p-4 rounded-full'
              aria-label={`選擇顏色 #${color.toString(16)}`}
            />
          </MotionDiv>
        ))}
      </div>

      {/* 動畫速度滑桿 */}
      <Slider
        value={[animationSpeed]}
        onValueChange={(value) => setAnimationSpeed(value[0])}
        max={10}
        step={0.05}
      />
    </div>
  );
};

export default ExampleModel;
