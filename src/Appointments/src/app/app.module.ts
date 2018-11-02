import { HttpClient } from "selenium-webdriver/http";
import { RoasterService } from "../services/roaster.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DateFnsModule } from "ngx-date-fns";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ScrollbarDirective } from "./Directives/scrollbar.directive";

@NgModule({
  declarations: [AppComponent, ScrollbarDirective],
  imports: [BrowserModule, HttpClientModule, DateFnsModule.forRoot()],
  providers: [RoasterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
