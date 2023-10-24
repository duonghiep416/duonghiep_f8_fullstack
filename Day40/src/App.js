import { router } from "./Utils/Router";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Courses } from "./Pages/Courses";
import { CourseDetail } from "./Pages/CourseDetail";
import { Blogs } from "./Pages/Blogs";
import { DefaultLayout } from "./Layouts/DefaultLayout";

export const App = () => {
    return router(
        [
            {
                path: "/",
                component: Home,
            },
            {
                path: "/about",
                component: About,
            },
            {
                path: "/courses",
                component: Courses,
            },
            {
                path: "/courses/:id",
                component: CourseDetail,
            },
            {
                path: "/blogs",
                component: Blogs,
            },
        ],
        DefaultLayout
    );
};
