import axios from 'axios';

export default function Creator() {
    function submitPost(title, post, author = "Anonymous") {
        axios.post("http://localhost:3000/create", { title: title, post: post, author: author });
    }
    return <>
        <div className="container">
            <h1 className="row col-10 mx-auto my-4">Create New Post</h1>
            <form className="row-3 col-10 mx-auto">
                <div className="form-floating mb-4">
                    <input className="form-control border border-secondary" id="title" placeholder="" />
                    <label className="ms-2">Title</label>
                </div>

                <div className="form-floating mt-3">
                    <textarea className="form-control border border-secondary" id="post" style={{ height: "40vh" }} placeholder=""></textarea>
                    <label className="ms-2">Post</label>
                </div>
                <input type="submit" value={"Submit"} className="btn btn-primary m-3 ms-0" />
            </form>
        </div>
    </>;
};