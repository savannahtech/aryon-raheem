import React, {createContext, useState} from 'react';
import {IFilterContext} from "./types";

export const FilterContext = createContext<IFilterContext>({
  checked: [],
  setChecked() {
  }
});

interface IProps {
  children: React.ReactNode
}

function FilterContextProvider({children}: IProps) {
  const [checked, setChecked] = useState<string[]>([])

  return (
    <FilterContext.Provider value={{checked, setChecked}}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContextProvider;
