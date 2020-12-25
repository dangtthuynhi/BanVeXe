using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Razor.Text;
using VeXe;
using VeXe.Models;

namespace VeXe.Controllers
{


    public class TraCuuVeController : Controller
    {

        public ActionResult BoSungView()
        {
            return View("BoSungView");
        }
        public ActionResult traCuuVeView(string searchString)
        {
            //vexeEntities1 db = new vexeEntities1();
            //List<Models.Tuyen> tuyens = db.Tuyens.ToList();
            //List<Models.Xe> xes = db.Xes.ToList();
            //var ves = from ve in db.Ves
            //          where ve.mave.Contains(searchString)
            //          select ve;
            //List<Models.Ve> query = ves.ToList();
            //List<Models.Lotrinh> lotrinhs = db.Lotrinhs.ToList();
            //List<Models.Khachhang> khachhangs = db.Khachhangs.ToList();
            //List<Models.Ghe> ghes = db.Ghes.ToList();
            //if (query.Count == 0)
            //{

            //    return RedirectToAction("BoSungView");
            //    // return View();
            //}
            //else
            //{
            //    var ttve = from v in query
            //               join l in lotrinhs on v.malotrinh equals l.malotrinh
            //               join g in ghes on v.maghe equals g.maghe
            //               join k in khachhangs on v.makh equals k.makh
            //               join x in xes on l.maxe equals x.maxe
            //               join t in tuyens on l.matuyen equals t.matuyen
            //               select new thongTinVe()
            //               { xedeatails = x, ghedetails = g, khachhangdetails = k, lotrinhdeatils = l, vedetails = v, tuyendetails = t };

            //    ViewBag.tv = ttve;
            //    if (ttve == null) return RedirectToAction("BoSungView"); else return View();
            //    //return RedirectToAction("BoSungView");
            try
            {
                vexeDataContext db = new vexeDataContext();
                var ves = from ve in db.Ves
                    where ve.mave.Contains(searchString)
                    select ve;
                Ve query = ves.First();
                if (query == null)
                    return RedirectToAction("BoSungView");
                var ttve = from v in ves
                    join l in db.Lotrinhs on v.malotrinh equals l.malotrinh
                    join g in db.Ghes on v.maghe equals g.maghe
                    join k in db.Khachhangs on v.makh equals k.makh
                    join x in db.Xes on l.maxe equals x.maxe
                    join t in db.Tuyens on l.matuyen equals t.matuyen
                    select new thongTinVe()
                    {
                        xedeatails = x, ghedetails = g, khachhangdetails = k, lotrinhdeatils = l, vedetails = v,
                        tuyendetails = t
                    };
                ViewBag.tv = ttve;
                return View();
            }

            catch
            {
                return RedirectToAction("BoSungView");
            }
        }
    }
}