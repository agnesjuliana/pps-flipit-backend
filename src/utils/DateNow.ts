import moment from 'moment-timezone';

const JAKARTA_TIMEZONE = 'Asia/Jakarta';

export function getCurrentDateInJakarta(): Date {
  // Get the current date and time in Jakarta timezone
  const jakartaDate = moment.tz(JAKARTA_TIMEZONE);

  // Format the date to 'YYYY-MM-DD' to get only the date part
  const formattedDate = jakartaDate.format('YYYY-MM-DD');

  return new Date(formattedDate);
}

export function getYesterdayInJakarta(): Date {
  // Get the current date in Jakarta timezone
  const jakartaDate = moment.tz(JAKARTA_TIMEZONE);

  // Subtract one day to get yesterday's date
  const yesterday = jakartaDate.clone().subtract(1, 'days');

  // Format the date to 'YYYY-MM-DD' to get only the date part
  const formattedDate = yesterday.format('YYYY-MM-DD');

  return new Date(formattedDate);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface IWeekDaysMap {
  day: string;
  isStreak: boolean;
}

export const weekDays: IWeekDaysMap[] = [
  { day: 'Sunday', isStreak: false },
  { day: 'Monday', isStreak: false },
  { day: 'Tuesday', isStreak: false },
  { day: 'Wednesday', isStreak: false },
  { day: 'Thursday', isStreak: false },
  { day: 'Friday', isStreak: false },
  { day: 'Saturday', isStreak: false },
];

export function mapDatesToWeekDays(dates: Date[]): IWeekDaysMap[] {
  // Initialize the result with all days set to false

  for (const date of dates) {
    const dayOfWeek = moment.tz(date, JAKARTA_TIMEZONE).format('dddd');
    const index = weekDays.findIndex(day => day.day === dayOfWeek);
    if (index !== -1) {
      weekDays[index].isStreak = true;
    }
  }

  return weekDays;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface IDaysMap {
  day: number;
  isStreak: boolean;
}

const daysInMonth = moment().daysInMonth();
export const days: IDaysMap[] = [];

for (let day = 1; day <= daysInMonth; day++) {
  days.push({ day, isStreak: false });
}

export function mapDatesToMonthDays(dates: Date[]): IDaysMap[] {
  // Update the map based on the provided dates
  for (const date of dates) {
    const day = moment.tz(date, JAKARTA_TIMEZONE).date();
    const index = days.findIndex(dayMap => dayMap.day === day);
    if (index !== -1) {
      days[index].isStreak = true;
    }
  }

  return days;
}
