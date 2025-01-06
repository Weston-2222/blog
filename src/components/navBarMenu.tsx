'use client';
import 'client-only';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconMenu2 } from '@tabler/icons-react';
import { useState } from 'react';
import MotionButton from './framer/motionButton';

export type MenuBarList = {
  name: string;
  href: string;
  node: React.ReactNode;
};
const NavBarMenu = ({
  menuBarList,
  className,
}: {
  menuBarList: MenuBarList[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <DropdownMenu
        modal={false}
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <DropdownMenuTrigger>
          <IconMenu2 />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={() => {
            setTimeout(() => {
              setOpen(false);
            }, 300); // 延遲 500 毫秒
          }}
        >
          {menuBarList.map((item: MenuBarList) => (
            <DropdownMenuItem key={item.name}>
              <MotionButton
                whileTap={{
                  scale: 1.2, // 放大
                  y: -10, // 向上跳
                }}
                transition={{
                  type: 'spring', // 弹性效果
                  stiffness: 300,
                  damping: 10,
                }}
              >
                {item.node}
              </MotionButton>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavBarMenu;
