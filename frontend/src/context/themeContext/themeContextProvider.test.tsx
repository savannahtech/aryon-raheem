import {render, screen} from "@testing-library/react";
import ThemeContextProvider, {ThemeContext} from "./";
import userEvent from "@testing-library/user-event";

describe("ThemeContextProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.querySelector("html")?.classList.remove("dark");
  });

  test("initially sets isDarkMode to false", () => {
    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(value) => (
            <div data-testid="dark-mode-status">
              {value.isDarkMode ? "Dark Mode" : "Light Mode"}
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );
    expect(screen.getByTestId("dark-mode-status")).toHaveTextContent("Light Mode");
  });

  test("sets dark mode if localStorage has 'darkMode'", () => {
    localStorage.setItem("darkMode", "true");

    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(value) => (
            <div data-testid="dark-mode-status">
              {value.isDarkMode ? "Dark Mode" : "Light Mode"}
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );

    expect(screen.getByTestId("dark-mode-status")).toHaveTextContent("Dark Mode");
    expect(document.querySelector("html")).toHaveClass("dark");
  });

  test("toggles dark mode correctly", async () => {
    const user = userEvent.setup();

    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(value) => (
            <div>
              <div data-testid="dark-mode-status">
                {value.isDarkMode ? "Dark Mode" : "Light Mode"}
              </div>
              <button
                data-testid="toggle-dark-mode"
                onClick={() => value.setDarkMode((prev) => !prev)}
              >
                Toggle Dark Mode
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );

    expect(screen.getByTestId("dark-mode-status")).toHaveTextContent("Light Mode");
    expect(document.querySelector("html")).not.toHaveClass("dark");
    expect(localStorage.getItem("darkMode")).toBeNull();

    await user.click(screen.getByTestId("toggle-dark-mode"));

    expect(screen.getByTestId("dark-mode-status")).toHaveTextContent("Dark Mode");
    expect(document.querySelector("html")).toHaveClass("dark");
    expect(localStorage.getItem("darkMode")).toBe("true");

    await user.click(screen.getByTestId("toggle-dark-mode"));

    expect(screen.getByTestId("dark-mode-status")).toHaveTextContent("Light Mode");
    expect(document.querySelector("html")).not.toHaveClass("dark");
    expect(localStorage.getItem("darkMode")).toBeNull();
  });
});
