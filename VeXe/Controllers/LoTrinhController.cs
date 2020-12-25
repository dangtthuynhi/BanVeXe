using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Razor.Text;
using VeXe.Models;
using VeXe;



namespace QLBVver2.Controllers
{
    public class LoTrinhController : Controller
    {
        // GET: lichTrinh
        public ActionResult loTrinhView()
        {
            //vexeEntities vx=new vexeEntities();
            //List<Lotrinh> lotrinhs =vx.Lo
            //List<Xe> xes =vx.Xes.ToList();
            //List<Tuyen> t = vx.Tuyens.ToList();
            //var ltmul = from x in xes
            //    join a in lotrinhs on x.maxe equals a.maxe
            //    join b in t on a.matuyen equals b.matuyen
            //    select new lichtrinh {xedetails = x, lotrinhdetails = a, tuyendetails = b};
            //List<lichtrinh> lt = ltmul.ToList();
            vexeDataContext db=new vexeDataContext();
            var lts = from x in db.Xes
                join lt in db.Lotrinhs on x.maxe equals lt.maxe
                join t in db.Tuyens on lt.matuyen equals t.matuyen
                select new lichtrinh {lotrinhdetails = lt, tuyendetails = t, xedetails = x};
            List<lichtrinh> ltmul = lts.ToList();
            return View(ltmul);

        }


        /*public JsonResult GetSearchingData(string diemDi, string diemDen)
        {
            if (!string.IsNullOrEmpty(diemDi))
            {
                ltmul = ltmul.Where(x => x.noiXP.Contains(diemDi));
            }

            if (!string.IsNullOrEmpty(diemDen))
            {
                ltmul = ltmul.Where(x => x.noiKT.Contains(diemDen));
            }

            return Json(ltmul, JsonRequestBehavior.AllowGet);
        }*/
    }
}