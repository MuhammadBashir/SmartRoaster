var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TimeSlot } from "./../models/timeslots";
import { Component, Input } from "@angular/core";
import { RoasterService } from "../services/roaster.service";
import { JobCustomerNameVm } from "../models/job-customer-names";
import { getObjectAsGroupArray, getStartTime } from "../common/common";
import { addMinutes } from "date-fns";
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
        this.state = "";
        this.postCode = "";
        this.noEmail = true;
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
        this.rosterService.getRegions().subscribe(function (regions) {
            _this.regions = regions;
        });
        this.rosterService
            .getSources()
            .subscribe(function (sources) { return (_this.sources = sources); });
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
        this.landInit = null;
        this.timeFrameInit = null;
        this.suburbInit = null;
        this.regionInit = null;
        this.landLocationInit = null;
        this.aboutInit = null;
        this.financeInit = null;
        this.sourceInit = null;
    };
    AddScheduleComponent.prototype.onSuburbChanged = function (suburb) {
        if (suburb) {
            this.postCode = this.suburbs.find(function (s) { return s.suburbId == suburb.suburbId; }).postCode;
            this.state = this.suburbs.find(function (s) { return s.suburbId == suburb.suburbId; }).stateName;
        }
    };
    AddScheduleComponent.prototype.keyUpPhone = function (event) {
        var pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    AddScheduleComponent.prototype.resetAddressFields = function () {
        this.postCode = "";
        this.state = "";
    };
    AddScheduleComponent.prototype.submitForm = function (f) {
        this.form = f;
        var jobCustomerNameVmList = getObjectAsGroupArray(f, "contact");
        var jobPhoneNumberVmList = getObjectAsGroupArray(f, "phone");
        var jobEmailAddressVmList = getObjectAsGroupArray(f, "email");
        var _a = f.value, jobAddressVm = _a.jobAddressVm, jobCustomerNameType = _a.jobCustomerNameType, region = _a.region, bestTimeToCallId = _a.bestTimeToCallId, sourceId = _a.sourceId, landLocation = _a.landLocation;
        var companyAbn1 = "";
        var companyAcn1 = "";
        var companyName1 = "";
        if (jobCustomerNameType == 2) {
            var _b = f.value, companyAbn = _b.companyAbn, companyAcn = _b.companyAcn, companyName = _b.companyName;
            companyName1 = companyName;
            companyAbn1 = companyAbn;
            companyAcn1 = companyAcn;
        }
        var jobVm = {
            jobId: 0,
            jobUid: "",
            jobNumber: "",
            jobCustomerTypeId: jobCustomerNameType,
            regionUid: region,
            officeId: this.officeLocationId,
            companyName: companyName1,
            companyAbn: companyAbn1,
            companyAcn: companyAcn1,
            bestTimeToCallId: bestTimeToCallId,
            copyTo: null,
            addedBy: null,
            jobStatus: null,
            sourceId: sourceId,
            client: null,
            landLocationId: landLocation
        };
        var appointmentVm = {
            appointmentDate: this.rosterDate,
            appointmentLocation: this.officeLocationId,
            startTime: getStartTime(this.rosterDate, this.timeSlot.timeSlotId).toISOString(),
            endTime: addMinutes(getStartTime(this.rosterDate, this.timeSlot.timeSlotId), 60).toISOString(),
            salesmanId: 0,
            jobId: 0,
            typeId: 0,
            sourceId: sourceId,
            addedBy: null,
            dateAdded: new Date(),
            status: null
        };
        var appointmentJobVm = {
            jobVm: jobVm,
            appointmentVm: appointmentVm,
            jobCustomerNameVmList: jobCustomerNameVmList,
            jobEmailAddressVmList: jobEmailAddressVmList,
            jobPhoneNumberVmList: jobPhoneNumberVmList,
            jobAddressVm: jobAddressVm
        };
        console.log("fullPayLoad", appointmentJobVm);
        var emailFlag = false;
        jobEmailAddressVmList.forEach(function (email) {
            if (email.emailAddress && email.emailAddress != "")
                emailFlag = true;
        });
        if (!emailFlag)
            this.noEmail = false;
        else
            this.noEmail = true;
        this.rosterService
            .createAppointment(appointmentJobVm)
            .subscribe(function (created) {
            console.log(created);
            if (f.valid) {
                var cancelButton = document.getElementById("btnCancel");
                cancelButton.click();
            }
        });
        this.initModels();
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AddScheduleComponent.prototype, "officeLocationId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TimeSlot)
    ], AddScheduleComponent.prototype, "timeSlot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], AddScheduleComponent.prototype, "rosterDate", void 0);
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