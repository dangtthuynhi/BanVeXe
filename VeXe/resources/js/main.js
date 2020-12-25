/**
 * B1: Khai báo thuộc tính cho class Nhân Viên
 * B2: Khai báo thuộc tính và phương thức cho Danh Sách Nhân Viên
 * B3: Xây dựng chức năng thêm nhân viên
 */

//Khai báo thể hiện cho danh sách nhân viên
var dsnv = new DanhSachNhanVien;
//Khai báo thể hiện cho Validation
var validation = new Validation;

function getEle(id) {
    return document.getElementById(id);
}

getEle("btnThem").addEventListener("click", function () {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";
    getEle("msnv").removeAttribute("disabled");
});

getLocalStorage();
function getLocalStorage() {
    console.log(localStorage.getItem("DSNV"));
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThi(dsnv.mangNV);
    }

}

function themNhanVien() {
    var _maNV = getEle("msnv").value;
    var _tenNV = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _chucVu = getEle("chucvu").value;

    console.log(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);

    //isValid chứa kết quả kiểm tra cuối cùng
    var isValid = true;

   
    //isValid (true =1) = isValid & 1 = 1
    //isValid (false =0) = isValid & 1 = 0
    //isValid (false =0) = isValid & 0 = 0
    //isValid1 = isValid2 & kiemTraRong
    //& and bit
     //Kiểm tra mã nhân viên
    isValid &= validation.kiemTraRong(_maNV,"tbMaNV","Mã nhân viên không được để trống") && validation.kiemTraMaTrung(_maNV,dsnv.mangNV,"tbMaNV","Mã nhân viên không được trùng");

     //Kiểm tra tên nhân viên
    isValid &= validation.kiemTraRong(_tenNV,"tbTen","Tên nhân viên không được để trống") && validation.kiemTraTen(_tenNV,"tbTen","Tên nhân viên không hợp lệ");

    //Kiểm tra email
    isValid &= validation.kiemTraRong(_email,"tbEmail","Email nhân viên không được để trống") && validation.kiemTraEmail(_email,"tbEmail","Email nhân viên không hợp lệ");
    //kiểm tra pass
    isValid &= validation.kiemTraRong(_matKhau,"tbMatKhau","Mật khẩu nhân viên không được để trống") && validation.kiemTraDoDai(_matKhau,"tbMatKhau","Mật khẩu nhân viên không hợp lệ",6,8);    
    // kiểm tra ngày
    isValid &= validation.kiemTraRong(_ngayLam,"tbNgay","Ngày làm không được để trống");
    //Kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu("chucvu","tbChucVu","Chức vụ không hợp lệ");

    //nếu isValid == true thì mới được thêm nhân viên
    if (isValid) {
        //Khai báo thể hiện (instance) của nhân viên
        var nv = new NhanVien(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);

        //Gọi phương thức themNV của danh sách nhân viên
        dsnv.themNV(nv);
        console.log(dsnv.mangNV);

        //goi hàm hiển thi
        hienThi(dsnv.mangNV);

        //lưu xuống local storage
        setLocalStorage(dsnv.mangNV);
    }

}
function hienThi(mangNV) {
    var tbody = getEle("tableDanhSach");
    var content = "";
    mangNV.map(function (item, index) {
        //template literal (string template)
        //content = content + ``;
        content += `
            <tr>
                <td>${item.maNV}</td>
                <td>${item.tenNV}</td>
                <td>${item.email}</td>
                <td>${item.ngayLam}</td>
                <td>${item.chucVu}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="xoaNhanVien('${item.maNV}')">Xóa</button>
                    <button type="button" class="btn btn-success" data-toggle="modal"
                    data-target="#myModal" onclick="capNhatNV('${item.maNV}')">Cập Nhật</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = content;
}
function capNhatNV(id) {
    getEle("btnCapNhat").style.display = "block";
    getEle("btnThemNV").style.display = "none";
    getEle("msnv").disabled = "true";

    var nv = dsnv.layThongTinNV(id);

    console.log(nv);
    //Hiển thị thông tin nhân viên lên form
    getEle("msnv").value = nv.maNV;
    getEle("name").value = nv.tenNV;
    getEle("email").value = nv.email;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.ngayLam;
    getEle("chucvu").value = nv.chucVu;

}

function capNhatThongTinMoi() {
    var _maNV = getEle("msnv").value;
    var _tenNV = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _chucVu = getEle("chucvu").value;
    // console.log(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);
    //Khai báo thể hiện (instance) của nhân viên
    var nv = new NhanVien(_maNV, _tenNV, _email, _matKhau, _ngayLam, _chucVu);
    console.log(nv);
    dsnv.capNhatNV(nv);
    hienThi(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}
function xoaNhanVien(id) {
    dsnv.xoaNV(id);
    hienThi(dsnv.mangNV);
}
function setLocalStorage(mangNV) {
    localStorage.setItem("DSNV",
        JSON.stringify(mangNV)
    );
}
// "keyup"
getEle("btnTimNV").addEventListener("click",function(){
    var hoTen = getEle("searchName").value;
    var mangTimKiem =  dsnv.timKiemNhanVien(hoTen);
    console.log(hoTen,mangTimKiem);
    hienThi(mangTimKiem);
});