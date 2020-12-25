//Hàm hiển thị chi tiết lịch trình chuyến đi - click
var lichTrinhContainer = document.querySelector('.thongtin-lichtrinh');
var dropIcon = document.querySelector('.icon-controll');

dropIcon.addEventListener('click', function() {
    lichTrinhContainer.classList.toggle('icon-controll-open');
})


//Lên màu cho ghế khi click chọn, chọn -> thêm class mới, class có màu và border
var tatCaGhe = document.getElementsByClassName('ghe-item');
var gheDuocChon = new Array();

for(let i = 0; i < tatCaGhe.length; i++) {
    if(0 < 2) {
        tatCaGhe[i].addEventListener('click', function() {
            SoGheToiDa(gheDuocChon, tatCaGhe[i]);
            DisplayGhe(gheDuocChon);
        });
    } else {
        continue;
    }
}
//Xử lý số lượng ghế tối đa được chọn
function SoGheToiDa(gheDuocChon, gheItem) {
    let flag = XoaBoGhe_ReClick(gheDuocChon, gheItem);
    if(flag == 0) {// Tức là lần click đó click vào 1 ghế chưa được chọn, nếu ghế được chọn sẽ trả về 1
        if(gheDuocChon.length < 6) {
            gheItem.classList.toggle('ghe-item-booking');
            gheDuocChon.push(gheItem);
        } else if(gheDuocChon.length == 6) {
            alert('Chọn tối đa 6 ghế thôi bạn êi');
        }
    }
}
//Logic -> chọn -> xem thử ghế đó đang trong trạng thái được chọn hay chưa chọn -> được chọn thì hành động này là bỏ chọn -> chạy hàm xóa ghế ra khỏi mảng
                                                                                                                        //-> chưa chọn thì xem thử đạng chọn mấy ghế rồi -> < 6 thì lên màu + thêm vào mảng
                                                                                                                        //                                               -> ==6 thì thông báo tối đa + không làm gì cả
function XoaBoGhe_ReClick(gheDuocChon, gheItem) {
    for(let i = 0; i < gheDuocChon.length; i++) {
        if(gheDuocChon.indexOf(gheItem) > -1) {
            gheDuocChon.splice(gheDuocChon.indexOf(gheItem), 1) ;
            gheItem.classList.toggle('ghe-item-booking');
            return 1;
        }
    }
    return 0;
}
//Hiển thị ghế và giá các loại trên UI
function DisplayGhe(gheDuocChon) {
    var sl = document.querySelector('.soluong-g');
    sl.innerHTML = '';
    sl.innerHTML = gheDuocChon.length;

    var gheNameContainer = document.querySelector('.tenghe-dachon');

    gheNameContainer.innerHTML = '';

    for(let i = 0; i < gheDuocChon.length; i++) {
        var spanElement = document.createElement('span');
        spanElement.innerHTML = gheDuocChon[i].innerHTML;
        gheNameContainer.appendChild(spanElement);
    }

    var giaVe = newQuyTrinh.getGiaVe();
    var tongTienContainer = document.querySelector('.tongtien-ghe > span');
    tongTienContainer.innerHTML = '';
    tongTienContainer.innerHTML = giaVe * gheDuocChon.length;
}


// Xử lý thao tác trên bước 1
    //todo: swap địa điểm
var swapIcon = document.querySelector('.diem-di > i');
var diemDi = document.querySelector('#choose-diemdi');
var diemDen = document.querySelector('#choose-diemden');

swapIcon.addEventListener('click', function() {
    var temp = diemDi.value;
    diemDi.value = diemDen.value;
    diemDen.value = temp;
});

    //todo: disable ngày
var radioCohoi = document.querySelector('#co-hoi');
var radioKoHoi = document.querySelector('#khong-hoi');
var ngayVeInput = document.querySelector('#choose-ngayve');

radioCohoi.addEventListener('click', function() {
    if(this.value == 1){
        ngayVeInput.disabled = true;
        ngayVeInput.value = "";
        ngayVeInput.style.cursor = 'not-allowed';
    } else {
        ngayVeInput.disabled = false;
        ngayVeInput.style.cursor = 'auto';
    }
});

radioKoHoi.addEventListener('click', function() {
    if(this.value == 2){
        ngayVeInput.disabled = false;
        ngayVeInput.style.cursor = 'auto';
    } else {
        ngayVeInput.disabled = true;
        ngayVeInput.value = "";
        ngayVeInput.style.cursor = 'not-allowed';
    }
});

window.addEventListener('load', function() {
    if(radioKoHoi.checked == true){
        ngayVeInput.disabled = true;
        ngayVeInput.value = "";
        ngayVeInput.style.cursor = 'not-allowed';
    } else {
        ngayVeInput.disabled = false;
        ngayVeInput.style.cursor = 'auto';
    }
});

//cập nhật Giờ khởi hành 
var chonGioDi = document.querySelector('.chon-gio');
chonGioDi.addEventListener('change', function() {
    document.querySelector('.time-gio').innerHTML = this.value;
}) 



//Xử lý hiển thị quy trình đặt vé
var allComponant = [
    document.querySelector('.first-datvexe'),
    document.querySelector('.second-datvexe'),
    document.querySelector('.third-datvexe'),
    document.querySelector('.fourth-datvexe')
];

var allNumber = document.getElementsByClassName('step-number');
var allPercent = document.getElementsByClassName('step-componant');

var newQuyTrinh = new CacBuocDatVe(1, allNumber, allPercent, allComponant);

var nextBtn = document.querySelector('.next'); 
var backBtn = document.querySelector('.pre');
var btnTimChuyenXe = document.querySelector('.search-vexe');

nextBtn.addEventListener('click', function() {
    newQuyTrinh.nextStep();

    document.querySelector('.time-ngay').innerHTML = newQuyTrinh.allInformation.NgayDi;

    document.querySelector('.s-xuatphat').innerHTML = newQuyTrinh.allInformation.Start;
    document.querySelector('.s-diemden').innerHTML = newQuyTrinh.allInformation.End;
});

backBtn.addEventListener('click', function() {
    newQuyTrinh.backStep();
});

btnTimChuyenXe.addEventListener('click', function() {
    newQuyTrinh.nextStep();

    document.querySelector('.time-ngay').innerHTML = newQuyTrinh.allInformation.NgayDi;

    document.querySelector('.s-xuatphat').innerHTML = newQuyTrinh.allInformation.Start;
    document.querySelector('.s-diemden').innerHTML = newQuyTrinh.allInformation.End;
});