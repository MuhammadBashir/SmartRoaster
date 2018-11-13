import { RoasterApiModel } from "./../models/roaster-api-model";
import { Roaster } from "./../models/roaster";
import { Injectable } from "@angular/core";
import { getTimeSlot } from "./../common/common";

import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AppointmentCreatedVm } from "../models/appointment-created";

@Injectable({
  providedIn: "root"
})
export class RoasterService {
  baseUrl = "http://115.70.199.185/api/appointment";
  //baseUrl = "/api/appointment";

  constructor(private http: HttpClient) {}
  getRoastersFromApi(
    date: Date,
    officeLocationId: number
  ): Observable<Roaster[]> {
    return this.http
      .get<RoasterApiModel[]>(
        `${
          this.baseUrl
        }/rostertime?selectedDate=${date.toISOString()}&locationId=${officeLocationId}`
      )
      .pipe(
        map(rootArray => {
          let roasterArray: Roaster[] = [];
          rootArray.forEach(model => {
            model.rosterTimePeriods.forEach(tp => {
              const { startTime } = tp;
              const time = new Date(startTime);
              let roster = new Roaster(time, getTimeSlot(time), "jn", false);
              roasterArray.push(roster);
            });
          });
          return roasterArray;
        })
      );
  }
  getOfficeLocations() {
    return this.http.get<any[]>(`${this.baseUrl}/officelocations`);
  }
  getPhoneNumberOptions() {
    return this.http.get<any[]>(`${this.baseUrl}/phoneLabels`);
  }
  getEmailOptions() {
    return this.http.get<any[]>(`${this.baseUrl}/emailLabels`);
  }
  getBestTimeTocall() {
    return this.http.get<any[]>(`${this.baseUrl}/besttimetocalls`);
  }
  getSuburbs() {
    return this.http.get<any[]>(`/api/appointment/suburbs`);
  }
  getRegions() {
    return this.http.get<any[]>(`${this.baseUrl}/regions`);
  }
  getSources() {
    return this.http.get<any[]>(`${this.baseUrl}/sources`);
  }
  createAppointment(appointmentPayLoad) {
    return this.http.post<AppointmentCreatedVm>(
      `${this.baseUrl}/CreateAppointmentJob`,
      appointmentPayLoad
    );
  }
}
