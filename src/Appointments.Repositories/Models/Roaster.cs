using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointments.Repositories.Models
{
    public class Roaster
    {
        public DateTime RosterDate { get; set; }
        public List<RosterTimePeriod> RosterTimePeriods { get; set; }
    }
    public class RosterTimePeriod
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
    
}
