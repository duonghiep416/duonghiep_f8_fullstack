let second = 30;
const countEl = document.getElementById("count");
const btn = document.querySelector(".btn");
function delay(callback, milliseconds) {
    const startTime = performance.now();
    function checkTime(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= milliseconds) {
            callback();
        } else {
            requestAnimationFrame(checkTime);
        }
    }
    requestAnimationFrame(checkTime);
}

function countDown() {
    countEl.innerHTML = second;
    if (second > 0) {
        delay(() => {
            --second;
            countDown();
        }, 1000);
    } else {
        btn.style.cursor = "pointer";
        btn.style.backgroundColor = "blue";
        btn.addEventListener("click", () => {
            window.location.href = "https://fullstack.edu.vn";
        });
    }
}
countDown();
