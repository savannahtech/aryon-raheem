import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Sidebar from "./sidebar";
import useAuthStore from "../../stores/store";

jest.mock("../../stores/store");

// @ts-ignore
const mockUseAuthStore = useAuthStore as jest.Mock;

describe("Sidebar Component", () => {
  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({
      logout: jest.fn(),
    });
  });

  it("renders the sidebar with navigation items and profile section", () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} setIsOpen={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Raheem Adebayo")).toBeInTheDocument();
  });

  it("closes the sidebar when the close button is clicked", () => {
    const setIsOpen = jest.fn();
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} setIsOpen={setIsOpen} />
      </MemoryRouter>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
