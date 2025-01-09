'use client';
import 'client-only';
import { Plane, Raycaster, Vector2, Vector3, MathUtils } from 'three';
import MyThree from '@/components/myThree';
import { useMyThreeRef } from '@/components/myThree/threeSetting';
import { InitSettingType } from '@/components/myThree/threeSetting';
import { useEffect, useCallback, useMemo } from 'react';

// 定義滑鼠跟隨3D頭部的屬性類型
type MouseFollow3DHeadProps = {
  canvasSize: { width: number; height: number };
  modelPath: string;
  className?: string;
};

const MouseFollow3DHead = ({
  canvasSize,
  modelPath,
  className,
}: MouseFollow3DHeadProps) => {
  const catModelRef = useMyThreeRef();
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // 初始化設定
  const initSetting: InitSettingType = {
    modelPath,
    modelScale: { x: 5, y: 5, z: 5 },
    modelPosition: { x: 0, y: 0, z: 0 },
    canvasSize,
    cameraPosition: { x: 0, y: 0, z: 6 },
    maxPolarAngle: isTouch ? Infinity : 0,
    minPolarAngle: isTouch ? -Infinity : 0,
    maxAzimuthAngle: isTouch ? Infinity : 0,
    minAzimuthAngle: isTouch ? -Infinity : 0,
  };

  const raycaster = useMemo(() => new Raycaster(), []);
  const mouse = useMemo(() => new Vector2(), []);

  // 使用 useMemo 確保 plane 穩定
  const plane = useMemo(() => new Plane(new Vector3(0, 0, 1), -2), []);

  // 滑鼠移動事件處理邏輯
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!catModelRef.current || !catModelRef.current.canvas) return;
      const rect = catModelRef.current.canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      mouse.x = MathUtils.clamp(x * 2 - 1, -1, 1);
      mouse.y = MathUtils.clamp(-(y * 2 - 1), -1, 1);

      if (catModelRef.current?.camera) {
        raycaster.setFromCamera(mouse, catModelRef.current.camera);
        const pointOfIntersection = new Vector3();
        raycaster.ray.intersectPlane(plane, pointOfIntersection);
        catModelRef.current.model?.lookAt(pointOfIntersection);
      }
    },
    [catModelRef, raycaster, mouse, plane]
  );

  useEffect(() => {
    if (!isTouch) document.addEventListener('mousemove', handleMouseMove);

    catModelRef.current?.renderer?.setAnimationLoop(() => {
      const { renderer, camera, scene, model } = catModelRef.current || {};
      if (renderer && camera && scene && model) renderer.render(scene, camera);
    });

    return () => {
      if (!isTouch) document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, catModelRef, isTouch]);

  return (
    <MyThree
      className={className}
      ref={catModelRef}
      initSetting={initSetting}
    />
  );
};

export default MouseFollow3DHead;
