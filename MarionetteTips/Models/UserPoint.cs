using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarionetteTips.Models
{
    public class UserPoint
    {
        public int UserID { get; set; }

        public int GameID { get; set; }

        public int? HomeResult { get; set; }

        public int? AwayResult { get; set; }

        public int? U_HomeResult { get; set; }

        public int? U_AwayResult { get; set; }

        public int Points 
        { 
            get
            {
                int fullPoints = 10;
                if (HomeResult != null && AwayResult != null && U_HomeResult != null && U_AwayResult != null)
                {
                    if (HomeResult == U_HomeResult && AwayResult == U_AwayResult)
                        fullPoints = fullPoints;
                    else if (HomeResult > AwayResult && U_HomeResult > U_AwayResult)
                    {
                        fullPoints -= 3;
                        fullPoints -= Math.Max(HomeResult.Value, U_HomeResult.Value) - Math.Min(HomeResult.Value, U_HomeResult.Value);
                        fullPoints -= Math.Max(AwayResult.Value, U_AwayResult.Value) - Math.Min(AwayResult.Value, U_AwayResult.Value);
                    }
                    else if (HomeResult == AwayResult && U_HomeResult == U_AwayResult)
                    {
                        fullPoints -= 3;
                        fullPoints -= Math.Max(HomeResult.Value, U_HomeResult.Value) - Math.Min(HomeResult.Value, U_HomeResult.Value);
                        fullPoints -= Math.Max(AwayResult.Value, U_AwayResult.Value) - Math.Min(AwayResult.Value, U_AwayResult.Value);
                    }
                    else if (HomeResult < AwayResult && U_HomeResult < U_AwayResult)
                    {
                        fullPoints -= 3;
                        fullPoints -= Math.Max(HomeResult.Value, U_HomeResult.Value) - Math.Min(HomeResult.Value, U_HomeResult.Value);
                        fullPoints -= Math.Max(AwayResult.Value, U_AwayResult.Value) - Math.Min(AwayResult.Value, U_AwayResult.Value);
                    }
                    else
                    {
                        fullPoints = 0;
                    }
                }
                else
                {
                    fullPoints = 0;
                }

                return fullPoints;
            }
        }
    }
}