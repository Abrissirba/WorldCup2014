using MarionetteTips.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Security;
using WebMatrix.WebData;

namespace MarionetteTips.Controllers.Api
{
    public class LoginController : ApiController
    {
        // GET api/login/5
        public IHttpActionResult Get()
        {
            var userEmail = User.Identity.Name;
            using (var db = new TipsEntities())
            {
                var user = db.User.Where(u => u.Email == userEmail).FirstOrDefault();
                return Ok(user);
            }
        }

        public IHttpActionResult Get(string logout)
        {
            if (logout == "logout")
            {
                WebSecurity.Logout();
            }
            return Ok();
        }

        // POST api/login
        public IHttpActionResult Post([FromBody]ClientUserDTO clientUserDTO)
        {



            if (ModelState.IsValid)
            {
                if (WebSecurity.Login(clientUserDTO.Email, clientUserDTO.Password, persistCookie: false))
                {
                    FormsAuthentication.SetAuthCookie(clientUserDTO.Email, false);
                    var userAgent = HttpContext.Current.Request.UserAgent;
                    var userBrowser = new HttpBrowserCapabilities { Capabilities = new Hashtable { { string.Empty, userAgent } } };
                    var factory = new BrowserCapabilitiesFactory();
                    factory.ConfigureBrowserCapabilities(new NameValueCollection(), userBrowser);

                    var BrowserBrand = userBrowser.Browser;
                    var BrowserVersion = userBrowser.Version;

                    using (var db = new TipsEntities())
                    {
                        var user = db.User.Where(u => u.Email == clientUserDTO.Email).FirstOrDefault();
                        db.UserLogins.Add(new UserLogins() { UserID = user.ID, TimeForLogin = DateTime.UtcNow, Browser = BrowserBrand, BrowserVersion = BrowserVersion });
                        db.SaveChanges();
                        return Ok(user);
                    }
                }
                else
                {
                    ModelState.AddModelError("", "The user name or password provided is incorrect.");
                }
            }
            return BadRequest(ModelState);
        }

        // PUT api/login/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/login/5
        public void Delete(int id)
        {
        }
    }
}
