export class JobCustomerNameVm {
  firstName: string;
  lastName: string;
  jobId: number;
  jobCutomerNameId: number;
  jobCustomerNameTypeId: number;
  title: string;
  constructor(
    title: string,
    firstName: string,
    lastName: string,
    jobId: number,
    jobCustomerNameId: number,
    jobCustomerNameTypeId: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobId = jobId;
    this.jobCutomerNameId = jobCustomerNameId;
    this.jobCustomerNameTypeId = jobCustomerNameTypeId;
    this.title = title;
  }
}
