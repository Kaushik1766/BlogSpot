import Navbar from "../components/Navbar";
import Blog from "../components/Blog";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";


function MainPage() {
    const [cookie, setCookie] = useCookies();
    const [user, setUser] = useState(null);
    useEffect(async () => {
        if (cookie.sessionID != null) {
            let returnedUser = await axios.post('http://localhost:3000/login', { sessionID: cookie.sessionID });
            if (returnedUser.data != null) {
                setUser(returnedUser.data);
            }
        }
    }, [])

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
        <Navbar user={user} setUser={setUser} />
        {content.map((value, key) => {
            return <Blog title={value.title} post={value.post} author={value.author} id={value.id} reRender={reRender} />
        })};
    </>
}

export default MainPage;