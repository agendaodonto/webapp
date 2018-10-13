import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ClinicComponent } from './clinic.component';
import { ClinicService } from './clinic.service';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { Router } from '@angular/router';
import { RouterLinkStubDirective, RouterStub } from '../shared/testing/stubs/router.stub';
import { ClinicServiceStub } from '../shared/testing/stubs/clinic.stub';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('ClinicComponent', () => {
    let component: ClinicComponent;
    let fixture: ComponentFixture<ClinicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialAppModule, NgxDatatableModule, DataTablePagerModule, NoopAnimationsModule],
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
