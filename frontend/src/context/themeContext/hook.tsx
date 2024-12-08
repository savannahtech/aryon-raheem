import {useContext} from "react";
import {ThemeContext} from "./index";

function useThemeContext() {
  const {isDarkMode, setDarkMode} = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(prevState => !prevState);
  }

  return {isDarkMode, toggleDarkMode}
}

export default useThemeContext;
