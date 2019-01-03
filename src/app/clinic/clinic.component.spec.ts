import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ClinicComponent } from './clinic.component';
import { ClinicService } from './clinic.service';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClinicComponent', () => {
    let component: ClinicComponent;
    let fixture: ComponentFixture<ClinicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialAppModule,
                NgxDatatableModule,
                DataTablePagerModule,
                NoopAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            declarations: [ClinicComponent],
            providers: [
                ClinicService
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClinicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
