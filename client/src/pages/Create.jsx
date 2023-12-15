import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Creator from "../components/Creator";

export default function Create() {
    useEffect(() => {
        document.title = "Create New Post";
    });
    return <>
        <Navbar />
        <Creator />
    </>;
};