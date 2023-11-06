import React, { useState, useRef, useContext } from "react";
import Button from "../Button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import emailjs from "@emailjs/browser";
import Context from "../../store/Context";
import { toast } from "react-toastify";
function QuestionForm() {
    const form = useRef();
    const { user } = useAuth0();
    const { email } = user;
    const [state, dispatch] = useContext(Context);
    const [formValue, setFormValue] = useState({
        email: email,
        questionValue: "Tôi cần trợ giúp bài tập về nhà!",
    });
    const handleEmailChange = (e) => {
        setFormValue({
            ...formValue,
            email: e.target.value,
        });
    };

    const handleQuestionChange = (e) => {
        setFormValue({
            ...formValue,
            questionValue: e.target.value,
        });
    };

    const templateParams = {
        user_email: formValue.email,
        message: formValue.questionValue,
        user_name: user.name,
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setFormValue({
            ...formValue,
            questionValue: "",
            email: "",
        });
        dispatch({
            type: "loading/switch",
            payload: true,
        });
        await emailjs
            .send(
                "service_mlz7xcl",
                "template_pkxmy1s",
                templateParams,
                "3AdBfvgjT878R2qjz"
            )
            .then(
                (result) => {
                    toast.success("Gửi yêu cầu trợ giúp thành công");
                },
                (error) => {
                    toast.error(
                        "Gửi yêu cầu trợ giúp thất bại, vui lòng tải lại trang"
                    );
                }
            );
        dispatch({
            type: "loading/switch",
            payload: false,
        });
    };

    return (
        <form className="form" ref={form} onSubmit={handleSubmitForm}>
            <div className="form-group flex flex-col gap-2">
                <label htmlFor="email">Email của bạn</label>
                <input
                    type="email"
                    name="user_email"
                    id="email"
                    required
                    placeholder="Nhập email nhận phản hồi từ F8"
                    className="w-72 h-10 pl-4 border border-slate-600 rounded-md outline-none"
                    value={formValue.email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="form-group flex flex-col gap-2">
                <label htmlFor="questions">Câu hỏi của bạn</label>
                <input
                    type="questions"
                    name="message"
                    id="questions"
                    placeholder="Nhập câu hỏi của bạn"
                    required
                    className="w-72 h-10 pl-4 border border-slate-600 rounded-md outline-none"
                    value={formValue.questionValue}
                    onChange={handleQuestionChange}
                />
            </div>
            <Button color="emerald" text="Yêu cầu hỗ trợ" />
        </form>
    );
}
export default QuestionForm;
