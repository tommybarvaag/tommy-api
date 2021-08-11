import {
  createDate,
  getAllDaysInMonth,
  getAllMonthsInYear,
  getFirstDayOfYear,
  yearIsLeapYear
} from "../../../../../../utils/calendar/calendarUtils";
import { getFormattedMonth } from "../../../../../../utils/dateFnsUtils";

export default async function months(req, res) {
  const {
    query: { year, locale }
  } = req;

  const date = getFirstDayOfYear(year);
  const allMonthsInYear = getAllMonthsInYear(date);

  res.statusCode = 200;
  res.json({
    year,
    isLeapYear: yearIsLeapYear(year),
    months: allMonthsInYear.map(monthDate => ({
      month: getFormattedMonth(monthDate),
      days: getAllDaysInMonth(monthDate).map(date => createDate(date, locale))
    }))
  });
}
