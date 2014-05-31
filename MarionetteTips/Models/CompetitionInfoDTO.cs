﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MarionetteTips.Models
{
    [DataContract]
    public class CompetitionInfoDTO
    {
        [DataMember]
        public Competition Competition { get; set; }

        [DataMember]
        public List<UserCompetitionDTO> UserCompetition { get; set; }

        [DataMember]
        public bool UserParticipateInCompetition { get; set; }
    }
}