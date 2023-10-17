import { config } from "./config.js";
import { client } from "./client.js";
import { loginPage, homePage } from "./html.js";
import { toast } from "./toast.js";
import { datePicker, getTimePicker } from "./datepicker.js";
const { SERVER_API, SERVER_AUTH_API } = config;
const root = document.getElementById("root");
const loading = document.querySelector(".loader");
client.setUrl(SERVER_AUTH_API);

let isShowLogin = false;
// Get Posts
const handleGetArticle = async () => {
    client.setUrl(SERVER_API);
    loading.classList.remove("hide");
    const { data: response } = await client.get("/blogs");
    const articleContainer = document.querySelector(".article-container");
    articleContainer.innerHTML = "";
    if (response.status_code === "SUCCESS") {
        const { data: posts } = response;

        posts.map((post, index) => {
            const { createdAt } = post;
            const date = new Date(createdAt);
            const dateString = `${date.getDate()} - ${
                date.getMonth() + 1
            } - ${date.getFullYear()} | ${date.getHours()}:${
                date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes()
            }`;
            // postContainer
            const postContainer = document.createElement("div");
            postContainer.classList.add("post-container");
            // Name
            const userName = document.createElement("a");
            userName.classList.add("user-name");
            userName.innerText = post.userId.name;
            //Date
            const dateContainer = document.createElement("span");
            dateContainer.classList.add("date");
            dateContainer.innerText = dateString;
            // Title
            const title = document.createElement("p");
            title.classList.add("title-article");
            title.innerText = post.title;
            title.append(dateContainer);

            // Content
            const content = document.createElement("p");
            content.classList.add("content-article");
            content.innerText = post.content;
            postContainer.append(userName);
            postContainer.append(title);
            postContainer.append(content);
            articleContainer.append(postContainer);

            // Read More
            if (content.offsetHeight > 50) {
                const readMore = document.createElement("span");
                readMore.classList.add("read-more");
                readMore.innerText = `Read more`;
                postContainer.append(readMore);
                readMore.addEventListener("click", () => {
                    content.style.display =
                        content.style.display === "block"
                            ? "-webkit-box"
                            : "block";
                    readMore.innerText =
                        readMore.innerText === "Read more"
                            ? "Hide"
                            : "Read more";
                });
            }
            // Separate
            const separate = document.createElement("hr");
            separate.style.marginTop = "10px";
            postContainer.append(separate);
        });
    }
    loading.classList.add("hide");
    client.setUrl(SERVER_AUTH_API);
};
let timerId;
const render = async () => {
    // if (timerId) {
    //     clearInterval(timerId);
    //     timerId = undefined;
    // }
    client.setUrl(SERVER_API);
    const accessToken = localStorage.getItem("access_token");
    const { data: response } = await client.get("/users/profile", accessToken);
    client.setUrl(SERVER_AUTH_API);
    renewAccessToken(response);
    if (response.status_code === "SUCCESS") {
        root.innerHTML = homePage;
        handleGetArticle();
        document.body.style.display = "block";
        const unverified = root.querySelector(".unverified");
        unverified.remove();
        const logout = root.querySelector(".profile .logout");
        const nameEl = root.querySelector(".profile .name");
        const name = localStorage.getItem("name");
        nameEl.innerText = name;
        // Logout
        logout.addEventListener("click", async (e) => {
            e.preventDefault();
            const token = localStorage.getItem("access_token");
            loading.classList.remove("hide");
            const { data: response } = await client.post("/logout", {}, token);
            if (response.status_code === "SUCCESS") {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }

            loading.classList.add("hide");
            showNotification(response, null, "logout");
            isShowLogin = false;
            render();
        });

        //POST ARTICLE
        const formPostArticle = document.querySelector(".post-article");
        formPostArticle.addEventListener("submit", (e) => {
            e.preventDefault();
            const timeRemain = document.querySelector(".time-remain");
            timeRemain.innerText = "";
            if (timerId) {
                clearInterval(timerId);
                timerId = undefined;
            }
            const title = formPostArticle.querySelector("#title").value.trim();
            const content = formPostArticle
                .querySelector("#content")
                .value.trim();
            if (title && content) {
                handlePostArticle({ title, content });
                render();
            }
            const inputDatePicker = document.getElementById("datetime-picker");
            if (inputDatePicker.value && title && content) {
                const dateSelected = new Date(
                    inputDatePicker._flatpickr.selectedDates[0].toString()
                );
                timerId = setInterval(() => {
                    getTimePicker(dateSelected);
                }, 1000);
            }
        });
        datePicker();
    } else if (!isShowLogin) {
        root.innerHTML = homePage;
        document.body.style.display = "block";
        handleGetArticle();
        const verified = root.querySelector(".verified");
        verified.remove();
        const showLoginPageBtn = root.querySelector(".show-login-page");
        showLoginPageBtn.addEventListener("click", () => {
            root.innerHTML = loginPage;
            isShowLogin = true;
            render();
        });
    } else {
        document.body.style.display = "flex";
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("container");
        const signupForm = document.querySelector(".signup-form");
        const signinForm = document.querySelector(".signin-form");
        signUpButton.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });

        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            submitInfo(e);
        });

        signinForm.addEventListener("submit", (e) => {
            e.preventDefault();
            submitInfo(e, "signin");
        });
    }
};
render();

