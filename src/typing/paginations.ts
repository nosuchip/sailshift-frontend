export interface Pagination {
  page?: number;
  pageSize?: number;
  filterColumn?: string;
  filterValue?: string;
  sortColumn?: string;
  sortValue?: string;
}

export interface PaginatedResponse {
  page: number;
  pages: number;
  total: number
}

export interface PaginatedApiResult<T> {
  pagination: PaginatedResponse;
  data: T[]
}
