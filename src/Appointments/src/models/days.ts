import { Roaster } from "./roaster";

export class DayOfWeek {
  name: string;
  date: Date;
  roasters: Roaster[];
  constructor(name: string, date: Date, roasters: Roaster[]) {
    this.name = name;
    this.date = date;
    this.roasters = roasters;
  }
}
