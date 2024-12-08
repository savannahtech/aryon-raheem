import React from "react";
import { render, screen } from "@testing-library/react";
import SidebarProfile from "./sidebarProfile";

describe("SidebarProfile Component", () => {
  it("renders the profile information correctly", () => {
    render(<SidebarProfile />);

    expect(screen.getByText("Raheem Adebayo")).toBeInTheDocument();
    expect(screen.getByText("adraheemzy@gmail.com")).toBeInTheDocument();
  });
});
