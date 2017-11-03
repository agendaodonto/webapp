import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ConnectionBackend, Http, HttpModule } from '@angular/http';

import { DashboardComponent } from './dashboard.component';
import { DataTablePagerModule } from '../shared/components/pager/datatable-pager.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ScheduleService } from '../schedule/schedule.service';
import { ScheduleServiceStub } from 'app/shared/testing/stubs/schedule.stub';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialAppModule, NgxDatatableModule, DataTablePagerModule, DirectivesModule],
            declarations: [DashboardComponent],
            providers: [
                { provide: ScheduleService, useClass: ScheduleServiceStub }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
