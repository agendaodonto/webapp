import { RequestOptions, URLSearchParams } from '@angular/http';

import { environment } from '../../../environments/environment';

export abstract class BaseService {
    static BASE_URL = environment.api;
    static API_URL = 'v1/';
    static API_AUTH_URL = BaseService.BASE_URL + 'auth/';

    url(blocks: Array<string | number>): string {
        let final = BaseService.BASE_URL + BaseService.API_URL;
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

    getFilter(): RequestOptions {
        const params = new URLSearchParams();
        this.fields.forEach(field => {
            if (field.value !== null) {
                params.set(field.mapsTo, field.value);
            }
        });
        const options = new RequestOptions();
        options.params = params;
        return options;
    }
}
