export interface UsersData {
  list: User[];
  pagination: Pagination;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
}

export interface Pagination {
  current: number;
  nextPage: number;
  pageSize: number;
  prevousPage: number;
  total: number;
}
