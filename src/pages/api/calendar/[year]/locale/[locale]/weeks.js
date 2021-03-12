import {
  createDate,
  getAllDaysInWeek,
  getAllWeeksInYear,
  getFirstDayOfYear,
  yearIsLeapYear
} from "../../../../../../utils/calendar/calendarUtils";

export default (req, res) => {
  const {
    query: { year, locale }
  } = req;

  const date = getFirstDayOfYear(year);
  const allWeeksInYear = getAllWeeksInYear(date, locale);

  res.statusCode = 200;
  res.json({
    year,
    isLeapYear: yearIsLeapYear(year),
    weeks: allWeeksInYear.map(weekDay =>
      getAllDaysInWeek(weekDay, locale).map(date => createDate(date, locale))
    )
  });
};
