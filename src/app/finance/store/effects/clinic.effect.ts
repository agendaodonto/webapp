import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClinicService } from 'src/app/clinic/clinic.service';

import { loadClinics, loadClinicsError, loadClinicsSuccess } from '../actions/clinic.action';

@Injectable()
export class ClinicEffects {

    constructor(
        private readonly action$: Actions,
        private readonly clinicService: ClinicService,
    ) { }

    loadClinics$ = createEffect(() => this.action$.pipe(
        ofType(loadClinics),
        switchMap(() => {
            return this.clinicService.getAll().pipe(
                map(clinics => loadClinicsSuccess({ clinics: clinics.results })),
                catchError(() => of(loadClinicsError()),
                ));
        }),
    ));
}
