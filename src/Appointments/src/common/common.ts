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

export function getObjectAsGroupArray(f, keyStartValue) {
  return Object.keys(f.value)
    .filter(obj => {
      return obj.startsWith(keyStartValue);
    })
    .map(key => {
      return f.value[key];
    });
}

export function getStartTime(date: Date, i): Date {
  let stringTime = TIME_SLOTS[i];
  let timeParts = (stringTime as string).split(":");
  let hoursPart = parseInt(timeParts[0]);
  let minutesPart = parseInt(timeParts[1].replace("am", "").replace("pm", ""));
  let hoursToAdd = 0;
  if (hoursPart >= 8 && hoursPart <= 12) {
    hoursToAdd = hoursPart;
  } else {
    hoursToAdd += hoursPart + 12;
  }

  let setDate = date.setHours(hoursToAdd, minutesPart, 0, 0);
  return new Date(setDate);
}

export enum ToastType {
  Error,
  Warning,
  Success
}

export const TIME_SLOTS = {
  1: "08:30am",
  2: "09:30am",
  3: "10:30am",
  4: "11:30am",
  5: "12:30pm",
  6: "01:30pm",
  7: "02:30pm",
  8: "03:30pm",
  9: "04:30pm",
  10: "05:30pm",
  11: "06:30pm",
  12: "07:30pm"
};

export const TIMES_ENUM = {
  "8:30": 1,
  "9:30": 2,
  "10:30": 3,
  "11:30": 4,
  "12:30": 5,
  "13:30": 6,
  "14:30": 7,
  "15:30": 8,
  "16:30": 9,
  "17:30": 10,
  "18:30": 11,
  "19:30": 12
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
