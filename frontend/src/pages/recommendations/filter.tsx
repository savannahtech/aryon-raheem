import React, {useEffect, useState} from 'react';
import FilterTags from "./filterTags";
import {Input} from "../../components/ui/input";
import {Popover, PopoverContent, PopoverTrigger,} from "../../components/ui/popover"
import {Button} from "../../components/ui/button";
import useFilterContext from "../../context/filterContext/hook";


interface IProps {
  setDebouncedTerm: (e: string) => void
}

function RecommendationsFilter({setDebouncedTerm}: IProps) {
  const [search, setSearch] = useState("");
  const {tags} = useFilterContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(search);
    }, 3000);

    return () => clearTimeout(timer);
  }, [search, setDebouncedTerm]);

  return (
    <div className="flex-1 flex gap-4 items-center">
      <div className="w-full max-w-sm">
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" className="relative">
              Filter
              {tags.length > 0 && (
                <div
                  data-testid="filter-indicator"
                  className="w-4 h-4 rounded-full absolute -top-1 -right-1 bg-red-500 border-2 border-background"
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent><FilterTags/></PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default RecommendationsFilter;
