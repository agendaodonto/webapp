import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterLinkStubDirective, RouterStub } from 'app/shared/testing/stubs/router.stub';

import { ClinicComponent } from './clinic.component';
import { ClinicService } from './clinic.service';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { HttpModule } from '@angular/http';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ClinicServiceStub } from 'app/shared/testing/stubs/clinic.stub';

describe('ClinicComponent', () => {
    let component: ClinicComponent;
    let fixture: ComponentFixture<ClinicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialAppModule, NgxDatatableModule, DataTablePagerModule],
            declarations: [ClinicComponent, RouterLinkStubDirective],
            providers: [
                { provide: ClinicService, useClass: ClinicServiceStub },
                { provide: Router, useClass: RouterStub },
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
