using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarionetteTips.DAL
{
    public class UserDAL
    {
        public static User getUser(int id)
        {
            using (var db = new TipsEntities())
            {
                var user = db.User.Where(u => u.ID == id).FirstOrDefault();
                return user;
            }
        }

        public static User getUser(string email)
        {
            using (var db = new TipsEntities())
            {
                var user = db.User.Where(u => u.Email == email).FirstOrDefault();
                return user;
            }
        }
    }
}