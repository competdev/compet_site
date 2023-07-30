export enum SortOrder {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  DATE_ASC = "date_asc",
  DATE_DESC = "date_desc",
}

export interface SortAction {
  type: SortOrder;
}
export interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  thumb:string;
  members: Member[];
  tutors: Tutor[];
  partners?: Partner[];
}
type Partner = {
  id: string;
  name: string;
  email: string;
  imgUrl: string;
  url: string;
}
type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
  urlImg: string;
  statement:string
}
type Tutor = {
  id: string;
  name: string;
  email: string;
  linkedin: string;
  resume: string;
  urlImg: string;
}