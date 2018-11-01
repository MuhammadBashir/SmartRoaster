export function getWeekMondayByDate(date: Date) {
  date = new Date(date);
  let day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

export const WEEK_DAYS = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

export function forEachDateInRange(startDate, endDate, block) {
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    block.call(null, new Date(currentDate));
  }
}

export function groupBy(array: any[], key): any[] {
  return array.reduce(function(a, e) {
    let estKey = e[key];

    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, {});
}

export const TIME_SLOTS = {
  1: "08:00am - 08:30am",
  2: "08:30am - 09:00am",
  3: "09:00am - 09:30am",
  4: "09:30am - 10:00am",
  5: "10:00am - 10:30am",
  6: "10:30am - 11:00am",
  7: "11:00am - 11:30am",
  8: "11:30am - 12:00pm",
  9: "12:00pm - 12:30pm",
  10: "12:30pm - 01:00pm",
  11: "01:00pm - 01:30pm",
  12: "01:30pm - 02:00pm",
  13: "02:00pm - 02:30pm",
  14: "02:30pm - 03:00pm",
  15: "03:00pm - 03:30pm",
  16: "03:30pm - 04:00pm",
  17: "04:00pm - 04:30pm",
  18: "04:30pm - 05:00pm",
  19: "05:00pm - 05:30pm",
  20: "05:30pm - 06:00pm",
  21: "06:00pm - 06:30pm",
  22: "06:30pm - 07:00pm",
  23: "07:00pm - 07:30pm",
  24: "07:30pm - 08:30pm"
};
