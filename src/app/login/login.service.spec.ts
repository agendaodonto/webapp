import { AuthHttp, AuthHttpStub } from 'app/shared/auth_http';
import { Http, RequestOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { MockBackend } from '@angular/http/testing';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Http, useValue: new Http(new MockBackend(), new RequestOptions()) },
        { provide: AuthHttp, useClass: AuthHttpStub },
        LoginService
      ]

    });
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
