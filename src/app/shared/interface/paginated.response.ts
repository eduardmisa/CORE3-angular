export  interface PaginatedResponse<T> {
    total: number,
    pageSize: number,
    pageNumber: number,
    results: T[]
}