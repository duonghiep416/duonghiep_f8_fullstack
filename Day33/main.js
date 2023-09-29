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
            default:
                if (
                    transcript.includes("chỉ đường ") ||
                    transcript.includes("chỉ đường tới ") ||
                    transcript.includes("đường tới ") ||
                    transcript.includes("tới ")
                ) {
                    transcript = transcript
                        .replace("chỉ đường ", "")
                        .replace("chỉ đường tới ", "")
                        .replace("đường tới ", "")
                        .replace("tới ", "");
                    window.open(
                        `https://www.google.com/maps/place/${transcript}/`
                    );
                } else if (
                    transcript.includes("bài hát ") ||
                    transcript.includes("mở bài hát ") ||
                    transcript.includes("mở bài hát, ") ||
                    transcript.includes("nghe bài hát ")
                ) {
                    transcript = transcript
                        .replace("mở bài hát ", "")
                        .replace("mở bài hát, ", "")
                        .replace("nghe bài hát ", "")
                        .replace("bài hát ", "");

                    window.open(
                        `https://zingmp3.vn/tim-kiem/tat-ca?q=${transcript}`
                    );
                } else if (
                    transcript.includes("video ") ||
                    transcript.includes("mở video ") ||
                    transcript.includes("xem video ")
                ) {
                    transcript = transcript
                        .replace("xem video ", "")
                        .replace("mở video ", "")
                        .replace("video ", "");

                    window.open(
                        `https://www.youtube.com/results?search_query=${transcript}`
                    );
                } else {
                    action.innerHTML =
                        "<b>Kết quả: Không thực hiện được yêu cầu</b>";
                }
        }
    };
}

button.addEventListener("click", speechToText);
