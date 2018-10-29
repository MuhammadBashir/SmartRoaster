using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace Appointments
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/ClientApp/runtime.js",
                "~/Scripts/ClientApp/polyfills.js",
                "~/Scripts/ClientApp/styles.js",
                "~/Scripts/ClientApp/vendor.js",
                "~/Scripts/ClientApp/main.js"
                ));

        }
    }
}
