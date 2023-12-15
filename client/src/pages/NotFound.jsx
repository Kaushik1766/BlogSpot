import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function NotFound() {
    useEffect(() => {
        document.title = "404";
    })
    return <>
        <Navbar />
        <h1 className="text-center display-6 my-3">Error 404. Page not found.</h1>
    </>
}