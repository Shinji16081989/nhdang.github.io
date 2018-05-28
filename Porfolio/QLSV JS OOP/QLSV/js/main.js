/* 
    Du An Quan Ly Sinh Vien (JS OOP)
    Nguoi Thuc Hien: Nguyen Hai Dang
    Ngay 12/5/2018   
*/

function getMyEle(ele) {
    return document.getElementById(ele);
}

// Tao mang thong bao validation
var mangThongBao = ['Vui lòng nhập vào họ', 
                    'Vui lòng nhập vào tên', 
                    'Vui lòng nhập vào mã Nhân Viên', 
                    'Vui lòng chọn Chức Vụ',
                    'Họ Phải là Ký Tự',
                    'Tên Phải là Ký Tự',
                    'Mã Nhân Viên Phải là Số',
                    'Mã Nhân Viên Phải là Số, có ít nhất 6 ký tự và dài nhất 12 ký tự'];

function kiemTraNhap(idField,idThongBao,indexThongBao){
    var valueField = getMyEle(idField).value;
    var thongBao = getMyEle(idThongBao);
    var kq = false;
    if (valueField === "") {
        thongBao.style.display = 'block';
        thongBao.innerHTML = mangThongBao[indexThongBao];
        thongBao.style.color = 'red';    
        kq = false;
    }else{
        thongBao.style.display = 'none';
        kq = true;
    }
    return kq;
}

function kiemTraChucVu(){
    var kq = false;
    var chucvu = getMyEle('chucVu');
    var thongBao = getMyEle('thongBaoChucVu')
    if (chucvu.selectedIndex == 0) {
        thongBao.style.display = 'block';
        thongBao.innerHTML = mangThongBao[3];
        thongBao.style.color = 'red';    
        kq = false;
    }else{
        thongBao.style.display = 'none';
        kq = true;
    }
    return kq;
}

// function kiemTraTen(){
//     var ten = getMyEle('ten').value;
//     var thongBao = getMyEle('thongBaoTen')
//     if (ten === "") {
//         thongBao.innerHTML = mangThongBao[1];
//         thongBao.style.color = 'red';    
//     }
// }

function kiemTraNhapThongTin(idField,idThongBao,indexThongBao) {
    kq = false;
    var mangKiTu = /^[A-Za-z]+$/; // javascript expression
    var valueField = getMyEle(idField).value;
    var thongBao = getMyEle(idThongBao);
    if(valueField.match(mangKiTu)){
        thongBao.style.display = 'none';
        kq = true;
    }else{
        thongBao.style.display = 'block';
        thongBao.innerHTML = mangThongBao[indexThongBao];
        thongBao.style.color = 'red';
        kq = false;
    }
    return kq;
}

function kiemTraNhapMaNV() {
    var kq = false;
    var mangKiTu = /^[0-9]+$/; // javascript expression
    var valueField = getMyEle('maNV').value;
    var thongBao = getMyEle('thongBaoMaNV');
    if(valueField.match(mangKiTu)){ // chua nghi ra
        if (valueField.length < 6 || valueField.length > 12 ) {
            thongBao.style.display = 'none'; 
        }
        kq = true;       
    }else{
        thongBao.style.display = 'block';
        thongBao.innerHTML = mangThongBao[7];
        thongBao.style.color = 'red';
        kq = false;
    }
    return kq;
}

//Kiem tra Nhap Do Dai Ky Tu
// function kiemtraDoDaiKyTu() {
//     var valueField = getMyEle('maNV').value;
//     var thongBao = getMyEle('thongBaoMaNV');
//     // var kq = false;
//     if (valueField.length < 6 || valueField.length > 12 ) {
//         thongBao.style.display = 'block';
//         thongBao.innerHTML = mangThongBao[7];
//         thongBao.style.color = 'red';    
//         // kq = false;
//     }else{
//         thongBao.style.display = 'none';
//         // kq = true;
//     }
//     // return kq;
// }

function kiemTraHople() {
    var kq = kiemTraNhap('ho','thongBaoHo',0);
    if (kq){
        kq = kiemTraNhapThongTin('ho','thongBaoHo',4);
    }

    var kq = kiemTraNhap('ten','thongBaoTen',1);
    if (kq){
        kq = kiemTraNhapThongTin('ten','thongBaoTen',5);
    }

    var kq = kiemTraNhap('maNV','thongBaoMaNV',2);
    if(kq){
        kq = kiemTraNhapMaNV();
    }

    kq = kiemTraChucVu();
    return kq;
}

/*
    Muc dich: tao ra cac dong du la cac nhan vien
    Dau Vao: 
        tBody: the body trong table
        nv: Nhan Vien
    Nguoi tao: xxxxx    
*/

var dsNhanVien = new danhSachNV(); // bien toan cuc luu tru toan bo du lieu

function taoDong(tBody, nv) {
    var tr = document.createElement('tr');
    tBody.appendChild(tr);
    for (var i = 0; i < nv.mangThuocTinh.length; i++) {
        var td = document.createElement('td');
        td.innerHTML = nv.mangThuocTinh[i];
        tr.appendChild(td);   
    }
    var btnSua = "<button type='button' class='btn btn-primary' value='Sua' id='sua_" + nv.maNV + "'> Sua </button>"
    var btnCapNhat = "<button type='button' class='btn btn-primary btnCapNhat' value='Sua' id='capnhat_" + nv.maNV + "'> Cap Nhat </button>"
    var btnXoa = "<button type='button' class='btn btn-primary' value='Xoa' id='xoa_" + nv.maNV + "'> Xoa </button>"
    
    var td = document.createElement('td');
    td.innerHTML = btnSua + btnCapNhat + btnXoa;
    tr.appendChild(td);
    deleteHandler("xoa_"+ nv.maNV)
    deleteHandler("sua_"+ nv.maNV)
    deleteHandler("capnhat_"+ nv.maNV)
}

function xuLyThemNhanVienVaoTable() {
    var tBody = getMyEle('thetBody');
    var soNhanVien = dsNhanVien.soLuongNhanVien();
    dsNhanVien.xuatThuocTinhNV();
    tBody.innerHTML = "";
    for (var i = 0; i < soNhanVien; i++) {
        var nhanVien = dsNhanVien.NhanVien[i];
        taoDong(tBody, nhanVien);

    }

}

function lamMoiForm() {
    getMyEle('ho').value = '';
    getMyEle('ten').value = '';
    getMyEle('maNV').value = '';
    getMyEle('chucVu').selectedIndex = 0;
}

getMyEle('btnthemnhanvien').addEventListener('click', function(){
   var ktraHopLe = kiemTraHople();
   if(ktraHopLe){
    //lay gia tri nguoi dung nhap vao
    var ho = getMyEle('ho').value;
    var ten = getMyEle('ten').value;
    var maNV = getMyEle('maNV').value;
    //tao moi nhan vien
    var nhanVien = new NhanVien(maNV, ho, ten);
    dsNhanVien.themNhanVien(nhanVien);
    lamMoiForm();
    var hienThi = getMyEle('hienthi');
    hienThi.style.display = "block";
    xuLyThemNhanVienVaoTable();
   }
});


//xoa nhan vien
function deleteHandler(eleID) {
    getMyEle(eleID).addEventListener("click", function(){
    // console.log("xoa" + this.id);
    var id = this.id;
    var mangTemp = id.split("_");
    dsNhanVien.xoaNhanVien(mangTemp[1]);
    });
}