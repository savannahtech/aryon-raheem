import React, {useEffect, useState} from 'react';
import Sidebar from "./sidebar";
import {Outlet, useLocation, useNavigate} from "react-router";
import {Icon} from "@iconify/react";
import ReactSwitch from "react-switch";
import useThemeContext from "../../context/themeContext/hook";
import useAuthStore from "../../stores/store";
import {Button} from "../ui/button";

interface IProps {
}

function Layout(props: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {token} = useAuthStore();
  const {isDarkMode, toggleDarkMode} = useThemeContext();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!token) {
      navigate("/login", {replace: true});
    }
  }, [token, navigate]);

  return (
    <div className="grid lg:grid-cols-[minmax(0,250px)_minmax(0,1fr)]">
      <div>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
      <main>
        <div className="flex justify-between items-center py-5 pl-5">
          <Button
            data-testid="sidebar-toggle-button"
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="inline-flex lg:hidden"
          >
            <Icon icon="proicons:menu" width={32} height={32}/>
          </Button>

          <div className="px-5 ml-auto relative z-[1]">
            <ReactSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              checkedIcon={
                <div className="h-full w-full flex items-center justify-center">
                  <Icon icon="tabler:sun-filled" width={16} height={16}/>
                </div>
              }
              uncheckedIcon={
                <div className="h-full w-full flex items-center justify-center">
                  <Icon icon="solar:moon-bold-duotone" width={16} height={16}/>
                </div>
              }
            />
          </div>
        </div>
        <Outlet/>
      </main>
    </div>
  )
    ;
}

export default Layout;
