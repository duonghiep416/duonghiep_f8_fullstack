export function datePicker() {
    // Lấy tham chiếu đến phần tử input
    const input = document.getElementById("datetime-picker");

    // Khởi tạo Flatpickr
    flatpickr(input, {
        enableTime: true, // Cho phép chọn thời gian
        minDate: "today",
        dateFormat: "d-m-Y H:i", // Định dạng ngày tháng và giờ
    });
}

export function getTimePicker(dateSelected) {
    const time = calculateCountdown(dateSelected.getTime());
    const timeRemain = document.querySelector(".time-remain");
    timeRemain.innerText = `Bài viết sẽ được đăng sau ${time}`;
}
function calculateCountdown(timestampChosen) {
    const currentTimestamp = Date.now();
    const timeDifference = timestampChosen - currentTimestamp;

    if (timeDifference <= 0) {
        // Thời gian đã kết thúc
        return "Hết thời gian";
    }

    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return `${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây`;
}
