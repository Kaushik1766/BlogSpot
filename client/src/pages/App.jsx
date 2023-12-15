import Navbar from "../components/Navbar";
import Blog from "../components/Blog";
import { useEffect, useState } from "react";
import axios from 'axios';


function MainPage() {
    const [content, updateContent] = useState([]);
    useEffect(() => {
        document.title = "Home Page";
        axios.get("http://localhost:3000/").then((res) => {
            updateContent(res.data);
        });
    }, []);
    function reRender() {
        axios.get("http://localhost:3000/").then((res) => {
            updateContent(res.data);
        });
    }
    return <>
        <Navbar />
        {content.map((value, key) => {
            return <Blog title={value.title} post={value.post} author={value.author} id={value.id} reRender={reRender} />
        })};
    </>
}

export default MainPage;