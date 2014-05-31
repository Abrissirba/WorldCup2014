using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarionetteTips.Models
{
    public class GameDTO
    {
        public Team HomeTeam { get; set; }

        public Team AwayTeam { get; set; }

        public int? HomeResult { get; set; }

        public int? AwayResult { get; set; }

        public DateTime? date { get; set; }

        public int? userExcpectedHomeResult { get; set; }

        public int? userExcpectedAwayResult { get; set; }
    }
}