import { createAction, props } from '@ngrx/store';

import { IPagedResponse } from '../../../shared/interceptors/responses';
import { IEditableTransactionState } from '../../shared/models/editable-transaction.state';

export const loadTransactions = createAction('[Transaction] Load transactions', props<{ page: number, pageSize: number }>());
export const loadTransactionsSuccess = createAction('[Transaction] Load transactions success', props<{ transactions: IPagedResponse<IEditableTransactionState> }>());
export const loadTransactionsError = createAction('[Transaction] Load transactions error');
