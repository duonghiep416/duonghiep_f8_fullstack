import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ISO6391 from "iso-639-1";

function Profile() {
    const { user } = useAuth0();
    const { name, picture: avtUrl, locale, email } = user;
    const location = ISO6391.getName(locale);

    return (
        <div>
            <img
                src={avtUrl}
                alt="avt"
                className="w-10 h-10 rounded-full object-cover"
            />
            <h2>Xin chào {name}!</h2>
            <p>Vị trí: {location}</p>
            <p>
                Email:{" "}
                <a
                    href={`mailto:${email}`}
                    target="_blank"
                    className="hover:underline text-orange-400"
                >
                    {email}
                </a>
            </p>
        </div>
    );
}
export default Profile;
