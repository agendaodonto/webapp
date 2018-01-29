import { AuthHttp, AuthHttpStub } from 'app/shared/auth_http';
import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AuthHttp, useClass: AuthHttpStub },
                LoginService
            ]

        });
    });

    it('should ...', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));
});
