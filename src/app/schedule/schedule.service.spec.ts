import { AuthHttp, AuthHttpStub } from 'app/shared/auth_http';
import { TestBed, inject } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleService, { provide: AuthHttp, useClass: AuthHttpStub }, ],
    });
  });

  it('should ...', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
