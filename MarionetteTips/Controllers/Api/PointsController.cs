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
    public class PointsController : ApiController
    {
        // GET api/points
        public IHttpActionResult Get(int id)
        {
            PointsDAL dal = new PointsDAL();

            return Ok(dal.getPointsPerUserForCompetition(id));
        }
    }
}
