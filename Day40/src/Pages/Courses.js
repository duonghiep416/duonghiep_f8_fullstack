export const coursesDetail = [
    {
        id: 1,
        name: "HTML CSS Pro",
        originalPrice: "2.500.000đ",
        salePrice: "1.299.000đ",
        thumbnail_url:
            "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
        isPro: true,
        isPublished: true,
    },
    {
        id: 2,
        name: "Ngôn ngữ tiền xử lý Sass",
        originalPrice: "400.000đ",
        salePrice: "299.000đ",
        thumbnail_url:
            "https://files.fullstack.edu.vn/f8-prod/courses/27/64e184ee5d7a2.png",
        isPro: true,
        isPublished: true,
    },
    {
        id: 3,
        name: "Javascript Pro",
        originalPrice: "",
        salePrice: "",
        thumbnail_url:
            "https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png",
        isPro: true,
        isPublished: false,
    },
    {
        id: 4,
        name: "NextJS Pro",
        originalPrice: "",
        salePrice: "",
        thumbnail_url:
            "https://files.fullstack.edu.vn/f8-prod/courses/20/648020fc16597.png",
        isPro: true,
        isPublished: false,
    },
    {
        id: 5,
        name: "Kiến thức nhập môn IT",
        originalPrice: "",
        salePrice: "",
        thumbnail_url: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
        isPro: false,
        isPublished: true,
    },
    {
        id: 6,
        name: "Lập trình C++ cơ bản, nâng cao",
        originalPrice: "",
        salePrice: "",
        thumbnail_url:
            "https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png",
        isPro: false,
        isPublished: true,
    },
    {
        id: 7,
        name: "HTML, CSS từ Zero đến Hero",
        originalPrice: "",
        salePrice: "",
        thumbnail_url: "https://files.fullstack.edu.vn/f8-prod/courses/2.png",
        isPro: false,
        isPublished: true,
    },
    {
        id: 8,
        name: "Responsive với Grid System",
        originalPrice: "",
        salePrice: "",
        thumbnail_url: "https://files.fullstack.edu.vn/f8-prod/courses/3.png",
        isPro: false,
        isPublished: true,
    },
];

function stringToPath(string) {
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return string.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

coursesDetail.forEach((course) => {
    const path = stringToPath(course.name);
    course.path = path;
});
const coursesPro = coursesDetail.filter((course) => {
    return course.isPro;
});
const coursesFree = coursesDetail.filter((course) => {
    return !course.isPro;
});

const renderCourse = (courseType) => {
    return courseType
        .map((course) => {
            return `
                        <li class="course-item">
                            <div class="ct-course-img w-[360px] rounded-2xl overflow-hidden relative">
                                <img src="${course.thumbnail_url}" alt="${course.name}" class="w-full"/>
                                <div class="link-container absolute inset-0 bg-slate-900/70 flex items-center justify-center transition-all opacity-0 invisible">
                                    <a href="/courses/${course.path}" class="font-semibold text-sm bg-white py-2 px-3 rounded-full" data-navigo>Chi tiết khóa học</a>
                                </div>
                            </div>
                            <h3 class="course-title text-lg font-semibold mt-2">${course.name}</h3>
                            <div class="price">
                                <span class="original-price line-through mr-2">${course.originalPrice}</span>
                                <span class="sale-price text-orange-500 font-bold">${course.salePrice}</span>
                            </div>
                        </li>
                    `;
        })
        .join("");
};
export const Courses = () => {
    return `
        <h2 class="ct-course-title">Khóa học Pro</h2>
        <ul class="course-list-pro ct-course-list">
            ${renderCourse(coursesPro)}
        </ul>
        <h2 class="ct-course-title">Khóa học miễn phí</h2>
        <ul class="course-list-free ct-course-list">
            ${renderCourse(coursesFree)}
        </ul>  
    `;
};
