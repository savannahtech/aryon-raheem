import {Icon} from '@iconify/react';
import React, {useMemo} from 'react';
import {Link, useLocation} from "react-router";
import {INavItem} from "../../types";

interface IProps extends INavItem {
  active?: boolean;
}

function NavItem({title, href = "#", icon, onClick}: IProps) {
  const {pathname} = useLocation();

  const active = useMemo(() => pathname === href || (href !== "/" && pathname.startsWith(href)),
    [pathname, href]);

  return (
    <li>
      <Link
        to={href}
        onClick={(e) => {
          if (!!onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        className={`flex gap-2 items-center p-2 rounded-md ${active ?
          "bg-primary-100 dark:bg-primary-600 text-primary dark:text-primary-50" :
          `text-slate-600 dark:text-primary-300 hover:bg-primary-100 hover:text-primary dark:hover:bg-primary-800 dark:hover:text-primary-300`}`}
      >
        <Icon icon={icon} width={22} height={22}/>
        <p>{title}</p>
      </Link>
    </li>
  )
    ;
}

export default NavItem;
