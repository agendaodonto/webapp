import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleListComponent } from './schedule-list.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { ScheduleService } from './schedule.service';

describe('ScheduleListComponent', () => {
    let component: ScheduleListComponent;
    let fixture: ComponentFixture<ScheduleListComponent>;

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
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
