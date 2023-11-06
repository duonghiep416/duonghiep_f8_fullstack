import React, { useContext } from "react";
import Button from "../Button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Context from "../../store/Context";
function CardWelcome() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const [state, dispatch] = useContext(Context);
    return (
        <div className="w-96 mx-auto flex items-center justify-center flex-col p-4 border border-black-300 rounded-lg mt-10 gap-4">
            <p>Cảm ơn bạn đã sử dụng dịch vụ của F8</p>
            <p className="text-center">
                Nếu có bất kì câu hỏi hoặc trợ giúp nào, hãy đăng nhập và đặt
                câu hỏi tại đây!
            </p>
            <Button
                text="Đăng nhập || Đăng kí"
                color="red"
                onClick={() => {
                    (async function () {
                        dispatch({
                            type: "loading/switch",
                            payload: true,
                        });
                        await loginWithRedirect();
                        dispatch({
                            type: "loading/switch",
                            payload: false,
                        });
                    })();
                }}
            />
        </div>
    );
}
export default CardWelcome;
