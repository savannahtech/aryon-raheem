import React, {useMemo, useState} from 'react';
import {AvailableTags} from "../../types";
import recommendationService from "../../services/recommendation.service";
import useFilterContext from "../../context/filterContext/hook";
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";
import {Checkbox} from "../../components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import {useQuery} from "@tanstack/react-query";


interface IProps {
}

function FilterTags(props: IProps) {
  const [search, setSearch] = useState("");
  const {tags: checked, setTags: setChecked} = useFilterContext();

  const {data: availableTags, isError} = useQuery({
    queryKey: ["availableTags"],
    queryFn: () => recommendationService.getRecommendations({limit: 0}),
    refetchOnWindowFocus: false,
    retry: 1,
  });


  const filteredAvailableTags: AvailableTags | undefined = useMemo(() => {
    if (!!availableTags) {
      if (search.length === 0) {
        return availableTags.availableTags
      } else {
        const filterValues = (values: string[]) =>
          values.filter((value) =>
            value.toLowerCase().includes(search.toLowerCase())
          );

        return {
          classes: filterValues(availableTags?.availableTags?.classes ?? []),
          frameworks: filterValues(availableTags?.availableTags?.frameworks ?? []),
          providers: filterValues(availableTags?.availableTags?.providers ?? []),
          reasons: filterValues(availableTags?.availableTags?.reasons ?? []),
        };
      }
    }
    return undefined;
  }, [availableTags, search])

  const toggleCheck = (tag: string) => {
    if (checked.includes(tag)) {
      setChecked(prev => prev.filter(t => t !== tag));
    } else {
      setChecked(prev => [...prev, tag])
    }
  }

  return (
    <div>
      <p className="small">Filter ({checked.length} applied)</p>
      <div className="my-2">
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search tags'
        />
      </div>

      {
        isError ? (
          <div>
            <p>Unable to fetch available tags</p>
          </div>
        ) : !!filteredAvailableTags ? (
            <div className="max-h-60 overflow-y-auto">
              <Accordion
                type="multiple"
                defaultValue={Object.keys(filteredAvailableTags).map(t => `entry-${t}`)}
              >
                {Object.entries(filteredAvailableTags).map((entry: [string, string[]]) => (
                  <AccordionItem key={`entry-${entry[0]}`} value={`entry-${entry[0]}`}>
                    <AccordionTrigger
                      className="capitalize p"
                    >
                      {entry[0]} ({entry[1].length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2">
                        {
                          entry[1].map((tag, index) => (
                            <div key={`tag-${entry[0]}-${index}`} data-testid={tag}
                                 className="flex items-center space-x-2">
                              <Checkbox
                                data-testid={`tag-${entry[0]}-${index}`}
                                id={`tag-${entry[0]}-${index}`}
                                checked={checked.includes(tag)}
                                onCheckedChange={() => toggleCheck(tag)}
                              />
                              <label
                                htmlFor={`tag-${entry[0]}-${index}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {tag}
                              </label>
                            </div>
                          ))
                        }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
          :
          (
            <p>No tags</p>
          )
      }
      <hr className="my-2"/>
      <Button
        className="w-full"
        variant="ghost"
        onClick={() => {
          setChecked([]);
          setSearch("");
        }}
      >
        Clear filters
      </Button>
    </div>
  );
}

export default FilterTags;
