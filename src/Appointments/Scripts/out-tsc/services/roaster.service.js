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
import { getTimeSlot } from "./../common/common";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
var RoasterService = /** @class */ (function () {
    function RoasterService(http) {
        this.http = http;
    }
    RoasterService.prototype.getRoasters = function (date) {
        var roasters = [];
        var actualRoasters = this.getActualRoasters(date);
        var available = true;
        for (var index = 1; index < 25; index++) {
            // for (let j = 0; j < actualRoasters.length; j++) {
            //   const roaster = actualRoasters[j];
            //   if (roaster.timeSlot == index) {
            //     available = false;
            //     break;
            //   } else available = true;
            // }
            var roaster = new Roaster(date, index, "JN#" + index, available);
            roasters.push(roaster);
        }
        return roasters;
    };
    RoasterService.prototype.getActualRoasters = function (date) {
        var roasters;
        this.getRoastersFromApi(date).subscribe(function (mappedRoasters) {
            roasters = mappedRoasters;
        });
        return roasters;
    };
    RoasterService.prototype.getRoastersFromApi = function (date) {
        return this.http
            .get("/api/appointment/GetRoasters?date=" + date)
            .pipe(map(function (rootArray) {
            var roasterArray = [];
            rootArray.forEach(function (model) {
                model.rosterTimePeriods.forEach(function (tp) {
                    var startTime = tp.startTime;
                    var time = new Date(startTime);
                    var roster = new Roaster(time, getTimeSlot(time), "jn", true);
                    roasterArray.push(roster);
                });
            });
            return roasterArray;
        }));
    };
    RoasterService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], RoasterService);
    return RoasterService;
}());
export { RoasterService };
//# sourceMappingURL=roaster.service.js.map