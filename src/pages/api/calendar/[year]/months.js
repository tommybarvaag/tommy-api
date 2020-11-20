import {
  createDate,
  getAllDaysInMonth,
  getAllMonthsInYear,
  getFirstDayOfYear,
  yearIsLeapYear
} from "../../../../utils/calendar/calendarUtils";
import { getFormattedMonth } from "../../../../utils/dateFnsUtils";

export default (req, res) => {
  const {
    query: { year }
  } = req;

  const date = getFirstDayOfYear(year);
  const allMonthsInYear = getAllMonthsInYear(date);

  res.statusCode = 200;
  res.json({
    year,
    isLeapYear: yearIsLeapYear(year),
    months: allMonthsInYear.map(monthDate => ({
      month: getFormattedMonth(monthDate),
      days: getAllDaysInMonth(monthDate).map(createDate)
    }))
  });
};
