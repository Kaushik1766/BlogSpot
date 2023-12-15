import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Edit() {
    useEffect(() => {
        document.title = "Edit Post";
    });
    return <>
        <Navbar />;
    </>;
};