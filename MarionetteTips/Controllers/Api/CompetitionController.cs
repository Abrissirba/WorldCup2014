using MarionetteTips.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MarionetteTips.Extensions;
using System.Threading.Tasks;
using MarionetteTips.DAL;
using System.Web.Routing;

namespace MarionetteTips.Controllers.Api
{
    public class CompetitionController : ApiController
    {
        // GET api/competition
        public IHttpActionResult Get()
        {
            using (var db = new TipsEntities())
            {
                var competitions = (from c in db.Competition
                            select c);
                return Ok(competitions.ToList());
            }
        }

        // GET api/competition/5
        public IHttpActionResult Get(int id)
        {
            using (var db = new TipsEntities())
            {
                Competition competition = db.Competition.Where(c => c.ID == id).FirstOrDefault();
                List<UserCompetitionDTO> userCompetitionDTO = db.UserCompetition
                                                                .Where(uc => uc.CompetitionID == id)
                                                                .Select(uc => new UserCompetitionDTO() { ID = uc.ID, CompetitionID = uc.Competition.ID, User = uc.User })
                                                                .ToList();
                var currentUser = UserDAL.getUser(User.Identity.Name);
                bool userParticipateInCompetition = false;
                if (currentUser != null)
                {
                    userParticipateInCompetition = db.UserCompetition.Where(uc => uc.CompetitionID == id && uc.UserID == currentUser.ID).Count() > 0;
                }
                CompetitionInfoDTO competitionInfoDTO = new CompetitionInfoDTO() { Competition = competition, UserCompetition = userCompetitionDTO, UserParticipateInCompetition = userParticipateInCompetition };
                return Ok(competitionInfoDTO);
            }
        }

        // POST api/competition
        public void Post([FromBody]string value)
        {
        }

        // PUT api/competition/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/competition/5
        public void Delete(int id)
        {
        }
    }
}
