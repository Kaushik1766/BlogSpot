import axios from "axios";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Register() {

    const [credentials, updateCredentials] = useState({ username: '', password: '' });
    async function register() {
        let resp = await axios.post('http://localhost:3000/register', credentials).catch((error) => {
            console.log(error);
            return error.response;
        });
        window.alert(resp.data);
        if (resp.status == 200) {
            window.location.href = '/login';
        }
        else {
            window.location.reload();
        }
    }

    function handleChange(event) {
        let { name, value } = event.target;
        updateCredentials((prevCreds) => {
            return { ...credentials, [name]: value }
        })
    }
    return <>
        <Navbar />
        <div className="container">
            <h1 className="col-10 mx-auto my-4 text-center">Register to BlogSpot</h1>
            <form onSubmit={(e) => {
                register();
                e.preventDefault();
            }} className="row-3 col-10 mx-auto">
                <div className="form-floating mb-4">
                    <input className="form-control border border-secondary" required onChange={handleChange} name='username' placeholder="" value={credentials.username} />
                    <label className="ms-2">Username</label>
                </div>

                <div className="form-floating mb-4">
                    <input className="form-control border border-secondary" required onChange={handleChange} name='password' placeholder="" value={credentials.password} />
                    <label className="ms-2">Password</label>
                </div>
                <div className="d-flex justify-content-end">
                    <input type="submit" value={"Submit"} className="btn btn-primary m-3 me-0 align-self-start" />
                </div>
            </form>
        </div>
    </>;
};