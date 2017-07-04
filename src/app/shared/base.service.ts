import {environment} from '../../environments/environment';

export class BaseService {
    static BASE_URL = environment.api;
    static API_URL = 'v1/';
    static API_AUTH_URL = BaseService.BASE_URL + 'auth/';
}
