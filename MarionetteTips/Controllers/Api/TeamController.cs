using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MarionetteTips.Controllers.Api
{
    public class TeamController : ApiController
    {


        // GET api/team
        public IEnumerable<Team> Get()
        {
            using (var db = new TipsEntities())
            {
                var teams = from t in db.Team
                            orderby t.Title
                            select t;
                return teams.ToList();
            }
            
        }

        // GET api/team/5
        public Team Get(int id)
        {
            using (var db = new TipsEntities())
            {
                var team = (from t in db.Team
                            where t.ID == id
                            select t).FirstOrDefault();
                return team;
            }
        }

        // POST api/team
        public Team Post([FromBody]Team teamFromClient)
        {
            if (ModelState.IsValid)
            {
                using (var db = new TipsEntities())
                {
                    db.Team.Add(teamFromClient);
                    db.SaveChanges();
                    return teamFromClient;
                }
            }
            else
                return null;
        }

        // PUT api/team/5
        public void Put(int id, [FromBody]Team teamFromClient)
        {
            using (var db = new TipsEntities())
            {
                var team = (from t in db.Team
                            where t.ID == id
                            select t).FirstOrDefault();

                team.Title = teamFromClient.Title;
                team.Logo = teamFromClient.Logo;
                team.CityID = teamFromClient.CityID;
                team.ModifiedDate = DateTime.UtcNow;
                db.SaveChanges();
            }
        }

        // DELETE api/team/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (var db = new TipsEntities())
                {
                    Team team = db.Team.SingleOrDefault<Team>(t => t.ID == id);
                    db.Team.Remove(team);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
