const button = document.querySelector(".btn");
const output = document.querySelector(".output");
const action = document.querySelector(".action");
const stopBtn = document.querySelector(".stop-btn");
function speechToText() {
    var transcript = null;
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "vi-VN";
    recognition.start();

    recognition.onstart = function () {
        action.innerHTML = "Đang nghe, vui lòng nói yêu cầu của bạn...";
        stopBtn.removeAttribute("hidden");
        stopBtn.addEventListener("click", function () {
            recognition.stop();
        });
    };

    recognition.onspeechend = function () {
        action.innerHTML = "Dừng nghe, hi vọng kết quả theo ý bạn";
        recognition.stop();
    };

    recognition.onresult = function (event) {
        transcript = event.results[0][0].transcript;
        output.innerHTML = "<b>Kết quả: </b>" + transcript;
    };
    recognition.onend = function (event) {
        stopBtn.setAttribute("hidden", "");
        transcript = transcript.toLowerCase().slice(0, -1);
        switch (transcript) {
            // Youtube
            case "youtube":
                window.open("https://www.youtube.com");
                break;
            case "facebook":
                window.open("https://www.facebook.com");
                break;
            case "google":
                window.open("https://www.google.com");
                break;
            case "instagram":
                window.open("https://www.instagram.com");
                break;
            case "google drive":
                window.open("https://drive.google.com");
                break;
            case "google maps":
                window.open("https://maps.google.com");
                break;
            case "bản đồ":
                window.open("https://maps.google.com");
                break;
            case "video ai chung tình được mãi":
                window.open("https://www.youtube.com/watch?v=eZpJdO22jZ0");
                break;
            case "mở video ai chung tình được mãi":
                window.open("https://www.youtube.com/watch?v=eZpJdO22jZ0");
                break;
            case "xem video ai chung tình được mãi":
                window.open("https://www.youtube.com/watch?v=eZpJdO22jZ0");
                break;
            // Google maps
            case "chỉ đường vinhomes smart city tây mỗ":
                window.open("https://maps.app.goo.gl/Yv2wngLunmwcgJHN6");
                break;
            case "chỉ đường tới vinhomes smart city tây mỗ":
                window.open("https://maps.app.goo.gl/Yv2wngLunmwcgJHN6");
                break;
            case "tới vinhomes smart city tây mỗ":
                window.open("https://maps.app.goo.gl/Yv2wngLunmwcgJHN6");
                break;
            case "đường tới vinhomes smart city tây mỗ":
                window.open("https://maps.app.goo.gl/Yv2wngLunmwcgJHN6");
                break;
            case "bài hát ai chung tình được mãi":
                window.open(
                    "https://zingmp3.vn/bai-hat/Ai-Chung-Tinh-Duoc-Mai-Dinh-Tung-Huy-ACV/ZUB790F8.html"
                );
                break;
            case "mở bài hát ai chung tình được mãi":
                window.open(
                    "https://zingmp3.vn/bai-hat/Ai-Chung-Tinh-Duoc-Mai-Dinh-Tung-Huy-ACV/ZUB790F8.html"
                );
                break;
            case "nghe bài hát ai chung tình được mãi":
                window.open(
                    "https://zingmp3.vn/bai-hat/Ai-Chung-Tinh-Duoc-Mai-Dinh-Tung-Huy-ACV/ZUB790F8.html"
                );
                break;

            default:
                action.innerHTML =
                    "<b>Kết quả: Không thực hiện được yêu cầu</b>";
        }
    };
}

button.addEventListener("click", speechToText);
