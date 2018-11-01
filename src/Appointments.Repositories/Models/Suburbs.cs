using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointments.Repositories.Models
{
    public class Suburbs
    {
        public int SuburbId { get; set; }
        public string Suburb { get; set; }
        public string StateName { get; set; }
        public string PostCode { get; set; }
    }
}
