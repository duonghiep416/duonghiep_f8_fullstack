import Navigo from "navigo";
import { DefaultLayout } from "../Layouts/DefaultLayout";
import { NotFound } from "../Pages/NotFound";

const routerNavigo = new Navigo("/");

const render = (content, target) => {
    target.innerHTML = content;
};

export function router(pathArr) {
    const app = document.getElementById("app");
    app.innerHTML = DefaultLayout();
    const main = document.getElementById("main");
    if (Array.isArray(pathArr)) {
        pathArr.forEach((pathItem) => {
            routerNavigo.on(pathItem.path, (route) =>
                render(pathItem.component(route), main)
            );
            routerNavigo.notFound(() => render(NotFound(), main));
        });
        routerNavigo.resolve();
    }
}
