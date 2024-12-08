import React, {createContext, useEffect, useState} from 'react';
import {IThemeContext} from "./types";

export const ThemeContext = createContext<IThemeContext>({
  isDarkMode: false,
  setDarkMode: () => {
  }
});

interface IProps {
  children: React.ReactNode
}

function ThemeContextProvider({children}: IProps) {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (!!darkMode) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("html")?.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.querySelector("html")?.classList.remove("dark");
      localStorage.removeItem("darkMode");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{isDarkMode, setDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
