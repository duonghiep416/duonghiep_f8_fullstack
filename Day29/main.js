const allLesson = [
    "Nhập môn lập trình web",
    "Giới thiệu khóa học HTML, CSS",
    "Lập trình web là gì? Thiết kế web là gì?",
    "Lộ trình học lập trình web Fullstack",
    "Phương pháp học lập trình hiệu quả",
    "Giới thiệu về ngôn ngữ HTML",
    "Cấu trúc trang HTML, cấu trúc thẻ HTML, cách học và nhớ các thẻ HTML",
    "Các loại thẻ HTML, các nhóm thẻ HTML",
    "Các thẻ HTML hay dùng trong nhóm Block",
    "Các thẻ HTML hay dùng trong nhóm Inline",
    "Giới thiệu về ngôn ngữ CSS",
    "Cấu trúc trang CSS, cấu trúc thẻ CSS, cách học và nhớ các thẻ CSS",
    "Các loại thẻ CSS, các nhóm thẻ CSS",
    "Các thẻ CSS hay dùng trong nhóm Block",
    "Các thẻ CSS hay dùng trong nhóm Inline",
];
const titleModule = [
    "Nhập môn lập trình web",
    "Giới thiệu về ngôn ngữ HTML",
    "Giới thiệu về ngôn ngữ CSS",
];
let currentModule = null;
let module;
function createModule() {
    module = [];
    let lessonName = [];
    allLesson.forEach((lesson, index) => {
        if (titleModule.includes(lesson)) {
            // Nếu bắt đầu một module mới
            currentModule = {
                id: module.length + 1,
                nameModule: lesson,
                lesson: [],
            };
            module.push(currentModule);
        }
        // Nếu là bài học trong module hiện tại
        else if (currentModule) {
            currentModule.lesson.push({ nameLesson: lesson });
        } else if (!currentModule && !titleModule.includes(lesson)) {
            module[0] = {
                id: 1,
                nameModule: null,
                lesson: lessonName,
            };
            module[0].lesson.push({ nameLesson: lesson });
        }
    });
}

function renderCourseContent() {
    let indexLesson = 0;
    const courseContent = document.querySelector(".course-content");
    const html = module
        .map((item, index) => {
            return `<li class="course-module">
                    <p class="module-text course-lesson" draggable="true">${
                        "Module " +
                        (module[0].nameModule ? index + 1 : index) +
                        ": "
                    } <span>${item.nameModule}</span></p>
                    <ul class="course-lesson-container">
                        ${item.lesson
                            .map(
                                (
                                    lesson
                                ) => `<li class="course-lesson" draggable="true">
                            <p class="lesson-text">Bài ${++indexLesson}: ${
                                    lesson.nameLesson
                                }</p>
                        </li>`
                            )
                            .join("")}
                    </ul>
                </li>`;
        })
        .join("");

    courseContent.innerHTML = `<ul>${html}</ul>`;

    const firstLesson = document.querySelector(
        ".course-module .course-lesson span"
    );
    const firstCourseLesson = document.querySelector(
        ".course-module .course-lesson"
    );
    if (firstLesson.innerHTML === "null") {
        firstCourseLesson.style.display = "none";
    }
}

function createPlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    return placeholder;
}

function dragLesson() {
    const courseContent = document.querySelector(".course-content");
    const heightItem = document.querySelector(".course-lesson").offsetHeight;
    const courseContentTop = courseContent.offsetTop;
    let oldLocation = 0;
    let newLocation = 0;
    let draggingItem = null;
    let placeholder = null;

    courseContent.addEventListener("dragstart", (e) => {
        const item = e.target.closest(".course-lesson");
        if (!item) return;
        item.classList.add("dragging");
        draggingItem = item;
        const offsetTop = item.offsetTop;
        oldLocation = Math.floor((offsetTop - courseContentTop) / heightItem);
    });

    courseContent.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!draggingItem) return;

        const item = e.target.closest(".course-lesson");
        if (!item) return;

        if (item === placeholder) return;

        const offsetTop = item.offsetTop;
        newLocation = Math.floor((offsetTop - courseContentTop) / heightItem);
        if (newLocation !== oldLocation) {
            const itemMove = allLesson.splice(oldLocation, 1)[0];
            allLesson.splice(newLocation, 0, itemMove);
            createModule();
            renderCourseContent();
            item.classList.remove("dragging");
            oldLocation = newLocation;
        }
    });

    courseContent.addEventListener("dragenter", (e) => {
        if (!draggingItem) return;

        const item = e.target.closest(".course-lesson");
        if (!item) return;

        if (item === placeholder) return;

        if (placeholder && placeholder.parentNode === courseContent) {
            courseContent.removeChild(placeholder);
        }

        placeholder = createPlaceholder();
        if (
            item.parentNode === courseContent &&
            placeholder.parentNode === courseContent
        ) {
            courseContent.insertBefore(placeholder, item);
        }
    });

    courseContent.addEventListener("dragend", () => {
        if (placeholder && placeholder.parentNode === courseContent) {
            courseContent.removeChild(placeholder);
        }

        draggingItem = null;
        createModule();
        renderCourseContent();
    });
}

createModule();
renderCourseContent();
dragLesson();
