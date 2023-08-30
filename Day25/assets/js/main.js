// Còn bug khi ấn nút prev do không có item nào ở đằng trước, sau khi transition thực hiện xong thì item cuối mới được đẩy lên đầu(Chưa fix được)
// Do làm slide infinity nên còn bug ở chức năng click vào dot chuyển slide nên đã tắt bỏ chức năng đó hoàn thiện sau
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const header = $("header");
const swipeLeft = $(".slider__swipe-left");
const swipeRight = $(".slider__swipe-right");
const slideMain = $(".slider-main");
const slideWrapper = $(".slider-wrapper");
const dotList = $(".dot-list");
let positionX = 0;
let index = 0;

const sliderInfos = [
    {
        id: 1,
        name: "Spider-man: No Way Home",
        src: "./assets/img/spiderman-banner.jpg",
    },
    {
        id: 2,
        name: "Doctor Strange",
        src: "./assets/img/doctorStrange-banner.jpg",
    },
    {
        id: 3,
        name: "Thor: Love And Thunder",
        src: "./assets/img/thor.png",
    },
    {
        id: 4,
        name: "Avengers Endgame",
        src: "./assets/img/endgame.png",
    },
    {
        id: 5,
        name: "Wednesday",
        src: "./assets/img/wednesday.jpg",
    },
];

function throttle(callback, wait) {
    let isThrottling = false;
    return function () {
        if (isThrottling) return;
        isThrottling = true;
        setTimeout(() => {
            callback();
            isThrottling = false;
        }, wait);
    };
}

const imageWidth = 100;
slideWrapper.style.width = `${imageWidth * 5}vw`;
slideMain.style.width = `${imageWidth}vw`;
let direction;
let active;
const app = {
    render: function () {
        let dotHtml = sliderInfos
            .map(
                (sliderInfo) =>
                    `<span class="dot-item dot-item-${sliderInfo.id}"></span>`
            )
            .join("");
        let html = sliderInfos
            .map((sliderInfo, index) => {
                return `<div class="slider-item" id='slider-item-${index}'>
                <img
                    src=${sliderInfo.src}
                    alt="${sliderInfo.name}"
                    class="slider-item__img"
                />
                <div class="slider-info">
                    <p class="slider-film__name">
                        ${sliderInfo.name}
                    </p>
                    <button class="btn watchBtn">Watch</button>
                    <button class="btn addListBtn">
                        My list
                        <i class="ri-add-line"></i>
                    </button>
                </div>
                </div>`;
            })
            .join("");

        slideMain.innerHTML = html;
        dotList.innerHTML = dotHtml;
    },

    next: function () {
        direction = 1;
        slideWrapper.style.transform = `translate(-${
            100 / sliderInfos.length
        }%)`;
    },

    prev: function () {
        direction = -1;
        slideWrapper.style.transform = `translate(${
            100 / sliderInfos.length
        }%)`;
    },

    handleNext: function () {
        swipeRight.addEventListener("click", () => {
            app.next();
        });
    },

    handlePrev: function () {
        swipeLeft.addEventListener("click", () => {
            app.prev();
        });
    },

    dragSlide: function () {
        const imgList = $$(".slider-item__img");
        let flag = false;
        let offsetXMouseDown;
        let distance;
        imgList.forEach((imgItem) => {
            imgItem.addEventListener("mousedown", (e) => {
                e.preventDefault();
                offsetXMouseDown = e.clientX;
                flag = true;
            });
            imgItem.addEventListener("mousemove", (e) => {
                if (flag) {
                    imgItem.style.cursor = "move";
                    let direction = e.clientX - offsetXMouseDown;
                    distance = Math.abs(e.clientX - offsetXMouseDown);
                    slideWrapper.style.transition = "none";
                    slideWrapper.style.transform = `translate(${direction}px)`;
                    if (distance >= 500 && direction < 0) {
                        slideWrapper.style.transition = "1s";
                        app.next();
                        flag = false;
                    } else if (distance >= 500 && direction > 0) {
                        slideWrapper.style.transition = "1s";
                        app.prev();
                        flag = false;
                    }
                } else {
                    imgItem.style.cursor = "auto";
                }
            });
            imgItem.addEventListener("mouseup", (e) => {
                flag = false;
                e.preventDefault();
                slideWrapper.style.transition = "1s";
                if (distance < 500) {
                    slideWrapper.style.transform = `translate(0)`;
                }
            });
        });
    },

    swapSlide: function () {
        slideWrapper.addEventListener("transitionend", function () {
            if (direction === 1) {
                slideMain.appendChild(slideMain.firstElementChild);
                direction = 0;
            } else if (direction === -1) {
                slideMain.prepend(slideMain.lastElementChild);
                direction = 0;
            }
            slideWrapper.style.transition = "none";
            slideWrapper.style.transform = "translate(0)";
            setTimeout(function () {
                slideWrapper.style.transition = "all 1s";
            });
            app.activeDot();
        });
        // setInterval(app.next, 5000);
    },

    activeDot: function (index) {
        active = index ? index : Number($(".slider-item").id.slice(-1));
        indexItemSelected = Number($(".slider-item").id.slice(-1));
        const listDot = $$(".dot-item");
        listDot.forEach((item, index) => {
            if (index === active) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    },

    // selectSlide: function () {
    //     const listDot = $$(".dot-item");
    //     listDot.forEach((item, index) => {
    //         item.addEventListener("click", () => {
    //             app.activeDot(index);
    //         });
    //     });
    // },

    start: function () {
        this.render();
        this.handleNext();
        this.handlePrev();
        this.swapSlide();
        this.activeDot();
        this.dragSlide();
        // this.selectSlide();
    },
};
app.start();
