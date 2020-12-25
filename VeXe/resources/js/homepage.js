//Scroll hiden navbar
var lastScrollTop = 0;
navbar_head = document.getElementById('header_home');
window.addEventListener('scroll', function() {
    var scrollTop = window.pageXOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop) {
        navbar_head.style.top = '-150px';
    } else {
        navbar_head.style.top = 0;
    }

    lastScrollTop = scrollTop;
});

//Scroll animation mission

function MissionAnimation() {
    var contentMission = document.querySelectorAll('.inside_ctms');
    var divMission = document.querySelectorAll('.first_mission');

    var elementPosition = 0;
    var screenPosition = window.innerHeight - window.innerHeight * 35 / 100;
    for(let i = 0; i < divMission.length; i++) {
        elementPosition = divMission[i].getBoundingClientRect().top;

        if(elementPosition < screenPosition) {

            switch (i%2) {
                case 0:
                    divMission[i].classList.add('animation13');
                    break;
                case 1:
                    divMission[i].classList.add('animation2');
                    break;
            }
        }

        if(elementPosition < screenPosition) {
            contentMission[i].classList.add('animation_text');
        }
    }
}

window.addEventListener('scroll', MissionAnimation);


//RESPONSIVE click navbars

// const selectElement = function(element) {
//     return document.querySelector(element);
// }

// let menuToggle = selectElement('.navbars_icon');
// let headingPage = selectElement('.all_page');
// let overlay = selectElement('.heading');

// menuToggle.addEventListener('click', function() {
//     headingPage.classList.toggle('open__navbars');
// });

// overlay.addEventListener('click', function() {
//     // headingPage.classList.toggle('open__navbars');
//     console.log('double');
// });

//todo: có 2 trục trặc nhỏ khi responsive theo kiểu này
    //*Đang cố gắng css lại 1 menu có sẵn bằng cách thêm 1 class toàn cục
    //*click = thêm class đã css sẵn đó, ta được 1 menu responsive dựa trên cấu trúc html cũ
    //*không cần viết lại code html
    //*tuy nhiên, khá khó khăn và mất thời gian vì cơ bản trên ui cũ mỗi thành phần đều có ý nghĩa riêng của nó, việc ta biến đổi nó lại sẽ có những rào cản nhất định
    //*trường hợp như thế tốt hơn là viết lại như F8, mặc dù không biết có ảnh hưởng gì BE ko
    //*Mobile First is the best

//XỬ LÝ CHỌN ĐIỂM ĐẾN ĐIỂM ĐI - TƯƠNG TÁC NGƯỜI DÙNG
//Đặt vé có và không có khứ hồi - disable input ngày tháng khứ hồi

var khuHoi_Radio = document.querySelector('#co-hoi');
var motChieu_Radio = document.querySelector('#khong-hoi');
var khuHoi_Input = document.getElementById('tomorrow');
var currentValue_Radio = 0;

function ktKhuHoi(myRadio) {
    if(myRadio.value == 1) {
        khuHoi_Input.disabled = true;
        khuHoi_Input.value = '';
        khuHoi_Input.style.display = 'none';

    } else {
        khuHoi_Input.disabled = false;
        khuHoi_Input.style.display = 'block';
    }
}

window.addEventListener('load', function() {
    ktKhuHoi(motChieu_Radio);
});

khuHoi_Radio.addEventListener('click', function() {
    ktKhuHoi(this);
});
motChieu_Radio.addEventListener('click', function() {
    ktKhuHoi(this);
});

//swap điểm đến và đi

var swapIcon = document.querySelector('.swap_icon');
var diemDi = document.querySelector('.start_bk > input');
var diemDen = document.querySelector('.end_bk > input');

swapIcon.addEventListener('click', function() {
    var temp = diemDi.value;
    diemDi.value = diemDen.value;
    diemDen.value = temp;
});