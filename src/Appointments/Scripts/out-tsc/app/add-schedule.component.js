var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { RoasterService } from "../services/roaster.service";
import { JobCustomerNameVm } from "../models/job-customer-names";
var AddScheduleComponent = /** @class */ (function () {
    function AddScheduleComponent(rosterService) {
        this.rosterService = rosterService;
        this.jobCustomerNameVm = [];
        this.jobCustomerNameType = 0;
        this.jobId = 0;
        this.jobCustomerNameId = 0;
        this.jobPhoneNumberId = 0;
        this.jobEmailAddressId = 0;
        this.jobAddressTypeId = 0;
        this.jobAddressId = 0;
        this.bestTimeToCallId = 0;
        this.suburbId = 0;
        this.state = "";
        this.postCode = "";
    }
    AddScheduleComponent.prototype.addContactInfoItem = function () {
        this.jobCustomerNameVm.push(this.createContactArrayItem());
    };
    AddScheduleComponent.prototype.createContactArrayItem = function () {
        return new JobCustomerNameVm("Mr.", "", "", 0, 0, 0);
    };
    AddScheduleComponent.prototype.removeContactInfoItem = function (index) {
        this.jobCustomerNameVm.splice(index, 1);
    };
    AddScheduleComponent.prototype.changeCustomerNameTypeId = function (value) {
        this.jobCustomerNameType = value;
    };
    AddScheduleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rosterService
            .getPhoneNumberOptions()
            .subscribe(function (phoneNumbers) { return (_this.phoneNumberLabels = phoneNumbers); });
        this.rosterService.getBestTimeTocall().subscribe(function (callTimes) {
            _this.bestCallTimes = callTimes;
            _this.bestTimeToCallId = _this.bestCallTimes[0].bestTimeToCallId;
        });
        this.rosterService.getEmailOptions().subscribe(function (emails) {
            _this.emails = emails;
        });
        this.rosterService.getSuburbs().subscribe(function (suburbs) {
            _this.suburbs = suburbs;
        });
        this.addContactInfoItem();
        this.initModels();
    };
    AddScheduleComponent.prototype.initModels = function () {
        this.jobCustomerNameType = 1;
        this.jobId = 0;
        this.jobCustomerNameId = 0;
        this.jobPhoneNumberId = 0;
        this.jobEmailAddressId = 0;
        this.jobAddressId = 0;
        this.jobAddressTypeId = 0;
        this.land = null;
    };
    AddScheduleComponent.prototype.onSuburbChanged = function (suburb) {
        if (suburb) {
            console.log(suburb);
            this.postCode = this.suburbs.find(function (s) { return s.suburbId == suburb.suburbId; }).postCode;
            this.state = this.suburbs.find(function (s) { return s.suburbId == suburb.suburbId; }).stateName;
        }
    };
    AddScheduleComponent.prototype.submitForm = function (f) {
        console.log(f.value);
    };
    AddScheduleComponent = __decorate([
        Component({
            selector: "schedule-form",
            templateUrl: "./add-schedule.component.html",
            styleUrls: ["./app.component.css"]
        }),
        __metadata("design:paramtypes", [RoasterService])
    ], AddScheduleComponent);
    return AddScheduleComponent;
}());
export { AddScheduleComponent };
//# sourceMappingURL=add-schedule.component.js.map