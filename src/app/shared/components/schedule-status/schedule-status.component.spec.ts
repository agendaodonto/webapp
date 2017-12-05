import { CommonModule } from '@angular/common';
import { ScheduleStatusComponent } from './schedule-status.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MaterialAppModule } from 'app/shared/material.app.module';


describe('ScheduleStatusComponent', () => {
    let component: ScheduleStatusComponent;
    let fixture: ComponentFixture<ScheduleStatusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, MaterialAppModule]
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
