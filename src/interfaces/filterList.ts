export interface FilterList {
  id: number;
  label: string;
  type: string;
  value: {
    id: number;
    name: string;
    checked: boolean;
  }[];
}
