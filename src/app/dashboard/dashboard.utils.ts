import { IAttendanceData } from 'app/schedule/schedule.service';
import * as moment from 'moment';


export function parseAttendanceData(response: IAttendanceData) {
    const parsedData = [
        { name: 'Comparecimentos', series: [] },
        { name: 'Faltas', series: [] },
        { name: 'Cancelamentos', series: [] }
    ]
    Object.keys(response)
        .sort((a, b) => moment(a) > moment(b) ? 1 : -1)
        .forEach(key => {
            parsedData[0].series.push({name: moment(key).format('MMMM/YY'), value: response[key].attendances})
            parsedData[1].series.push({name: moment(key).format('MMMM/YY'), value: response[key].absences})
            parsedData[2].series.push({name: moment(key).format('MMMM/YY'), value: response[key].cancellations})
        });
    return parsedData;
}