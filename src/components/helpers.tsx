import moment from "moment";
import numeral from 'numeral';

export const toDateStandardFormat: (dateTime: moment.MomentInput, includeTime?: boolean) => string = (dateTime, includeTime = false) => {
    if (!dateTime) return '-';
    return moment(dateTime).format('DD.MM.YYYY' + (includeTime ? ', h:mm:ss' : ''));
};

export const toPercentageFormat: (numberValue: number | string, precision?: number) => string = (numberValue, precision = 2) => {
    let zeros: string = '';

    for (var i = 0; i < new Array(precision).length; i++) {
        zeros += '0';
    }

    return `${numeral(Number(numberValue) * 100).format(`0,0.[${zeros}]`)}%`;
};

export const getQueryUrl = (key: string = 'id'): string => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop: string) => searchParams.get(prop),
    });
    return params[key] ?? '';
};