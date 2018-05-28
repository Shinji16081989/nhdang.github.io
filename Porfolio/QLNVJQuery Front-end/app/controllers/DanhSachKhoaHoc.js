$(document).ready(function () {

    // Khởi tạo đối tượng danh sách khóa học
    var danhSachKhoaHoc = new DanhSachKhoaHoc();
    // Khởi Tạo đối tượng là Service khóa học
    var khoaHocService = new KhoaHocService();
    // Khởi tạo người dùng Service
    var nguoiDungService = new NguoiDungService();

    LoadDanhSachKhoaHoc();

    function LoadDanhSachKhoaHoc() {
        khoaHocService.layDanhSachKhoaHoc().done(function (DSKH) {
            danhSachKhoaHoc.DSKH = DSKH;
            LoadTableDanhSachKhoaHoc(danhSachKhoaHoc.DSKH);
        }).fail(function (error) {
            console.log(error);
        });
        //Load nội dung thẻ select trong group
        LayDanhSachGiaoVu();
    }

    function LayDanhSachGiaoVu() {
        nguoiDungService.LayThongTinGiaoVu()
            .done(function (DSND) {
                var noiDung = '';
                console.log(DSND);
                // Load danh sách người dùng lên thẻ select
                for (var i = 0; i < DSND.length; i++) {
                    var nguoiDung = DSND[i];
                    if (nguoiDung.MaLoaiNguoiDung == "GV") {
                        noiDung += `
                    <option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen}</option>
                    `;
                    }
                }
                $('#NguoiTao').html(noiDung);
            })
            .fail(function (error) {
                console.log(error);
            });
        //Load noi dung the select trong popup
    }



    function LoadTableDanhSachKhoaHoc(DSKH) {
        var noiDung = '';
        for (var i = 0; i < DSKH.length; i++) {
            var khoaHoc = DSKH[i];
            noiDung += `
                <tr class="trKhoaHoc">
                    <td><input type="checkbox" class="ckbMaKhoaHoc" value="${khoaHoc.MaKhoaHoc}"/></td>
                    <td class="MaKhoaHoc">${khoaHoc.MaKhoaHoc}</td>
                    <td class="TenKhoaHoc">${khoaHoc.TenKhoaHoc}</td>
                    <td class="MoTa">${khoaHoc.MoTa}</td>
                    <td class="LuotXem">${khoaHoc.LuotXem}</td>
                    <td class="HinhAnh"><img src="${khoaHoc.HinhAnh}" width="50" height="30"/></td>
                    <td class="NguoiTao">${khoaHoc.NguoiTao}</td>
                    <td><button class="btn btn-primary btnChinhSua" MaKhoaHoc="${khoaHoc.MaKhoaHoc}">Chỉnh sửa</button></td>
                    <td><button class="btn btn-danger btnXoaKhoaHoc" MaKhoaHoc="${khoaHoc.MaKhoaHoc}">Xóa</button></td>
                </tr>
            `;
        }
        $("#tblKhoaHoc").html(noiDung);
    }

    // load 3 khoa hoc pho bien
    // function LoadTableDanhSachKhoaHoc(DSKH) {
    //     var noiDung = '';
    //     for (var i = 0; i < 3; i++) {
    //         var khoaHoc = DSKH[i];
    //         noiDung += `
    //             <div class="col-lg-4 course_box">
    //                 <div class="card">
    //                     <img class="HinhAnh" src="${khoaHoc.HinhAnh}" width="50" height="30" alt="https://unsplash.com/@kellybrito">
    //                     <div class="card-body text-center">
    //                         <div class="card-title">
    //                             <a class="TenKhoaHoc" href="courses.html">${khoaHoc.TenKhoaHoc}</a>
    //                         </div>
    //                         <div class="card-text MoTa" >${khoaHoc.MoTa}</div>
    //                     </div>
    //                     <div class="price_box d-flex flex-row align-items-center">
    //                         <div class="course_author_image">
    //                             <img src="../../../assets/img/author.jpg" alt="https://unsplash.com/@mehdizadeh">
    //                         </div>
    //                         <div class="course_author_name">Michael Smith,
    //                             <span>Author</span>
    //                         </div>
    //                         <div class="course_price d-flex flex-column align-items-center justify-content-center">
    //                             <span>$29</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         `;
    //     }
    //     $("#tblKhoaHoc").html(noiDung);
    // }

    //load Ngược lại popup để chỉnh sửa
    $('body').delegate(".btnChinhSua", "click", function () {
        $('#MaKhoaHoc').attr("readonly", true);
        //clear dữ liệu textBox.txtF
        $('.txtF').val("");
        // Tạo lại nội dung cho modalTitle
        var modalTitle = "Chỉnh sửa khóa học"
        // Tạo nội dung cho modal footer: Dùng string template
        var modalFooter = `
            <button id="btnLuu" class="btn btn-success">Lưu</button>
            <button id="btnDong" class="btn btn-danger">Đóng</button>
        `;

        $('.modal-title').html(modalTitle);
        $('.modal-footer').html(modalFooter);
        // load thành phần nội dung chỉnh sửa lên popup
        var trKhoaHoc = $(this).closest(".trKhoaHoc");
        var MaKhoaHoc = trKhoaHoc.find(".MaKhoaHoc").html().trim();
        var TenKhoaHoc = trKhoaHoc.find(".TenKhoaHoc").html().trim();
        var MoTa = trKhoaHoc.find(".MoTa").html().trim();
        var LuotXem = trKhoaHoc.find(".LuotXem").html().trim();
        var HinhAnh = trKhoaHoc.find('img').attr("src");
        var NguoiTao = trKhoaHoc.find('.NguoiTao').html().trim();
        $('#MaKhoaHoc').val(MaKhoaHoc);
        $('#TenKhoaHoc').val(TenKhoaHoc);
        $('#NguoiTao').val(NguoiTao);
        // Dùng cú pháp để gán nội dung cho ckeditor
        CKEDITOR.instances["MoTa"].setData(MoTa);
        $("#LuotXem").val(LuotXem);
        $("#HinhAnh").val(HinhAnh);
        // Gọi nút open Modal
        $('#btnPopupModal').trigger("click");
    });


    //Xóa Khóa Học
    $('body').delegate(".btnXoaKhoaHoc", "click", function () {
        var id = $(this).attr("MaKhoaHoc");
        khoaHocService.XoaKhoaHoc(id).done(function (result) {
            console.log(result);
            window.location.reload();
        }).fail(function (error) {
            console.log(error);
        });
    });

    // Lưu cập nhật khóa học
    $('body').delegate("#btnLuu", "click", function () {
        // lay thong tin nguoi dung cap nhat
        var MaKhoaHoc = $("#MaKhoaHoc").val();
        var TenKhoaHoc = $("#TenKhoaHoc").val();
        var MoTa = CKEDITOR.instances["MoTa"].getData(); // lay gia tri tu Editor
        var LuotXem = $("#LuotXem").val();
        var HinhAnh = $("#HinhAnh").val();
        var NguoiTao = $('#NguoiTao').val();

        var khoaHoc = new KhoaHoc(MaKhoaHoc, TenKhoaHoc, MoTa, LuotXem, HinhAnh, NguoiTao);
        console.log(khoaHoc);

        khoaHocService.CapNhatKhoaHoc(khoaHoc).done(function (result) {
            window.location.reload();
        }).fail(function (error) {
            console.log(error);
        });

        $('#MaKhoaHoc').attr("readonly", false);
    });

    $('#btnTaoKhoaHoc').click(OpenPopupModal);
    //Xử lý cho button btnTaoKhoaHoc
    function OpenPopupModal() {
        //clear dữ liệu textbox .txtF
        $('#txtF').val("");
        //Tạo phần nội dung modal title
        var modalTitle = "Thêm Người Dùng";
        // Tạo nội dung cho modal Footer dùng string template
        var modalFooter = `
            <button id="btnTaoMoi" class="btn btn-success">Tạo Mới</button>
            <button id="btnDong" class="btn btn-danger">Đóng</button>
       `;

        $('.modal-title').html(modalTitle);
        $('.modal-footer').html(modalFooter);
        //Gọi Nút open Modal
        $("#btnPopupModal").trigger("click");
    }

    $("body").delegate('#btnDong', "click", function () {
        $('#btnDongForm').trigger('click');
    });



    $("body").delegate("#btnTaoMoi", "click", function () {
        // lấy thông tin người dùng nhập vào
        var MaKhoaHoc = $("#MaKhoaHoc").val();
        var TenKhoaHoc = $("#TenKhoaHoc").val();
        var MoTa = $("#MoTa").val();
        var LuotXem = $("#LuotXem").val();
        var HinhAnh = $("#HinhAnh").val();
        var NguoiTao = $("#NguoiTao").val();
        //Khởi tạo đối tượng KhoaHoc
        var khoaHoc = new KhoaHoc(MaKhoaHoc, TenKhoaHoc, MoTa, LuotXem, HinhAnh, NguoiTao);
        // Gọi Service để đẩy dữ liệu lên server
        khoaHocService.ThemKhoaHoc(khoaHoc).done(function (result) {
            console.log(result);
            window.location.reload();
        }).fail(function (error) {
            console.log(error);
        });
    })


    //  hiển thị CKeditor ở mục Mô Tả
    CKEDITOR.replace('MoTa', {
        allowedContent: 'iframe[*]'
    });

















});