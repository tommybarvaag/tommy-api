import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfISOWeek,
  endOfMonth,
  endOfYear,
  getDate,
  getWeek,
  getYear,
  isLeapYear,
  startOfISOWeek,
  startOfMonth,
  startOfYear,
  subDays
} from "date-fns";
import { enUS, nb } from "date-fns/locale";
import { isString, memoize } from "../commonUtils";
import { getFormattedDate, getFormattedDay, getFormattedLongDate } from "../dateFnsUtils";

export const getLocale = locale => {
  if (!isString(locale)) {
    return enUS;
  }

  switch (locale.toLowerCase()) {
    case "nb":
    case "nn":
    case "nb-no":
    case "nn-no":
      return nb;

    default:
      return enUS;
  }
};

export const getWeekStarsOn = locale => {
  if (!isString(locale)) {
    return 0;
  }

  switch (locale) {
    case "nb":
    case "nn":
    case "nb-no":
    case "nn-no":
      return 1;

    default:
      return 0;
  }
};

const getEaster = year => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n0 = h + l + 7 * m + 114;
  const n = Math.floor(n0 / 31) - 1;
  const p = (n0 % 31) + 1;
  return new Date(year, n, p);
};

export const getFirstDayOfYear = year => new Date(year, 0, 1);

export const yearIsLeapYear = year => isLeapYear(getFirstDayOfYear(year));

export const getAllWeeksInYear = (date, locale) => {
  const l = getLocale(locale);

  return eachWeekOfInterval(
    {
      start: startOfYear(date),
      end: endOfYear(date)
    },
    { locale: l, weekStartsOn: getWeekStarsOn(l?.code) }
  );
};

export const getAllDaysInWeek = (date, locale) =>
  eachDayOfInterval(
    {
      start: startOfISOWeek(date),
      end: endOfISOWeek(date)
    },
    {
      locale: getLocale(locale)
    }
  );

export const getAllDaysInMonth = date =>
  eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  });

export const getAllMonthsInYear = date =>
  eachMonthOfInterval({
    start: startOfYear(date),
    end: endOfYear(date)
  });

const getNorwegianHolidays = memoize(function (year) {
  const newYearsDay = startOfYear(getFirstDayOfYear(year));
  const easter = getEaster(year);
  const palmSunday = subDays(easter, 7);
  const maundyThursday = subDays(easter, 3);
  const goodFriday = subDays(easter, 2);
  const easterMonday = addDays(easter, 1);
  const labourDay = new Date(year, 4, 1);
  const constitutionDay = new Date(year, 4, 17);
  const ascensionDay = addDays(easter, 39);
  const whitsun = addDays(easter, 49);
  const whitMonday = addDays(easter, 50);
  const christmasDay = new Date(year, 11, 25);
  const stStephensDay = new Date(year, 11, 26);

  return [
    createHoliday("Nyttårsdag", newYearsDay),
    createHoliday("Palmesøndag", palmSunday),
    createHoliday("Skjærtorsdag", maundyThursday),
    createHoliday("Langfredag", goodFriday),
    createHoliday("1. påskedag", easter),
    createHoliday("2. påskedag", easterMonday),
    createHoliday("1. mai", labourDay),
    createHoliday("17. mai", constitutionDay),
    createHoliday("Kristi Himmelsprettsdag", ascensionDay),
    createHoliday("1. pinsedag", whitsun),
    createHoliday("2. pinsedag", whitMonday),
    createHoliday("1. juledag", christmasDay),
    createHoliday("2. juledag", stStephensDay)
  ];
});

const getNorwegianHolidaysDictionary = memoize(function (year) {
  return getNorwegianHolidays(year).reduce(
    (result, norwegianHoliday) => ({
      ...result,
      [getFormattedDate(norwegianHoliday.date)]: norwegianHoliday
    }),
    {}
  );
});

const isHoliday = date => {
  const norwegianHolidays = getNorwegianHolidaysDictionary(getYear(date));

  return getFormattedDate(date) in norwegianHolidays;
};

const createHoliday = (name, date) => ({
  name,
  date,
  formattedLongDate: getFormattedLongDate(date)
});

export const createDate = (date, locale) => ({
  date,
  day: getDate(date),
  name: getFormattedDay(date, locale),
  weekNumber: getWeek(date),
  formattedLongDate: getFormattedLongDate(date, locale),
  isHoliday: isHoliday(date)
});
