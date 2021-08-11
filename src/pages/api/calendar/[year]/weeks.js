import {
  createDate,
  getAllDaysInWeek,
  getAllWeeksInYear,
  getFirstDayOfYear,
  yearIsLeapYear
} from "../../../../utils/calendar/calendarUtils";

export default async function weeks(req, res) {
  const {
    query: { year }
  } = req;

  const date = getFirstDayOfYear(year);
  const allWeeksInYear = getAllWeeksInYear(date);

  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

  return res.status(200).json({
    year,
    isLeapYear: yearIsLeapYear(year),
    weeks: allWeeksInYear.map(weekDay => getAllDaysInWeek(weekDay).map(createDate))
  });
}
