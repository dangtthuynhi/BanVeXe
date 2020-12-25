using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VeXe.Models;

namespace VeXe.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult khachhangAdmin()
        {
            return View();
        }
        public ActionResult lotrinhAdmin()
        {
            return View();
        }
        public ActionResult mainAdmin()
        {
            return View();
        }
        public ActionResult thongkeAdmin()
        {
            return View();
        }
        public ActionResult tuyenxeAdmin()
        {
            return View();
        }
        public ActionResult veAdmin()
        {
            return View();
        }
        public ActionResult xeAdmin()
        {
            vexeEntities1 db = new vexeEntities1();
            var xes = from xe in db.Xes
                      select xe;
            return View(xes);
        }
    }
}