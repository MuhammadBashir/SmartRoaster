using Appointments.Repositories.Models;
using Appointments.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointments.Repositories.MockRepositories
{
    public class AppointmentMockRepository : IAppointmentRepository
    {
        public List<Location> GetLocations()
        {
            return new List<Location>
            {
                new Location
                {
                    OfficeLocationId = 1,
                    Name = "Rocklea"
                },
                new Location
                {
                    OfficeLocationId = 2,
                    Name = "Chermside"
                },
                new Location
                {
                    OfficeLocationId = 3,
                    Name = "Gold Coast"
                },

            };
        }
        public List<Phone> GetPhoneLabels()
        {
            return new List<Phone>
            {
                new Phone
                {
                    PhoneLabelId = 1,
                    PhoneLabelName = "Home"
                },
                new Phone
                {
                    PhoneLabelId = 2,
                    PhoneLabelName = "Mobile"
                },
                new Phone
                {
                    PhoneLabelId = 3,
                    PhoneLabelName = "Work"
                },
                new Phone
                {
                    PhoneLabelId = 4,
                    PhoneLabelName = "Fax"
                },
                new Phone
                {
                    PhoneLabelId = 5,
                    PhoneLabelName = "Mobile 2"
                },
                new Phone
                {
                    PhoneLabelId = 6,
                    PhoneLabelName = "Work 2"
                }

            };
        }
        public List<Email> GetEmailLabels()
        {
            return new List<Email>
            {
                new Email
                {
                    EmailLabelId = 1,
                    EmailLabel = "Personal"
                },
                new Email
                {
                    EmailLabelId = 2,
                    EmailLabel = "Work"
                },
                new Email
                {
                    EmailLabelId = 3,
                    EmailLabel = "Other"
                },

            };
        }
        public List<BestTimesToCall> GetTimesToCall()
        {
            return new List<BestTimesToCall>
            {
                new BestTimesToCall
                {
                    BestTimeToCallId = 1,
                    OptionName = "Anyday 9am to 5pm"
                },
                new BestTimesToCall
                {
                    BestTimeToCallId = 2,
                    OptionName = "Anyday Evening"
                },
                new BestTimesToCall
                {
                    BestTimeToCallId = 3,
                    OptionName = "Anyday Afternoon"
                },
                new BestTimesToCall
                {
                    BestTimeToCallId = 4,
                    OptionName = "Anyday Midday"
                },
                new BestTimesToCall
                {
                    BestTimeToCallId = 5,
                    OptionName = "Anyday Morning"
                }
            };
        }
        public List<Suburbs> GetSuburbs()
        {
            return new List<Suburbs>
            {
                new Suburbs
                {
                    SuburbId = 1,
                    Suburb = "WUTUL",
                    StateName = "QLD",
                    PostCode = "4352"
                },
                new Suburbs
                {
                    SuburbId = 2,
                    Suburb = "ANDREWS",
                    StateName = "QLD",
                    PostCode = "4220"
                },
                new Suburbs
                {
                    SuburbId = 3,
                    Suburb = "ANSTEAD",
                    StateName = "QLD",
                    PostCode = "4070"
                },
                new Suburbs
                {
                    SuburbId = 10,
                    Suburb = "ASHGROVE",
                    StateName = "QLD",
                    PostCode = "4060"
                },
                new Suburbs
                {
                    SuburbId = 11,
                    Suburb = "ASHMORE",
                    StateName = "QLD",
                    PostCode = "4214"
                },
                new Suburbs
                {
                    SuburbId = 12,
                    Suburb = "AUSTINVILLE",
                    StateName = "QLD",
                    PostCode = "4213"
                },
                new Suburbs
                {
                    SuburbId = 13,
                    Suburb = "BALD HILLS",
                    StateName = "QLD",
                    PostCode = "4036"
                }
            };
        }
        public List<Regions> GetRegions()
        {
            return new List<Regions>
            {
                new Regions
                {
                    RegionUid = new Guid("ebb41d37-9e6f-4dbc-ab51-04a75146bdf7"),
                    RegionName = "COFFS HARBOUR"
                },
                new Regions
                {
                    RegionUid = new Guid("0b1e0fcd-25e2-4899-9593-0916533ffda1"),
                    RegionName = "PORT MACQUARIE"
                },
                new Regions
                {
                    RegionUid = new Guid("fbfac3bb-64a9-4dde-9f0f-319b5bbbcfa8"),
                    RegionName = "GLADSTONE"
                },
                new Regions
                {
                    RegionUid = new Guid("9bc2a00a-ac60-4274-b709-58c474d31954"),
                    RegionName = "HINTERLAND"
                },
                new Regions
                {
                    RegionUid = new Guid("70a5c068-579e-4066-9ae0-58eed67446c5"),
                    RegionName = "SOUTH BURNETT"
                },
                new Regions
                {
                    RegionUid = new Guid("dae30b5a-d8c1-4e20-92bc-5f6f076ded78"),
                    RegionName = "NORTHERN RIVERS B"
                },
                new Regions
                {
                    RegionUid = new Guid("298c9256-c161-40cf-9396-67d93d708230"),
                    RegionName = "SYDNEY"
                }
            };
        }
        public List<CustomerNameTypes> GetCustomerNameTypes()
        {
            return new List<CustomerNameTypes>
            {
                new CustomerNameTypes
                {
                    JobCustomerNameTypeId = 1,
                    JobCustomerNameType = "Customer"
                },
                new CustomerNameTypes
                {
                    JobCustomerNameTypeId = 2,
                    JobCustomerNameType = "Contact"
                },
                new CustomerNameTypes
                {
                    JobCustomerNameTypeId = 3,
                    JobCustomerNameType = "New Owner"
                }
            };
        }
        public List<Roaster> GetRoasters(DateTime date, int locationId)
        {
            var roasterDate = new DateTime(2018, 11, 02);
            var rosters =  new List<Roaster>
            {
                new Roaster
                {
                    RosterDate = roasterDate,
                    RosterTimePeriods = new List<RosterTimePeriod>
                    {
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,02,08,00,00),
                            EndTime = new DateTime(2018,11,02,08,00,00).AddMinutes(30)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,02,09,00,00),
                            EndTime = new DateTime(2018,11,02,09,30,00)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,02,10,00,00),
                            EndTime = new DateTime(2018,11,02,10,30,00).AddMinutes(30)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,02,11,00,00),
                            EndTime = new DateTime(2018,11,02,11,30,00).AddMinutes(30)
                        }

                    },
                    
                },
                new Roaster
                {
                    RosterDate = roasterDate.AddDays(1),
                    RosterTimePeriods = new List<RosterTimePeriod>
                    {
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,03,08,00,00),
                            EndTime = new DateTime(2018,11,03,03,00,00)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,03,09,00,00),
                            EndTime = new DateTime(2018,11,03,09,30,00)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,03,10,00,00),
                            EndTime = new DateTime(2018,11,03,10,30,00)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,03,11,00,00),
                            EndTime = new DateTime(2018,11,03,11,30,00)
                        }
                    },

                },
                new Roaster
                {
                    RosterDate = roasterDate.AddDays(2),
                    RosterTimePeriods = new List<RosterTimePeriod>
                    {
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,04,08,00,00),
                            EndTime = new DateTime(2018,11,04,08,00,00)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,04,09,00,00),
                            EndTime = new DateTime(2018,11,04,09,30,00)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,04,10,00,00),
                            EndTime = new DateTime(2018,11,04,10,30,00)
                        },
                        new RosterTimePeriod
                        {
                            StartTime = new DateTime(2018,11,04,11,00,00),
                            EndTime = new DateTime(2018,11,04,11,30,00)
                        }
                    }
                }
            };
            return rosters.Where(r => r.RosterDate.Date >= date.Date && r.RosterDate <= date.AddDays(7)).ToList();
        }
    }
}
