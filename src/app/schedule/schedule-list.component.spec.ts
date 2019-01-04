import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialAppModule } from '../shared/material.app.module';
import { ScheduleListComponent } from './schedule-list.component';
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
                MatMomentDateModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            declarations: [ScheduleListComponent],
            providers: [
                ScheduleService,
            ],
        }).compileComponents();
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
