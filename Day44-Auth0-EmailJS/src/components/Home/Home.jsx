import React from "react";
import Button from "../Button/Button";
import { useAuth0 } from "@auth0/auth0-react";
import ISO6391 from "iso-639-1";
import Profile from "./Profile";
import QuestionForm from "./QuestionForm";

export default function Home() {
    const { logout } = useAuth0();

    return (
        <div>
            <Profile />
            <QuestionForm />
            <Button text="Đăng xuất" color="red" onClick={logout} />
        </div>
    );
}
