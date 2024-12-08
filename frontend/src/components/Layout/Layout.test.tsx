import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router";
import useAuthStore from "../../stores/store";
import useThemeContext from "../../context/themeContext/hook";
import Layout from "./";

jest.mock("../../stores/store");
jest.mock("../../context/themeContext/hook");

// @ts-ignore
const mockUseAuthStore = useAuthStore as jest.Mock;
const mockUseThemeContext = useThemeContext as jest.Mock;

describe("Layout Component", () => {
  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({token: "mock-token"});
    mockUseThemeContext.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    });
  });

  it("renders the Layout component and children when authenticated", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="" element={<div>Child Content</div>}/>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-toggle-button")).toBeInTheDocument();
  });
});
