import {
  createDate,
  getAllDaysInMonth,
  getAllMonthsInYear,
  getFirstDayOfYear,
  yearIsLeapYear
} from "../../../../utils/calendar/calendarUtils";
import { getFormattedMonth } from "../../../../utils/dateFnsUtils";

export default async function months(req, res) {
  const {
    query: { year }
  } = req;

  const date = getFirstDayOfYear(year);
  const allMonthsInYear = getAllMonthsInYear(date);

  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

  return res.status(200).json({
    year,
    isLeapYear: yearIsLeapYear(year),
    months: allMonthsInYear.map(monthDate => ({
      month: getFormattedMonth(monthDate),
      days: getAllDaysInMonth(monthDate).map(createDate)
    }))
  });
}
