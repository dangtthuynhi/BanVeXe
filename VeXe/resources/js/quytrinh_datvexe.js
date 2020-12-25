class CacBuocDatVe {
    constructor(step, number, percent, componant) {
        this.step = step;
        this.number = number;
        this.percent = percent;
        this.componant = componant;
        this.allInformation = new Object();
    }

    nextStep() {
        if(this.step > 0 && this.step < 4) {
            this.percent[this.step - 1].style.backgroundColor = 'var(--special-font-color)';
            this.componant[this.step - 1].style.display = 'none';

            switch (this.step) {
                case 1:
                    this.allInformation.Start = this.getDiemDi();
                    this.allInformation.End = this.getDiemDen();

                    this.allInformation.NgayDi = this.getNgayDi();
                    this.allInformation.NgayVe = this.getNgayVe();
                    break;
                case 2:
                    this.allInformation.BenXe = this.getBenXe();
                    this.allInformation.GiaVe = this.getGiaVe();
                    this.allInformation.GioKhoiHanh = this.getGioKhoiHanh();
                    this.allInformation.DiemLenXe = this.getDiemLenXe();

                    this.allInformation.SoLuongGhe = this.getSoLuongGhe();
                    this.allInformation.SoGhe = this.getSoGhe();

                    this.allInformation.TongTienVe = this.getTongTienVe();
                    break;
                case 3:
                    this.allInformation.ThongTinKhachHang = this.getThongTinKhachHang();
                    break;
            }

            this.step = this.step + 1;
            this.componant[this.step - 1].style.display = 'flex';
            this.number[this.step - 1].querySelector('span').style.backgroundColor = 'var(--special-font-color)';
            if(this.step == 4){
                this.UpdateAllInformation();
            }
            
        }
    }

    backStep() {
        if(this.step >= 2 && this.step <= 4) {
            this.number[this.step - 1].querySelector('span').style.backgroundColor = '';
            this.componant[this.step - 1].style.display = 'none';
            this.step = this.step - 1;
            this.componant[this.step - 1].style.display = 'flex';
            this.percent[this.step - 1].style.backgroundColor = '';
        }
    }

    getDiemDi() {
        var startInput = this.componant[this.step - 1].querySelector('#choose-diemdi');
        return startInput.value;
    }

    getDiemDen() {
        var endInput = this.componant[this.step - 1].querySelector('#choose-diemden');
        return endInput.value;
    }

    getNgayDi() {
        var startDate = this.componant[this.step - 1].querySelector('#choose-ngaydi');
        return startDate.value;
    }

    getNgayVe() {
        var backDate = this.componant[this.step - 1].querySelector('#choose-ngayve');
        return backDate.value;
    }

    getBenXe() {
        var benXe = this.componant[this.step - 1].querySelectorAll('.s-chonben');

        for(let i = 0; i < benXe.length; i++){
            var benXe_option = benXe[i].querySelector('input');
            if(benXe_option.checked) {
                return benXe[i].querySelector('.benxe').innerHTML;
            }
        }
    }

    getGiaVe() {
        var benXe = this.componant[this.step - 1].querySelectorAll('.s-chonben');

        for(let i = 0; i < benXe.length; i++){
            var benXe_option = benXe[i].querySelector('input');
            if(benXe_option.checked) {
                return benXe[i].querySelector('.s-giave').innerHTML;
            }
        }
    }

    getGioKhoiHanh() {
        var khoiHanh_Input = this.componant[this.step - 1].querySelector('.chon-gio');
        return khoiHanh_Input.value;
    }

    getDiemLenXe() {
        var diemLenXe = this.componant[this.step - 1].querySelector('.chon-diem');
        return diemLenXe.value;
    }

    getSoLuongGhe() {
        var cacDivGheDuocChon = gheDuocChon;
        var soLuongGhe = cacDivGheDuocChon.length
        return soLuongGhe;
    }

    getSoGhe() {
        var cacGheDuocChon = new Array();
        for(let i = 0; i < gheDuocChon.length ; i++) {
            cacGheDuocChon.push(gheDuocChon[i].innerHTML);
        }
        return cacGheDuocChon;
    }

    getTongTienVe() {
        var soLuongGhe = this.getSoLuongGhe();
        var giaVe = this.getGiaVe();
        return soLuongGhe * giaVe;
    }

    getThongTinKhachHang() {
        var ThongTinKhachHang = new Object();
        ThongTinKhachHang.HoTen = this.componant[this.step - 1].querySelector('.kh-input').value;
        ThongTinKhachHang.SDT = this.componant[this.step - 1].querySelector('.sdt-input').value;
        ThongTinKhachHang.Email = this.componant[this.step - 1].querySelector('.email-input').value;
        ThongTinKhachHang.TinhThanh = this.componant[this.step - 1].querySelector('.tinhtp-input').value;
        ThongTinKhachHang.QuanHuyen = this.componant[this.step - 1].querySelector('.quanh-input').value;
        return ThongTinKhachHang;
    }

    UpdateAllInformation() {
        var hoTen = this.componant[this.step - 1].querySelector('.end-hoten');
        hoTen.innerHTML = this.allInformation.ThongTinKhachHang.HoTen;

        var email = this.componant[this.step - 1].querySelector('.end-email');
        email.innerHTML = this.allInformation.ThongTinKhachHang.Email;

        var sdt = this.componant[this.step - 1].querySelector('.end-sdt');
        sdt.innerHTML = this.allInformation.ThongTinKhachHang.SDT;

        var tuyenXe = this.componant[this.step - 1].querySelector('.end-tuyenxe');
        tuyenXe.innerHTML = `${this.allInformation.Start} => ${this.allInformation.End}`;

        var time = this.componant[this.step - 1].querySelector('.end-datetime');
        time.innerHTML = `${this.allInformation.GioKhoiHanh} ${this.allInformation.NgayDi}`;

        var slGhe = this.componant[this.step - 1].querySelector('.end-slghe');
        slGhe.innerHTML = this.allInformation.SoLuongGhe;

        var soGhe = this.componant[this.step - 1].querySelector('.end-soghe');
        soGhe.innerHTML = this.allInformation.SoGhe;

        var diemLenXe = this.componant[this.step - 1].querySelector('.end-diemlenxe');
        diemLenXe.innerHTML = this.allInformation.DiemLenXe;

        var tongTien = this.componant[this.step - 1].querySelector('.tongtien-ghe > span');
        tongTien.innerHTML = this.allInformation.TongTienVe;
    }
}
