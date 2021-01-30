import { IClinicResponse } from 'src/app/shared/interfaces/services/clinic.model';

export interface IClinicState {
    error: boolean;
    empty: boolean;
    loading: boolean;
    selected?: IClinicResponse;
    all: IClinicResponse[];
}
