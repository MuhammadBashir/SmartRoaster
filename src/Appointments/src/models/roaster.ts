export class Roaster {
  date: Date;
  timeSlot: number;
  jobNumber: string;
  available: boolean;

  constructor(
    date: Date,
    timeSlot: number,
    jobNumber: string,
    available: boolean = true
  ) {
    this.date = date;
    this.timeSlot = timeSlot;
    this.jobNumber = jobNumber;
    this.available = available;
  }
}
