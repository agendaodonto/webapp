import { MaterialAppModule } from '../material.app.module';
import { NgModule } from '@angular/core';
import { ScheduleStatusComponent } from 'app/shared/components/schedule-status/schedule-status.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, MaterialAppModule],
    declarations: [ScheduleStatusComponent],
    exports: [ScheduleStatusComponent],
    providers: []
})
export class SharedComponentsModule {

}
