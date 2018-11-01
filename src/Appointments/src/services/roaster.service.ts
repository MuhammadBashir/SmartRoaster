import { DayOfWeek } from "./../models/days";
import { Roaster } from "./../models/roaster";
import { Injectable } from "@angular/core";
import {
  getWeekMondayByDate,
  WEEK_DAYS,
  forEachDateInRange
} from "./../common/common";

import addDays from "date-fns/add_days";

@Injectable({
  providedIn: "root"
})
export class RoasterService {
  constructor() {}
  private getRoasters(date: Date): Roaster[] {
    let roasters: Roaster[] = [];
    let actualRoasters = this.getActualRoasters(date);
    let available = true;
    for (let index = 1; index < 25; index++) {
      for (let j = 0; j < actualRoasters.length; j++) {
        const roaster = actualRoasters[j];
        if (roaster.timeSlot == index) {
          available = false;
          break;
        } else available = true;
      }
      let roaster = new Roaster(date, index, `JN#${index}`, available);
      roasters.push(roaster);
    }
    return roasters;
  }

  private getActualRoasters(date: Date): Roaster[] {
    let roasters: Roaster[] = [];
    for (let index = 1; index < 25; index++) {
      if (index % 2 == 0) {
        let roaster = new Roaster(date, index, `JN#${index}`);
        roasters.push(roaster);
      }
    }
    return roasters;
  }

  getDaysOfWeek(date: Date): DayOfWeek[] {
    let daysOfWeek: DayOfWeek[] = [];
    date = new Date();
    let monday = getWeekMondayByDate(date);
    let sunday = addDays(monday, 6);
    let dayOfWeek: DayOfWeek;
    let self = this;
    forEachDateInRange(monday, sunday, function(date: Date) {
      dayOfWeek = new DayOfWeek(
        WEEK_DAYS[date.getDay()],
        date,
        self.getRoasters(date)
      );
      daysOfWeek.push(dayOfWeek);
    });
    return daysOfWeek;
  }
}
