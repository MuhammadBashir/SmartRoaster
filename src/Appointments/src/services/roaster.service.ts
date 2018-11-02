import { rosterTimePeriods } from "./../models/roaster-time-periods";
import { RoasterApiModel } from "./../models/roaster-api-model";
import { Http } from "@angular/http";
import { DayOfWeek } from "./../models/days";
import { Roaster } from "./../models/roaster";
import { Injectable } from "@angular/core";
import {
  getWeekMondayByDate,
  WEEK_DAYS,
  forEachDateInRange,
  getTimeSlot
} from "./../common/common";

import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RoasterService {
  constructor(private http: HttpClient) {}
  getRoastersFromApi(date: Date): Observable<Roaster[]> {
    return this.http
      .get<RoasterApiModel[]>(
        "/api/appointment/GetRoasters?date=" + date.toISOString()
      )
      .pipe(
        map(rootArray => {
          let roasterArray: Roaster[] = [];
          rootArray.forEach(model => {
            model.rosterTimePeriods.forEach(tp => {
              const { startTime } = tp;
              const time = new Date(startTime);
              let roster = new Roaster(time, getTimeSlot(time), "jn", true);
              roasterArray.push(roster);
            });
          });
          return roasterArray;
        })
      );
  }
  getOfficeLocations() {
    return this.http.get<any[]>("api/appointment/officelocations");
  }
}
