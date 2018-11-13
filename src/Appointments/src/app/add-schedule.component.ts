import { ToastType } from "./../common/common";
import { TimeSlot } from "./../models/timeslots";
import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  Output,
  EventEmitter
} from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { RoasterService } from "../services/roaster.service";
import { JobCustomerNameVm } from "../models/job-customer-names";
import { Key } from "selenium-webdriver";
import { getObjectAsGroupArray, getStartTime } from "../common/common";
import { addMinutes, format } from "date-fns";
import { HttpErrorResponse } from "@angular/common/http";

import { StorageService } from "../common/storage.service";
import { ToastaService, ToastaConfig, ToastOptions } from "ngx-toasta";

@Component({
  selector: "schedule-form",
  templateUrl: "./add-schedule.component.html",
  styleUrls: ["./app.component.css"]
})
export class AddScheduleComponent implements OnInit {
  form: FormGroup;

  jobCustomerNameVm: JobCustomerNameVm[] = [];
  phoneNumberLabels: any[];
  bestCallTimes: any[];
  emails: any[];
  suburbs: any[];
  regions: any[];
  sources: any[];

  jobCustomerNameType: number = 1;
  jobId: number = 0;
  jobCustomerNameId: number = 0;
  jobPhoneNumberId: number = 0;

  jobEmailAddressId: number = 0;

  jobAddressTypeId: number = 0;
  jobAddressId: number = 0;

  bestTimeToCallId: number = 0;

  suburbInit;

  state: string = "";
  postCode: string = "";

  noEmail: boolean = true;

  landInit;
  timeFrameInit;
  financeInit;
  regionInit;
  landLocationInit;
  aboutInit;
  sourceInit;
  address1;
  address2;
  streetNumberInit;
  lotNumberInit;

  @Input()
  officeLocationId: number;

  @Input()
  timeSlot: TimeSlot;
  @Input()
  rosterDate: Date;

  @Output() refreshCalendar = new EventEmitter<boolean>();

  constructor(
    private rosterService: RoasterService,
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig,
    private storage: StorageService
  ) {
    this.toastaConfig.theme = "bootstrap";
  }

  addContactInfoItem(): void {
    this.jobCustomerNameVm.push(this.createContactArrayItem());
  }
  createContactArrayItem(): JobCustomerNameVm {
    return new JobCustomerNameVm("Mr.", "", "", 0, 0, 0);
  }
  resetCustomerNameInfo() {
    this.jobCustomerNameVm = [];
    this.addContactInfoItem();
  }

  removeContactInfoItem(index) {
    this.jobCustomerNameVm.splice(index, 1);
  }
  changeCustomerNameTypeId(value) {
    this.jobCustomerNameType = value;
  }

  ngOnInit(): void {
    this.rosterService
      .getPhoneNumberOptions()
      .subscribe(phoneNumbers => (this.phoneNumberLabels = phoneNumbers));

    this.rosterService.getBestTimeTocall().subscribe(callTimes => {
      this.bestCallTimes = callTimes;
      this.bestTimeToCallId = this.bestCallTimes[0].bestTimeToCallId;
    });

    this.rosterService.getEmailOptions().subscribe(emails => {
      this.emails = emails;
    });

    this.rosterService.getSuburbs().subscribe(suburbs => {
      this.suburbs = suburbs;
    });

    this.rosterService.getRegions().subscribe(regions => {
      this.regions = regions;
    });

    this.rosterService
      .getSources()
      .subscribe(sources => (this.sources = sources));

    this.initModels();
  }

  initModels() {
    this.resetCustomerNameInfo();
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
    this.postCode = null;
    this.state = null;
    this.streetNumberInit = null;
    this.lotNumberInit = null;
  }

  onSuburbChanged(suburb) {
    if (suburb) {
      this.postCode = this.suburbs.find(
        s => s.suburbId == suburb.suburbId
      ).postCode;
      this.state = this.suburbs.find(
        s => s.suburbId == suburb.suburbId
      ).stateName;
    }
  }

