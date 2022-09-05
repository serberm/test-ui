import { DateTime } from 'luxon';

export const GLOBAL_DATE_FORMAT = 'dd-MMM-yyyy';

export const formatAndDisplayDate = (date: string) => {
    return date ? DateTime.fromISO(date).toFormat(GLOBAL_DATE_FORMAT) : '';
};
