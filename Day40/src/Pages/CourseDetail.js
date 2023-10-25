import { coursesDetail } from "./Courses";
export const CourseDetail = ({ data }) => {
    const course = coursesDetail.find((course) => course.path === data.id);
    return `
        <h1>Chi tiết khóa học: ${course.name}</h1>
        <p>${course.isPublished ? "" : "Khóa học chưa được ra mắt"}</p>
        <a href="/courses" data-navigo>Back</a>
        `;
};
