import React from 'react';
import NavItem from "./navItem";
import {INavItem} from "../../types";

interface IProps {
  items: INavItem[]
}

function NavList({items}: IProps) {
  return (
    <ul className="grid gap-1">
      {
        items.map((navItem, index) => (
          <NavItem key={`navItem-${index}`} {...navItem} />
        ))
      }
    </ul>
  );
}

export default NavList;
