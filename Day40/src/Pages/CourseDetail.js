import { coursesDetail } from "./Courses";
export const CourseDetail = ({ data }) => {
    const course = coursesDetail.find((course) => course.path === data.id);
    return `
        <h1>Chi tiết khóa học: ${course.name}</h1>
        <p class='text-lg font-bold'>${
            course.isPublished ? "" : "Khóa học chưa được ra mắt"
        }</p>
        ${
            course.isPro && course.isPublished
                ? "<p class='text-lg font-bold'>Vui lòng liên hệ qua stk để nhận thông tin chi tiết khóa học!</p><img src='./src/Assets/images/qr-code.jpg' alt='qr-code' class='w-80'/>"
                : ""
        }
        <a href="/courses" data-navigo class="bg-orange-400 rounded-full px-4 py-3 font-semibold text-lg inline-block mt-3 text-white">Back</a>
        `;
};
