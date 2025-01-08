'use client';
import 'client-only';
import * as THREE from 'three';
import MyThree from '@/components/myThree';
import { useMyThreeRef } from '@/components/myThree/threeSetting';
import { initSetting } from '@/components/myThree/threeSetting';
import { useEffect } from 'react';
type MouseFollow3DHeadProps = {
  canvasSize: { width: number; height: number };
  modelPath: string;
};
const MouseFollow3DHead = ({
  canvasSize,
  modelPath,
}: MouseFollow3DHeadProps) => {
  const catModelRef = useMyThreeRef(); // 建立引用以操作 MyThree

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  // 初始化設定
  const initSetting: initSetting = {
    modelPath,
    modelScale: { x: 4, y: 4, z: 4 },
    modelPosition: { x: 0, y: 0, z: 0 },
    canvasSize,
    cameraPosition: { x: 0, y: 0, z: 6 },
    maxPolarAngle: isTouch ? Infinity : 0,
    minPolarAngle: isTouch ? -Infinity : 0,
    maxAzimuthAngle: isTouch ? Infinity : 0,
    minAzimuthAngle: isTouch ? -Infinity : 0,
  };

  useEffect(() => {
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    // 儲存目標旋轉角度的 Ref

    const pointOfIntersection = new THREE.Vector3();

    const onMouseMove = (event: { clientX: number; clientY: number }) => {
      if (!catModelRef.current || !catModelRef.current.canvas) return;

      const rect = catModelRef.current.canvas.getBoundingClientRect();

      // 計算滑鼠相對於畫布的位置
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // 將相對位置轉換為標準化裝置座標
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -((y / rect.height) * 2 - 1);

      // 限制滑鼠座標在 -1 到 1 之間
      mouse.x = THREE.MathUtils.clamp(mouse.x, -1, 1);
      mouse.y = THREE.MathUtils.clamp(mouse.y, -1, 1);

      if (catModelRef.current?.camera) {
        raycaster.setFromCamera(mouse, catModelRef.current.camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);
        const modelPos = catModelRef.current.model?.position.clone();
        if (!modelPos) return;
        catModelRef.current.model?.lookAt(pointOfIntersection);
      }
      // 儲存目標旋轉角度
    };

    catModelRef.current?.renderer?.setAnimationLoop(() => {
      if (!catModelRef.current) return;
      const { renderer, camera, scene, model } = catModelRef.current;
      if (!model || !renderer || !scene || !camera) return;

      renderer.render(scene, camera);
    });

    // 滑鼠事件監聽
    if (!isTouch) document.addEventListener('mousemove', onMouseMove, false);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [catModelRef, isTouch]);
  return (
    <MyThree
      className='w-[300px] h-[300px]'
      ref={catModelRef}
      initSetting={initSetting}
    />
  );
};

export default MouseFollow3DHead;
