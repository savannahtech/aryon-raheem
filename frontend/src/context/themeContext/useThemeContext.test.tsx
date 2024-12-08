import {act, renderHook} from "@testing-library/react";
import {ThemeContext} from "./";
import useThemeContext from "./hook";

describe("useThemeContext", () => {
  test("provides access to isDarkMode and toggleDarkMode", () => {
    const mockSetDarkMode = jest.fn();
    const wrapper = ({children}: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={{isDarkMode: false, setDarkMode: mockSetDarkMode}}>
        {children}
      </ThemeContext.Provider>
    );

    const {result} = renderHook(() => useThemeContext(), {wrapper});

    expect(result.current.isDarkMode).toBe(false);

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(mockSetDarkMode).toHaveBeenCalledTimes(1);
    expect(mockSetDarkMode).toHaveBeenCalledWith(expect.any(Function));

    act(() => {
      const [stateUpdater] = mockSetDarkMode.mock.calls[0];
      const newState = stateUpdater(false);
      expect(newState).toBe(true);
    });
  });
});
