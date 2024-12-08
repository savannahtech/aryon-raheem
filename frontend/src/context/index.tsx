import React from 'react';
import FilterContextProvider from "./filterContext";
import ThemeContextProvider from "./themeContext";

interface IProps {
  children: React.ReactNode;
}

function Providers({children}: IProps) {
  return (
    <ThemeContextProvider>
      <FilterContextProvider>
        {children}
      </FilterContextProvider>
    </ThemeContextProvider>
  );
}

export default Providers;
