import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from 'app/shared/testing/stubs/router.stub';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DirectivesModule } from 'app/shared/directives/directives.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MaterialAppModule } from 'app/shared/material.app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleListComponent } from './schedule-list.component';
import { ScheduleService } from 'app/schedule/schedule.service';
import { ScheduleServiceStub } from 'app/shared/testing/stubs/schedule.stub';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

describe('ScheduleListComponent', () => {
    let component: ScheduleListComponent;
    let fixture: ComponentFixture<ScheduleListComponent>;
    const route = new ActivatedRouteStub()

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
