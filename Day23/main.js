const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const registerBtn = $("#register-btn");
const overlay = $(".overlay");
const modal = $(".modal");
const tabs = $$(".header-modal .tab");
const contentTabs = $$(".content-tab");
const loginTab = $("#login-tab-content");
const registerTab = $("#register-tab-content");
const emailLogin = $('.form-login input[type="email"]');
const passwordLogin = $('.form-login input[type="password"]');
const nameRegister = $('.form-register input[name="name"]');
const emailRegister = $('.form-register input[type="email"]');
const passwordRegister = $('.form-register input[type="password"]');
const formLogin = $(".form-login");
const formRegister = $(".form-register");
const loginSubmitBtn = $(".form-login .login-submit-btn");
const registerSubmitBtn = $(".form-register .register-submit-btn");
const formLoginInput = $$(".form-login input");
const formRegisterInput = $$(".form-register input");
const app = {
    // Modal
    activeModal: function () {
        registerBtn.addEventListener("click", function () {
            overlay.style.opacity = "1";
            overlay.style.visibility = "visible";
            modal.style.display = "block";
        });
        overlay.addEventListener("click", function () {
            overlay.style.opacity = "0";
            overlay.style.visibility = "hidden";
            modal.style.display = "none";
            app.clearInput();
        });
    },

    switchTabModal: function () {
        function tabClickHandler(e) {
            tabs.forEach((tab) => tab.classList.remove("active"));
            contentTabs.forEach((tab) => tab.classList.remove("active"));
            e.target.classList.add("active");
            if (e.target.id === "login-tab") {
                loginTab.classList.add("active");
            }
            if (e.target.id === "register-tab") {
                registerTab.classList.add("active");
            }
            app.clearInput();
        }
        tabs.forEach((tab) => tab.addEventListener("click", tabClickHandler));
    },

    clearInput: function () {
        formLoginInput.forEach((input) => {
            let messageElement = $(
                `.form-login input[id="${input.id}"] ~ .form-message`
            );
            input.classList.remove("input-error");
            messageElement.innerHTML = "";
            input.value = "";
        });

        formRegisterInput.forEach((input) => {
            let messageElement = $(
                `.form-register input[id="${input.id}"] ~ .form-message`
            );
            input.classList.remove("input-error");
            messageElement.innerHTML = "";
            input.value = "";
        });
    },
    // Validate Form
    validateForm: function () {
        let isVerifiedLogin = false;
        let isVerifiedRegister = false;
        //Email login
        let messageEmailLogin = $(
            '.form-login input[type="email"] ~ .form-message'
        );
        function checkEmail(messageElement, inputElement, isVerified) {
            if (!inputElement.checkValidity()) {
                inputElement.classList.add("input-error");
                messageElement.innerHTML =
                    inputElement.value.length === 0
                        ? "Vui lòng nhập thông tin"
                        : "Vui lòng nhập đúng định dạng email";
                isVerified = false;
            } else {
                inputElement.classList.remove("input-error");
                messageElement.innerHTML = "";
                isVerified = true;
            }
        }
        emailLogin.addEventListener("blur", () => {
            checkEmail(messageEmailLogin, emailLogin, isVerifiedLogin);
        });
        emailLogin.addEventListener("input", () => {
            checkEmail(messageEmailLogin, emailLogin, isVerifiedLogin);
        });

        //Password Login
        let messagePasswordLogin = $(
            '.form-login input[type="password"] ~ .form-message'
        );
        function checkPassword(messageElement, inputElement, isVerified) {
            if (inputElement.value.length === 0) {
                inputElement.classList.add("input-error");
                messageElement.innerHTML = " Vui lòng nhập thông tin";
                isVerified = false;
            } else {
                inputElement.classList.remove("input-error");
                messageElement.innerHTML = "";
                isVerified = true;
            }
        }
        passwordLogin.addEventListener("blur", () => {
            checkPassword(messagePasswordLogin, passwordLogin, isVerifiedLogin);
        });
        passwordLogin.addEventListener("input", () => {
            checkPassword(messagePasswordLogin, passwordLogin, isVerifiedLogin);
        });

        // Name Register
        let messageNameRegister = $(
            '.form-register input[name="name"] ~ .form-message'
        );
        function checkName() {
            if (nameRegister.value.length === 0) {
                nameRegister.classList.add("input-error");
                messageNameRegister.innerHTML = " Vui lòng nhập thông tin";
                isVerifiedRegister = false;
            } else {
                nameRegister.classList.remove("input-error");
                messageNameRegister.innerHTML = "";
                isVerifiedRegister = true;
            }
        }
        nameRegister.addEventListener("blur", checkName);
        nameRegister.addEventListener("input", checkName);
        // Email register
        let messageEmailRegister = $(
            '.form-register input[type="email"] ~ .form-message'
        );
        emailRegister.addEventListener("blur", () => {
            checkEmail(messageEmailRegister, emailRegister, isVerifiedRegister);
        });
        emailRegister.addEventListener("input", () => {
            checkEmail(messageEmailRegister, emailRegister, isVerifiedRegister);
        });

        // Password register
        let messagePasswordRegister = $(
            '.form-register input[type="password"] ~ .form-message'
        );
        passwordRegister.addEventListener("blur", () => {
            checkPassword(
                messagePasswordRegister,
                passwordRegister,
                isVerifiedRegister
            );
            if (
                (passwordRegister.value.length !== 0 &&
                    passwordRegister.value.length < 6) ||
                passwordRegister.value.length > 20
            ) {
                messagePasswordRegister.innerHTML =
                    "Mật khẩu tối thiểu 6 - 20 ký tự";
                isVerifiedRegister = false;
            } else {
                isVerifiedRegister = true;
            }
        });
        passwordRegister.addEventListener("input", () => {
            checkPassword(
                messagePasswordRegister,
                passwordRegister,
                isVerifiedRegister
            );
            if (
                (passwordRegister.value.length !== 0 &&
                    passwordRegister.value.length < 6) ||
                passwordRegister.value.length > 20
            ) {
                messagePasswordRegister.innerHTML =
                    "Mật khẩu tối thiểu 6 - 20 ký tự";
                isVerifiedRegister = false;
            } else {
                isVerifiedRegister = true;
            }
        });
        formRegister.addEventListener("change", () => {
            if (!isVerifiedRegister) {
                registerSubmitBtn.setAttribute("disabled", "disabled");
            } else {
                registerSubmitBtn.removeAttribute("disabled");
            }
        });
    },

    start: function () {
        this.activeModal();
        this.switchTabModal();
        this.validateForm();
    },
};

app.start();
