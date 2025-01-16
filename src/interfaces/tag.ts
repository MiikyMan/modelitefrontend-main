export interface ITag {
  id: number;
  tagGroupId: number;
  label: string;
  imageUrl: string;
}

export interface ITagGroup {
  id: number;
  label: string;
  show: boolean;
  tag: ITag[];
}
