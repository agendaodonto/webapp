export interface IDatabase<T> {
    get(): T;
    getMany(qty: number): T[];
}
