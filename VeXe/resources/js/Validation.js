/**
 * _ Mã Nhân viên: Không được để trống, không được trùng
 * _ Tên Nhân viên: Không được để trống, Phải là kiểu chữ (mẫu tự apha)
 * _Email: Không được để trống, đúng format email
 * _Password: Không được để trống, độ dài 6-8 ký tự
 * _Ngày Làm: Không được để trống
 * _Chức vụ: người có chọn các options khác chữ "Chọn chức vụ"
 */

function Validation() {
    this.kiemTraRong = function (inputVal, spanID, message) {
        //Nếu giá trị bị trống
        //thông tin không hợp lệ
        if (inputVal == "") {
            //nếu có lỗi thì thêm nội dung và hiện thẻ thông báo
            getEle(spanID).innerHTML = message;
            getEle(spanID).style.display = "block";
            return false;
        }
        //Thông tin hợp lệ
        getEle(spanID).innerHTML = "";
        getEle(spanID).style.display = "none";
        return true;
    };
    /**
     * inputVal (ma nhan vien người dung điền)
     * mangNV 
     * spanID
     * message
     */
    this.kiemTraMaTrung = function (inputVal, mangNV, spanID, message) {
        // some sẽ trả kết quả ra là true hoặc false
        //kiểm tra ID do Nười dùng nhập đã tồn tại chưa
        var isExist = mangNV.some(function (item, index) {
            return inputVal === item.maNV;
        });
        //Mã nhân viên bị trùng
        if (isExist) {
            getEle(spanID).innerHTML = message;
            getEle(spanID).style.display = "block";
            return false;
        }
        //nếu không bị trùng
        getEle(spanID).innerHTML = "";
        getEle(spanID).style.display = "none";
        return true;
    };
    this.kiemTraTen = function (inputVal, spanID, message) {
        //chuyển từ kiểu chuỗi string sang kiểu biểu thức
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ"
            + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ"
            + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
        //kiểm tra tên NV hợp lệ
        if (pattern.test(inputVal)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }

        //tên không hợp lệ
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    };
    this.kiemTraEmail = function (inputVal, spanID, message) {
        //biểu thức RegExp /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //nếu email hợp lệ
        if (inputVal.match(pattern)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }

        //email không hợp lệ
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    };
    this.kiemTraDoDai = function (inputVal, spanID, message, min, max) {
        //độ dài hợp lệ
        if (min <= inputVal.length && inputVal.length <= max) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        //Độ dài không hợp lệ
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    };
    this.kiemTraChucVu = function (selectID, spanID, message) {
        //nếu người dùng không chọn option đầu tiên ("Chọn chức vụ")
        if (getEle(selectID).selectedIndex != 0) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }

        // Nếu lựa chọn không hợp lệ
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
}