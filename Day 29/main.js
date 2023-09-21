const courseModule = document.querySelector(".course-module");
const courseLessonList = document.querySelectorAll(".course-lesson");
let currentDraggedElement = null;
courseLessonList.forEach((lesson) => {
    lesson.addEventListener("dragstart", function (e) {
        currentDraggedElement = this;
    });

    lesson.addEventListener("dragover", function (e) {
        e.preventDefault();
        if (currentDraggedElement === this) return;
        currentDraggedElement.parentNode.removeChild(currentDraggedElement);
        courseModule.insertBefore(currentDraggedElement, this);
        updateOrder();
    });

    lesson.addEventListener("drop", function (e) {
        e.preventDefault();
        updateOrder();
    });
});

function updateOrder() {
    const textLessonList = document.querySelectorAll(".text-lesson");
    const moduleList = document.querySelectorAll(".module-text");
    const contentTextLesson = document.querySelectorAll(".text-lesson span");
    const contentModule = document.querySelectorAll(".module-text span");
    textLessonList.forEach(function (textLesson, index) {
        textLesson.innerHTML = `Bài ${index + 1}: <span>${
            contentTextLesson[index].innerHTML
        }</span>`;
    });
    moduleList.forEach(function (module, index) {
        module.innerHTML = `Module ${index + 1}: <span>${
            contentModule[index].innerHTML
        }</span>`;
    });
}
updateOrder();
