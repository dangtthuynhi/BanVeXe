using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using VeXe.Models;

namespace VeXe.Models
{
    public class lichtrinh
    {
        public VeXe.Xe xedetails { get; set; }

        public VeXe.Lotrinh lotrinhdetails { get; set; }
        public VeXe.Tuyen tuyendetails { get; set; }
    }
}