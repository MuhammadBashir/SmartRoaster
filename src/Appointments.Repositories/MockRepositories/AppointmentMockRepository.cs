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
    }
}
