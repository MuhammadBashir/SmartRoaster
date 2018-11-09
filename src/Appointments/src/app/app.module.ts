import { RoasterService } from "../services/roaster.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DateFnsModule } from "ngx-date-fns";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { AppComponent } from "./app.component";
import { AddScheduleComponent } from "./add-schedule.component";

@NgModule({
  declarations: [AppComponent, AddScheduleComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DateFnsModule.forRoot(),
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [RoasterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
