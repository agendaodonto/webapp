import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAppModule } from '../../material.app.module';
import { ScheduleStatusComponent } from './schedule-status.component';

describe('Schedule Status Component', () => {
    let component: ScheduleStatusComponent;
    let fixture: ComponentFixture<ScheduleStatusComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialAppModule],
            declarations: [ScheduleStatusComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
