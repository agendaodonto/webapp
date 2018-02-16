import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';

export abstract class BaseService {
    static BASE_URL = environment.api;
    static API_VERSION = 'v1/';
    static API_ENDPOINT = BaseService.BASE_URL + BaseService.API_VERSION;
    static API_AUTH_URL = BaseService.BASE_URL + 'auth/';

    url(blocks: Array<string | number>): string {
        let final = BaseService.API_ENDPOINT
        blocks.forEach(u => {
            final = final.concat(String(u) + '/');
        });

        return final;
    }
}

type fieldType = 'filter' | 'other';

export interface IFilterField {
    mapsTo: string;
    value: string;
    name: string;
    type: fieldType;
}

export abstract class BaseFilter {
    fields: IFilterField[] = [
        { name: 'offset', mapsTo: 'offset', value: '0', type: 'other' },
        { name: 'pageSize', mapsTo: 'limit', value: '10', type: 'other' },
        { name: 'orderBy', mapsTo: 'ordering', value: 'id', type: 'other' }
    ]

    setFilterValue(filterName: string, value: string, clearPrevious = false) {
        const filterIndex = this.fields.findIndex(e => e.name === filterName);
        if (clearPrevious) {
            this.fields.filter(field => field.type === 'filter').map(field => field.value = null)
        }
        if (filterIndex === -1) {
            console.error('You are setting a unexisting field:', filterName)
            return;
        }
        this.fields[filterIndex].value = value;
    }

    getFilter(): { params: HttpParams } {
        let params = new HttpParams();
        this.fields.forEach(field => {
            if (field.value !== null && field.value !== undefined) {
                params = params.set(field.mapsTo, field.value);
            }
        });
        return { params: params };
    }

    reset() {
        this.fields
            .filter((field) => field.type === 'filter')
            .forEach((field) => field.value = '')
    }
}
