export interface Pagination {
  page?: number;
  pageSize?: number;
  filterColumn?: string;
  filterValue?: string;
  sortColumn?: string;
  sortValue?: string;
}

export interface PaginatedApiResult<T> {
  pagination: Pagination;
  data: T[]
}
