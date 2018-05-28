function NguoiDungService() {
    this.LayThongTinGiaoVu = function () {
      var urlAPI = "http://sv.myclass.vn/api/quanlytrungtam/danhsachnguoidung";
      return $.ajax({
        type:"GET",
        dataType:"json",
        url:urlAPI,
    });
  };
}