import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ScheduleStatusComponent } from './schedule-status.component';
import { MaterialAppModule } from '../../material.app.module';

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
