import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import * as dayjslib from 'dayjs';

dayjslib.extend(timezone);
dayjslib.extend(utc);
dayjslib.tz.setDefault('America/Araguaina');

export const dayjs = (
  date?: string | number | dayjslib.Dayjs | Date,
  timezone?: string,
): dayjslib.Dayjs => {
  return dayjslib.tz(date, timezone);
};
