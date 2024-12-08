export interface IFilterContext {
  checked: string[];
  setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}