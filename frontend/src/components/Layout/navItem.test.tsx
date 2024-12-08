import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavItem from "./navItem";

describe("NavItem Component", () => {
  it("renders a nav item with the correct text and icon", () => {
    render(
      <MemoryRouter>
        <NavItem title="Home" icon="icon-home" href="/" />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  it("calls the onClick handler when clicked", () => {
    const onClick = jest.fn();
    render(
      <MemoryRouter>
        <NavItem title="Logout" icon="icon-logout" onClick={onClick} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(onClick).toHaveBeenCalled();
  });
});
