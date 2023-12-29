import React, { useEffect } from 'react'
import { Cookies, useCookies } from "react-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features/login/loginSlice'
import axios from 'axios';


function Avatar(props) {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.login.username)
    const [cookie, setCookie] = useCookies('user');

    useEffect(() => {
        if (cookie.sessionID != null) {
            let returnedUser
            axios.post('http://localhost:3000/session', { sessionID: cookie.sessionID }).then((resp) => {
                returnedUser = resp
            }).then(() => {
                // if (returnedUser.data != null) {
                dispatch(setUser(returnedUser.data))

            })
        }
        else {
            dispatch(setUser(null))
        }
    }, [])

    function Guest() {
        return <>
            <div className="col-md-3 text-end">
                <a href='/login' type="button" className="btn btn-outline-primary me-2">Sign-in</a>
                <a href='/register' type="button" className="btn btn-primary">Sign-up</a>
            </div>
        </>;
    }

    async function logout() {
        await axios.post(import.meta.env.VITE_BACKEND + 'logout', { username: selector })
        setCookie('sessionID', null)
        dispatch(setUser(null))
    }

    function User() {

        return <>
            <div className="col-md-3 text-end">
                Welcome, {selector}
                <a onClick={logout} type="button" className="btn btn-danger m-2">Logout</a>
            </div>
        </>;
    }

    if (selector == null) {
        return <Guest />;
    }
    else {
        return <User />;
    }

}

export default Avatar