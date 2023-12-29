import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Creator() {
    let [content, updateContent] = useState({ title: "", post: '' });

    let selector = useSelector((state) => state.login.username);

    function submitPost() {
        if (content.title != "" && content.post != "") {
            let auth = "Anonymous"
            if (selector != null) {
                auth = selector
            }
            axios.post("http://localhost:3000/create", {
                title: content.title, post: content.post, author: auth,
            });
            console.log(content);
            if (window.confirm("Post Created successfully...\nPress OK to go to Home\nPress Cancel to Create new post")) {
                window.location.href = '/';
            }
            else {
                window.location.reload();
            }

        }
        else {
            window.alert('Title or Post empty');
        }
    }

    function handleChange(event) {
        let { name, value } = event.target;
        updateContent((prevContent) => ({ ...prevContent, [name]: value }));
        console.log(content);
    }
    return <>
        <div className="container">
            <h1 className="row col-10 mx-auto my-4">Create New Post</h1>
            <form onSubmit={(e) => {
                submitPost()
                e.preventDefault();
            }} className="row-3 col-10 mx-auto">
                <div className="form-floating mb-4">
                    <input required className="form-control border border-secondary" name='title' onChange={handleChange} placeholder="" />
                    <label className="ms-2">Title</label>
                </div>

                <div className="form-floating mt-3">
                    <textarea required className="form-control border border-secondary" name="post" style={{ height: "40vh" }} onChange={handleChange} placeholder=""></textarea>
                    <label className="ms-2">Post</label>
                </div>
                <input type="submit" value={"Submit"} className="btn btn-primary m-3 ms-0" />
            </form>
        </div>
    </>;
};