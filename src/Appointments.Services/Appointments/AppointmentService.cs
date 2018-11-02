using Appointments.Repositories.Models;
using Appointments.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointments.Services.Appointments
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository repository;

        public AppointmentService(IAppointmentRepository repository)
        {
            this.repository = repository;
        }

        public List<Location> GetLocations()
        {
            return repository.GetLocations();
        }
        public List<Suburbs> GetSuburbs()
        {
            return repository.GetSuburbs();
        }
        public List<Regions> GetRegions()
        {
            return repository.GetRegions();
        }
        public List<Email> GetEmailLabels()
        {
            return repository.GetEmailLabels();
        }
        public List<Phone> GetPhoneLabels()
        {
            return repository.GetPhoneLabels();
        }
        public List<CustomerNameTypes> GetCustomerNameTypes()
        {
            return repository.GetCustomerNameTypes();
        }
        public List<BestTimesToCall> GetTimesToCall()
        {
            return repository.GetTimesToCall();
        }
        public List<Roaster> GetRoasters(DateTime date)
        {
            return repository.GetRoasters(date);
        }
    }
}
