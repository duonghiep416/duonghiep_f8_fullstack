import { toast } from "react-toastify";
import { handleLogic } from "../../assets/js/script";
import { checkProfile } from "../../assets/js/validateUser";

export default async function payment(state) {
    const checkValidatedResult = await checkProfile();
    if (!checkValidatedResult) {
        toast.error("Có lỗi xảy ra, vui lòng tải lại trang!");
    } else {
        const body = state.productsCart;
        const data = await handleLogic.postPayment(body);
        if (data.status_code === "SUCCESS") {
            toast.success("Thanh toán thành công!");
            return data;
        } else if (data.status_code === "FAILED") {
            toast.error("Có lỗi xảy ra, vui lòng tải lại trang!");
        }
    }
}
