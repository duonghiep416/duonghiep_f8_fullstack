import { useState } from "react";
import Loading from "./components/Loading/Loading";
import CardWelcome from "./components/Welcome/CardWelcome";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <>
            <Loading />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {!isAuthenticated && <CardWelcome />}
            {isAuthenticated && <Home />}
        </>
    );
}

export default App;
