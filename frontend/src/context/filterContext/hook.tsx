import {useContext} from 'react';
import {FilterContext} from "./index";

function useFilterContext() {
  const {checked, setChecked} = useContext(FilterContext);

  return ({tags: checked, setTags: setChecked})
}

export default useFilterContext;
