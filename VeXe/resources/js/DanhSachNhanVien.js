function DanhSachNhanVien(){
    this.mangNV = [];

    this.themNV= function(nv){
        this.mangNV.push(nv);
    }
    //tìm vị trí nhân viên trong mảng
    //dựa vào mã nhân viên để tìm vị trí
    this.timViTri = function(maNV){
        var viTri = -1;
        this.mangNV.map(function(item,index){
            if(item.maNV == maNV){
                viTri = index;               
            }
        });

        //trả về giá trị default của viTRi khi không tìm thấy nhân viên
        return viTri;
    };
    this.xoaNV = function(maNV){
        var viTri = this.timViTri(maNV);
        this.mangNV.splice(viTri,1);
    };
    this.layThongTinNV = function(maNV){
        var viTri = this.timViTri(maNV);
        // mangNV[0]
        return this.mangNV[viTri];
    };    
    this.capNhatNV = function(nv){
        var viTri = this.timViTri(nv.maNV);
        if(viTri != -1){
            this.mangNV[viTri] = nv;
        }
    }
}

DanhSachNhanVien.prototype.timKiemNhanVien = function(hoTen){
    var mangTimKiem = [];
    this.mangNV.map(function(item,index){
        if(item.tenNV.toLowerCase().indexOf(hoTen.toLowerCase()) > -1){
            //Nếu tìm thấy thì đẩy nhân viên vào trong mangTimKiem
            mangTimKiem.push(item);
        }
    });

   return mangTimKiem;
}