import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAppModule } from '../../material.app.module';
import { NotificationStatusComponent } from './notification-status.component';

describe('Notification Status Component', () => {
    let component: NotificationStatusComponent;
    let fixture: ComponentFixture<NotificationStatusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialAppModule],
            declarations: [NotificationStatusComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
