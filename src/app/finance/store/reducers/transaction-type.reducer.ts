import { act } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';

import { ITransactionTypeState } from '../../shared/models/transaction-type.state';
import { clinicSelected, loadClinics, loadClinicsError, loadClinicsSuccess, loadTransactionTypesSuccess } from '../actions/transaction-type.actions';

const initialState: ITransactionTypeState = {
    clinic: {
        all: [],
        empty: false,
        error: false,
        loading: false,
    },
    transactionTypes: {
        all: [],
        count: 0,
        empty: false,
        error: false,
        loading: false,
    },
};

export const transactionTypeReducer = createReducer(initialState,
    on(loadClinics, (state) => {
        return { ...state, clinic: { loading: true, empty: false, error: false, all: [] } };
    }),
    on(loadClinicsSuccess, (state, action) => {
        return { ...state, clinic: { ...state.clinic, all: action.clinics, empty: action.clinics.length === 0, error: false, loading: false } };
    }),
    on(loadClinicsError, (state) => {
        return { ...state, error: true, clinics: [], empty: false };
    }),
    on(clinicSelected, (state, action) => {
        return { ...state, clinic: { ...state.clinic, selected: action.clinic }, transactionTypes: { ...state.transactionTypes, loading: true } };
    }),
    on(loadTransactionTypesSuccess, (state, action) => {
        return {
            ...state,
            transactionTypes: {
                all: action.transactionTypes.results,
                count: action.transactionTypes.count,
                error: false,
                empty: action.transactionTypes.count === 0,
                loading: false,
            },
        };
    }),
);
