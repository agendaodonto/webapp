import { MaterialAppModule } from '../material.app.module';
import { NgModule } from '@angular/core';
import { ScheduleStatusComponent } from 'app/shared/components/schedule-status/schedule-status.component';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from 'app/shared/components/loading-overlay/loading-overlay.component';

@NgModule({
    imports: [CommonModule, MaterialAppModule],
    declarations: [ScheduleStatusComponent, LoadingOverlayComponent],
    exports: [ScheduleStatusComponent, LoadingOverlayComponent],
    providers: []
})
export class SharedComponentsModule {

}
