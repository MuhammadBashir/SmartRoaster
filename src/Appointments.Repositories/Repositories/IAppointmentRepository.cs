using Appointments.Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointments.Repositories.Repositories
{
    public interface IAppointmentRepository
    {
        List<Location> GetLocations();
    }
}
