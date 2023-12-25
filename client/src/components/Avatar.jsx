import React from 'react'

function Guest() {
    return <>
        <div className="col-md-3 text-end">
            <a href='/login' type="button" className="btn btn-outline-primary me-2">Login</a>
            <a href='/register' type="button" className="btn btn-primary">Sign-up</a>
        </div>
    </>;
}

function User(props) {
    return <>
        <div className="col-md-3 text-end">
            <a href='/login' type="button" className="btn btn-outline-primary me-2">{props.user}</a>
            <a href='/register' type="button" className="btn btn-danger">Sign-out</a>
        </div>
    </>;
}

function Avatar(props) {
    if (props.user == null) {
        return <Guest />;
    }
    else {
        return <User user={props.user} setUser={props.setUser} />;
    }

}

export default Avatar