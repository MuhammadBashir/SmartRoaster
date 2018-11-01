export function getWeekMondayByDate(date) {
    date = new Date(date);
    var day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}
export var WEEK_DAYS = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
};
export function forEachDateInRange(startDate, endDate, block) {
    for (var currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        block.call(null, new Date(currentDate));
    }
}
//# sourceMappingURL=common.js.map