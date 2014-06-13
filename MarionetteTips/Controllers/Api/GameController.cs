using MarionetteTips.DAL;
using MarionetteTips.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MarionetteTips.Controllers.Api
{
    public class GameController : ApiController
    {
        // GET api/game
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/game/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/game
        public void Post([FromBody]string value)
        {
        }

        // PUT api/game/5
        [HttpPut]
        [ActionName("UpdateUserGame")]
        public IHttpActionResult UpdateUserGame(int id, [FromBody]UserGameDTO userGame)
        {
            try
            {
                var currentUser = UserDAL.getUser(User.Identity.Name);
                using (var db = new TipsEntities())
                {
                    if (currentUser != null)
                    {
                        var userGameExptectedResult = db.UserGameExpectedResult.Where(ug => ug.ID == userGame.ID && ug.UserID == currentUser.ID).FirstOrDefault();
                        if (userGameExptectedResult != null)
                        {
                            userGameExptectedResult.HomeResult = userGame.userExcpectedHomeResult.Value;
                            userGameExptectedResult.AwayResult = userGame.userExcpectedAwayResult.Value;
                            userGameExptectedResult.ModifiedBy = User.Identity.Name;
                            userGameExptectedResult.ModifiedDate = DateTime.UtcNow;
                            db.SaveChanges();
                            return Ok(userGame);
                        }
                        else
                        {
                            return BadRequest();
                        }
                    }
                    else
                    {
                        return BadRequest();
                    }

                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE api/game/5
        public void Delete(int id)
        {
        }
    }
}
