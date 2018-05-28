// dang ky su kien cho button xuatThongTin
function getMyEle(ele){
    return document.getElementById(ele);
}

getMyEle('xuatThongTin').addEventListener("click", function(){
    //viet function cho button
    getMyEle('ten').innerHTML = namecard.ten;
    getMyEle('nghe').innerHTML = namecard.ngheNghiep;
    getMyEle('nguoiTheoDoi').innerHTML = namecard.nguoiTheoDoi;
    getMyEle('nguoiThich').innerHTML = namecard.nguoiThich;
    getMyEle('sokhoaHoc').innerHTML = namecard.soKhoaHoc;
});