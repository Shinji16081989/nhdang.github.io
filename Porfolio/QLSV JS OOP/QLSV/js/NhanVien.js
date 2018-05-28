// /*
//     Mô Tả: Tạo ra lớp đối tượng / prototype
// */

// function NhanVien(maNV, ho, ten, ngaySinh, 
//     chucVu, ngayLamViec, luongCB, phuCap) {
//     // Dinh nghia cac thuoc tinh prototype
//     this.maNV = maNV;
//     this.ho = ho;
//     this.ten = ten;
//     this.ngaySinh = ngaySinh;
//     this.chucVu = chucVu;
//     this.soNgayLamViec = ngayLamViec;
//     this.luongCoBan = luongCB;
//     this.phuCap = phuCap;
//     // Tao mang chua tat ca thuoc tinh de xu ly
//     this.mangThuocTinh = [
//         this.maNV,
//         this.ho,
//         this.ten,
//         this.ngaySinh,
//         this.chucVu,
//         this.soNgayLamViec,
//         this.luongCoBan,
//         this.phuCap,
//     ];
//     // phuong thuc cua prototype cach 1
//     // this.tinhLuong = function(){
//     //     return soNgayLamViec * luongCoBan + phuCap;
//     // };
// }

// /* 
//     Muc Tieu: add them tinh luong nhan vien
//     cach tao moi prototype cach 2
// */
// NhanVien.prototype.tinhLuong = function(){
//     return soNgayLamViec * luongCoBan + phuCap; 
// };


function NhanVien(ho,ten,msnv,ngaylam,chucvu,indexchucvu){
	this.ho = ho;
	this.ten = ten;
	this.msnv = msnv;
	this.ngaylam = ngaylam;
	this.chucvu = chucvu;
	this.indexchucvu = indexchucvu;
	this.luongcoban = 500;
	this.phucap = 50;
	this.luong = 0;

	this.tinhLuong = function(){
		if(this.indexchucvu == "1"){
			return this.luong = 2.0 * this.luongcoban + this.phucap + " $";
		}else if(this.indexchucvu == "2"){
			return this.luong = 1.5 * this.luongcoban + this.phucap + " $";
		}else{
			return this.luong = 1.0 * this.luongcoban + this.phucap + " $";
		}
	};
	this.xuatNhanVienCaNhan = function(sv){
		var mangNVCaNhan = [];
		this.mangNVCaNhan = [sv.ho, sv.ten, sv.msnv, sv.ngaylam, sv.chucvu, sv.luong];
	};
}