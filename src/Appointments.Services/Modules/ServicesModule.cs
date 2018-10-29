using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Appointments.Services.Appointments;
using Autofac;

namespace Appointments.Services.Modules
{
    public class ServicesModule: Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var currentAssembly = typeof(ServicesModule).GetTypeInfo().Assembly;
            builder.RegisterAssemblyTypes(currentAssembly)
                .InNamespaceOf<AppointmentService>()
                .AsImplementedInterfaces()
                .AsSelf();
        }
    }
}
