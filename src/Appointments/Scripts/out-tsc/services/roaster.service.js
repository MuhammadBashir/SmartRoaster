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
    //baseUrl = "/api/appointment";
    function RoasterService(http) {
        this.http = http;
        this.baseUrl = "http://115.70.199.185/api/appointment";
    }
    RoasterService.prototype.getRoastersFromApi = function (date, officeLocationId) {
        return this.http
            .get(this.baseUrl + "/rostertime?selectedDate=" + date.toISOString() + "&locationId=" + officeLocationId)
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
    RoasterService.prototype.getOfficeLocations = function () {
        return this.http.get(this.baseUrl + "/officelocations");
    };
    RoasterService.prototype.getPhoneNumberOptions = function () {
        return this.http.get(this.baseUrl + "/phoneLabels");
    };
    RoasterService.prototype.getEmailOptions = function () {
        return this.http.get(this.baseUrl + "/emailLabels");
    };
    RoasterService.prototype.getBestTimeTocall = function () {
        return this.http.get(this.baseUrl + "/besttimetocalls");
    };
    RoasterService.prototype.getSuburbs = function () {
        return this.http.get("/api/appointment/suburbs");
    };
    RoasterService.prototype.getRegions = function () {
        return this.http.get(this.baseUrl + "/regions");
    };
    RoasterService.prototype.getSources = function () {
        return this.http.get(this.baseUrl + "/sources");
    };
    RoasterService.prototype.createAppointment = function (appointmentPayLoad) {
        return this.http.post("/api/appointment/CreateAppointmentJob", appointmentPayLoad);
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