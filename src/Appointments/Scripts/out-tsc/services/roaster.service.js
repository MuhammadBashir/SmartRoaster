var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Roaster } from "./../models/roaster";
import { Injectable } from "@angular/core";
import { getWeekMondayByDate, WEEK_DAYS, forEachDateInRange } from "./../common/common";
var RoasterService = /** @class */ (function () {
    function RoasterService() {
    }
    RoasterService.prototype.getRoasters = function (date) {
        var roasters = [];
        var actualRoasters = this.getActualRoasters(date);
        var available = true;
        for (var index = 1; index < 24; index++) {
            for (var j = 0; j < actualRoasters.length; j++) {
                var roaster_1 = actualRoasters[j];
                roaster_1.timeSlot == index ? (available = false) : (available = true);
            }
            var roaster = new Roaster(date, index, "JN#" + index, available);
            roasters.push(roaster);
        }
        return roasters;
    };
    RoasterService.prototype.getActualRoasters = function (date) {
        var roasters = [];
        for (var index = 1; index < 25; index++) {
            if (index % 2 == 0) {
                var roaster = new Roaster(date, index, "JN#" + index);
                roasters.push(roaster);
            }
        }
        return roasters;
    };
    RoasterService.prototype.getDaysOfWeek = function (date) {
        var daysOfWeek = [];
        date = new Date();
        var monday = getWeekMondayByDate(date);
        var sunday = monday.getDay() + 7;
        var dayOfWeek;
        forEachDateInRange(monday, sunday, function (date) {
            dayOfWeek.date = date;
            dayOfWeek.name = WEEK_DAYS[date.getDay()];
            dayOfWeek.roasters = this.getRoasters(date);
            daysOfWeek.push(dayOfWeek);
        });
        return daysOfWeek;
    };
    RoasterService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [])
    ], RoasterService);
    return RoasterService;
}());
export { RoasterService };
//# sourceMappingURL=roaster.service.js.map