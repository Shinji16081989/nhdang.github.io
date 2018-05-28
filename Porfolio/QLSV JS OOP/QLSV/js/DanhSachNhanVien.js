/*
    Muc Tieu: Tao ra prototype class Danh Sach Nhan Vien
    Nguoi Tao: Dang Nguyen
    NGay Tao: 13/5/2018

*/
function DanhSachNhanVien(){
	this.mangNhanVien = [];

	this.ThemNhanVien = function(nv){
		this.mangNhanVien.push(nv);
	};

	this.XuatLuong = function(){
		for(var i=0; i < this.mangNhanVien.length; i++){
			this.mangNhanVien[i].tinhLuong();
		}
	};
}


danhSachNV.prototype.xoaNhanVien = function(maNV){
    var indexNhanVien = this.timNhanVien(maNV);
    if (indexNhanVien >= 0){
        this.mangNhanVien.splice(indexNhanVien, 1);
    }
};

danhSachNV.prototype.xuatThuocTinhNV = function () {
    for (var i = 0; i < this.mangNhanVien.length;i++) {
        this.mangNhanVien[i].xuatThongTin();      
    }
};

danhSachNV.prototype.soLuongNhanVien = function() {
    return this.mangNhanVien.length; 
};

danhSachNV.prototype.timNhanVien =  function (maNV) {
    var indexFound = -1;
    for (var i = 0; i < this.mangNhanVien.length; i++) {
        if(this.mangNhanVien[i].maNV === maNV){
            indexFound = i;
            break;
        }
    }
    return indexFound;
}