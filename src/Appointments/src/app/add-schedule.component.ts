import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { RoasterService } from "../services/roaster.service";
import { JobCustomerNameVm } from "../models/job-customer-names";

@Component({
  selector: "schedule-form",
  templateUrl: "./add-schedule.component.html",
  styleUrls: ["./app.component.css"]
})
export class AddScheduleComponent implements OnInit {
  form;

  jobCustomerNameVm: JobCustomerNameVm[] = [];
  phoneNumberLabels: any[];
  bestCallTimes: any[];
  emails: any[];
  suburbs: any[];

  jobCustomerNameType: number = 0;
  jobId: number = 0;
  jobCustomerNameId: number = 0;
  jobPhoneNumberId: number = 0;

  jobEmailAddressId: number = 0;

  jobAddressTypeId: number = 0;
  jobAddressId: number = 0;

  bestTimeToCallId: number = 0;

  suburbId: number = 0;

  state: string = "";
  postCode: string = "";

  land;

  constructor(private rosterService: RoasterService) {}

  addContactInfoItem(): void {
    this.jobCustomerNameVm.push(this.createContactArrayItem());
  }
  createContactArrayItem(): JobCustomerNameVm {
    return new JobCustomerNameVm("Mr.", "", "", 0, 0, 0);
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
    this.addContactInfoItem();
    this.initModels();
  }

  initModels() {
    this.jobCustomerNameType = 1;
    this.jobId = 0;
    this.jobCustomerNameId = 0;
    this.jobPhoneNumberId = 0;
    this.jobEmailAddressId = 0;
    this.jobAddressId = 0;
    this.jobAddressTypeId = 0;
    this.land = null;
  }

  onSuburbChanged(suburb) {
    if (suburb) {
      console.log(suburb);
      this.postCode = this.suburbs.find(
        s => s.suburbId == suburb.suburbId
      ).postCode;
      this.state = this.suburbs.find(
        s => s.suburbId == suburb.suburbId
      ).stateName;
    }
  }

  submitForm(f) {
    console.log(f.value);
  }
}
