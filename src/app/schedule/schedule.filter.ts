import { BaseFilter } from '../shared/services/base.filter';

export class ScheduleFilter extends BaseFilter {
    constructor() {
        super();
        this.fields.push(
            { name: 'startDate', mapsTo: 'date_0', value: null, type: 'filter' },
            { name: 'endDate', mapsTo: 'date_1', value: null, type: 'filter' },
            { name: 'status', mapsTo: 'status', value: null, type: 'filter' },
        );
        this.setFilterValue('orderBy', 'date');
    }
}
