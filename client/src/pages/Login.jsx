import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";


export default function Login() {
    let username = useSelector((state) => state.login.username)
    console.log(username);
    if (username != null) {
        window.location.replace('/')
    }
    const [cookies, updateCookies] = useCookies(['user']);
    // console.log(cookies.sessionID); 
    if (cookies.sessionID != null) {
        axios.post("http://localhost:3000/login", cookies);
    }
    const [credentials, updateCredentials] = useState({ username: '', password: '' });
    async function login() {

        let resp = await axios.post('http://localhost:3000/login', credentials).catch((error) => {
            console.log(error);
            return error.response;
        });
        if (resp.data == 'user not registered' || resp.data == 'wrong password') {
            window.alert(resp.data);
        }
        else {
            updateCookies('sessionID', resp.data, { maxAge: 432000 })
        }
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
            <h1 className="col-5 mx-auto my-4 text-center">Login to BlogSpot</h1>
            <form onSubmit={(e) => {
                login();
                e.preventDefault();
            }} className="row-3 col-5 mx-auto">
                <div className="form-floating mb-4">
                    <input className="form-control border border-secondary" required onChange={handleChange} name='username' placeholder="" value={credentials.username} />
                    <label className="ms-2">Username</label>
                </div>

                <div className="form-floating mb-4">
                    <input className="form-control border border-secondary" type="password" required onChange={handleChange} name='password' placeholder="" value={credentials.password} />
                    <label className="ms-2">Password</label>
                </div>
                <div className="d-flex justify-content-center">
                    <input type="submit" value={"Submit"} className="btn btn-primary m-3 me-0 align-self-start" />
                </div>
            </form>
        </div>
    </>;
}