using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MarionetteTips.Models
{
    [DataContract]
    public class UserGameDTO
    {
        [DataMember]
        public int ID { get; set; }

        [DataMember]
        public int GameID { get; set; }

        [DataMember]
        public Team HomeTeam { get; set; }

        [DataMember]
        public Team AwayTeam { get; set; }

        [DataMember]
        public int? HomeResult { get; set; }

        [DataMember]
        public int? AwayResult { get; set; }

        [DataMember]
        public DateTime? date { get; set; }

        [DataMember]
        public int? userExcpectedHomeResult { get; set; }

        [DataMember]
        public int? userExcpectedAwayResult { get; set; }

        [DataMember]
        public int? Score { get; set; }

        [DataMember]
        public int UserID { get; set; }
    }
}