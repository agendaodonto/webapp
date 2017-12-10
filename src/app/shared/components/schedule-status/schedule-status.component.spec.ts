import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MaterialAppModule } from 'app/shared/material.app.module';
import { ScheduleStatusComponent } from './schedule-status.component';

describe('Schedule Status Component', () => {
    let component: ScheduleStatusComponent;
    let fixture: ComponentFixture<ScheduleStatusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialAppModule],
            declarations: [ScheduleStatusComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
