import { toast } from "react-toastify";
import { handleLogic } from "./script.js";

function reAuthenticate() {
    setTimeout(() => {
        validateUser();
    }, 1000);
}

export default async function validateUser() {
    const checkValidatedResult = await checkProfile();
    if (!checkValidatedResult) {
        const patternEmail =
            /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const emailUser = window.prompt("Vui lòng nhập email của bạn");
        const checkEmail = patternEmail.test(emailUser);
        if (!emailUser) {
            toast.error("Vui lòng nhập email!");
            reAuthenticate();
        } else if (!checkEmail) {
            toast.error("Vui lòng nhập đúng định dạng email!");
            reAuthenticate();
        } else {
            const query = {
                email: emailUser,
            };
            const { data, status_code } = await handleLogic.getAPIKey(query);
            if (status_code === "SUCCESS") {
                toast.success("Đăng nhập thành công");
                localStorage.setItem("email", emailUser);
                const { data, status_code } = await handleLogic.getProfile();
                if (status_code === "SUCCESS") {
                    localStorage.setItem("email", data.emailId.email);
                    localStorage.setItem("name", data.emailId.name);
                } else {
                    toast.error("Có lỗi xảy ra, vui lòng tải lại trang!");
                }
            } else if (status_code === "FAILED") {
                toast.error(
                    "Email chưa được đăng kí, vui lòng nhập lại email!"
                );
                reAuthenticate();
            }
        }
    } else {
        const name = localStorage.getItem("name");
        toast.success(`Chào bạn ${name}`);
    }
}

export const checkProfile = async () => {
    const data = await handleLogic.getProfile();
    if (data.status_code === "SUCCESS") {
        localStorage.setItem("email", data.data.emailId.email);
        localStorage.setItem("name", data.data.emailId.name);
        return data;
    } else if (data.status_code === "FAILED") {
        return false;
    }
};
