using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VeXe.Models;

namespace VeXe.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult login(Taikhoan model)
        {
            //vexeEntities db = new vexeEntities();
            //var tks = from tk in db.Taikhoans
            //          where tk.tendangnhap == model.tendangnhap && tk.matkhau==model.matkhau
            //          select tk;
            //List<Models.Taikhoan> query = tks.ToList();
            //if (query.Count() == 1) return Redirect("http://localhost:53190/Admin/mainAdmin");
            //return View();
            try
            {
                vexeDataContext db = new vexeDataContext();

                var tks = from tk in db.Taikhoans
                    where tk.tendangnhap.Contains(model.tendangnhap) && tk.matkhau.Contains(model.matkhau)
                    select tk;
                var query = tks.First();
                if (query == null)
                    return View();
                return Redirect("http://localhost:53190/Admin/mainAdmin");
            }
            catch{return View();}
        }
    }
}