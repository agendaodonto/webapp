import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialAppModule } from '../material.app.module';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { NotificationStatusComponent } from './notification-status/notification-status.component';
import { ScheduleStatusComponent } from './schedule-status/schedule-status.component';

@NgModule({
    imports: [CommonModule, MaterialAppModule],
    declarations: [ScheduleStatusComponent, LoadingOverlayComponent, NotificationStatusComponent],
    exports: [ScheduleStatusComponent, LoadingOverlayComponent, NotificationStatusComponent],
    providers: [],
})
export class SharedComponentsModule {

}
