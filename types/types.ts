export enum SortOrder {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  DATE_ASC = "date_asc",
  DATE_DESC = "date_desc",
}

export interface SortAction {
  type: SortOrder;
}