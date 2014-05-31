using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MarionetteTips.Models
{
    [DataContract]
    public class UserCompetitionDTO
    {
        [DataMember]
        public int ID { get; set; }
        [DataMember]
        public User User { get; set; }
        [DataMember]
        public int CompetitionID { get; set; }
    }
}