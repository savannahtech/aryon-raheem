import React from 'react';
import NavList from "./navlist";
import {Link} from "react-router";
import SidebarProfile from "./sidebarProfile";
import {navItems} from "../../assets/data";
import Logo from "../Logo";
import {Icon} from "@iconify/react";
import useAuthStore from "../../stores/store";
import {Button} from "../ui/button";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar({isOpen, setIsOpen}: IProps) {
  const {logout} = useAuthStore();

  return (
    <aside
      className={`h-[100dvh] fixed left-0 top-0 z-50 bottom-0 w-10/12 lg:w-[250px] flex flex-col bg-background border-r border-border apply-transition
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="p-6 flex">
        <Link to="/" className="block flex-1">
          <Logo/>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden inline-flex"
          onClick={() => setIsOpen(false)}
        >
          <Icon icon="ic:sharp-close" width={24} height={24}/>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <p className="small mb-2">Platform</p>
        <NavList items={navItems}/>
      </div>

      <SidebarProfile/>
      <div className="p-4 pt-0">
        <NavList items={[{title: "Logout", icon: "fe:logout", onClick: logout}]}/>
      </div>
    </aside>
  );
}

export default Sidebar;
