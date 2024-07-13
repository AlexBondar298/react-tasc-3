export interface TableHeadProps {
  date: string;
  name: string;
  id: string;
  type: string;
  customer: string;
  supplier: string;
  completed: string;
  status: string;

  edit: string;
}

export interface TableBodyProps {
  date: string;
  name: string | null;
  id: string;
  type: string;
  customer: string;
  supplier: string;
  completed: string;
  status: string;

  position: string;
  email: string;
  telephone: number | string;
  notes: string;
  edit?: boolean;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface TableProps {
  tableData: TableBodyProps[];
  status: Status;
}

export interface AddOrderArgs {
  data: TableBodyProps;
  table: {
    tableData: TableBodyProps[];
    status: string;
  };
}
