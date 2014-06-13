using MarionetteTips.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MarionetteTips.Extensions;
using MarionetteTips.DAL;

namespace MarionetteTips.Controllers.Api
{
    public class UserCompetitionController : ApiController
    {
        // GET api/competition/5
        public IHttpActionResult Get(int id)
        {
            using (var db = new TipsEntities())
            {
                var userCompetition = db.UserCompetition.Where(uc => uc.ID == id).FirstOrDefault();
                if (userCompetition != null)
                {
                    var entities = (from c in db.Competition
                                    join g in db.Group on c.ID equals g.CompetitionID
                                    join ga in db.Game on g.ID equals ga.GroupID
                                    where g.CompetitionID == userCompetition.CompetitionID
                                    select new { Competition = c, Group = g, Game = g }).ToList();

                    Competition competition = (from e in entities
                                               select e.Competition).FirstOrDefault();
                    var groups = (from e in entities
                                  select e.Group).Distinct();

                    List<GroupDTO> groupDTO = new List<GroupDTO>();

                    PointsDAL pointsDAL = new PointsDAL();
                    foreach (Group grup in groups)
                    {
                        List<UserGameDTO> games = (from g in grup.Game
                                                    select new UserGameDTO()
                                                   {
                                                       ID = g.UserGameExpectedResult.Where(t => t.UserID == userCompetition.UserID).Select(t => t.ID).FirstOrDefault(),
                                                       UserID = g.UserGameExpectedResult.Where(t => t.UserID == userCompetition.UserID).Select(t => t.UserID).FirstOrDefault(),
                                                       GameID = g.ID,
                                                       HomeTeam = g.Team1,
                                                       AwayTeam = g.Team,
                                                       HomeResult = g.HomeTeamResult,
                                                       AwayResult = g.AwayTeamResult,
                                                       date = g.Date,
                                                       userExcpectedHomeResult = g.UserGameExpectedResult.Where(t => t.UserID == userCompetition.UserID).Select(t => t.HomeResult).FirstOrNull(),
                                                       userExcpectedAwayResult = g.UserGameExpectedResult.Where(t => t.UserID == userCompetition.UserID).Select(t => t.AwayResult).FirstOrNull(),
                                                       Score = pointsDAL.getGameScore(g.HomeTeamResult, g.AwayTeamResult, g.UserGameExpectedResult.Where(t => t.UserID == userCompetition.UserID).Select(t => t.HomeResult).FirstOrNull(), g.UserGameExpectedResult.Where(t => t.UserID == userCompetition.UserID).Select(t => t.AwayResult).FirstOrNull())
                                                   }).ToList();
                        groupDTO.Add(new GroupDTO() { ID = grup.ID, Title = grup.Title, CompetitionID = grup.CompetitionID, Games = games });
                    }
                    CompetitionDTO competitionDTO = new CompetitionDTO() { Competition = competition, Groups = groupDTO };
                    return Ok(competitionDTO);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        // POST api/usercompetition
        public IHttpActionResult Post([FromBody]UserCompetitionDTO userCompetitionDTO)
        {
            using (var db = new TipsEntities())
            {
                var currentUser = UserDAL.getUser(User.Identity.Name);
                if (db.UserCompetition.Where(uc => uc.UserID == currentUser.ID && uc.CompetitionID == userCompetitionDTO.CompetitionID).Count() == 0)
                {
                    UserCompetition userCompetition = new UserCompetition()
                    {
                        CompetitionID = userCompetitionDTO.CompetitionID,
                        UserID = currentUser.ID,
                        CreatedBy = currentUser.Email,
                        ModifiedBy = currentUser.Email,
                        ModifiedDate = DateTime.UtcNow,
                        CreatedDate = DateTime.UtcNow
                    };
                    db.UserCompetition.Add(userCompetition);

                    var games = (from g in db.Game
                                join gr in db.Group on g.GroupID equals gr.ID
                                join c in db.Competition on gr.CompetitionID equals c.ID
                                where c.ID == userCompetitionDTO.CompetitionID
                                select g).ToList();

                    foreach(Game g in games)
                    {
                        UserGameExpectedResult userGame = new UserGameExpectedResult()
                        {
                            GameID = g.ID,
                            UserID = currentUser.ID,
                            ModifiedBy = currentUser.Email,
                            CreatedBy = currentUser.Email,
                            ModifiedDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                        };
                        db.UserGameExpectedResult.Add(userGame);
                    }

                    db.SaveChanges();
                    userCompetitionDTO.ID = userCompetition.ID;
                    return Ok(userCompetitionDTO);
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        // PUT api/usercompetition/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/usercompetition/5
        public void Delete(int id)
        {
        }
    }
}
