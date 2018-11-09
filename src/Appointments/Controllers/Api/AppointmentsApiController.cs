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
        public async Task<List<Phone>> GetPhoneLabels()
        {
            return await Task.Run(() => appointmentService.GetPhoneLabels());
        }
        public async Task<List<Email>> GetEmailLabels()
        {
            return await Task.Run(() => appointmentService.GetEmailLabels());
        }
        public async Task<List<BestTimesToCall>> GetBestTimesToCall()
        {
            return await Task.Run(() => appointmentService.GetTimesToCall());
        }
        public async Task<List<Suburbs>> GetSuburbs()
        {
            return await Task.Run(() => appointmentService.GetSuburbs());
        }
        public async Task<List<Regions>> GetRegions()
        {
            return await Task.Run(() => appointmentService.GetRegions());
        }
        public async Task<List<CustomerNameTypes>> GetCustomerNameTypes()
        {
            return await Task.Run(() => appointmentService.GetCustomerNameTypes());
        }
        public async Task<List<Roaster>> GetRoasters(DateTime date, int locationId)
        {
            return await Task.Run(() => appointmentService.GetRoasters(date,locationId));
        }
    }
}