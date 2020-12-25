//Đối tượng Validator

function Validator(options) {

    var selectorRules = {};
    //Hàm này là hàm thực hiện kiếm tra và validate
    function Validate(inputOfRule, rule_element) { 
        var span_BaoLoi = inputOfRule.parentElement.querySelector(options.spanError);
        var kqKiemTraLoi; //= rule_element.test(inputOfRule.value); - không cần code này nữa, giờ có 1 đống rule

        //Giờ sao để biết rule nào rule nào mỗi lần blur khi thực hiện hàm này đây?
        //ta có 1 object chứa các rule rồi, hàm này lại truyền vào rule hiện tại => có thể lấy key của object chứa rule đó rule.selector
        
        //Lấy mảng các rule của key trong object các rule
        var cacRules = selectorRules[rule_element.thisInput];

        for(var i = 0; i < cacRules.length; i++){
            //lặp qua các rule, hiện tại blur ra trúng rule nào, thì lưu vào biến sau đó break ra khỏi vòng lặp
            //rule thực chất là 1 function - cụ thể là test - gọi hàm thôi
            // blur ra, chạy hàm này - chưa nhập gì hết, thì rule đầu tiên chạy - có lỗi, break, nếu nhập rồi thì hàm đầu chạy trả ra undefined, 
            //sau đó chạy tiếp rule email, nếu đúng thì thôi, sai thì chạy rule đó - lặp lần lượt qua từng rule mà
            kqKiemTraLoi = cacRules[i](inputOfRule.value);
            if(kqKiemTraLoi) break;
        }

        //hàm kiếm trả - test đã đc gọi và trả về undefined khi ko có lỗi, hoặc 1 mess lỗi;
        //Nếu có lỗi thì viết kqkt lỗi vào thẻ span báo lỗi
        if(kqKiemTraLoi){
            span_BaoLoi.innerText = kqKiemTraLoi;
            inputOfRule.parentElement.classList.add('invalid');
        } else {
            span_BaoLoi.innerText = '';
            inputOfRule.parentElement.classList.remove('invalid');
        }

        return !kqKiemTraLoi;
    }

    //Hàm thực hiện lúc nghe sự kiện oninput nhập mất cảnh báo lỗi
    function NhapMatLoi(inputOfRule) {
        var span_BaoLoi = inputOfRule.parentElement.querySelector(options.spanError);
        span_BaoLoi.innerText = '';
        inputOfRule.parentElement.classList.remove('invalid');
    }
    
    var fullForm = document.querySelector(options.form);


    
    //Lấy đc form full rồi thì truy ra từng input của nó và xử lý event
    if(fullForm) {

        //Loại bỏ hành vi mặc định khi bấm submit
        fullForm.onsubmit = function(e) {
            e.preventDefault();

            
            var submitFlag = true;

            //Ở đây khu submit, lặp qua các rule 1 lần nữa, validate luôn, bốc cái rule đó đi test lỗi, có là báo
            options.rules.forEach(function(rule_element) {
                var inputOfRule = fullForm.querySelector(rule_element.thisInput);
                Validate(inputOfRule, rule_element);

                //bấm submit rồi nó sẽ lặp qua từng rule, rule nào bị lỗi, thì cờ hiệu gãy
                var loiHayKhong = Validate(inputOfRule, rule_element);
                if(!loiHayKhong) {
                    submitFlag = false;
                }
            });

            //kiểm tra cờ hiệu gãy chưa, gãy thì thôi, do m nhập sai
            //Chưa gãy tức nhập đúng, lấy hết dữ liệu nhập và in ra
            if(submitFlag){
                if(typeof options.onSubmit === 'function'){
                    //select tất cả các element có attribute là name và không có atttribute là disable
                    var cacThangInput = fullForm.querySelectorAll('[name]:not([disable])');
                    //trả về 1 nodelist, gần giống mảng nhưng không có các pthuc của mảng => chuyển thằng này ra array

                    var formValues = Array.from(cacThangInput).reduce(function(luuTru, tungThangInput ){
                        
                        return (luuTru[tungThangInput.name] = tungThangInput.value) && luuTru;
                    }, {});

                    options.onSubmit(formValues);
                } else {
                    fullForm.submit(); // submit mặc định - nếu onSubmit 0 là function
                }

            } else {
                console.log('Có lỗi')
            }
        }

        //Duyệt qua từng rule - mỗi rule là 1 phương thức của hàm này, trả về 1 object là input hiện tại của rule đó
        options.rules.forEach(function(rule_element) {
            var inputOfRule = fullForm.querySelector(rule_element.thisInput);

            
            //2 rule cùng lúc thì lặp qua 2 lần cùng 1 input -> key giống nhau nên sẽ bị ghi đè lên,
            //nên không dùng đc code bên dưới
            //selectorRules[rule_element.thisInput] = rule.test; 
            //ta lưu vào mảng, mỗi lần lặp qua sẽ là 1 phần tử của mảng, lặp qua key 2 lần, key là mảng, mỗi lần lặp qua key đều thêm rule vào mảng
            //ta sẽ đc key là input đó và mảng có các phần tử là các rule mỗi lần lặp => ko bị ghi đè


            //Ban đầu lặp qua thì, nếu key ko là mảng thì gán bằng mảng có phần tử đầu tiên là rule đầu tiên, lặp qua lần nữa đã là mảng rồi
            // mà đã là mảng thì thêm rule còn lại vào 
            if(Array.isArray(selectorRules[rule_element.thisInput])) {
                selectorRules[rule_element.thisInput].push(rule_element.test);
            } else {
                selectorRules[rule_element.thisInput] = [rule_element.test];
            }

            //Nếu có đc input rồi thì gán sự kiện cho nó thôi
            if(inputOfRule) {
                inputOfRule.onblur = function() {
                    //Xem thử người dùng đã nhập chưa và xử lý bằng kết quả của rule.test của input hiện tại
                    Validate(inputOfRule, rule_element);
                    //gán sự kiện, mỗi lần blur ra thì thực hiện hàm kiếm tra để validate
                }

                    //Xử lý lúc nhập thì mất cảnh báo validate- lúc nhập
                inputOfRule.oninput = function() {
                    NhapMatLoi(inputOfRule)
                }
            }

        });
    }

}


