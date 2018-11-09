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
import { groupBy, TIME_SLOTS, getWeekMondayByDate, forEachDateInRange, WEEK_DAYS, orderByDate } from "../common/common";
import { TimeSlot } from "../models/timeslots";
import * as addDays from "date-fns/add_days";
var AppComponent = /** @class */ (function () {
    function AppComponent(roasterService) {
        this.roasterService = roasterService;
        this.daysOfWeek = [];
        this.roasters = [];
        this.timeSlots = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.week = getWeekMondayByDate(new Date());
        this.getOfficeLocations();
    };
    AppComponent.prototype.getOfficeLocations = function () {
        var _this = this;
        this.roasterService.getOfficeLocations().subscribe(function (locations) {
            _this.officeLocations = locations;
            _this.officeLocation = _this.officeLocations[0].officeLocationId;
            _this.getAllWeeksRoasters(_this.week, _this.officeLocation);
        });
    };
    AppComponent.prototype.onOfficeLocationChanged = function () {
        this.daysOfWeek = [];
        this.timeSlots = [];
        this.getAllWeeksRoasters(this.week, this.officeLocation);
    };
    AppComponent.prototype.changeWeek = function (changeSwitch) {
        changeSwitch == 1
            ? (this.week = addDays(this.week, -7))
            : (this.week = addDays(this.week, 7));
        this.daysOfWeek = [];
        this.timeSlots = [];
        this.getAllWeeksRoasters(this.week, this.officeLocation);
    };
    AppComponent.prototype.getAllWeeksRoasters = function (date, officeLocation) {
        var _this = this;
        var monday = getWeekMondayByDate(date);
        var sunday = addDays(monday, 6);
        var dayOfWeek;
        var self = this;
        this.roasterService
            .getRoastersFromApi(monday, officeLocation)
            .subscribe(function (roaster) {
            forEachDateInRange(monday, sunday, function (date) {
                dayOfWeek = new DayOfWeek(WEEK_DAYS[date.getDay()], date, []);
                var todaysRosters = [];
                roaster.forEach(function (apiRoaster) {
                    if (apiRoaster.date.toDateString() === dayOfWeek.date.toDateString()) {
                        todaysRosters.push(apiRoaster);
                    }
                });
                dayOfWeek.roasters = self.setRosters(todaysRosters, date);
                self.daysOfWeek.push(dayOfWeek);
                self.isSubscriptionComplete = true;
            });
        });
        setTimeout(function () {
            if (_this.isSubscriptionComplete) {
                _this.setTimeSlots();
            }
        }, 1000);
    };
    AppComponent.prototype.setDaysOfWeek = function (actualRosters, date) {
        var monday = getWeekMondayByDate(date);
        var sunday = addDays(monday, 6);
        var dayOfWeek;
        var self = this;
        forEachDateInRange(monday, sunday, function (date) { });
        this.setTimeSlots();
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
            var roaster = new Roaster(date, index, "JN#" + index, available);
            finalizedRosters.push(roaster);
        }
        return finalizedRosters;
    };
    AppComponent.prototype.setTimeSlots = function () {
        var flatRoasters = [];
        this.daysOfWeek = orderByDate(this.daysOfWeek, "date");
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