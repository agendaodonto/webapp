import { IPagedResponse } from '../../../shared/interceptors/responses';
import { IEditableTransactionState } from './editable-transaction.state';

export interface ITransactionState {
    empty: boolean;
    error: boolean;
    loading: boolean;
    all: IPagedResponse<IEditableTransactionState>;
}
