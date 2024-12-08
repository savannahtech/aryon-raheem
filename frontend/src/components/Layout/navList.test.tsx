import React from "react";
import {render, screen} from "@testing-library/react";
import NavList from "./navlist";
import {MemoryRouter} from "react-router";

const mockItems = [
  {title: "Home", icon: "icon-home", href: "/"},
  {title: "Profile", icon: "icon-profile", href: "/profile"},
];

describe("NavList Component", () => {
  it("renders a list of navigation items", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavList items={mockItems}/>
      </MemoryRouter>
    );

    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
});
