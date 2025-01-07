export default interface PaginationData<T> {
    pageSize: number,
    currentPage: number,
    totalRecords: number,
    records: T[],
}
