using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MarionetteTips.Controllers.Api
{
    public class CountryController : ApiController
    {
        // GET api/country
        public IEnumerable<Country> Get()
        {
            using (var db = new TipsEntities())
            {
                var countries = from t in db.Country
                                orderby t.Title
                                select t;
                
                return countries.ToList();
            }  
        }

        // GET api/country/5
        public Country Get(int id)
        {
            using (var db = new TipsEntities())
            {
                var country = (from t in db.Country
                                where t.ID == id
                                select t).FirstOrDefault();
                return country;
            }  
        }
    }
}
