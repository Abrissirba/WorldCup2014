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

                    foreach (Group grup in groups)
                    {
                        List<GameDTO> games = (from g in grup.Game
                                               select new GameDTO()
                                               {
                                                   HomeTeam = g.Team,
                                                   AwayTeam = g.Team1,
                                                   HomeResult = g.HomeTeamResult,
                                                   AwayResult = g.AwayTeamResult,
                                                   date = g.Date,
                                                   userExcpectedHomeResult = g.UserGameExpectedResult.Where(t => t.UserID == userCompetition.UserID).Select(t => t.HomeResult).FirstOrNull(),
                                                   userExcpectedAwayResult = g.UserGameExpectedResult.Where(t => t.UserID == userCompetition.UserID).Select(t => t.AwayResult).FirstOrNull()
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
