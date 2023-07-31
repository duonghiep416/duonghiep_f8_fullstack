// Bài 1: Tính tiền taxi
// Tính tiền cước taxi dựa vào các điều kiện sau
// Số km ≤ 1 giá 15000đ
// 1 < số km ≤ 5 giá 13500đ
// Số km > 5 giá 11000đ
// Nếu số km > 120 km sẽ được giảm 10% trên tổng số tiền

function calcTaxiCost(distance) {
    if (distance <= 0 || typeof distance !== "number")
        return console.log("Không hợp lệ");
    if (distance <= 1)
        return console.log(
            `Số tiền taxi là: ${distance * 15000}đ. Số km: ${distance} km`
        );
    if (distance <= 5)
        return console.log(
            `Số tiền taxi là: ${distance * 13500}đ. Số km: ${distance} km`
        );
    if (distance > 120)
        return console.log(
            `Số tiền taxi là: ${distance * 11000 * 0.1}đ. Số km: ${distance} km`
        );
    if (distance > 5)
        return console.log(
            `Số tiền taxi là: ${distance * 11000}đ. Số km: ${distance} km`
        );
}
// TEST
calcTaxiCost(20);
calcTaxiCost(20.5);
calcTaxiCost(-20);
calcTaxiCost(150);
calcTaxiCost("Hello F8");
calcTaxiCost(0);

// Bài 2: Tính tiền điện
// Học viên viết chương trình tiền điện hàng tháng theo yêu cầu sau
// Input: Số điện tiêu thụ hàng tháng
// Output: Hiển thị số tiền phải đóng

function calcElectricBill(number) {}
