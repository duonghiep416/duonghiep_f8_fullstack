import { coursesDetail } from "./Courses";
import qrCode from "../Assets/images/qr-code.jpg";
export const CourseDetail = ({ data }) => {
    const course = coursesDetail.find((course) => course.path === data.id);
    return `
        <h2 class="mt-4">Chi tiết khóa học: <span class="font-bold">${
            course.name
        }</span></h2>
        <p class='text-lg font-bold'>${
            course.isPublished ? "" : "Khóa học chưa được ra mắt"
        }</p>
        <p class='text-lg font-bold'>Vui lòng liên hệ qua stk để nhận thông tin chi tiết khóa học!</p><img src='${qrCode}' alt='qr-code' class='w-80'/>
        <a href="/courses" data-navigo class="bg-orange-400 rounded-full px-4 py-3 font-semibold text-lg inline-block mt-3 text-white">Back</a>
        `;
};
