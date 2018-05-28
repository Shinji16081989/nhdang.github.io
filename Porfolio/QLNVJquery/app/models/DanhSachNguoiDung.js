function DanhSachNguoiDung() {
    this.DSND = [];
    this.ThemNguoiDung = function (nguoiDung) {
        this.DSND.push(nguoiDung);
    }
    //Tính điểm người dùng
    this.TinhDiemNguoiDung = function () {
        var arrDiem = [];
        for (let i = 0; i < this.DSND.length; i++) {
            arrDiem.push(this.DSND[i].Diem);
        }
        return arrDiem;
    }
    // Phương thức tìm kiếm người dung theo họ tên
    this.TimKiemNguoiDung = function (tuKhoa) {
        //Loai bo khoang cach
        tuKhoa = tuKhoa.trim()
        // Chuyển chuỗi thành chữ thường
        tuKhoa = tuKhoa.toLowerCase();
        //Tạo đối tượng danhSachNguoiDungKetQua 
        var danhSachNguoiDungKQ = new DanhSachNguoiDung();
        for (var i = 0; i < this.DSND.length; i++) {
            var nguoiDung = this.DSND[i];
            if (nguoiDung.HoTen.toLowerCase().trim().search(tuKhoa) !== -1) {
                danhSachNguoiDungKQ.ThemNguoiDung(nguoiDung);
            }
        }


        return danhSachNguoiDungKQ;
    }


    // Phuong Thuc Tim nguoi Dung theo tai khoan
    this.TimNguoiDungTheoTaiKhoan = function (TaiKhoan) {
        for (var i = 0; i < this.DSND.length; i++) {
            var nguoiDung = this.DSND[i];
            // so sanh nguoi dung trong mang va ID thi tra ra gia tri index
            if (nguoiDung.TaiKhoan == TaiKhoan) {
                return i;
            }
        }
        return -1;
    }

    // Phuong Thuc Xoa nguoi Dung
    this.XoaNguoiDung = function (taiKhoan) {
        // Tìm được vị trí của người dùng trong mảng danh sách người dùng
        var index = this.TimNguoiDungTheoTaiKhoan(taiKhoan);
        if (index !== -1) // Tìm đc index != -1 (có nghĩa là tìm đc vị trí)
        {
            // Tiến hành xóa object ở vị trí đó
            this.DSND.splice(index, 1);
        }
    }


    // Phuong Thuc chỉnh sửa người Dùng
    this.CapNhatThongTinNguoiDung = function (nguoiDungEdit) {
        var index = this.TimNguoiDungTheoTaiKhoan(nguoiDungEdit.TaiKhoan);
        var nguoiDungCapNhat = this.DSND[index];
        nguoiDungCapNhat.MatKhau = nguoiDungEdit.MatKhau;
        nguoiDungCapNhat.HoTen = nguoiDungEdit.HoTen;
        nguoiDungCapNhat.Email = nguoiDungEdit.Email;
        nguoiDungCapNhat.SoDT = nguoiDungEdit.SoDT;
    }





}
