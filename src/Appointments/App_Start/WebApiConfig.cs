using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace Appointments
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            //config.SuppressDefaultHostAuthentication();
            //config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            config.Formatters.JsonFormatter.SupportedMediaTypes
                    .Add(new MediaTypeHeaderValue("text/html"));

            // Use camel case for JSON data.
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "GetAllLocations",
                routeTemplate: "api/appointment/officelocations",
                defaults: new { controller = "AppointmentsApi", action = "GetLocations" }
            );
            config.Routes.MapHttpRoute(
                name: "GetPhoneLabels",
                routeTemplate: "api/appointment/PhoneLabels",
                defaults: new { controller = "AppointmentsApi", action = "GetPhoneLabels" }
            );
            config.Routes.MapHttpRoute(
                name: "GetEmailLabels",
                routeTemplate: "api/appointment/EmailLabels",
                defaults: new { controller = "AppointmentsApi", action = "GetEmailLabels" }
            );
            config.Routes.MapHttpRoute(
                name: "GetBestTimesToCall",
                routeTemplate: "api/appointment/BestTimeToCalls",
                defaults: new { controller = "AppointmentsApi", action = "GetBestTimesToCall" }
            );
            config.Routes.MapHttpRoute(
                name: "GetSuburbs",
                routeTemplate: "api/appointment/Suburbs",
                defaults: new { controller = "AppointmentsApi", action = "GetSuburbs" }
            );
            config.Routes.MapHttpRoute(
                name: "GetRegions",
                routeTemplate: "api/appointment/Regions",
                defaults: new { controller = "AppointmentsApi", action = "GetRegions" }
            );
            config.Routes.MapHttpRoute(
                name: "GetCustomerNameTypes",
                routeTemplate: "api/appointment/CustomerNameTypes",
                defaults: new { controller = "AppointmentsApi", action = "GetCustomerNameTypes" }
            );
            config.Routes.MapHttpRoute(
                name: "GetRoasters",
                routeTemplate: "api/appointment/GetRoasters",
                defaults: new { controller = "AppointmentsApi", action = "GetRoasters" }
            );
        }
    }
}
