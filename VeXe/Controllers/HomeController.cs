using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VeXe.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult homepageView()
        {
            return View();
        }
    }
}