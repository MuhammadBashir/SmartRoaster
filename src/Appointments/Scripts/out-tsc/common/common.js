export function getWeekMondayByDate(date) {
    date = new Date(date);
    var day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}
export var WEEK_DAYS = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
};
export function forEachDateInRange(startDate, endDate, block) {
    for (var currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        block.call(null, new Date(currentDate));
    }
}
export function groupBy(array, key) {
    return array.reduce(function (a, e) {
        var estKey = e[key];
        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
        return a;
    }, {});
}
export function getTimeSlot(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();
    return TIMES_ENUM[hour + ":" + minutes];
}
export var TIME_SLOTS = {
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
export var TIMES_ENUM = {
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
export var apiResponse = [
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
//# sourceMappingURL=common.js.map