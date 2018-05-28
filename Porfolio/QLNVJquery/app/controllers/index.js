$(document).ready(function () {

    // Định Nghĩa sự kiện click cho nút button #btnThemNguoiDung
    $('#btnThemNguoiDung').click(OpenPopupModal);

    // Xử Lý cho sự kiện click đó
    function OpenPopupModal() {
        $('.txtF').val("");
        //Tạo Phần nội dung modal title
        var modalTitle = "Thêm Người Dùng";
        //Tạo nội Dung cho modal footer" Dùng String template
        var modalFooter = `
            <button id="btnThem" class="btn btn-success">Thêm Người Dùng</button>
            <button id="btnDong" class="btn btn-danger">Đóng</button>
        `;

        $(".modal-title").html(modalTitle);
        $(".modal-footer").html(modalFooter);

        // gọi nút open modal
        $('#btnPopupModal').trigger("click");

        // sweetalert
    }

    // xu ly su kien cho nut Dong form cua popupmodal
    $("body").delegate('#btnDong', "click", function () {
        $('#btnDongForm').trigger('click');
    });

    // sử dụng delegate để bao phủ cái modal-footer và nút #btnThem để khẳng định nó đã xuất hiện
    // xử lý tác dụng thêm người dùng
    var danhSachNguoiDung = new DanhSachNguoiDung();
    console.log(danhSachNguoiDung);
    $(".modal-footer").delegate("#btnThem", "click", function () {
        // lấy thông tin người dùng nhập vào
        var taiKhoan = $('#TaiKhoan').val();
        var matKhau = $('#MatKhau').val();
        var hoTen = $('#HoTen').val();
        var email = $('#Email').val();
        var soDT = $('#SoDT').val();
        // khởi tạo đối tượng người dùng
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT);
        // Đưa ngươi dùng vào thuộc tính là mảng danh sách người dùng
        console.log(nguoiDung);
        //Thuộc đối tượng danhSachNguoiDung
        danhSachNguoiDung.ThemNguoiDung(nguoiDung);

        //sweet alert 2
        swal({
            position: 'center',
            type: 'success',
            title: 'Bạn đã thêm người dùng thành công',
            showConfirmButton: false,
            timer: 1500
        })

        // Gọi nút đóng form  
        $('#btnDong').trigger("click");
        $('.txtF').val("");



        // load du lieu nguoi dung ra datatable sau khi thành công
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);

        // Ve Bieu Do
        var arrDiem =  danhSachNguoiDung.TinhDiemNguoiDung();
        veBieuDo(arrDiem);
        // Lưu vào Storage
        LuuStorage();
    })
    // // sẽ không chạy vì btnThem là nút sẽ hiển thị sau khi click Popupmodal phía trên
    // $('#btnThem').click(function () {
    //     alert(1);
    // });



    //load dữ liệu ra data table

    function LoadDanhSachNguoiDung(DSND) {
        var noiDungDSND = "";
        for (var i = 0; i < DSND.length; i++) {
            var nguoiDung = DSND[i];
            noiDungDSND += `
                <tr class="trThongTinNguoiDung" 
                data-taikhoan="${nguoiDung.TaiKhoan}" 
                data-matkhau="${nguoiDung.MatKhau}"
                data-hoten="${nguoiDung.HoTen}"
                data-email="${nguoiDung.Email}"
                data-sodt="${nguoiDung.SoDT}">
                    <td><input class="ckbXoaNguoiDung" type="checkbox" value="${nguoiDung.TaiKhoan}"/></td>
                    <td>${nguoiDung.TaiKhoan}</td>
                    <td>${nguoiDung.MatKhau}</td>
                    <td class="tdHoTen">${nguoiDung.HoTen}</td>
                    <td>${nguoiDung.Email}</td>
                    <td>${nguoiDung.SoDT}</td>
                </tr>
            `;
        }
        
        $('#tblBodyDSND').html(noiDungDSND);
    }


    $("#txtTuKhoa").keyup(function () {
        var tuKhoa = $("#txtTuKhoa").val();
        // var tuKhoa = $(this).val(); Các dùng khác hàm phía trên
        // Gọi phương thức tìm kiếm người dùng => trả là 1 danh sách người dùng chứa từ khóa
        var danhSachNguoiKQ = danhSachNguoiDung.TimKiemNguoiDung(tuKhoa);
        LoadDanhSachNguoiDung(danhSachNguoiKQ.DSND);
        HightLight(tuKhoa);
    });

    function HightLight(tuKhoa) {
        // Tính độ dài từ khóa
        var doDaiTuKhoa = tuKhoa.length;
        // Duyệt Tất cả TD có class name là họ tên
        $(".tdHoTen").each(function () {
            //lay ra noi dung chuoi ket qua
            var noiDungHTML = $(this).html();
            // Kiểm Tra trong nội dung HTML của thẻ td.tdHoTen có chứa từ khóa hay ko
            if (noiDungHTML.indexOf(tuKhoa) !== -1) {
                // dùng hàm substring tạo chuỗi mới
                var viTriTuKhoa = noiDungHTML.indexOf(tuKhoa);
                var KetQuaMoi = `${noiDungHTML.substring(0, viTriTuKhoa)} 
                <span class="hightlight"> ${tuKhoa} </span> ${noiDungHTML.substring(viTriTuKhoa + doDaiTuKhoa)}`;
                $(this).html(KetQuaMoi)
            }
        })
        // $(".hightlight").NhapNhay(3);
    }

    //Plugin cho Jquery để sau
    // window.jQuery.prototype.NhapNhay =  function(soLanNhayNhap){
    //     var This = $(this);
    //     for (var i = 0; i < soLanNhayNhap; i++) {
    //         This.fadeOut(500);
    //         This.fadeIn(500);
    //     }
    // } 


    // Thao tac Luu du lieu o LocalStore
    function LuuStorage() {
        //Lưu mảng người dùng
        var jsonDSND = JSON.stringify(danhSachNguoiDung.DSND);
        localStorage.setItem("DanhSachNguoiDung", jsonDSND);
    }

    function LayStore() {
        if (localStorage.getItem("DanhSachNguoiDung")) {
            var jsonDSND = localStorage.getItem("DanhSachNguoiDung");
            danhSachNguoiDung.DSND = JSON.parse(jsonDSND);
            LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        }
        
    }
    LayStore();


    // Xử Lý xóa người dùng
    $('#btnXoaNguoiDung').click(function () {
        $(".ckbXoaNguoiDung").each(function () {
            if ($(this).is(":checked")) // kiểm tra ckbXoaNguoiDung có được check hay ko
            {
                // Nếu đc check thì lấy thuộc tính value của checkbox
                var taiKhoan = $(this).val();
                danhSachNguoiDung.XoaNguoiDung(taiKhoan);
            }
        })
        // Load lại danh sách người dùng
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        LuuStorage();
    });


    // Caì Đạt sự kiện click cho dòng tr
    $('body').delegate(".trThongTinNguoiDung", "click", function () {
        var taiKhoan = $(this).attr('data-taikhoan');
        var matKhau = $(this).attr("data-matkhau");
        var hoTen = $(this).attr("data-hoten");
        var email = $(this).attr("data-email");
        var soDT = $(this).attr("data-sodt");


        // gán dữ liệu vào popup
        $('#TaiKhoan').val(taiKhoan);
        $('#MatKhau').val(matKhau);
        $('#HoTen').val(hoTen);
        $('#Email').val(email);
        $('#SoDT').val(soDT);

        // Goi popup hien thi
        $('#btnPopupModal').trigger("click");
        // Tao phan noi dung popup modal
        var modalTitle = "Cập Nhật Người Dùng";
        //Tạo nội Dung cho modal footer" Dùng String template
        var modalFooter = `
            <button id="btnCapNhatND" class="btn btn-success">Cập Nhật</button>
            <button id="btnDong" class="btn btn-danger">Đóng</button>
        `;


        $(".modal-title").html(modalTitle);
        $(".modal-footer").html(modalFooter);
        // Khóa input #TaiKhoan
        $('#TaiKhoan').attr("readonly")
    })
    //Cập Nhật Thông Tin Người Dùng Button Xử Lý Cập Nhật dữ liệu
    $('body').delegate('#btnCapNhatND', "click", function () {
        var taiKhoan = $('#TaiKhoan').val();
        var matKhau = $('#MatKhau').val();
        var hoTen = $('#HoTen').val();
        var email = $('#Email').val();
        var soDT = $('#SoDT').val();
        //Tạo đối tượng lấy dữ liệu sau khi người dùng thay đổi (cập nhật)
        var nguoiDungEdit = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT);
        // Gọi phương thức cập nhật người dùng từ đối tượng danhSachNguoiDung
        danhSachNguoiDung.CapNhatThongTinNguoiDung(nguoiDungEdit);

        // Gọi Load lai datatable Người Dùng
        LoadDanhSachNguoiDung(danhSachNguoiDung.DSND);
        //sweet alert 2
        swal({
            position: 'center',
            type: 'success',
            title: 'Bạn đã Cập Nhật Thành Công',
            showConfirmButton: false,
            timer: 1000,
        })

        // Gọi Phương thức lưu localstore
        LuuStorage();
    })

    // hight charts JS
    function veBieuDo(arrDiem) {
        Highcharts.chart('container', {

            title: {
                text: 'Số Liệu Thống Kê Học Viên'
            },

            subtitle: {
                text: 'Biểu Đồ số lượng Học Viên'
            },

            yAxis: {
                title: {
                    text: 'Số Lượng Học Viên'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2016
                }
            },

            series: [{
                name: 'Điểm Số',
                data: arrDiem
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });

    }



    //function sample
//Descriptive: filling data --> help tester
function makeRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
      }
  
  function makeRandomNumbers(length) {
    var text = "";
    var possible = "0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  function makeRandomMajor(){
      var randomMajor = [1,2,3,4];
      return randomMajor[Math.floor(Math.random()*4)];
  }
  function makeRandomYear(){
      year = [2010, 2011, 2012, 2013,
              2014, 2015, 2016, 2017,
              2018, 2019]
      return year[Math.floor(Math.random()*10)];
  }
  function makeRandomScore(){
      score = [0,1,2,3,4,5,
               6,6,6,6,6,6,
               7,7,7,7,7,7,
               8,8,8,8,8,8,
               9,9,9,9,9,9,9,9,9,9,
               10,10,10,10,10,10,10,10,10]
      return score[Math.floor(Math.random()*score.length)];
  }
  
  function makeRandomObs(){
      document.getElementById('name').value = makeRandomString();
      document.getElementById('studentCode').value = makeRandomNumbers(6);
      document.getElementById('id').value = makeRandomNumbers(10);
      document.getElementById('schoolYear').value = makeRandomYear();
      document.getElementById('major').selectedIndex = makeRandomMajor();
      document.getElementById('email').value = makeRandomString()+"@cybersoft.edu.vn";
      document.getElementById('phone').value = "0"+ 	makeRandomNumbers(9);
      document.getElementById('maths').value = makeRandomScore();
      document.getElementById('physics').value = makeRandomScore();
      document.getElementById('chemistry').value = makeRandomScore();
  }
  
  function makeRandomData(number){
      for(var i=0; i<number; i++){
          makeRandomObs();
          add();
      }
  }
  
  function sampling(){
      swal("Enter the number of rows:", {
        content: "input",
      })
      .then((value) => {
        swal(`Now you have ${value} rows more!`);
        makeRandomData(value);
      })
  }




});



