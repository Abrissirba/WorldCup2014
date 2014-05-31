using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MarionetteTips.Models
{
    [DataContract]
    public class GroupDTO
    {
        [DataMember]
        public int ID { get; set; }

        [DataMember]
        public String Title { get; set; }

        [DataMember]
        public int CompetitionID { get; set; }

        [DataMember]
        public List<GameDTO> Games { get; set; }
    }
}