export default interface PaginationData<T> {
    pageSize: number,
    currentPage: number,
    totalItems: number,
    totalPages: number,
    prevPage: number,
    nextPage: number,
    records: T[],
}
