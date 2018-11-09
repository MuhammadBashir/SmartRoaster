using System;
using System.Collections.Generic;

namespace Appointments.ViewModels
{
    public class OfficeLocationVm
    {
        public int OfficeLocationId { get; set; }
        public string Name { get; set; }
    }

    public class RosterTimeVm
    {
        public DateTime RosterDate { get; set; }
        public List<TimePeriodVm> RosterTimePeriods { get; set; }
    }

    public class TimePeriodVm
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }

    public class BestTimeToCallVm
    {
        public int BestTimeToCallId { get; set; }
        public string OptionName { get; set; }
    }

    public class SuburbVm
    {
        public int SuburbId { get; set; }
        public int PostCode { get; set; }
        public string Suburb { get; set; }
        public string StateName { get; set; }
    }

    public class RegionVm
    {
        public Guid RegionUid { get; set; }
        public string RegionName { get; set; }
    }

    public class CustomerNameTypeVm
    {
        public int JobCustomerNameTypeId { get; set; }
        public string JobCustomerNameType { get; set; }
    }

    public class PhoneLabelVm
    {
        public int PhoneLabelId { get; set; }
        public string PhoneLabel { get; set; }
    }

    public class EmailLabelVm
    {
        public int EmailLabelId { get; set; }
        public string EmailLabel { get; set; }
    }

    public class SourceVm
    {
        public int SourceId { get; set; }
        public string SourceName { get; set; }
    }

    public class AppointmentCreatedVm
    {
        public int JobId { get; set; }
        public string SalesPersonName { get; set; }
        public string SalesPersonMobile { get; set; }
    }

    public class AppointmentJobVm
    {
        public JobVm JobVm { get; set; }
        public AppointmentVm AppointmentVm { get; set; }
        public List<JobCustomerNameVm> JobCustomerNameVmList { get; set; }
        public List<JobPhoneNumberVm> JobPhoneNumberVmList { get; set; }
        public List<JobEmailAddressVm> JobEmailAddressVmList { get; set; }
        public JobAddressVm JobAddressVm { get; set; }
    }

    public class JobVm
    {
        public int JobId { get; set; }
        public Guid? JobUid { get; set; }
        public string JobNumber { get; set; }
        public int JobCustomerTypeId { get; set; }
        public Guid? RegionUid { get; set; }
        public int OfficeId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAbn { get; set; }
        public string CompanyAcn { get; set; }
        public int? BestTimeToCallId { get; set; }
        public bool? CopyTo { get; set; }
        public Guid? AddedBy { get; set; }
        public int? JobStatus { get; set; }
        public int? SourceId { get; set; }
        public int? Client { get; set; }
        public int? LandLocationId { get; set; }
    }

    public class AppointmentVm
    {
        public DateTime AppointmentDate { get; set; }
        public int? AppointmentLocation { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int SalesmanId { get; set; }
        public int JobId { get; set; }
        public int? TypeId { get; set; }
        public int? SourceId { get; set; }
        public Guid? AddedBy { get; set; }
        public DateTime? DateAdded { get; set; }
        public int? Status { get; set; }
    }

    public class JobCustomerNameVm
    {
        public int JobCustomerNameId { get; set; }
        public int JobId { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int JobCustomerNameTypeId { get; set; }
    }

    public class JobPhoneNumberVm
    {
        public int JobPhoneNumberId { get; set; }
        public int JobId { get; set; }
        public string PhoneNumber { get; set; }
        public int PhoneLabelId { get; set; }
        public int JobCustomerNameTypeId { get; set; }
    }

    public class JobEmailAddressVm
    {
        public int JobEmailAddressId { get; set; }
        public int JobId { get; set; }
        public string EmailAddress { get; set; }
        public int EmailLabelId { get; set; }
        public int JobCustomerNameTypeId { get; set; }

    }

    public class JobAddressVm
    {
        public int JobAddressId { get; set; }
        public int JobId { get; set; }
        public int JobAddressTypeId { get; set; }
        public string StreetNumber { get; set; }
        public string LotNumber { get; set; }
        public string StreetLine1 { get; set; }
        public string StreetLine2 { get; set; }
        public string Suburb { get; set; }
        public string State { get; set; }
        public int? PostCode { get; set; }
    }
}