const handlePostArticle = async (data) => {
    client.setUrl(SERVER_API);
    const token = localStorage.getItem("access_token");
    loading.classList.remove("hide");
    await client.post("/blogs", data, token);

    loading.classList.add("hide");
    render();
    client.setUrl(SERVER_AUTH_API);
};
const handleLogin = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        toast("Thất bại", `Vui lòng nhập đầy đủ thông tin`, "error");
        return false;
    }
    if (password.length < 8) {
        toast("Thất bại", `Mật khẩu chưa đủ 8 kí tự`, "error");
        return false;
    }
    loading.classList.remove("hide");
    const { data: tokens } = await client.post("/login", data);
    showNotification(tokens, null, "signin");
    if (tokens.status_code !== "FAILED") {
        const { accessToken, refreshToken } = tokens.data;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        render();
        const nameEl = document.querySelector(".profile .name");
        localStorage.setItem("name", tokens.data.name);
        nameEl.innerText = tokens.data.name;
    }
    loading.classList.add("hide");
};

const handleRegister = async (data) => {
    const { name, email, password } = data;
    if (!name || !email || !password) {
        toast("Thất bại", `Vui lòng nhập đầy đủ thông tin`, "error");
        return false;
    }
    if (password.length < 8) {
        toast("Thất bại", `Mật khẩu chưa đủ 8 kí tự`, "error");
        return false;
    }
    loading.classList.remove("hide");
    const { data: response } = await client.post("/register", data);
    loading.classList.add("hide");
    showNotification(response, data, "signup");
};

function submitInfo(e, type = "signup") {
    const emailEl = e.target.querySelector(`.email-${type}`);
    const passwordEl = e.target.querySelector(`.password-${type}`);
    const email = emailEl.value;
    const password = passwordEl.value;
    if (type === "signup") {
        const nameEl = e.target.querySelector(`.name-${type}`);
        const name = nameEl.value;
        handleRegister({ email, password, name });
        nameEl.value = "";
    } else {
        handleLogin({ email, password });
    }
    emailEl.value = "";
    passwordEl.value = "";
}

function showNotification(response, data, type = "signup") {
    if (response.status_code === "SUCCESS") {
        toast("Thành công", `${response.message}`, "success");
        if (type !== "logout") container.classList.remove("right-panel-active");
        if (type === "signup") {
            const emailEl = document.querySelector(".email-signin");
            emailEl.value = data.email;
            const passwordEl = document.querySelector(".password-signin");
            passwordEl.value = data.password;
        }
    } else if (response.status_code === "FAILED") {
        toast("Thất bại", `${response.message}`, "error");
    } else {
        toast("Thất bại", `Có lỗi xảy ra, vui lòng tải lại trang web`, "error");
    }
}

// Renew Access Token
async function renewAccessToken(response) {
    if (response.status_code !== "SUCCESS") {
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await client.post("/refresh-token", {
            refreshToken: refreshToken,
        });
        localStorage.setItem("access_token", data.data.token.accessToken);
        render();
    }
}

// email :helo@gmail.com
// pass: 123123123

// Xử lý khi user thay đổi accessToken => verify server
// Nếu trả về 200 => Ok
// Nếu trả về 401 => Xử lý logout

// Khi accessToken hết hạn => Xử lý luôn cấp lại accessToken mới => Lưu storage => call lại api cần lấy dữ liệu

/*
Ví dụ:
1. Lấy danh sách sản phẩm => Lấy được

2. Lấy danh sách bài viết => accessToken hết hạn => Không lấy được bài viết
- call Api /refresh => Lấy access mới => lưu localStorage => call lại danh sách bài viết

3. Lấy danh sách khóa học
*/
