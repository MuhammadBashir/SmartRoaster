using Appointments.Repositories.Models;
using Appointments.Services.Appointments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Appointments.Controllers.Api
{
    public class AppointmentsApiController : ApiController
    {
        private readonly IAppointmentService appointmentService;

        public AppointmentsApiController(IAppointmentService appointmentService)
        {
            this.appointmentService = appointmentService;
        }

        public async Task<List<Location>> GetLocations()
        {
            return await Task.Run(() => appointmentService.GetLocations());
        }
    }
}