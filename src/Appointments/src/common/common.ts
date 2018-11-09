import * as addDays from "date-fns/add_days";
import { DayOfWeek } from "../models/days";

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

export function getTimeSlot(date: Date): number {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  return TIMES_ENUM[`${hour}:${minutes}`];
}

export function orderByDate(arr, dateProp) {
  return arr.slice().sort(function(a, b) {
    return a[dateProp] < b[dateProp] ? -1 : 1;
  });
}

export const TIME_SLOTS = {
  1: "08:00am",
  2: "08:30am",
  3: "09:00am",
  4: "09:30am",
  5: "10:00am",
  6: "10:30am",
  7: "11:00am",
  8: "11:30am",
  9: "12:00pm",
  10: "12:30pm",
  11: "01:00pm",
  12: "01:30pm",
  13: "02:00pm",
  14: "02:30pm",
  15: "03:00pm",
  16: "03:30pm",
  17: "04:00pm",
  18: "04:30pm",
  19: "05:00pm",
  20: "05:30pm",
  21: "06:00pm",
  22: "06:30pm",
  23: "07:00pm",
  24: "07:30pm"
};

export const TIMES_ENUM = {
  "8:0": 1,
  "8:30": 2,
  "9:0": 3,
  "9:30": 4,
  "10:0": 5,
  "10:30": 6,
  "11:0": 7,
  "11:30": 8,
  "12:0": 9,
  "12:30": 10,
  "13:0": 11,
  "13:30": 12,
  "14:0": 13,
  "14:30": 14,
  "15:0": 15,
  "15:30": 16,
  "16:0": 17,
  "16:30": 18,
  "17:0": 19,
  "17:30": 20,
  "18:0": 21,
  "18:30": 22,
  "19:0": 23,
  "19:30": 24
};

export const apiResponse = [
  {
    rosterDate: "2018-11-02T00:00:00",
    rosterTimePeriods: [
      { startTime: "2018-11-02T08:30:00", endTime: "2018-11-02T09:00:00" },
      { startTime: "2018-11-02T09:00:00", endTime: "2018-11-02T09:30:00" },
      { startTime: "2018-11-02T10:00:00", endTime: "2018-11-02T10:30:00" },
      { startTime: "2018-11-02T10:30:00", endTime: "2018-11-02T11:00:00" },
      { startTime: "2018-11-02T11:00:00", endTime: "2018-11-02T11:30:00" },
      { startTime: "2018-11-02T12:30:00", endTime: "2018-11-02T13:00:00" }
    ]
  },
  {
    rosterDate: "2018-11-03T00:00:00",
    rosterTimePeriods: [
      { startTime: "2018-11-03T10:00:00", endTime: "2018-11-03T10:30:00" },
      { startTime: "2018-11-03T11:00:00", endTime: "2018-11-03T11:30:00" },
      { startTime: "2018-11-03T12:30:00", endTime: "2018-11-03T13:00:00" },
      { startTime: "2018-11-03T13:00:00", endTime: "2018-11-03T13:30:00" },
      { startTime: "2018-11-03T13:30:00", endTime: "2018-11-03T14:00:00" }
    ]
  }
];
