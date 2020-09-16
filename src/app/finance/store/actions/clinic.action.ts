import { createAction, props } from '@ngrx/store';

import { IClinicResponse } from '../../../shared/interfaces/services/clinic.model';

export const loadClinics = createAction('[Finance] Load Clinics');
export const loadClinicsSuccess = createAction('[Finance] Load Clinics Success', props<{ clinics: IClinicResponse[] }>());
export const loadClinicsError = createAction('[Finance] Load Clinics Error');
export const clinicSelected = createAction('[Finance] Clinic Selected', props<{ clinic: IClinicResponse }>());
