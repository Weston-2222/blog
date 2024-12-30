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
import BouncyButton from './framer/bouncyButton';
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
              <BouncyButton>{item.node} </BouncyButton>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavBarMenu;
