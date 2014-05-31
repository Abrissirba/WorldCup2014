using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MarionetteTips.Models
{
    [DataContract]
    public class CompetitionDTO
    {
        [DataMember]
        public Competition Competition { get; set; }

        [DataMember]
        public List<GroupDTO> Groups { get; set; }

    }
}