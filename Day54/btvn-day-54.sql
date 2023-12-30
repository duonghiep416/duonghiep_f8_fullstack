CREATE TABLE KHACH_HANG (
	MaKH VARCHAR(50) PRIMARY KEY,
	TenKH VARCHAR(50) NOT NULL,
	DiaChi VARCHAR(50) NOT NULL,
	SoDT VARCHAR(20) NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

CREATE TYPE RoomLevel AS ENUM ('low', 'medium', 'vip');

CREATE TABLE PHONG(
	MaPhong VARCHAR(50) PRIMARY KEY,
	LoaiPhong RoomLevel NOT NULL,
	SoKhachToiDa integer NOT NULL,
	GiaPhong1Gio real NOT NULL,
	MoTa VARCHAR(255) NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

-- CREATE TYPE StatusOrder AS ENUM ('canceled', 'ordered');

CREATE TABLE DAT_PHONG (
	MaDatPhong VARCHAR(50) PRIMARY KEY,
	MaPhong VARCHAR(50) References PHONG(MaPhong),
	MaKH VARCHAR(50) References KHACH_HANG(MaKH),
	NgayDat date NOT NULL,
	GioBatDau time NOT NULL,
	GioKetThuc time NOT NULL,
	TienDatCoc real NOT NULL,
	GhiChu varchar(100),
	TrangThaiDat StatusOrder NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

CREATE TABLE DICH_VU_DI_KEM(
	MaDV VARCHAR(50) PRIMARY KEY,
	TenDV VARCHAR(50) NOT NULL,
	DonViTinh VARCHAR(10) NOT NULL,
	DonGia real NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

CREATE TABLE CHI_TIET_SU_DUNG_DICH_VU(
	MaDatPhong VARCHAR(50) PRIMARY KEY REFERENCES DAT_PHONG(MaDatPhong),
	MaDV VARCHAR(50) REFERENCES DICH_VU_DI_KEM(MaDV) NOT NULL,
	SoLuong integer NOT NULL default 1,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

-- Bài 1:
SELECT
	dp.MaDatPhong,
	dp.MaPhong,
	p.LoaiPhong,
	p.GiaPhong1Gio AS GiaPhong,
	kh.TenKH,
	dp.NgayDat,
	p.GiaPhong1Gio * EXTRACT(EPOCH FROM (dp.GioKetThuc - dp.GioBatDau)) / 3600 AS TongTienHat, 
	COALESCE(SUM(dv.DonGia * COALESCE(ct.SoLuong, 0)), 0) AS TongTienSuDungDichVu,
	p.GiaPhong1Gio * EXTRACT(EPOCH FROM(dp.GioKetThuc - dp.GioBatDau)) / 3600 + COALESCE(SUM(dv.DonGia * COALESCE(ct.SoLuong, 0)), 0) AS TongTienThanhToan
FROM DAT_PHONG dp
JOIN PHONG p ON dp.MaPhong = p.MaPhong
JOIN KHACH_HANG kh ON dp.MaKH = kh.MaKH
LEFT JOIN CHI_TIET_SU_DUNG_DICH_VU ct ON dp.MaDatPhong = ct.MaDatPhong
LEFT JOIN DICH_VU_DI_KEM dv ON ct.MaDV = dv.MaDV
GROUP BY dp.MaDatPhong, dp.MaPhong, p.LoaiPhong, p.GiaPhong1Gio, kh.TenKH, dp.NgayDat;

--Bài 2
SELECT 
    kh.MaKH, 
    kh.TenKH, 
    kh.DiaChi, 
    kh.SoDT
FROM KHACH_HANG kh
JOIN DAT_PHONG dp ON kh.MaKH = dp.MaKH
WHERE kh.DiaChi = 'Hoa xuan';

--Bài 3
SELECT 
    p.MaPhong, 
    p.LoaiPhong, 
    p.SoKhachToiDa, 
    p.GiaPhong1Gio AS GiaPhong, 
    COUNT(dp.MaDatPhong) AS SoLanDat
FROM PHONG p
JOIN DAT_PHONG dp ON p.MaPhong = dp.MaPhong
WHERE dp.TrangThaiDat = 'ordered'
GROUP BY p.MaPhong, p.LoaiPhong, p.SoKhachToiDa, p.GiaPhong1Gio
HAVING COUNT(dp.MaDatPhong) > 2;