var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RoasterService } from "./../services/roaster.service";
import { Component } from "@angular/core";
import { DayOfWeek } from "../models/days";
import { Roaster } from "../models/roaster";
import { groupBy, TIME_SLOTS, getWeekMondayByDate, forEachDateInRange, WEEK_DAYS } from "../common/common";
import { TimeSlot } from "../models/timeslots";
import addDays from "date-fns/add_days";
var AppComponent = /** @class */ (function () {
    function AppComponent(roasterService) {
        this.roasterService = roasterService;
        this.daysOfWeek = [];
        this.roasters = [];
        this.timeSlots = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.roasterService.getRoastersFromApi(new Date()).subscribe(function (roaster) {
            _this.setDaysOfWeek(roaster, new Date());
            _this.setTimeSlots();
        });
    };
    AppComponent.prototype.setDaysOfWeek = function (actualRosters, date) {
        date = new Date();
        var monday = getWeekMondayByDate(date);
        var sunday = addDays(monday, 6);
        var dayOfWeek;
        var self = this;
        forEachDateInRange(monday, sunday, function (date) {
            dayOfWeek = new DayOfWeek(WEEK_DAYS[date.getDay()], date, []);
            dayOfWeek.roasters = self.setRosters(actualRosters, date);
            self.daysOfWeek.push(dayOfWeek);
        });
    };
    AppComponent.prototype.setRosters = function (actualRoasters, date) {
        var available = true;
        var finalizedRosters = [];
        for (var index = 1; index < 25; index++) {
            for (var j = 0; j < actualRoasters.length; j++) {
                var roaster_1 = actualRoasters[j];
                if (roaster_1.timeSlot == index) {
                    available = false;
                    break;
                }
                else
                    available = true;
            }
            var roaster = new Roaster(new Date(), index, "JN#" + index, available);
            finalizedRosters.push(roaster);
        }
        return finalizedRosters;
    };
    AppComponent.prototype.setTimeSlots = function () {
        var flatRoasters = [];
        this.daysOfWeek.forEach(function (day) {
            day.roasters.forEach(function (roaster) {
                flatRoasters.push(roaster);
            });
        });
        var groupedRoasters = groupBy(flatRoasters, "timeSlot");
        var timeSlot;
        var _loop_1 = function (index) {
            var rawRoasters = groupedRoasters[index];
            var tempRoasters = [];
            rawRoasters.forEach(function (rst) {
                var date = rst.date, timeSlot = rst.timeSlot, jobNumber = rst.jobNumber, available = rst.available;
                var roaster = new Roaster(date, timeSlot, jobNumber, available);
                tempRoasters.push(roaster);
            });
            timeSlot = new TimeSlot(index, TIME_SLOTS[index], tempRoasters);
            this_1.timeSlots.push(timeSlot);
        };
        var this_1 = this;
        for (var index = 1; index < 25; index++) {
            _loop_1(index);
        }
    };
    AppComponent = __decorate([
        Component({
            selector: "app-root",
            templateUrl: "./app.component.html",
            styleUrls: [
                "./app.component.css",
                "../../Content/jquery.mCustomScrollbar.min.css"
            ]
        }),
        __metadata("design:paramtypes", [RoasterService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map