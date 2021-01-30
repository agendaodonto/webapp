import { PageEvent } from '@angular/material';
import { createAction, props } from '@ngrx/store';
import { IPagedResponse } from 'src/app/shared/interceptors/responses';

import { IClinicResponse } from '../../../shared/interfaces/services/clinic.model';
import { TransactionTypeDomain } from '../../shared/models/transaction-type.domain';

export const loadTransactionTypes = createAction('[TransactionType] Load Transaction Types', props<{ clinic: IClinicResponse }>());
export const loadTransactionTypesSuccess = createAction('[TransactionType] Load Transaction Types Success',
    props<{ transactionTypes: IPagedResponse<TransactionTypeDomain> }>(),
);
export const loadTransactionTypesError = createAction('[TransactionType] Load Transaction Types Error');
export const transactionTypesPageChanged = createAction('[TransactionType] Page changed', props<{ event: PageEvent }>());

export const loadTransactionTypeDetail = createAction('[TransactionType] Load detail', props<{ transactionTypeId: number }>());
export const loadTransactionTypeDetailSuccess = createAction('[TransactionType] Load detail success', props<{ transactionType: TransactionTypeDomain }>());
export const loadTransactionTypeDetailError = createAction('[TransactionType] Load detail error');
export const saveTransactionType = createAction('[TransactionType] Save', props<{ transactionType: TransactionTypeDomain }>());
export const deleteTransactionType = createAction('[TransactionType] Delete', props<{ transactionType: TransactionTypeDomain }>());
export const crudTransactionTypeSuccess = createAction('[TransactionType] Crud operation Success');
export const crudTransactionTypeError = createAction('[TransactionType] Crud operation Error');