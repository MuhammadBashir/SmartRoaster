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
import addDays from "date-fns/add_days";

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

  constructor(private roasterService: RoasterService) {}
  ngOnInit(): void {
    this.getAllWeeksRoasters(new Date());
    this.getOfficeLocations();
  }
  getOfficeLocations() {
    this.roasterService
      .getOfficeLocations()
      .subscribe(locations => (this.officeLocations = locations));
  }

  getAllWeeksRoasters(date: Date): any {
    date = new Date();
    let monday = getWeekMondayByDate(date);
    let sunday = addDays(monday, 6);
    let dayOfWeek: DayOfWeek;
    let self = this;
    forEachDateInRange(monday, sunday, function(date: Date) {
      self.roasterService.getRoastersFromApi(date).subscribe(roaster => {
        dayOfWeek = new DayOfWeek(WEEK_DAYS[date.getDay()], date, []);
        dayOfWeek.roasters = self.setRosters(roaster, date);
        self.daysOfWeek.push(dayOfWeek);
      });
      self.isSubscriptionComplete = true;
    });
    setTimeout(() => {
      if (this.isSubscriptionComplete) {
        this.setTimeSlots();
      }
    }, 1000);
  }
  setDaysOfWeek(actualRosters: Roaster[], date: Date) {
    date = new Date();
    let monday = getWeekMondayByDate(date);
    let sunday = addDays(monday, 6);
    let dayOfWeek: DayOfWeek;
    let self = this;
    forEachDateInRange(monday, sunday, function(date: Date) {});
    this.setTimeSlots();
  }
  setRosters(actualRoasters: Roaster[], date: Date): Roaster[] {
    let available = true;
    let finalizedRosters: Roaster[] = [];
    for (let index = 1; index < 25; index++) {
      for (let j = 0; j < actualRoasters.length; j++) {
        const roaster = actualRoasters[j];
        if (roaster.timeSlot == index) {
          available = false;
          break;
        } else available = true;
      }
      let roaster = new Roaster(new Date(), index, `JN#${index}`, available);
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
    for (let index = 1; index < 25; index++) {
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
}
