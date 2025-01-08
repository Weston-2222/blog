'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'; // hack
import { useContext, useEffect, useRef, useState } from 'react';

// FrozenRouter 组件，保持页面切换过程中上下文的持久化
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {}); // 使用 useContext 钩子获取当前的 LayoutRouterContext 上下文值。如果 LayoutRouterContext 为空，则使用空对象。
  const frozen = useRef(context).current; // 使用 useRef 创建一个持久化的引用来存储 context，并通过 current 属性获取其当前值，这样可以确保 context 在组件的整个生命周期内保持不变。
  // 将冻结的 context 作为值传递给 LayoutRouterContext.Provider，以确保子组件在页面切换过程中能够使用一致的上下文。
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

// 页面切换动画的配置
const variants = {
  hidden: { opacity: 0, x: 0, y: 100 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 100 },
};

// PageTransitionEffect 组件，用于处理页面切换动画
const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  // 使用 usePathname 钩子获取路径名作为 key，以在路由更改时触发重新渲染
  const key = usePathname();
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={key}
        initial={isFirstRender ? false : 'hidden'}
        animate='enter'
        exit='exit'
        variants={variants}
        transition={{ type: 'linear' }}
        className='overflow-hidden'
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionEffect;
