import React, { useContext, CSSProperties } from "react";
import Context from "../../store/Context";
import BeatLoader from "react-spinners/BeatLoader";
export default function Loading() {
    const [state] = useContext(Context);
    const { loading } = state;
    return (
        <BeatLoader
            color="#36d7b7"
            loading={loading}
            cssOverride={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}
