import { RoasterService } from "./../services/roaster.service";
import { Component, OnInit } from "@angular/core";
import { DayOfWeek } from "../models/days";
import { Roaster } from "../models/roaster";
import { groupBy, TIME_SLOTS } from "../common/common";
import { TimeSlot } from "../models/timeslots";

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
  constructor(private roasterService: RoasterService) {}
  ngOnInit(): void {
    this.daysOfWeek = this.roasterService.getDaysOfWeek(new Date());
    this.setRoasters();
  }
  setRoasters() {
    let flatRoasters: Roaster[] = [];
    this.daysOfWeek.forEach(day => {
      day.roasters.forEach(roaster => {
        flatRoasters.push(roaster);
      });
    });

    let groupedRoasters: any[] = groupBy(flatRoasters, "timeSlot");
    console.log(groupedRoasters);

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
