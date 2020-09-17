import { createReducer, on } from '@ngrx/store';
import { ITransactionState } from '../../shared/models/transaction.state';
import { loadTransactions, loadTransactionsError, loadTransactionsSuccess } from '../actions/transaction.action';

const initialState: ITransactionState = {
    all: {
        count: 0,
        results: [],
    },
    empty: false,
    error: false,
    loading: true,
};

const _transactionReducer = createReducer({ ...initialState },
    on(loadTransactions, (state) => {
        return { ...state, loading: true, error: false };
    }),
    on(loadTransactionsError, (state) => {
        return { ...state, error: true, loading: false, empty: false };
    }),
    on(loadTransactionsSuccess, (_, action) => {
        return { all: action.transactions, empty: action.transactions.count === 0, error: false, loading: false };
    }),
);

export function transactionReducer(state, action) {
    return _transactionReducer(state, action);
}
