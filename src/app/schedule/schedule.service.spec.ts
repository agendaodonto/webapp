import { TestBed, inject } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ScheduleService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ScheduleService],
        });
    });

    it('should ...', inject([ScheduleService], (service: ScheduleService) => {
        expect(service).toBeTruthy();
    }));
});
