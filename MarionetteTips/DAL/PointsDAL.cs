using MarionetteTips.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarionetteTips.DAL
{
    public class PointsDAL
    {
        public List<UserPointDTO> getPointsPerUserForCompetition(int competitionID)
        {
            using (var db = new TipsEntities())
            {
                var games = (from c in db.Competition
                             join gr in db.Group on c.ID equals gr.CompetitionID
                             join g in db.Game on gr.ID equals g.GroupID
                             join ug in db.UserGameExpectedResult on g.ID equals ug.GameID
                             where c.ID == competitionID
                             select new UserPoint
                             {
                                 UserID = ug.UserID,
                                 GameID = g.ID,
                                 HomeResult = g.HomeTeamResult,
                                 AwayResult = g.AwayTeamResult,
                                 U_HomeResult = ug.HomeResult,
                                 U_AwayResult = ug.AwayResult
                             }).ToList();

                List<UserPointDTO> pointsPerUser = (from g in games
                                     group g.Points by g.UserID into ppu
                                     select new UserPointDTO { UserID = ppu.Key, Points = ppu.Sum() }
                                    ).ToList();

                return pointsPerUser;
            }
        }

        public int? getGameScore(int? homeResult, int? awayResult, int? u_homeResult, int? u_awayResult)
        {
            int? fullPoints = 10;
            if (homeResult != null && awayResult != null && u_homeResult != null && u_awayResult != null)
            {
                if (homeResult == u_homeResult && awayResult == u_awayResult)
                    fullPoints = fullPoints;
                else if (homeResult > awayResult && u_homeResult > u_awayResult)
                {
                    fullPoints -= 3;
                    fullPoints -= Math.Max(homeResult.Value, u_homeResult.Value) - Math.Min(homeResult.Value, u_homeResult.Value);
                    fullPoints -= Math.Max(awayResult.Value, u_awayResult.Value) - Math.Min(awayResult.Value, u_awayResult.Value);
                }
                else if (homeResult == awayResult && u_homeResult == u_awayResult)
                {
                    fullPoints -= 3;
                    fullPoints -= Math.Max(homeResult.Value, u_homeResult.Value) - Math.Min(homeResult.Value, u_homeResult.Value);
                    fullPoints -= Math.Max(awayResult.Value, u_awayResult.Value) - Math.Min(awayResult.Value, u_awayResult.Value);
                }
                else if (homeResult < awayResult && u_homeResult < u_awayResult)
                {
                    fullPoints -= 3;
                    fullPoints -= Math.Max(homeResult.Value, u_homeResult.Value) - Math.Min(homeResult.Value, u_homeResult.Value);
                    fullPoints -= Math.Max(awayResult.Value, u_awayResult.Value) - Math.Min(awayResult.Value, u_awayResult.Value);
                }
                else
                {
                    fullPoints = 0;
                }
            }
            else
            {
                fullPoints = null;
            }
            return fullPoints;
        }
    }
}