//Định nghĩa các rules để kiểm tra đk nhập ok chưa qua phương thức test nhận vào value ng dùng nhập
//1. Có lỗi => trả ra thông báo lỗi
//2. hợp lệ => không trả ra gì(undefined)
Validator.nhapBatBuoc = function(thisInput, messBaoLoi) {

    return {
        thisInput: thisInput,
        test: function(value) {
            return value.trim() ? undefined : messBaoLoi || 'Vui lòng nhập trường này';
        } 
    };

}

Validator.checkEmail = function(thisInput, messBaoLoi) {

    return {
        thisInput: thisInput,
        test: function(value) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? undefined : messBaoLoi || 'Trường này phải là email';
        } 
    };

}

Validator.chieuDaiToiDaPass = function(thisInput, min, messBaoLoi) {

    return {
        thisInput: thisInput,
        test: function(value) {
            return value.length >= min ? undefined : messBaoLoi || `Tối đa ${min} ký tự`;
        }
    };

}

//Đối số thứ 3 kiểu, có truyền vào bên lời gọi hàm thì đc dùng, còn không thì thôi
Validator.passNhapLai = function(thisInput, layValuePassDauTien, messBaoLoi) {

    return {
        thisInput: thisInput,
        test: function(value) {
            return value === layValuePassDauTien() ? undefined : messBaoLoi || 'Mật khẩu nhập lại không chính xác';
        }
    }

}

//Muốn có 1 ô input có nhiều rules - không nhập thì báo phải nhập - nhập sai thì báo lỗi sai mới đc
//Nhưng nếu add 2 rule thì khác nào overight lại đâu, rule sau sẽ đè mất rule trước - kiểu như input đã có rule 1 rồi, còn add thêm 1 rule nữa chả khác gì code đè lên
//Vì vòng lặp lặp qua từng rule mà