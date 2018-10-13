import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleListComponent } from './schedule-list.component';
import { ActivatedRouteStub, RouterStub } from '../shared/testing/stubs/router.stub';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { ScheduleService } from './schedule.service';
import { ScheduleServiceStub } from '../shared/testing/stubs/schedule.stub';

describe('ScheduleListComponent', () => {
    let component: ScheduleListComponent;
    let fixture: ComponentFixture<ScheduleListComponent>;
    const route = new ActivatedRouteStub();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                DirectivesModule,
                ReactiveFormsModule,
                MaterialAppModule,
                SharedComponentsModule,
                NoopAnimationsModule,
                MatMomentDateModule
            ],
            declarations: [ScheduleListComponent],
            providers: [
                { provide: ScheduleService, useClass: ScheduleServiceStub },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useValue: route }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        route.testQueryParams = {};
        fixture = TestBed.createComponent(ScheduleListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