  keyUpPhone(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  resetAddressFields() {
    this.postCode = "";
    this.state = "";
  }

  addToast(message: string, heading: string, type: ToastType) {
    var toastOptions: ToastOptions = {
      title: heading,
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: "bootstrap"
    };

    if (type == ToastType.Error) this.toastaService.error(toastOptions);
    if (type == ToastType.Success) this.toastaService.success(toastOptions);
    if (type == ToastType.Warning) this.toastaService.warning(toastOptions);
  }

  submitForm(f) {
    this.form = f;
    let jobCustomerNameVmList = getObjectAsGroupArray(f, "contact");
    let jobPhoneNumberVmList = getObjectAsGroupArray(f, "phone");
    let jobEmailAddressVmList = getObjectAsGroupArray(f, "email");

    jobPhoneNumberVmList = jobPhoneNumberVmList.filter(
      f => f.phoneNumber != ""
    );

    jobEmailAddressVmList = jobEmailAddressVmList.filter(
      f => f.emailAddress != ""
    );

    const {
      jobAddressVm,
      jobCustomerNameType,
      region,
      bestTimeToCallId,
      sourceId,
      landLocation
    } = f.value;

    let companyAbn1 = "";
    let companyAcn1 = "";
    let companyName1 = "";
    if (jobCustomerNameType == 2) {
      const { companyAbn, companyAcn, companyName } = f.value;
      companyName1 = companyName;
      companyAbn1 = companyAbn;
      companyAcn1 = companyAcn;
    }

    let jobVm = {
      jobCustomerTypeId: jobCustomerNameType,
      officeId: this.officeLocationId
      // regionUid: region,
      // jobId: 0,
      // jobUid: "",
      // jobNumber: "",
      // companyName: companyName1,
      // companyAbn: companyAbn1,
      // companyAcn: companyAcn1,
      // bestTimeToCallId: bestTimeToCallId,
      // copyTo: null,
      // addedBy: null,
      // jobStatus: null,
      // sourceId: sourceId,
      // client: null,
      // landLocationId: landLocation
    };
    let startTime = getStartTime(this.rosterDate, this.timeSlot.timeSlotId);
    let endTime = addMinutes(
      getStartTime(this.rosterDate, this.timeSlot.timeSlotId),
      60
    );

    let appointmentVm = {
      appointmentDate: this.rosterDate.toISOString(),
      appointmentLocation: this.officeLocationId,
      startTime: format(startTime, "hh:mm A"),
      endTime: format(endTime, "hh:mm A")
      // salesmanId: 0,
      // jobId: 0,
      // typeId: 0,
      // sourceId: sourceId,
      // addedBy: null,
      // dateAdded: new Date(),
      // status: null
    };

    let appointmentJobVm = {
      jobVm,
      appointmentVm,
      jobCustomerNameVmList,
      jobEmailAddressVmList,
      jobPhoneNumberVmList,
      jobAddressVm
    };

    console.log("fullPayLoad", appointmentJobVm);
    let emailFlag = false;
    jobEmailAddressVmList.forEach(email => {
      if (email.emailAddress && email.emailAddress != "") emailFlag = true;
    });
    if (!emailFlag) this.noEmail = false;
    else this.noEmail = true;

    console.log("valid", this.form.valid);
    let cancelButton: HTMLElement = document.getElementById(
      "btnCancel"
    ) as HTMLElement;

    this.rosterService.createAppointment(appointmentJobVm).subscribe(
      created => {
        console.log(created);

        if (f.valid) {
          this.addToast(
            `Your appointment was successfully set up on: ${format(
              appointmentVm.appointmentDate,
              "MM/DD/YYYY"
            )} / ${appointmentVm.startTime}. For your reference, your job# : ${
              created.jobId
            }`,
            "Success",
            ToastType.Success
          );
          cancelButton.click();
          this.form.reset();
          this.initModels();
          this.refreshCalendar.emit(true);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (
          error.status == 409 &&
          error.message ==
            "The time slot that you chose is not available anymore!"
        ) {
          this.addToast(
            "Sorry. This time was taken by someone else in past few seconds. Please select another time. Thank you!",
            "Oops!",
            ToastType.Warning
          );
          console.log(error);
          cancelButton.click();
        } else {
          this.addToast(
            "Unexpected error has occurred. Please try again later or call us.",
            "Error!",
            ToastType.Error
          );
          console.log(error);
          cancelButton.click();
        }
      }
    );
  }

  resetModal(appointmentVM) {}
}
