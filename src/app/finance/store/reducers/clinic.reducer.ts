import { createReducer, on } from '@ngrx/store';

import { IClinicState } from '../../shared/models/clinic.state';
import { clinicSelected, loadClinics, loadClinicsError, loadClinicsSuccess } from '../actions/clinic.action';

const initialState: IClinicState = {
    loading: false,
    error: false,
    empty: false,
    all: [],
};

const _clinicReducer = createReducer(initialState,
    on(loadClinics, (state) => {
        return { ...state, loading: true, empty: false, error: false, all: [] };
    }),
    on(loadClinicsSuccess, (state, action) => {
        return { ...state, all: action.clinics, empty: action.clinics.length === 0, error: false, loading: false };
    }),
    on(loadClinicsError, (state) => {
        return { ...state, all: [], error: true, empty: false, loading: false };
    }),
    on(clinicSelected, (state, action) => {
        return { ...state, selected: action.clinic };
    }),
);

export function clinicReducer(state, action) {
    return _clinicReducer(state, action);
}
