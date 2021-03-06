import { RoasterService } from "./../services/roaster.service";
import { Component, OnInit } from "@angular/core";
import { DayOfWeek } from "../models/days";
import { Roaster } from "../models/roaster";
import {
  groupBy,
  TIME_SLOTS,
  getWeekMondayByDate,
  forEachDateInRange,
  WEEK_DAYS,
  orderByDate
} from "../common/common";
import { TimeSlot } from "../models/timeslots";
import * as addDays from "date-fns/add_days";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "./app.component.css",
    "../../Content/jquery.mCustomScrollbar.min.css"
  ]
})
export class AppComponent implements OnInit {
  daysOfWeek: DayOfWeek[] = [];
  roasters: Roaster[] = [];
  timeSlots: TimeSlot[] = [];
  review: any[];
  isSubscriptionComplete: boolean;

  officeLocations: any[];
  officeLocation;
  week: Date;

  selectedTimeSlot: TimeSlot;
  rosterDate: Date;

  constructor(private roasterService: RoasterService) {}
  ngOnInit(): void {
    this.week = getWeekMondayByDate(new Date());
    this.getOfficeLocations();
  }
  getOfficeLocations() {
    this.roasterService.getOfficeLocations().subscribe(locations => {
      this.officeLocations = locations;
      this.officeLocation = this.officeLocations[0].officeLocationId;
      this.getAllWeeksRoasters(this.week, this.officeLocation);
    });
  }

  onOfficeLocationChanged() {
    this.daysOfWeek = [];
    this.timeSlots = [];
    this.isSubscriptionComplete = false;
    this.getAllWeeksRoasters(this.week, this.officeLocation);
  }

  changeWeek(changeSwitch) {
    changeSwitch == 1
      ? (this.week = addDays(this.week, -7))
      : (this.week = addDays(this.week, 7));
    this.daysOfWeek = [];
    this.timeSlots = [];
    this.isSubscriptionComplete = false;
    this.getAllWeeksRoasters(this.week, this.officeLocation);
  }

  getAllWeeksRoasters(date: Date, officeLocation: number): any {
    let monday = getWeekMondayByDate(date);
    let sunday = addDays(monday, 6);
    let dayOfWeek: DayOfWeek;
    let self = this;

    this.roasterService
      .getRoastersFromApi(monday, officeLocation)
      .subscribe(roaster => {
        forEachDateInRange(monday, sunday, function(date: Date) {
          dayOfWeek = new DayOfWeek(WEEK_DAYS[date.getDay()], date, []);
          let todaysRosters: Roaster[] = [];
          roaster.forEach(apiRoaster => {
            if (
              apiRoaster.date.toDateString() === dayOfWeek.date.toDateString()
            ) {
              todaysRosters.push(apiRoaster);
            }
          });
          dayOfWeek.roasters = self.setRosters(todaysRosters, date);
          self.daysOfWeek.push(dayOfWeek);
          self.isSubscriptionComplete = true;
        });
      });
    this.setTimeSlotsAfterSubscriptionComplete();
  }

  setTimeSlotsAfterSubscriptionComplete() {
    setTimeout(() => {
      if (this.isSubscriptionComplete) {
        this.setTimeSlots();
      } else {
        this.setTimeSlotsAfterSubscriptionComplete();
      }
    }, 1000);
  }

  setDaysOfWeek(actualRosters: Roaster[], date: Date) {
    let monday = getWeekMondayByDate(date);
    let sunday = addDays(monday, 6);
    let dayOfWeek: DayOfWeek;
    let self = this;
    forEachDateInRange(monday, sunday, function(date: Date) {});
    this.setTimeSlots();
  }
  setRosters(actualRoasters: Roaster[], date: Date): Roaster[] {
    let available = false;
    let finalizedRosters: Roaster[] = [];
    for (let index = 1; index < 13; index++) {
      for (let j = 0; j < actualRoasters.length; j++) {
        const roaster = actualRoasters[j];
        if (roaster.timeSlot == index) {
          available = true;
          break;
        } else available = false;
      }
      let roaster = new Roaster(date, index, `JN#${index}`, available);
      finalizedRosters.push(roaster);
    }
    return finalizedRosters;
  }
  setTimeSlots() {
    let flatRoasters: Roaster[] = [];
    this.daysOfWeek = orderByDate(this.daysOfWeek, "date");
    this.daysOfWeek.forEach(day => {
      day.roasters.forEach(roaster => {
        flatRoasters.push(roaster);
      });
    });

    let groupedRoasters: any[] = groupBy(flatRoasters, "timeSlot");

    let timeSlot: TimeSlot;
    for (let index = 1; index < 13; index++) {
      const rawRoasters = groupedRoasters[index];
      let tempRoasters: Roaster[] = [];
      rawRoasters.forEach(rst => {
        const { date, timeSlot, jobNumber, available } = rst;
        let roaster = new Roaster(date, timeSlot, jobNumber, available);
        tempRoasters.push(roaster);
      });
      timeSlot = new TimeSlot(index, TIME_SLOTS[index], tempRoasters);
      this.timeSlots.push(timeSlot);
    }
  }

  refreshCalendar() {
    this.daysOfWeek = [];
    this.timeSlots = [];
    this.getAllWeeksRoasters(this.week, this.officeLocation);
  }

  sendTimeSlot(ts, date: Date) {
    this.selectedTimeSlot = ts;
    this.rosterDate = date;
  }
}
