import { IPagedResponse } from '../../interceptors/responses';

export interface IDatabase<T> {
    get(): T;
    getMany(qty: number): T[];
}

export abstract class BaseDatabase<T> implements IDatabase<T> {
    abstract get(): T;
    abstract getMany(qty: number): T[];

    getAsResponse(count: number): IPagedResponse<T> {
        return {
            count,
            results: this.getMany(count),
        };
    }
}
