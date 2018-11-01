import { Roaster } from "./roaster";

export class TimeSlot {
  timeSlotId: number;
  timeSlot: string;
  roasters: Roaster[];
  constructor(timeSlotId: number, timeSlot: string, roasters: Roaster[]) {
    this.timeSlotId = timeSlotId;
    this.timeSlot = timeSlot;
    this.roasters = roasters;
  }
}
