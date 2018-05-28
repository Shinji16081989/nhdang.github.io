// /* 

// */
// (function ($) {
//     "use strict";


//     /*==================================================================
//     [ Validate ]*/
//     var input = $('.validate-input .input100');

//     $('.validate-form').on('submit',function(){
//         var check = true;

//         for(var i=0; i<input.length; i++) {
//             if(validate(input[i]) == false){
//                 showValidate(input[i]);
//                 check=false;
//             }
//         }

//         return check;
//     });


//     $('.validate-form .input100').each(function(){
//         $(this).focus(function(){
//            hideValidate(this);
//         });
//     });

//     function validate (input) {
//         if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//             if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                 return false;
//             }
//         }
//         else {
//             if($(input).val().trim() == ''){
//                 return false;
//             }
//         }
//     }

//     function showValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).addClass('alert-validate');
//     }

//     function hideValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).removeClass('alert-validate');
//     }
    
    

// })(jQuery);


//Radio Loai Xe Uber, xem nguoi dung chon radio nao
function layLoaiXe(){
    var ketqua;
    var uberX = document.getElementById('uberX').checked;
    var uberSUV = document.getElementById('uberSUV').checked;
    var uberBlack = document.getElementById('uberBlack').checked;
    if (uberX) {
        //chay lenh ben trong neu dieu kien dung
        ketqua = "uberX";
    }else if(uberSUV){
        ketqua = "uberSUV";
    }else if(uberBlack){
        ketqua = "uberBlack";
    }

    return ketqua;
}

// Lấy DOM
// Tra Ve: Tong Tien dua vao soKM nguoi dung nhap + thoi gian cho
function TinhTien(){
    var laySoKM = document.getElementById('soKM').value;
    laySoKM = parseFloat(laySoKM); // chuyen chuoi so thanh so thuc
    var layThoiGianCho = document.getElementById('thoiGianCho').value;
    layThoiGianCho = parseFloat(layThoiGianCho) // chuyen chuoi so thanh so thuc
    var divThanhTien = document.getElementById('divThanhTien');
    divThanhTien.style.display = "block"; // Can Thiep Javascript
    
    var spanTien = document.getElementById('XuatTien');

    var loaiXe = layLoaiXe();
    /*
    Khoang cach loai uber
    uberX UBER SUV UBER Black
    1km dau tien 8000 9000 10000
    1km - 20km 12000 14000 16000
    21km tro di 10000 12000 14000
    Thoi Gian Cho 2000/1p 3000/1p 4000/1p

    */    
    // tam tinh
    // ham parseFloat bien chuoi thanh so
    var thanhTien = 0;
    switch (loaiXe) {
        case 'uberX':
            if (laySoKM <= 1) {
                thanhTien = laySoKM*8000 + layThoiGianCho * 2000;
            }else if (laySoKM > 1 && laySoKM <= 20) {
                thanhTien = 1*8000 + (laySoKM - 1)*12000 + layThoiGianCho * 2000;
            }else if (laySoKM < 20){
                thanhTien = 1*8000 + 20*10000 + (layThoiGianCho - 21) * 2000;
            }else{
                thanhTien = 1*8000 + 20*10000 + layThoiGianCho * 2000;
            }
        break;
        case 'uberSUV':
            if (laySoKM <= 1) {
                thanhTien = laySoKM*9000 + layThoiGianCho * 3000;
            }else if (laySoKM > 1 && laySoKM <= 20) {
                thanhTien = 1*8000 + (laySoKM - 1)*14000 + layThoiGianCho * 3000;
            }else if (laySoKM < 20){
                thanhTien = 1*8000+ 20*12000 + (layThoiGianCho - 21) * 3000;
            }
        break;
        case 'uberBlack':
            if (laySoKM <= 1) {
                thanhTien = laySoKM*10000 + layThoiGianCho * 4000;
            }else if (laySoKM > 1 && laySoKM <= 20) {
                thanhTien = 1*8000 + (laySoKM - 1)*16000 + layThoiGianCho * 4000;
            }else if (laySoKM < 20){
                thanhTien = 1*8000 + 20*14000 + (layThoiGianCho - 21) * 4000;
            }
        break;
    }
    spanTien.innerHTML = thanhTien;
}

