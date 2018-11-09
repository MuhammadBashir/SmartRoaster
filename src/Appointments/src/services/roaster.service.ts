import { RoasterApiModel } from "./../models/roaster-api-model";
import { Roaster } from "./../models/roaster";
import { Injectable } from "@angular/core";
import { getTimeSlot } from "./../common/common";

import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RoasterService {
  constructor(private http: HttpClient) {}
  getRoastersFromApi(
    date: Date,
    officeLocationId: number
  ): Observable<Roaster[]> {
    return this.http
      .get<RoasterApiModel[]>(
        `/api/appointment/GetRoasters?date=${date.toISOString()}&locationId=${officeLocationId}`
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
  getPhoneNumberOptions() {
    return this.http.get<any[]>("api/appointment/PhoneLabels");
  }
  getEmailOptions() {
    return this.http.get<any[]>("api/appointment/EmailLabels");
  }
  getBestTimeTocall() {
    return this.http.get<any[]>("api/appointment/BestTimeToCalls");
  }
  getSuburbs() {
    return this.http.get<any[]>("api/appointment/Suburbs");
  }
  getRegions() {
    return this.http.get<any[]>("api/appointment/Regions");
  }
  getSources() {
    return this.http.get<any[]>("api/appointment/Sources");
  }
}
