export const CourseDetail = ({ data }) => {
    return `
        <h1>Course: ${data.id}</h1>
        <a href="/courses" data-navigo>Back</a>
        `;
};
