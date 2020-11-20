import { format } from "date-fns";
import { getLocale } from "./calendar/calendarUtils";

export const getFormattedDate = (date, locale) =>
  format(date, "dd-MM-yyyy", { locale: getLocale(locale) });

export const getFormattedLongDate = (date, locale) =>
  format(date, "EEEE d. MMMM yyyy", { locale: getLocale(locale) });

export const getFormattedDay = (date, locale) =>
  format(date, "EEEE", { locale: getLocale(locale) });

export const getFormattedMonth = (date, locale) =>
  format(date, "MMMM", { locale: getLocale(locale) });
