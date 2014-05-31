using MarionetteTips.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebMatrix.WebData;

namespace MarionetteTips.Controllers.Api
{
    public class UserController : ApiController
    {
        // GET api/user
        public IHttpActionResult Get()
        {
            return Ok("ok");
        }

        // GET api/user/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/user
        public IHttpActionResult Post([FromBody]ClientUserDTO clientUserDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    User user = new User()
                    {
                        Email = clientUserDTO.Email,
                        FirstName = clientUserDTO.FirstName,
                        LastName = clientUserDTO.LastName,
                        Password = clientUserDTO.Password,
                        CreatedBy = "Register",
                        ModifiedBy = "Register",
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow
                    };

                    using (var db = new TipsEntities())
                    {
                        var userNameExists = db.User.Where(u => u.Email == user.Email).Count() != 0;
                        if (userNameExists)
                        {
                            return BadRequest("1");
                        }

                        db.User.Add(user);
                        db.SaveChanges();
                        WebSecurity.CreateAccount(user.Email, user.Password, false);
                        return Ok(user);
                    }

                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex){
                return InternalServerError(ex);
            }
            
        }

        // PUT api/user/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE api/user/5
        public void Delete(int id)
        {
        }
    }
}
