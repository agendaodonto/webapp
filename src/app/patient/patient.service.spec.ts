import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { CLINICS } from '../clinic/clinic.service.spec';
import { ScheduleFilter } from '../schedule/schedule.filter';
import { BaseService } from '../shared/services/base.service';
import { PatientFilter } from './patient.filter';
import { IPatient, PatientService } from './patient.service';

export const PATIENTS: IPatient[] = [
    { id: 1, name: 'John', last_name: 'Doe', phone: '1234', sex: 'M', clinic: CLINICS[0] },
];

describe('PatientService', () => {
    let injector: TestBed;
    let service: PatientService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PatientService],
        });
        injector = getTestBed();
        service = injector.get(PatientService);
        httpMock = injector.get(HttpTestingController);
    });

    it('should inject the service', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should get all patients', () => {
        service.getAll().subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/?offset=0&limit=10&ordering=name`);
        expect(request.request.method).toBe('GET');
    });

    it('should get all patients with filter', () => {
        const filter = new PatientFilter();
        filter.setFilterValue('fullName', 'Juca');
        service.getAll(filter).subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/?offset=0&limit=10&ordering=name&full_name=Juca`);
        expect(request.request.method).toBe('GET');
    });

    it('should get patient details', () => {
        service.get(1).subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/1/`);
        expect(request.request.method).toBe('GET');
    });

    it('should create a patient', () => {
        service.create(PATIENTS[0]).subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/`);
        expect(request.request.method).toBe('POST');
    });

    it('should update a patient', () => {
        const patient = PATIENTS[0];
        service.update(patient).subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/${patient.id}/`);
        expect(request.request.method).toBe('PUT');
    });

    it('should remove a patient', () => {
        const patient = PATIENTS[0];
        service.remove(patient).subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/${patient.id}/`);
        expect(request.request.method).toBe('DELETE');
    });

    it('should count the patients', () => {
        service.count().subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/?offset=0&limit=1&ordering=name`);
        expect(request.request.method).toBe('GET');
        request.flush({ count: 20 });
    });

    it('should get the patient schedules', () => {
        const patient = Object.assign({}, PATIENTS[0]);
        service.getSchedules(patient.id).subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/${patient.id}/schedules/?offset=0&limit=10&ordering=date`);
        expect(request.request.method).toBe('GET');
    });

    it('should get the patient schedules based on the filter', () => {
        const patient = Object.assign({}, PATIENTS[0]);
        const filter = new ScheduleFilter();
        filter.setFilterValue('orderBy', '-date');
        service.getSchedules(patient.id, filter).subscribe();
        const request = httpMock.expectOne(`${BaseService.API_ENDPOINT}patients/${patient.id}/schedules/?offset=0&limit=10&ordering=-date`);
        expect(request.request.method).toBe('GET');
    });

    it('should create a patient when saving without id', () => {
        const patient = Object.assign({}, PATIENTS[0]);
        delete patient.id;
        spyOn(service, 'create');
        spyOn(service, 'update');
        service.save(patient);
        expect(service.create).toHaveBeenCalled();
        expect(service.update).toHaveBeenCalledTimes(0);
    });

    it('should update a patient when saving with id', () => {
        const patient = PATIENTS[0];
        spyOn(service, 'create');
        spyOn(service, 'update');
        service.save(patient);
        expect(service.update).toHaveBeenCalled();
        expect(service.create).toHaveBeenCalledTimes(0);
    });

});
