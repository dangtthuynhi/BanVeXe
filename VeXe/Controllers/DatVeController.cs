using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.DynamicData;
using System.Web.Mvc;
using VeXe.Models;

namespace VeXe.Controllers
{

    public class DatVeController : Controller
    {
        vexeDataContext vexe = new vexeDataContext();
        private lichtrinh ltmul;

        // GET: DatVe
        public ActionResult datve1(string name)//mã lộ trình
        {

            //var lt = lotrinhs.Where(s => s.malotrinh.Contains(name));
            //var ltmul = from l in lt
            //    join x in xes on l.maxe equals x.maxe
            //    join t in tuyens on l.matuyen equals t.matuyen
            //    select new lichtrinh {lotrinhdetails = l, tuyendetails = t, xedetails = x};
            IQueryable<lichtrinh> lt = from l in vexe.Lotrinhs
                join x in vexe.Xes on l.maxe equals x.maxe
                join t in vexe.Tuyens on l.matuyen equals t.matuyen
                where l.malotrinh.Contains(name)
                select new lichtrinh {lotrinhdetails = l, tuyendetails = t, xedetails = x};
            ltmul = lt.First();
            return View(ltmul);
        }

        public ActionResult datve2()
        {
            /*var ve = from v in vexe.Ves
                join g in vexe.Ghes on v.maghe equals g.maghe
                where v.malotrinh.Contains(ltmul.lotrinhdetails.malotrinh)
                select g.soghe;
            List<string> dsghe = ve.ToList();
            return View(dsghe);*/
            return View();



        }
        public ActionResult datve3()
        {
            return View();
        }
        public ActionResult datve4()
        {
            return View();
        }

        public ActionResult thanhToanView()
        {
            return View();
        }
        public ActionResult camOnView()
        {
            return View();
        }
    }
}