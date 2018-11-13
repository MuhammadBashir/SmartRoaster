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
export function orderByDate(arr, dateProp) {
    return arr.slice().sort(function (a, b) {
        return a[dateProp] < b[dateProp] ? -1 : 1;
    });
}
export function getObjectAsGroupArray(f, keyStartValue) {
    return Object.keys(f.value)
        .filter(function (obj) {
        return obj.startsWith(keyStartValue);
    })
        .map(function (key) {
        return f.value[key];
    });
}
export function getStartTime(date, i) {
    var stringTime = TIME_SLOTS[i];
    var timeParts = stringTime.split(":");
    var hoursPart = parseInt(timeParts[0]);
    var minutesPart = parseInt(timeParts[1].replace("am", "").replace("pm", ""));
    var hoursToAdd = 0;
    if (hoursPart >= 8 && hoursPart <= 12) {
        hoursToAdd = hoursPart;
    }
    else {
        hoursToAdd += hoursPart + 12;
    }
    var setDate = date.setHours(hoursToAdd, minutesPart, 0, 0);
    return new Date(setDate);
}
export var TIME_SLOTS = {
    1: "08:00am",
    2: "09:00am",
    3: "10:00am",
    4: "11:00am",
    5: "12:00pm",
    6: "01:00pm",
    7: "02:00pm",
    8: "03:00pm",
    9: "04:00pm",
    10: "05:00pm",
    11: "06:00pm",
    12: "07:00pm"
};
export var TIMES_ENUM = {
    "8:0": 1,
    "9:0": 2,
    "10:0": 3,
    "11:0": 4,
    "12:0": 5,
    "13:0": 6,
    "14:0": 7,
    "15:0": 8,
    "16:0": 9,
    "17:0": 10,
    "18:0": 11,
    "19:0": 12
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