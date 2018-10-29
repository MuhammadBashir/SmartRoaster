using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Appointments.Repositories.MockRepositories;
using Autofac;

namespace Appointments.Repositories.Modules
{
    public class RepositoriesModule :  Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var currentAssembly = typeof(RepositoriesModule).GetTypeInfo().Assembly;
            builder.RegisterAssemblyTypes(currentAssembly)
                .InNamespaceOf<AppointmentMockRepository>()
                .AsImplementedInterfaces()
                .AsSelf();
        }
    }
}
